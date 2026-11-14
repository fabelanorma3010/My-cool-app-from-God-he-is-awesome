let currentLanguage = "en";
let currentUnit = "celsius";
let currentWeatherResponse;
let currentForecastResponse;
let lastLoveQuoteIndex = -1;
let lastJokeIndex = -1;
let lastSellingTipIndex = -1;

let translations = {
  en: {
    pageTitle: "My awesome weather app",
    languageLabel: "Language",
    openWeatherApp: "Open weather app",
    closeWeatherApp: "Close weather app",
    searchPlaceholder: "Enter a city...",
    searchButton: "Search",
    temperatureUnit: "Temperature unit",
    humidityLabel: "Humidity:",
    windLabel: "Wind:",
    travelHeading: "Travel guide",
    travelLabel: "Which country would you like to explore?",
    countryPlaceholder: "Enter a country",
    generateGuide: "Generate guide",
    travelNote: "AI-generated inspiration; verify current details with official sources.",
    journalHeading: "My journal",
    journalNote: "Your entries are saved only in this browser.",
    dateLabel: "Date",
    journalPrompt: "Write about your day",
    journalPlaceholder: "What happened today?",
    saveEntry: "Save entry",
    deleteEntry: "Delete saved entry",
    footerBy: "This project was coded by",
    footerHosted: "Code hosted on",
    footerGithub: "GitHub",
    footerDeployed: "and website hosted on",
    footerVercel: "Vercel",
    loveHeading: "Love quotes",
    loveDescription: "A little reminder of the beauty of love.",
    lovePrompt: "Press the button for a love quote.",
    newLoveQuote: "New love quote",
    jokesHeading: "Jokes",
    jokesDescription: "A little something to make you smile.",
    jokePrompt: "Press the button for a joke.",
    newJoke: "New joke",
    sellingHeading: "Selling tips",
    sellingDescription: "Practical ideas to help you sell.",
    sellingPrompt: "Press the button for a selling tip.",
    newSellingTip: "New selling tip",
    fundraiserHeading: "Support my fundraiser",
    fundraiserDescription:
      "Help me get out of debt, start a business, and work toward a trip to Paris.",
    fundraiserLink: "Visit the fundraiser",
    videoHeading: "MP4 player",
    videoDescription: "Choose an MP4 video from your device. It stays in your browser.",
    videoChoose: "Choose a video",
    videoAriaLabel: "MP4 video player",
    danceHeading: "Dance videos",
    danceDescription: "Learn a few moves with these beginner-friendly dance lessons.",
    danceHipHop: "Beginner hip-hop by Howcast on YouTube",
    danceSwing: "Beginner swing by DanceClassVideo on YouTube",
    danceBachata: "Beginner bachata on YouTube",
    danceSalsa: "Beginner salsa on YouTube",
    danceCumbia: "Beginner cumbia by Gustavo Krystal Dance on YouTube",
    danceJazz: "Beginner jazz on YouTube",
    coldAlert: "It's below 0°C and cold! Wear a sweater.",
    sunnyAlert: "Have a beautiful sunny day!",
    goodMorning: "Good morning in {city}!",
    goodNight: "Good night in {city}!",
    creatingGuide: "Creating your travel guide...",
    emptyCountry: "Enter a country to create a travel guide.",
    guideFailure: "Could not create a travel guide: {error}",
    guideOtherLanguage: "This guide is in the language it was generated in. Generate it again to get it in the selected language.",
    endpointUnavailable:
      "This server cannot run the Vercel API function. Open the deployed Vercel site or use `vercel dev` instead of Live Server.",
    endpointNonJson: "The Gemini endpoint returned a non-JSON response (HTTP {status}).",
    geminiRequestFailed: "The Gemini request failed.",
    couldNotReachGemini: "Could not reach the Gemini API.",
    invalidGeminiResponse: "Gemini returned an invalid response.",
    geminiNoText: "Gemini returned no text.",
    geminiMethodNotAllowed: "The Gemini endpoint only accepts POST requests.",
    geminiNotConfigured: "Gemini is not configured on the server.",
    unsupportedLanguage: "Choose English, Spanish, or French.",
    weatherDetailsInvalid: "The weather details are invalid.",
    geminiTemporarilyUnavailable: "Gemini is temporarily unavailable. Wait a moment and try again.",
    geminiQuota: "Gemini rate limits or quota were reached. Check the API quota and try again later.",
    geminiHttpError: "Gemini API request failed (HTTP {status}). Check the key and API quota.",
    invalidCountry: "Enter a valid country name.",
    unsupportedGeminiRequest: "Choose a supported Gemini request.",
    loadedEntry: "Loaded entry for {date}.",
    noSavedEntry: "No saved entry for {date}.",
    journalReadError: "Could not read journal entries in this browser.",
    emptyEntry: "Write something before saving.",
    savedEntry: "Saved entry for {date}.",
    journalSaveError: "Could not save the entry in this browser.",
    deleteConfirmation: "Delete your saved entry for {date}?",
    deletedEntry: "Deleted entry for {date}.",
    journalDeleteError: "Could not delete the entry in this browser.",
    unsavedChanges: "You have unsaved changes. Discard them and open another date?",
    invalidVideo: "Please choose an MP4 video.",
    loadingVideo: "Loading video...",
    videoOpenError: "Could not open this video. Please try another file.",
    videoReady: "Video ready to play.",
    videoPlayError: "Could not play this video. The file or its codec may not be supported.",
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortWeekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    conditions: {
      "clear sky": "Clear sky", clear: "Clear", sunny: "Sunny",
      "few clouds": "Few clouds", "scattered clouds": "Scattered clouds",
      "broken clouds": "Broken clouds", "overcast clouds": "Overcast clouds",
      "light rain": "Light rain", "moderate rain": "Moderate rain",
      "heavy rain": "Heavy rain", rain: "Rain", drizzle: "Drizzle",
      "light intensity drizzle": "Light drizzle", snow: "Snow",
      thunderstorm: "Thunderstorm", mist: "Mist", fog: "Fog", haze: "Haze",
    },
    loveQuotes: [
      "Love grows in the little moments we choose to share.",
      "A loving heart can make an ordinary day feel like home.",
      "Love is finding joy in helping another person shine.",
      "The sweetest kind of love makes room for us to grow.",
      "Love is a thousand small acts of kindness woven together.",
      "When words fall short, a caring presence can say so much.",
      "Love turns time together into memories worth keeping.",
      "To love is to listen, even in the quiet moments.",
      "A little patience and kindness can carry love a long way.",
      "Love brings warmth to days we never expected to be bright.",
      "The beauty of love is in showing up, again and again.",
      "Love is a gentle reminder that no one has to walk alone.",
    ],
    jokes: [
      "Why did the cloud bring a pencil? It wanted to draw some rain.",
      "What did the sunshine say to the umbrella? You can take the day off.",
      "Why did the raindrop sit by the window? It wanted a better view of the fall.",
      "What did the forecast say to the picnic? Let's take this one day at a time.",
      "Why did the breeze visit the library? It wanted to leaf through a book.",
      "What did the snowflake say at the party? I'm glad we could drift together.",
      "Why did the thermometer get a sweater? It was feeling a little low.",
      "What did the puddle say after the storm? I've really come together.",
      "Why did the rainbow open a bakery? It loved making colorful layers.",
      "What did the windy day say to the kite? I think we'll get along just fine.",
    ],
    sellingTips: [
      "Ask what your customer needs before recommending a product.",
      "Explain how your product solves a problem, not just its features.",
      "Use clear, honest photos and descriptions.",
      "Set a price that covers your costs and reflects the product's value.",
      "Answer questions promptly and politely.",
      "Make shipping costs, delivery times, and return policies easy to find.",
      "Use customer feedback to improve your product or service.",
      "Share customer reviews only with permission and without changing their meaning.",
      "Follow up respectfully after a sale to check customer satisfaction.",
      "Track which products sell well and adjust your inventory.",
    ],
  },
  es: {
    pageTitle: "Mi increíble aplicación del clima",
    languageLabel: "Idioma",
    openWeatherApp: "Abrir la aplicación del clima",
    closeWeatherApp: "Cerrar la aplicación del clima",
    searchPlaceholder: "Escribe una ciudad...",
    searchButton: "Buscar",
    temperatureUnit: "Unidad de temperatura",
    humidityLabel: "Humedad:",
    windLabel: "Viento:",
    travelHeading: "Guía de viaje",
    travelLabel: "¿Qué país te gustaría explorar?",
    countryPlaceholder: "Escribe un país",
    generateGuide: "Crear guía",
    travelNote: "Inspiración generada por IA; verifica la información actual con fuentes oficiales.",
    journalHeading: "Mi diario",
    journalNote: "Tus entradas se guardan solo en este navegador.",
    dateLabel: "Fecha",
    journalPrompt: "Escribe sobre tu día",
    journalPlaceholder: "¿Qué pasó hoy?",
    saveEntry: "Guardar entrada",
    deleteEntry: "Eliminar entrada guardada",
    footerBy: "Este proyecto fue creado por",
    footerHosted: "Código alojado en",
    footerGithub: "GitHub",
    footerDeployed: "y sitio web alojado en",
    footerVercel: "Vercel",
    loveHeading: "Frases de amor",
    loveDescription: "Un pequeño recordatorio de la belleza del amor.",
    lovePrompt: "Pulsa el botón para ver una frase de amor.",
    newLoveQuote: "Otra frase de amor",
    jokesHeading: "Chistes",
    jokesDescription: "Un poquito de humor para alegrarte el día.",
    jokePrompt: "Pulsa el botón para ver un chiste.",
    newJoke: "Otro chiste",
    sellingHeading: "Consejos para vender",
    sellingDescription: "Ideas prácticas para ayudarte a vender.",
    sellingPrompt: "Pulsa el botón para ver un consejo de ventas.",
    newSellingTip: "Otro consejo",
    fundraiserHeading: "Apoya mi recaudación de fondos",
    fundraiserDescription:
      "Ayúdame a salir de deudas, iniciar un negocio y acercarme a un viaje a París.",
    fundraiserLink: "Visita la recaudación",
    videoHeading: "Reproductor MP4",
    videoDescription: "Elige un video MP4 de tu dispositivo. Se reproduce en tu navegador.",
    videoChoose: "Elegir un video",
    videoAriaLabel: "Reproductor de video MP4",
    danceHeading: "Videos de baile",
    danceDescription: "Aprende algunos pasos con estas clases de baile para principiantes.",
    danceHipHop: "Hip-hop para principiantes de Howcast en YouTube",
    danceSwing: "Swing para principiantes de DanceClassVideo en YouTube",
    danceBachata: "Bachata para principiantes en YouTube",
    danceSalsa: "Salsa para principiantes en YouTube",
    danceCumbia: "Cumbia para principiantes de Gustavo Krystal Dance en YouTube",
    danceJazz: "Jazz para principiantes en YouTube",
    coldAlert: "¡Hace frío y estamos bajo 0 °C! Ponte un suéter.",
    sunnyAlert: "¡Que tengas un hermoso día soleado!",
    goodMorning: "¡Buenos días en {city}!",
    goodNight: "¡Buenas noches en {city}!",
    creatingGuide: "Creando tu guía de viaje...",
    emptyCountry: "Escribe un país para crear una guía de viaje.",
    guideFailure: "No se pudo crear la guía de viaje: {error}",
    guideOtherLanguage: "Esta guía está en el idioma en que se creó. Vuelve a generarla para verla en el idioma seleccionado.",
    endpointUnavailable:
      "Este servidor no puede ejecutar la función de Vercel. Abre el sitio desplegado en Vercel o usa `vercel dev` en lugar de Live Server.",
    endpointNonJson: "El punto de acceso de Gemini devolvió una respuesta que no es JSON (HTTP {status}).",
    geminiRequestFailed: "La solicitud a Gemini falló.",
    couldNotReachGemini: "No se pudo conectar con la API de Gemini.",
    invalidGeminiResponse: "Gemini devolvió una respuesta no válida.",
    geminiNoText: "Gemini no devolvió texto.",
    geminiMethodNotAllowed: "El punto de acceso de Gemini solo acepta solicitudes POST.",
    geminiNotConfigured: "Gemini no está configurado en el servidor.",
    unsupportedLanguage: "Elige inglés, español o francés.",
    weatherDetailsInvalid: "Los datos del clima no son válidos.",
    geminiTemporarilyUnavailable: "Gemini no está disponible temporalmente. Espera un momento e inténtalo de nuevo.",
    geminiQuota: "Se alcanzaron los límites o la cuota de Gemini. Revisa la cuota de la API e inténtalo más tarde.",
    geminiHttpError: "La solicitud a la API de Gemini falló (HTTP {status}). Revisa la clave y la cuota.",
    invalidCountry: "Escribe un nombre de país válido.",
    unsupportedGeminiRequest: "Elige una solicitud de Gemini compatible.",
    loadedEntry: "Se cargó la entrada del {date}.",
    noSavedEntry: "No hay una entrada guardada para el {date}.",
    journalReadError: "No se pudieron leer las entradas del diario en este navegador.",
    emptyEntry: "Escribe algo antes de guardar.",
    savedEntry: "Se guardó la entrada del {date}.",
    journalSaveError: "No se pudo guardar la entrada en este navegador.",
    deleteConfirmation: "¿Eliminar la entrada guardada del {date}?",
    deletedEntry: "Se eliminó la entrada del {date}.",
    journalDeleteError: "No se pudo eliminar la entrada en este navegador.",
    unsavedChanges: "Tienes cambios sin guardar. ¿Descartarlos y abrir otra fecha?",
    invalidVideo: "Elige un video MP4.",
    loadingVideo: "Cargando video...",
    videoOpenError: "No se pudo abrir este video. Prueba con otro archivo.",
    videoReady: "El video está listo para reproducirse.",
    videoPlayError: "No se pudo reproducir el video. Es posible que el archivo o su códec no sean compatibles.",
    weekdays: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    shortWeekdays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    conditions: {
      "clear sky": "cielo despejado", clear: "despejado", sunny: "soleado",
      "few clouds": "pocas nubes", "scattered clouds": "nubes dispersas",
      "broken clouds": "nubes fragmentadas", "overcast clouds": "nublado",
      "light rain": "lluvia ligera", "moderate rain": "lluvia moderada",
      "heavy rain": "lluvia intensa", rain: "lluvia", drizzle: "llovizna",
      "light intensity drizzle": "llovizna ligera", snow: "nieve",
      thunderstorm: "tormenta eléctrica", mist: "neblina", fog: "niebla", haze: "bruma",
    },
    loveQuotes: [
      "El amor crece en los pequeños momentos que elegimos compartir.",
      "Un corazón amoroso puede hacer que un día común se sienta como hogar.",
      "Amar es encontrar alegría en ayudar a otra persona a brillar.",
      "El amor más bonito nos da espacio para crecer.",
      "El amor es un sinfín de pequeños actos de bondad.",
      "Cuando las palabras no alcanzan, estar presente puede decir mucho.",
      "El amor convierte el tiempo juntos en recuerdos inolvidables.",
      "Amar también es escuchar, incluso en los momentos de silencio.",
      "Un poco de paciencia y bondad puede fortalecer el amor.",
      "El amor da calidez a días que no esperábamos que fueran especiales.",
      "La belleza del amor está en estar presente una y otra vez.",
      "El amor nos recuerda con ternura que no tenemos que caminar a solas.",
    ],
    jokes: [
      "¿Por qué la nube llevó un lápiz? Quería dibujar la lluvia.",
      "¿Qué le dijo el sol a la sombrilla? Hoy puedes descansar.",
      "¿Por qué la gota miraba por la ventana? Quería ver caer la lluvia.",
      "¿Qué le dijo el pronóstico al picnic? Vamos día por día.",
      "¿Por qué la brisa fue a la biblioteca? Quería hojear un libro.",
      "¿Qué dijo el copo de nieve en la fiesta? ¡Qué bueno que nos juntamos!",
      "¿Por qué el termómetro se puso un suéter? Tenía un poco de frío.",
      "¿Qué dijo el charco después de la tormenta? ¡Al fin me reuní con mis amigos!",
      "¿Por qué el arcoíris abrió una panadería? Le encantaban las capas de colores.",
      "¿Qué le dijo el viento a la cometa? ¡Creo que haremos buen equipo!",
    ],
    sellingTips: [
      "Pregunta qué necesita tu cliente antes de recomendarle un producto.",
      "Explica cómo tu producto resuelve un problema, no solo sus características.",
      "Usa fotos y descripciones claras y honestas.",
      "Fija un precio que cubra tus costos y refleje el valor del producto.",
      "Responde las preguntas con rapidez y amabilidad.",
      "Explica claramente los costos de envío, los plazos y las devoluciones.",
      "Usa los comentarios de los clientes para mejorar tu producto o servicio.",
      "Comparte reseñas solo con permiso y sin cambiar su significado.",
      "Después de una venta, pregunta con respeto si el cliente quedó satisfecho.",
      "Observa qué productos se venden bien y ajusta tu inventario.",
    ],
  },
  fr: {
    pageTitle: "Ma superbe application météo",
    languageLabel: "Langue",
    openWeatherApp: "Ouvrir l’application météo",
    closeWeatherApp: "Fermer l’application météo",
    searchPlaceholder: "Saisissez une ville...",
    searchButton: "Rechercher",
    temperatureUnit: "Unité de température",
    humidityLabel: "Humidité :",
    windLabel: "Vent :",
    travelHeading: "Guide de voyage",
    travelLabel: "Quel pays aimeriez-vous découvrir ?",
    countryPlaceholder: "Saisissez un pays",
    generateGuide: "Créer le guide",
    travelNote: "Idées générées par l’IA ; vérifiez les informations actuelles auprès de sources officielles.",
    journalHeading: "Mon journal",
    journalNote: "Vos notes sont enregistrées uniquement dans ce navigateur.",
    dateLabel: "Date",
    journalPrompt: "Racontez votre journée",
    journalPlaceholder: "Que s’est-il passé aujourd’hui ?",
    saveEntry: "Enregistrer",
    deleteEntry: "Supprimer la note",
    footerBy: "Ce projet a été créé par",
    footerHosted: "Code hébergé sur",
    footerGithub: "GitHub",
    footerDeployed: "et site hébergé sur",
    footerVercel: "Vercel",
    loveHeading: "Citations d’amour",
    loveDescription: "Un petit rappel de la beauté de l’amour.",
    lovePrompt: "Appuyez sur le bouton pour découvrir une citation d’amour.",
    newLoveQuote: "Une autre citation",
    jokesHeading: "Blagues",
    jokesDescription: "Une petite touche d’humour pour vous faire sourire.",
    jokePrompt: "Appuyez sur le bouton pour découvrir une blague.",
    newJoke: "Une autre blague",
    sellingHeading: "Conseils de vente",
    sellingDescription: "Des idées pratiques pour vous aider à vendre.",
    sellingPrompt: "Appuyez sur le bouton pour découvrir un conseil de vente.",
    newSellingTip: "Un autre conseil",
    fundraiserHeading: "Soutenez ma collecte de fonds",
    fundraiserDescription:
      "Aidez-moi à sortir de mes dettes, à créer une entreprise et à réaliser un voyage à Paris.",
    fundraiserLink: "Voir la collecte de fonds",
    videoHeading: "Lecteur MP4",
    videoDescription: "Choisissez une vidéo MP4 sur votre appareil. Elle reste dans votre navigateur.",
    videoChoose: "Choisir une vidéo",
    videoAriaLabel: "Lecteur vidéo MP4",
    danceHeading: "Vidéos de danse",
    danceDescription: "Apprenez quelques pas grâce à ces cours de danse pour débutants.",
    danceHipHop: "Hip-hop pour débutants par Howcast sur YouTube",
    danceSwing: "Swing pour débutants par DanceClassVideo sur YouTube",
    danceBachata: "Bachata pour débutants sur YouTube",
    danceSalsa: "Salsa pour débutants sur YouTube",
    danceCumbia: "Cumbia pour débutants par Gustavo Krystal Dance sur YouTube",
    danceJazz: "Jazz pour débutants sur YouTube",
    coldAlert: "Il fait froid et il y a moins de 0 °C ! Mettez un pull.",
    sunnyAlert: "Passez une très belle journée ensoleillée !",
    goodMorning: "Bonjour à {city} !",
    goodNight: "Bonne nuit à {city} !",
    creatingGuide: "Création de votre guide de voyage...",
    emptyCountry: "Saisissez un pays pour créer un guide de voyage.",
    guideFailure: "Impossible de créer le guide de voyage : {error}",
    guideOtherLanguage: "Ce guide est dans la langue utilisée lors de sa création. Générez-le à nouveau pour l’obtenir dans la langue sélectionnée.",
    endpointUnavailable:
      "Ce serveur ne peut pas exécuter la fonction Vercel. Ouvrez le site déployé sur Vercel ou utilisez `vercel dev` au lieu de Live Server.",
    endpointNonJson: "Le point de terminaison Gemini a renvoyé une réponse non JSON (HTTP {status}).",
    geminiRequestFailed: "La requête Gemini a échoué.",
    couldNotReachGemini: "Impossible de joindre l’API Gemini.",
    invalidGeminiResponse: "Gemini a renvoyé une réponse invalide.",
    geminiNoText: "Gemini n’a renvoyé aucun texte.",
    geminiMethodNotAllowed: "Le point de terminaison Gemini accepte uniquement les requêtes POST.",
    geminiNotConfigured: "Gemini n’est pas configuré sur le serveur.",
    unsupportedLanguage: "Choisissez l’anglais, l’espagnol ou le français.",
    weatherDetailsInvalid: "Les informations météo sont invalides.",
    geminiTemporarilyUnavailable: "Gemini est temporairement indisponible. Réessayez dans un instant.",
    geminiQuota: "Les limites ou le quota Gemini ont été atteints. Vérifiez le quota de l’API et réessayez plus tard.",
    geminiHttpError: "La requête à l’API Gemini a échoué (HTTP {status}). Vérifiez la clé et le quota.",
    invalidCountry: "Saisissez un nom de pays valide.",
    unsupportedGeminiRequest: "Choisissez une requête Gemini prise en charge.",
    loadedEntry: "Note du {date} chargée.",
    noSavedEntry: "Aucune note enregistrée pour le {date}.",
    journalReadError: "Impossible de lire les notes dans ce navigateur.",
    emptyEntry: "Écrivez quelque chose avant d’enregistrer.",
    savedEntry: "Note du {date} enregistrée.",
    journalSaveError: "Impossible d’enregistrer la note dans ce navigateur.",
    deleteConfirmation: "Supprimer la note enregistrée du {date} ?",
    deletedEntry: "Note du {date} supprimée.",
    journalDeleteError: "Impossible de supprimer la note dans ce navigateur.",
    unsavedChanges: "Des modifications ne sont pas enregistrées. Les abandonner et ouvrir une autre date ?",
    invalidVideo: "Veuillez choisir une vidéo MP4.",
    loadingVideo: "Chargement de la vidéo...",
    videoOpenError: "Impossible d’ouvrir cette vidéo. Essayez un autre fichier.",
    videoReady: "La vidéo est prête à être lue.",
    videoPlayError: "Impossible de lire cette vidéo. Le fichier ou son codec n’est peut-être pas pris en charge.",
    weekdays: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
    shortWeekdays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    conditions: {
      "clear sky": "ciel dégagé", clear: "dégagé", sunny: "ensoleillé",
      "few clouds": "quelques nuages", "scattered clouds": "nuages épars",
      "broken clouds": "nuages fragmentés", "overcast clouds": "couvert",
      "light rain": "pluie légère", "moderate rain": "pluie modérée",
      "heavy rain": "forte pluie", rain: "pluie", drizzle: "bruine",
      "light intensity drizzle": "bruine légère", snow: "neige",
      thunderstorm: "orage", mist: "brume légère", fog: "brouillard", haze: "brume",
    },
    loveQuotes: [
      "L’amour grandit dans les petits moments que nous choisissons de partager.",
      "Un cœur aimant peut transformer une journée ordinaire en foyer.",
      "Aimer, c’est trouver de la joie à aider l’autre à s’épanouir.",
      "Le plus bel amour nous laisse la place de grandir.",
      "L’amour est tissé de mille petits gestes de bonté.",
      "Quand les mots manquent, une présence attentive en dit long.",
      "L’amour transforme les moments partagés en souvenirs précieux.",
      "Aimer, c’est aussi écouter, même dans le silence.",
      "Un peu de patience et de gentillesse peut renforcer l’amour.",
      "L’amour réchauffe les journées que nous n’attendions pas lumineuses.",
      "La beauté de l’amour se trouve dans une présence fidèle.",
      "L’amour nous rappelle avec douceur que nous ne sommes pas seuls.",
    ],
    jokes: [
      "Pourquoi le nuage a-t-il pris un crayon ? Pour dessiner la pluie.",
      "Qu’a dit le soleil au parapluie ? Tu peux prendre ta journée.",
      "Pourquoi la goutte regardait-elle par la fenêtre ? Pour voir tomber la pluie.",
      "Qu’a dit la météo au pique-nique ? Avançons un jour à la fois.",
      "Pourquoi la brise est-elle allée à la bibliothèque ? Pour feuilleter un livre.",
      "Qu’a dit le flocon à la fête ? Je suis heureux qu’on ait pu se retrouver.",
      "Pourquoi le thermomètre a-t-il mis un pull ? Il avait un peu froid.",
      "Qu’a dit la flaque après l’orage ? Je me suis enfin fait des amis.",
      "Pourquoi l’arc-en-ciel a-t-il ouvert une boulangerie ? Il aimait les couches colorées.",
      "Qu’a dit le vent au cerf-volant ? Je crois qu’on va bien s’entendre.",
    ],
    sellingTips: [
      "Demandez à votre client ce dont il a besoin avant de lui conseiller un produit.",
      "Expliquez comment votre produit résout un problème, pas seulement ses caractéristiques.",
      "Utilisez des photos et des descriptions claires et honnêtes.",
      "Fixez un prix qui couvre vos coûts et reflète la valeur du produit.",
      "Répondez rapidement et poliment aux questions.",
      "Indiquez clairement les frais et délais de livraison ainsi que les retours.",
      "Utilisez les commentaires des clients pour améliorer votre offre.",
      "Ne partagez les avis clients qu’avec leur accord et sans en modifier le sens.",
      "Après une vente, demandez avec tact si le client est satisfait.",
      "Suivez les ventes et ajustez votre stock en conséquence.",
    ],
  },
};

