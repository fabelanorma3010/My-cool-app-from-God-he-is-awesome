module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res
      .status(405)
      .json({ errorKey: "geminiMethodNotAllowed", error: "Use POST for this endpoint." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({
        errorKey: "geminiNotConfigured",
        error: "Gemini is not configured. Set GEMINI_API_KEY in Vercel.",
      });
  }

  const body = req.body;
  const languageNames = { en: "English", es: "Spanish", fr: "French" };
  const language =
    body?.language === undefined ? "en" : body.language;
  if (!Object.prototype.hasOwnProperty.call(languageNames, language)) {
    return res
      .status(400)
      .json({ errorKey: "unsupportedLanguage", error: "Choose a supported language." });
  }
  const responseLanguage = languageNames[language];
  let prompt;
  let maxOutputTokens;

  if (body?.type === "travel-guide") {
    if (
      typeof body.country !== "string" ||
      body.country.trim().length === 0 ||
      body.country.length > 80
    ) {
      return res
        .status(400)
        .json({ errorKey: "invalidCountry", error: "Enter a valid country name." });
    }

    prompt = [
      `Create a concise travel guide for a visitor to ${body.country.trim()}.`,
      `Write the entire response in ${responseLanguage}.`,
      "Recommend five real destinations or regions and specific things to do at each.",
      "Use a short introduction followed by five numbered recommendations.",
      "Do not invent current opening hours, prices, visa rules, or safety conditions.",
      "Remind the reader to verify current details with official sources.",
    ].join(" ");
    maxOutputTokens = 600;
  } else if (body?.type === "weather-tip") {
    if (
      typeof body.city !== "string" ||
      body.city.length === 0 ||
      body.city.length > 100 ||
      typeof body.conditions !== "string" ||
      body.conditions.length === 0 ||
      body.conditions.length > 100 ||
      typeof body.temperature !== "number" ||
      !Number.isFinite(body.temperature) ||
      !["C", "F"].includes(body.unit) ||
      typeof body.humidity !== "number" ||
      !Number.isFinite(body.humidity) ||
      typeof body.windSpeed !== "number" ||
      !Number.isFinite(body.windSpeed)
    ) {
      return res
        .status(400)
        .json({ errorKey: "weatherDetailsInvalid", error: "Weather details are invalid." });
    }

    prompt = [
      `Give one concise, practical weather tip for someone in ${body.city}.`,
      `Write the response in ${responseLanguage}.`,
      `Current conditions: ${body.conditions}, temperature ${body.temperature}°${body.unit},`,
      `humidity ${body.humidity}%, wind speed ${body.windSpeed} km/h.`,
      "Focus on clothing or outdoor plans. Do not invent weather details. Keep it under 45 words.",
    ].join(" ");
    maxOutputTokens = 120;
  } else {
    return res
      .status(400)
      .json({ errorKey: "unsupportedGeminiRequest", error: "Choose a supported Gemini request." });
  }

  let geminiResponse;
  try {
    geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens, temperature: 0.4 },
        }),
      },
    );
  } catch (error) {
    console.error("Gemini API request failed.", error);
    return res.status(502).json({
      errorKey: "couldNotReachGemini",
      error: "Could not reach the Gemini API.",
    });
  }

  let data;
  try {
    data = await geminiResponse.json();
  } catch (error) {
    console.error("Gemini API returned an invalid response.", error);
    return res.status(502).json({
      errorKey: "invalidGeminiResponse",
      error: "Gemini returned an invalid response.",
    });
  }

  if (!geminiResponse.ok) {
    console.error(`Gemini API returned HTTP ${geminiResponse.status}.`);
    if (geminiResponse.status === 503) {
      return res.status(502).json({
        errorKey: "geminiTemporarilyUnavailable",
        error: "Gemini is temporarily unavailable. Wait a moment and try again.",
      });
    }
    if (geminiResponse.status === 429) {
      return res.status(502).json({
        errorKey: "geminiQuota",
        error:
          "Gemini rate limits or quota were reached. Check your API quota in Google AI Studio and try again later.",
      });
    }
    return res.status(502).json({
      errorKey: "geminiHttpError",
      status: geminiResponse.status,
      error: `Gemini API request failed (HTTP ${geminiResponse.status}). Check the key and API quota in Google AI Studio.`,
    });
  }

  const answer = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!answer) {
    return res
      .status(502)
      .json({ errorKey: "geminiNoText", error: "Gemini returned no text." });
  }

  const resultField = body.type === "travel-guide" ? "guide" : "tip";
  return res.status(200).json({ [resultField]: answer });
};
