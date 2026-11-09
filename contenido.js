/* =====================================================================
   CONTENIDO DEL CALENDARIO
   Este es el único archivo que necesitas tocar para rellenar los días.

   Tipos de día:
     mensaje    carta con fotos           titulo, texto[], fotos[]
     sobre      "abre el sobre X"         numero, titulo, texto[]
     post       algo de internet          titulo, texto[], enlace, boton, captura
     video      un vídeo                  titulo, texto[], youtube | archivo | enlace
     preguntas  para conocernos           titulo, intro, preguntas[]
     quiz       ¿cuánto me conoces?       titulo, preguntas[{p, o[], ok}], final
     memoria    juego de parejas          titulo, intro, simbolos[], premio

   Extras que valen para cualquier día:
     paquete: 3     añade al final "Abre ahora el sobre 3 del paquete"
     firma: false   quita la firma de ese día

   Fotos: guárdalas en la carpeta fotos/ y pon la ruta, p. ej. "fotos/dia01.jpg".
   Para vídeos de YouTube (pueden ser "ocultos"), pon solo el ID:
   en https://youtu.be/AbCdEf12345 el ID es "AbCdEf12345".

   Para probar en el móvil antes de diciembre, añade al final del enlace:
     #ensayo   todo abierto
     #hoy-7    simula que es 7 de diciembre
     #normal   vuelve a la fecha real
   ===================================================================== */