let localeCodes = { en: "en-US", es: "es", fr: "fr" };
let languageSelect = document.querySelector("#language-select");
let weatherAppElement = document.querySelector("#weather-app");
let weatherAppToggle = document.querySelector("#weather-app-toggle");
let weatherAppOpen = true;
try {
  let savedWeatherAppOpen = localStorage.getItem("weather-app-open");
  if (savedWeatherAppOpen !== null) {
    weatherAppOpen = savedWeatherAppOpen === "true";
  }
} catch (error) {
  console.warn("Could not read weather-app-open from localStorage.", error);
}
let translationsForCurrentLanguage = translations[currentLanguage];
let currentGuideText = "";
let currentGuideLanguage = currentLanguage;
let currentVideoStatus = "";
let journalStatusKey = "";
let journalDateInput;
let journalEntryInput;
let saveJournalEntryButton;
let deleteJournalEntryButton;
let journalStatus;
let journalCurrentDate;
let journalSavedEntry;
let travelCountryInput;
let travelGuideResult;
let videoFile;
let videoPreview;
let videoStatus;
let videoUrl;

function t(key, values = {}) {
  let template = translationsForCurrentLanguage[key];
  if (typeof template !== "string") {
    throw new Error(`Missing translation: ${key} (${currentLanguage})`);
  }
  return template.replace(/\{(\w+)\}/g, function (match, name) {
    return Object.prototype.hasOwnProperty.call(values, name)
      ? values[name]
      : match;
  });
}

