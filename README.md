# Nuestro Adviento

Calendario de adviento online: 24 sobres, uno por día, que se abren a medianoche (hora de Madrid).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página. No hace falta tocarla. |
| `styles.css` | El diseño. |
| `app.js` | La lógica: desbloqueo por fecha, juegos y navegación. |
| `contenido.js` | **Lo que hay en cada día. Es el único archivo que vas a editar.** |
| `fotos/` | Aquí van las fotos (`fotos/dia01.jpg`, etc.). |
| `.nojekyll` | Le dice a GitHub que sirva los archivos tal cual. |

## Publicarlo en GitHub Pages

1. Entra en github.com y crea un repositorio nuevo (**New repository**). Ponle un nombre que no dé pistas, por ejemplo `diciembre`. Tiene que ser **Public** (GitHub Pages gratis solo funciona con repos públicos).
2. En el repo vacío, pulsa **uploading an existing file** y arrastra **el contenido** de la carpeta (no la carpeta en sí), incluida la carpeta `fotos`. Pulsa **Commit changes**.
   - En Windows, `.nojekyll` puede no verse en el explorador; si no se sube, no pasa nada grave.
   - Con git: `git init`, `git add .`, `git commit -m "adviento"`, `git branch -M main`, `git remote add origin https://github.com/TU_USUARIO/diciembre.git`, `git push -u origin main`.
3. Ve a **Settings → Pages**. En *Build and deployment*, en Source elige **Deploy from a branch**, rama **main** y carpeta **/(root)**. Pulsa **Save**.
4. Espera 1 o 2 minutos y recarga. Arriba aparecerá la dirección: `https://TU_USUARIO.github.io/diciembre/`.

Cada vez que cambies algo (editando `contenido.js` desde la web de GitHub con el lápiz, o con `git push`), la web se actualiza sola en uno o dos minutos. En el móvil puede tardar hasta 10 minutos más por la caché; si no lo ves, recarga.

## Probarlo antes de diciembre

Añade esto al final de la dirección:

- `#ensayo`: todo abierto.
- `#hoy-7`: simula que es 7 de diciembre (sirve cualquier número del 1 al 25).
- `#normal`: vuelve a la fecha real.

El modo de prueba solo dura mientras esa pestaña esté abierta. Antes de mandarle el enlace, ábrelo tú sin nada al final para comprobar que está todo cerrado.

## Fotos y vídeos

- Reduce las fotos antes de subirlas: unos 1200 px de lado y menos de 400 KB. En squoosh.app se hace en un momento. Así cargan rápido con datos móviles.
- Los vídeos van mejor en YouTube como **Oculto** (no sale en búsquedas). En `contenido.js` pones solo el ID y se ve dentro de la página.
- Un vídeo corto en `.mp4` también puede ir en el repo (`archivo: "fotos/video.mp4"`), siempre que pese menos de 100 MB.

## Lo que conviene saber

- **El repo es público.** Cualquiera que lo encuentre puede leer `contenido.js` y ver las fotos. Si no quieres que sea así, hay dos opciones gratis: subir el repo como privado y publicarlo con Cloudflare Pages o Netlify (los dos conectan con GitHub en un par de clics), o pagar GitHub Pro.
- **El bloqueo es por fecha.** Quien sepa de esto podría adelantarse cambiando la fecha del móvil o leyendo el código. Para un regalo basta, pero si algún día es muy sorpresa, ponle un código que esté dentro de un sobre del paquete.
- Los sobres que ya ha abierto se recuerdan en su navegador. Si cambia de móvil o borra los datos, vuelven a salir cerrados con el punto de "nuevo", pero se pueden abrir igual.