window.ADVIENTO = {
  anio: 2026,
  firma: "",

  dias: {
    1: { // Intro
      tipo: "mensaje",
      texto: [
        "Buenos días amor.",
        "Me imagino que después de un par de semanas ya tendrías ganas de saber lo que hay dentro de la caja... También imagino que diciéndote que no podrías abrirla hasta el 1 de diciembre, algo te habrás olido ya...",
        "Efectivamente, es un calendario de adviento. Lo primero de todo, aunque supongo que sabes como funciona, las instrucciones:",
        "     · Como has visto, en la pantalla principal de la web hay 24 sobres con su número correspondiente. Cada día se irá desbloqueando uno. En principio, se desbloquean a partir de las 00:00 de cada día, pero puedes abrirlo cuando te apetezca.",
        "     · Dentro de cada sobre habrá algo para ese día, prefiero no contarte que tipo de cosas hay para que sea más sorpresa.",
        "     · En el sobre de algunos días, te dirá que tienes que coger algo de la caja. MUY IMPORTANTE: no seas tramposa y no mires el resto de cosas que hay dentro. Lo sabré y tendremos problemas...",
        "No esperes gran cosa (que ya sabes como gasto y que futbolista no soy...) pero esperes que te guste y que se te hagan un poquito más amenos estos días tan especiales que no podemos vernos.",
        "Son nuestras primeras Navidades juntos y, aunque no podamos vernos tanto como nos gustaría, quería que tuvieras un recuerdo bonito de ellas. Tengo claro que eres la chica con la que quiero pasar todas las Navidades que me queden.",
        "Te quiero mucho Marina, eres la ilusión de mi vida."
      ]
    },

    2: { // Preguntas para conocernos mejor
      tipo: "preguntas",
      titulo: "Preguntas para conocernos mejor",
      intro: "Esta noche, en la llamada, contestamos los dos. Pasa a la siguiente cuando terminemos cada una.",
      preguntas: [
        "¿Cuál es el primer recuerdo que tienes de mí?",
        "Si mañana tuviéramos el día libre en la misma ciudad, ¿qué plan harías?",
        "¿Qué canción te recuerda a nosotros?",
        "¿Qué es algo pequeño que hago y que te gusta más de lo que crees?",
        "¿A dónde te gustaría que viajáramos el año que viene?"
      ]
    },

    3: { // Cosas que me gustan de ti
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    4: { // Noche de anécdotas
      tipo: "mensaje",
      texto: [
        "Buenos días amor."
      ]
    },

    5: { // Cuaderno compartido
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    6: { // Lista colaborativa
      tipo: "post",
      titulo: "Esto me hizo pensar en ti",
      texto: ["Me lo encontré el otro día y me acordé de ti al instante."],
      captura: { src: "", pie: "" },
      enlace: "https://example.com",
      boton: "Ver el post",
      paquete: 2
    },

    7: { // Noche de poesía
      tipo: "post",
      titulo: "Esto me hizo pensar en ti",
      texto: ["Me lo encontré el otro día y me acordé de ti al instante."],
      captura: { src: "", pie: "" },
      enlace: "https://example.com",
      boton: "Ver el post",
      paquete: 2
    },

    8: { // Preguntas sobre mi
      tipo: "quiz",
      titulo: "¿Cuánto me conoces?",
      preguntas: [
        { p: "¿Cuál es mi comida favorita?", o: ["Pizza", "Paella", "Sushi", "Tortilla de patatas"], ok: 1 },
        { p: "¿Dónde fue nuestra primera cita?", o: ["En un bar", "En el cine", "Paseando", "En un restaurante"], ok: 2 },
        { p: "¿Qué haría yo un domingo perfecto?", o: ["Fútbol y sofá", "Ir a la montaña", "Dormir hasta las 12", "Todo lo anterior"], ok: 3 }
      ],
      finales: [
        { desde: 0, texto: "Cero aciertos... Vamos a tener que pasar más tiempo juntos." },
        { desde: 1, texto: "Uno solo. Aún estás a tiempo de ponerte las pilas." },
        { desde: 2, texto: "Casi perfecto. Se nota que me prestas atención." },
        { desde: 3, texto: "Pleno. Me conoces mejor que yo mismo." }
      ]
    },

    9: { // Temas importants que hablar en una relación
      tipo: "mensaje",
      texto: [
        "Buenos días amor."
      ]
    },

    10: { // Perfume
      tipo: "memoria",
      titulo: "Memory de nosotros",
      intro: "Encuentra las seis parejas de fotos. Cuando las tengas todas, sabrás qué toca abrir.",
      fotos: ["fotos/memoria-1.jpg", "fotos/memoria-2.jpg", "fotos/memoria-3.jpg",
              "fotos/memoria-4.jpg", "fotos/memoria-5.jpg", "fotos/memoria-6.jpg"],
      premio: "Premio desbloqueado: abre ahora el sobre de la colonia."
    },

    11: { // Cuaderno compartido
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    12: { // Libro
      tipo: "puzle",
      titulo: "Ordena la foto",
      intro: "Toca las piezas que están al lado del hueco para moverlas hasta recomponer la foto.",
      foto: "fotos/puzle.jpg",
      premio: "Lo has conseguido. Ahora puedes abrir el sobre del libro."
    },

    13: { // Relaciones a distancia
      tipo: "post",
      titulo: "Esto me hizo pensar en ti",
      texto: ["Me lo encontré el otro día y me acordé de ti al instante."],
      captura: { src: "", pie: "" },
      enlace: "https://example.com",
      boton: "Ver el post",
      paquete: 2
    },

    14: { // Clases de catalan
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    15: { // Hacer planes juntos
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    16: { // Recuerdos
      tipo: "mensaje",
      texto: [
        "Buenos días amor.",
        "Una cosa que me gusta mucho (que igual te parece un problemita) es guardar todo tipo de recuerdos de las cosas que hago o de los sitios que visito. Por ejempl, siempre guardo un mapa turístico de las ciudades que visito.",
        "Pues ahora quiero hacerlo contigo. Eres la persona con la que quiero pasar el resto de mi vida y tengo pensado documentarlo todo, aunque suponga tener miles de cajas en casa con recuerdos juntos.",
        "La tarea de hoy consiste en pensar juntos como lo vamos a hacer. Tienes que pensarte cómo te gustaría hacerlo a ti. Te dejo algunas ideas, aunque fijo que las tuyas son mejores:",
        "· Comprar una postal en cada sitio que vayamos y hacer un álbum.",
        "· Comprar un imán para la nevera (como verás soy suuuuuuuuper original).",
        "· Posar de alguna manera especial para hacernos una foto juntos y luego montar un vídeo.",
        "Esta noche nos llamamos y me cuentas que has pensado. Que vaya muy bien el día amor, te quiero con locura.",
      ]
    },

    17: { // Crucigrama
      tipo: "sobre",
      numero: 3,
      titulo: "Hoy toca paquete",
      texto: [
        "Ve al paquete y busca el sobre con el número 3.",
        "Los demás, quietos hasta su día 😉"
      ]
    },

    18: { // Cápsula del tiempo
      tipo: "mensaje",
      texto: [
        "Buenos días amor.",
      ]
    },

    19: { // Peluche
      tipo: "candado",
      titulo: "El candado",
      intro: "Para abrir el sobre del peluche necesitas la combinación de cuatro cifras.",
      codigo: "1412",
      pistas: ["Es una fecha: día y mes.", "Es el día en que nos conocimos.", "Fue en diciembre."],
      premio: "Candado abierto. Ya puedes coger el sobre del peluche."
    },

    20: { // Hacer planes juntos o post, ya veremos
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    21: { // Citas a distancia
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    },

    22: { // Cápsula del tiempo
      tipo: "mensaje",
      texto: [
        "Buenos días amor.",
      ]
    },

    23: { // Vales
      tipo: "wordle",
      titulo: "La palabra del día",
      intro: "Adivina la palabra de 5 letras en 6 intentos. Verde: bien colocada. Amarillo: está, pero en otro sitio. Gris: no está.",
      palabra: "BESOS",
      pista: "Es lo que más me gustaría darte ahora mismo.",
      premio: "Bien jugado. Ahora puedes abrir el sobre de hoy."
    },

    24: { // Carta
      tipo: "historia",
      // mano: true,   // descomenta para que el texto salga con letra a mano
      bloques: [
        "Todo empezó con un mensaje que yo no sabía cómo contestar.",
        { foto: "fotos/ambrona.JPEG", pie: "Ese día, en esa calle" },
        "Otro párrafo cualquiera.",
      ]
    }
    
  }
};