function applyLanguage(language) {
  if (!Object.prototype.hasOwnProperty.call(translations, language)) {
    throw new Error(`Unsupported language: ${language}`);
  }

  currentLanguage = language;
  translationsForCurrentLanguage = translations[language];
  document.documentElement.lang = language;
  document.title = t("pageTitle");
  languageSelect.value = language;

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = t(element.dataset.i18n);
  });
  document
    .querySelectorAll("[data-i18n-placeholder]")
    .forEach(function (element) {
      element.placeholder = t(element.dataset.i18nPlaceholder);
    });
  document.querySelectorAll("[data-i18n-value]").forEach(function (element) {
    element.value = t(element.dataset.i18nValue);
  });
  document
    .querySelectorAll("[data-i18n-aria-label]")
    .forEach(function (element) {
      element.setAttribute(
        "aria-label",
        t(element.dataset.i18nAriaLabel),
      );
    });
  document
    .querySelectorAll("[data-i18n-title]")
    .forEach(function (element) {
      element.title = t(element.dataset.i18nTitle);
    });

  updateWeatherAppToggle();
  updateGeneratorResults();
  renderJournalStatus();
  renderVideoStatus();
  if (currentWeatherResponse) {
    renderCurrentWeather();
  }
  if (currentForecastResponse) {
    displayForecast(currentForecastResponse);
  }
  if (currentGuideText) {
    travelGuideResult.textContent =
      currentGuideLanguage === currentLanguage
        ? currentGuideText
        : t("guideOtherLanguage");
  }
}

