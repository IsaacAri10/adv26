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
      intro: "Esta noche, en la llamada, contestamos los dos. Si quieres, puedes echarles un ojo para ir pensando una respuesta. Pasa a la siguiente cuando terminemos cada una.",
      preguntas: [
        "¿Cuál es el primer recuerdo que tienes de mí?",
        "¿Qué momento te hizo sentir por primera vez que esto iba en serio?",
        "¿Qué costumbre tuya tendría que aprender a querer alguien que viva contigo?",
        "¿Qué es lo que más te gusta de ti? ¿Y lo que menos?",
        "¿Qué es algo pequeño que hago y que te gusta mucho?",
        "¿Qué conversación crees que deberíamos tener que no hayamos tenido? "
      ]
    },

    3: { // Cosas que me gustan de ti
      tipo: "tarjetas",
      etiqueta: "Para ti",
      titulo: "Cosas que me gustan de ti",
      intro: "Cosas que me gustan de ti",
      contador: "puntos",
      ultima: null,
      tarjetas: [
        "Que me digas te pienso mucho",
        "Segundo mensaje.",
        ["Una tarjeta con varios párrafos.", "Se separan con una línea en blanco."],
        "Último mensaje."
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
      bloques: [
        "Buenos días amor.",
        "Abre el paquete con el número 5, después sigue leyendo.",
        "La idea es que entre los dos vayamos escribiendo un diario o algo asi para que aunque no estemos juntos pues nos sintamos un poquito más cerca.",
        "Es fácil, cada mes (esto pues lo vamos cuadrando con las fechas en las que quedemos) uno de nosotros tendrá el cuaderno y pondrá en el lo que le apetezca: cosas que nos han pasado en esos días, cosas que nos hayan recordado al otro, fotos... Al mes siguiente, pues yo leeré lo que has puesto tú y me tocará escribir a mi.",
        "A ver qué tal sale, teniendo en cuenta mi letra y mi poco arte...",
        "Te quiero mucho"
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
      fotos: ["fotos/puzle.jpg", "fotos/ambronajpg", "fotos/2.jpg",
              "fotos/memoria-4.jpg", "fotos/memoria-5.jpg", "fotos/memoria-6.jpg"],
      premio: "Premio desbloqueado: abre ahora el sobre de la colonia."
    },

    11: { // Captura conversaciones
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
      premio: "Lo has conseguido. Ahora puedes abrir el paquete con el número 12."
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
      tipo: "tarjetas",
      etiqueta: "Clases de catalán",
      titulo: "Clases de catalán",
      intro: "Tenemos catalán esta noche, que tendré que poder hablar con tu madre... A continuación aparecerán una serie de frases en español que me tienes que enseñar a escribir y decir en catalán.",
      contador: "puntos",
      ultima: null,
      tarjetas: [
        "Que me digas te pienso mucho",
        "Segundo mensaje.",
        ["Una tarjeta con varios párrafos.", "Se separan con una línea en blanco."],
        "Último mensaje."
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
      numero: 17,
      titulo: "Esperemos que te gusten los pasatiempos...",
      texto: [
        "Ve al paquete y busca el sobre con el número 17."
      ]
    },

    18: { // Cápsula del tiempo
      tipo: "mensaje",
      texto: [
        "Buenos días amor.",
        "En la caja verás un sobre acolchado con el número 18. Tranqui, no hay nada dentro, no es que se me haya ovidado. Yo tengo otro en casa igual.",
        "Vamos a hacer una cápsula del tiempo. La idea es que cada uno escriba cosas que quieren que pasen o que esperan de 2027. Después tú me das la tuya y yo te doy la mía y el año que viene por Navidad las abrimos.",
        "Esta noche decidimos sobre qué escribir y cómo hacerlo.",
        "Te amo cariño."
      ]
    },

    19: { // Peluche
      tipo: "candado",
      titulo: "El candado",
      intro: "Para abrir el siguiente paquete necesitas una combinación de cuatro cifras. No tiene rima.",
      codigo: "3010",
      pistas: ["Es una fecha: día y mes.", "Te enfadaste porque dije que eras mi amiga.", "Te pedí que fueses mi novia."],
      premio: "Candado abierto. Ya puedes abrir el paquete del día 19."
    },

    20: { // Pensar nuestra vida juntos
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

    22: { // Vídeo con fotos de cada hora
      tipo: "mensaje",
      texto: [
        "Buenos días amor.",
        "Hoy vamos a hacer el vídeo este de pasarnos una foto cada hora para ver como de diferentes son nuestros días. Asi que ya sabes, tienes que pasarme una foto cada hora para que después podamos hacer el vídeo.",
        "Acepto propuestas para hacer más trends de estos en pareja.",
        "Te quiero mucho cielo."
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