function updateWeatherAppToggle() {
  weatherAppElement.classList.toggle("is-closed", !weatherAppOpen);
  weatherAppToggle.textContent = t(
    weatherAppOpen ? "closeWeatherApp" : "openWeatherApp",
  );
  weatherAppToggle.setAttribute("aria-expanded", String(weatherAppOpen));
}

function toggleWeatherApp() {
  weatherAppOpen = !weatherAppOpen;
  try {
    localStorage.setItem("weather-app-open", String(weatherAppOpen));
  } catch (error) {
    console.warn("Could not save weather-app-open to localStorage.", error);
  }
  updateWeatherAppToggle();
}

function updateGeneratorResults() {
  document.querySelector("#love-quote-result").textContent =
    lastLoveQuoteIndex === -1
      ? t("lovePrompt")
      : translationsForCurrentLanguage.loveQuotes[lastLoveQuoteIndex];
  document.querySelector("#joke-result").textContent =
    lastJokeIndex === -1
      ? t("jokePrompt")
      : translationsForCurrentLanguage.jokes[lastJokeIndex];
  document.querySelector("#selling-tip-result").textContent =
    lastSellingTipIndex === -1
      ? t("sellingPrompt")
      : translationsForCurrentLanguage.sellingTips[lastSellingTipIndex];
}

function renderJournalStatus() {
  if (journalStatusKey) {
    journalStatus.textContent = t(journalStatusKey, {
      date: formatJournalDate(journalCurrentDate),
    });
  }
}

function setJournalStatus(key) {
  journalStatusKey = key;
  renderJournalStatus();
}

function renderVideoStatus() {
  videoStatus.textContent = currentVideoStatus ? t(currentVideoStatus) : "";
}

function randomNewIndex(length, previousIndex) {
  let choices = length - (previousIndex === -1 ? 0 : 1);
  let index = Math.floor(Math.random() * choices);
  if (previousIndex !== -1 && index >= previousIndex) {
    index++;
  }
  return index;
}

function showLoveQuote() {
  lastLoveQuoteIndex = randomNewIndex(
    translationsForCurrentLanguage.loveQuotes.length,
    lastLoveQuoteIndex,
  );
  document.querySelector("#love-quote-result").textContent =
    translationsForCurrentLanguage.loveQuotes[lastLoveQuoteIndex];
}

function showJoke() {
  lastJokeIndex = randomNewIndex(
    translationsForCurrentLanguage.jokes.length,
    lastJokeIndex,
  );
  document.querySelector("#joke-result").textContent =
    translationsForCurrentLanguage.jokes[lastJokeIndex];
}

function showSellingTip() {
  lastSellingTipIndex = randomNewIndex(
    translationsForCurrentLanguage.sellingTips.length,
    lastSellingTipIndex,
  );
  document.querySelector("#selling-tip-result").textContent =
    translationsForCurrentLanguage.sellingTips[lastSellingTipIndex];
}

function refreshWeather(response) {
  currentWeatherResponse = response;
  renderCurrentWeather();
  getForecast(response.data.city);
}

function renderCurrentWeather() {
  if (!currentWeatherResponse) {
    return;
  }

  let response = currentWeatherResponse;
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  let condition = response.data.condition.description.toLowerCase();

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.textContent = translateCondition(
    response.data.condition.description,
  );
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.textContent = Math.round(convertTemperature(temperature));
  document.querySelector("#cold-alert").textContent =
    temperature < 0 ? t("coldAlert") : "";
  document.querySelector("#sunny-alert").textContent =
    condition.includes("sunny") || condition.includes("clear")
      ? t("sunnyAlert")
      : "";
  let localHour = date.getHours();
  let greetingKey =
    localHour >= 5 && localHour < 12
      ? "goodMorning"
      : localHour >= 20 || localHour < 5
        ? "goodNight"
        : "";
  document.querySelector("#greeting-alert").textContent = greetingKey
    ? t(greetingKey, { city: response.data.city })
    : "";
  iconElement.textContent = getWeatherIcon(response.data.condition.description);
  iconElement.classList.add("weather-app-icon");
}

function translateCondition(description) {
  return (
    translationsForCurrentLanguage.conditions[description.toLowerCase()] ||
    description
  );
}

function convertTemperature(celsius) {
  return currentUnit === "fahrenheit" ? (celsius * 9) / 5 + 32 : celsius;
}

function setTemperatureUnit(unit) {
  currentUnit = unit;
  let celsiusButton = document.querySelector("#celsius-link");
  let fahrenheitButton = document.querySelector("#fahrenheit-link");
  celsiusButton.classList.toggle("active", unit === "celsius");
  celsiusButton.setAttribute("aria-pressed", unit === "celsius");
  fahrenheitButton.classList.toggle("active", unit === "fahrenheit");
  fahrenheitButton.setAttribute("aria-pressed", unit === "fahrenheit");

  renderCurrentWeather();
  if (currentForecastResponse) {
    displayForecast(currentForecastResponse);
  }
}

function getWeatherIcon(description) {
  let condition = description.toLowerCase();

  if (condition.includes("thunder")) {
    return "⛈️";
  }
  if (condition.includes("snow")) {
    return "❄️";
  }
  if (condition.includes("drizzle")) {
    return "🌦️";
  }
  if (condition.includes("rain")) {
    return "🌧️";
  }
  if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze") ||
    condition.includes("smoke") ||
    condition.includes("dust")
  ) {
    return "🌫️";
  }
  if (condition.includes("clear")) {
    return "☀️";
  }
  if (condition.includes("cloud")) {
    return "☁️";
  }

  return "🌡️";
}

async function requestGemini(payload) {
  let response;
  try {
    response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Could not reach the Gemini endpoint.", error);
    throw new Error(t("couldNotReachGemini"));
  }
  let data;

  try {
    data = await response.json();
  } catch (error) {
    if (response.status === 403 || response.status === 404) {
      throw new Error(
        t("endpointUnavailable"),
      );
    }
    throw new Error(
      t("endpointNonJson", { status: response.status }),
    );
  }

  if (!response.ok) {
    let errorKey = data.errorKey;
    if (
      typeof errorKey === "string" &&
      Object.prototype.hasOwnProperty.call(
        translationsForCurrentLanguage,
        errorKey,
      ) &&
      typeof translationsForCurrentLanguage[errorKey] === "string"
    ) {
      throw new Error(t(errorKey, { status: data.status || response.status }));
    }
    throw new Error(t("geminiRequestFailed"));
  }

  return data;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = translationsForCurrentLanguage.weekdays[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);

  return translationsForCurrentLanguage.shortWeekdays[date.getDay()];
}

function getForecast(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

async function generateTravelGuide(event) {
  event.preventDefault();

  let country = travelCountryInput.value.trim();
  let button = document.querySelector("#travel-guide-button");

  if (!country) {
    travelGuideResult.textContent = t("emptyCountry");
    return;
  }

  button.disabled = true;
  travelGuideResult.textContent = t("creatingGuide");
  currentGuideText = "";
  let guideLanguage = currentLanguage;
  currentGuideLanguage = guideLanguage;

  try {
    let data = await requestGemini({
      type: "travel-guide",
      country,
      language: guideLanguage,
    });
    currentGuideText = data.guide;
    travelGuideResult.textContent =
      currentLanguage === guideLanguage ? data.guide : t("guideOtherLanguage");
  } catch (error) {
    travelGuideResult.textContent = t("guideFailure", { error: error.message });
  } finally {
    button.disabled = false;
  }
}

function getLocalDateValue() {
  let date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function formatJournalDate(dateValue) {
  let [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(
    localeCodes[currentLanguage],
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );
}

function loadJournalEntry(dateValue) {
  try {
    journalSavedEntry =
      localStorage.getItem(`weather-app-journal-${dateValue}`) || "";
    journalCurrentDate = dateValue;
    journalEntryInput.value = journalSavedEntry;
    deleteJournalEntryButton.disabled = !journalSavedEntry;
    setJournalStatus(journalSavedEntry ? "loadedEntry" : "noSavedEntry");
  } catch (error) {
    console.error("Could not load the journal entry.", error);
    journalCurrentDate = dateValue;
    journalSavedEntry = "";
    journalEntryInput.value = "";
    deleteJournalEntryButton.disabled = true;
    setJournalStatus("journalReadError");
  }
}

function saveJournalEntry() {
  let entry = journalEntryInput.value.trim();
  if (!entry) {
    setJournalStatus("emptyEntry");
    return;
  }

  try {
    localStorage.setItem(`weather-app-journal-${journalCurrentDate}`, entry);
    journalSavedEntry = entry;
    journalEntryInput.value = entry;
    deleteJournalEntryButton.disabled = false;
    setJournalStatus("savedEntry");
  } catch (error) {
    console.error("Could not save the journal entry.", error);
    setJournalStatus("journalSaveError");
  }
}

function deleteJournalEntry() {
  if (
    !journalSavedEntry ||
    !window.confirm(
      t("deleteConfirmation", {
        date: formatJournalDate(journalCurrentDate),
      }),
    )
  ) {
    return;
  }

  try {
    localStorage.removeItem(`weather-app-journal-${journalCurrentDate}`);
    journalSavedEntry = "";
    journalEntryInput.value = "";
    deleteJournalEntryButton.disabled = true;
    setJournalStatus("deletedEntry");
  } catch (error) {
    console.error("Could not delete the journal entry.", error);
    setJournalStatus("journalDeleteError");
  }
}

function displayForecast(response) {
  currentForecastResponse = response;
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>

        <span class="weather-forecast-icon">${getWeatherIcon(
          day.condition.description,
        )}</span>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(
              convertTemperature(day.temperature.maximum),
            )}°</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
              convertTemperature(day.temperature.minimum),
            )}°</div>
        </div>
      </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

journalDateInput = document.querySelector("#journal-date");
journalEntryInput = document.querySelector("#journal-entry");
saveJournalEntryButton = document.querySelector("#save-journal-entry");
deleteJournalEntryButton = document.querySelector("#delete-journal-entry");
journalStatus = document.querySelector("#journal-status");
journalCurrentDate = getLocalDateValue();
journalSavedEntry = "";
travelCountryInput = document.querySelector("#travel-country");
travelGuideResult = document.querySelector("#travel-guide-result");
journalDateInput.value = journalCurrentDate;

videoFile = document.querySelector("#video-file");
videoPreview = document.querySelector("#video-preview");
videoStatus = document.querySelector("#video-status");

loadJournalEntry(journalCurrentDate);
journalDateInput.addEventListener("change", function () {
  if (!journalDateInput.value) {
    journalDateInput.value = journalCurrentDate;
    return;
  }

  if (journalEntryInput.value !== journalSavedEntry) {
    let discardChanges = window.confirm(
      t("unsavedChanges"),
    );
    if (!discardChanges) {
      journalDateInput.value = journalCurrentDate;
      return;
    }
  }
  loadJournalEntry(journalDateInput.value);
});
saveJournalEntryButton.addEventListener("click", saveJournalEntry);
deleteJournalEntryButton.addEventListener("click", deleteJournalEntry);
document
  .querySelector("#travel-guide-form")
  .addEventListener("submit", generateTravelGuide);

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
document
  .querySelector("#celsius-link")
  .addEventListener("click", () => setTemperatureUnit("celsius"));
document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", () => setTemperatureUnit("fahrenheit"));
document
  .querySelector("#love-quote-button")
  .addEventListener("click", showLoveQuote);
document.querySelector("#joke-button").addEventListener("click", showJoke);
document
  .querySelector("#selling-tip-button")
  .addEventListener("click", showSellingTip);

languageSelect.addEventListener("change", function () {
  applyLanguage(languageSelect.value);
});
weatherAppToggle.addEventListener("click", toggleWeatherApp);
applyLanguage(currentLanguage);

videoFile.addEventListener("change", function () {
  let file = videoFile.files[0];
  if (!file) {
    return;
  }

  videoPreview.pause();
  videoPreview.removeAttribute("src");
  videoPreview.load();
  videoPreview.hidden = true;
  if (videoUrl) {
    URL.revokeObjectURL(videoUrl);
    videoUrl = undefined;
  }

  if (file.type !== "video/mp4" && !file.name.toLowerCase().endsWith(".mp4")) {
    videoFile.value = "";
    currentVideoStatus = "invalidVideo";
    renderVideoStatus();
    return;
  }

  try {
    videoUrl = URL.createObjectURL(file);
    currentVideoStatus = "loadingVideo";
    renderVideoStatus();
    videoPreview.src = videoUrl;
    videoPreview.hidden = false;
  } catch (error) {
    console.error("Could not open the video.", error);
    currentVideoStatus = "videoOpenError";
    renderVideoStatus();
  }
});

videoPreview.addEventListener("loadedmetadata", function () {
  currentVideoStatus = "videoReady";
  renderVideoStatus();
});
videoPreview.addEventListener("error", function () {
  currentVideoStatus = "videoPlayError";
  renderVideoStatus();
});
