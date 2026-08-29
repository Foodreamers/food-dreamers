import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = '/Users/juanagiron/emirstudio';
const SRC = path.join(ROOT, 'public', 'BOOK ESPACIO');
const OUT = path.join(ROOT, 'public', 'our-space');

const jobs = [];

function add(input, output) {
  jobs.push({
    input: path.join(SRC, input),
    output: path.join(OUT, output),
  });
}

/* =========================================================
   HERO
========================================================= */

add(
  'PORTADAS/COLORES.JPG',
  'hero/hero.webp'
);

/* =========================================================
   PHOTO SET
========================================================= */

add(
  'SET DE FOTO/3Sets.2.jpg',
  'photo-set/01.webp'
);

add(
  'SET DE FOTO/Cuarto foto.jpg',
  'photo-set/02.webp'
);

/*
  Buscamos automáticamente el PNG
  porque su nombre contiene un espacio Unicode especial.
*/

const photoSetFolder = path.join(
  SRC,
  'SET DE FOTO'
);

const photoSetPng = fs
  .readdirSync(photoSetFolder)
  .find(
    (file) =>
      file.toLowerCase().endsWith('.png') &&
      file.startsWith('Imagen')
  );

if (!photoSetPng) {
  throw new Error(
    'No encontré la tercera imagen PNG de SET DE FOTO'
  );
}

jobs.push({
  input: path.join(
    photoSetFolder,
    photoSetPng
  ),
  output: path.join(
    OUT,
    'photo-set/03.webp'
  ),
});

/* =========================================================
   CLIENT ROOM
========================================================= */

add(
  'SALA CLIENTE/Sala cliente 2.jpg',
  'client-room/01.webp'
);

/* =========================================================
   DYNAMIC SPACE
========================================================= */

add(
  'CUARTO MODULAR/Cuarto foto vacio.jpg',
  'dynamic-space/01.webp'
);

add(
  'CUARTO MODULAR/Cuarto foto.jpg',
  'dynamic-space/02.webp'
);

add(
  'CUARTO MODULAR/Camerino.jpg',
  'dynamic-space/03.webp'
);

/* =========================================================
   PRODUCTION KITCHEN
========================================================= */

add(
  'COCINA PRODUCCION/01_Cocina.Platos.jpg',
  'production-kitchen/01.webp'
);

add(
  'COCINA PRODUCCION/04_Cocina.Platos.jpg',
  'production-kitchen/02.webp'
);

add(
  'COCINA PRODUCCION/07_Cocina.Platos.jpg',
  'production-kitchen/03.webp'
);

/* =========================================================
   DARK KITCHEN
========================================================= */

add(
  'COCINA NEGRA/COCINA NEGRA .jpg',
  'dark-kitchen/01.webp'
);

add(
  'COCINA NEGRA/COCINA NEGRA 2.jpg',
  'dark-kitchen/02.webp'
);

add(
  'COCINA NEGRA/COCINA NEGRA 3.jpg',
  'dark-kitchen/03.webp'
);

/* =========================================================
   MODULAR KITCHEN
========================================================= */

add(
  'SET MODULAR/Cocina 1.jpg',
  'modular-kitchen/01.webp'
);

add(
  'SET MODULAR/Cocina 2.jpg',
  'modular-kitchen/02.webp'
);

add(
  'SET MODULAR/Cocina 3 .jpg',
  'modular-kitchen/03.webp'
);

add(
  'SET MODULAR/Cocina 4.jpg',
  'modular-kitchen/04.webp'
);

add(
  'SET MODULAR/Cocina 5.jpg',
  'modular-kitchen/05.webp'
);

add(
  'SET MODULAR/Cocina 6.jpg',
  'modular-kitchen/06.webp'
);

add(
  'SET MODULAR/paneles.jpg',
  'modular-kitchen/07.webp'
);

/* =========================================================
   WHITE KITCHEN
========================================================= */

add(
  'COCINA BLANCA/COCINA BLANCA.jpg',
  'white-kitchen/01.webp'
);

add(
  'COCINA BLANCA/COCINA BLANCA 2.jpg',
  'white-kitchen/02.webp'
);

add(
  'COCINA BLANCA/Copia de COCINA BLANCA.jpg',
  'white-kitchen/03.webp'
);

/* =========================================================
   RUSTIC KITCHEN
========================================================= */

add(
  'TERRAZA/Terraza 3.jpg',
  'rustic-kitchen/01.webp'
);

add(
  'TERRAZA/Terraza 4.jpg',
  'rustic-kitchen/02.webp'
);

/* =========================================================
   OUTDOOR KITCHEN
========================================================= */

add(
  'COCINA EXTERIOR/COCINA EXTERIOR.jpg',
  'outdoor-kitchen/01.webp'
);

add(
  'COCINA EXTERIOR/Terraza 1.jpg',
  'outdoor-kitchen/02.webp'
);

add(
  'COCINA EXTERIOR/Terraza 2.jpg',
  'outdoor-kitchen/03.webp'
);

/* =========================================================
   PROP HOUSE
========================================================= */

add(
  'PROP HOUSE/Cuarto de props.jpg',
  'prop-house/01.webp'
);

add(
  'PROP HOUSE/BLANCOS (1).JPG',
  'prop-house/02.webp'
);

add(
  'PROP HOUSE/COLORES.JPG',
  'prop-house/03.webp'
);

/*
  También optimizamos el TIFF aunque todavía
  no esté siendo utilizado en el page.tsx.
*/

add(
  'PROP HOUSE/Trapos Final_.Crop.012High.tiff',
  'prop-house/04.webp'
);

/* =========================================================
   MOBILE KITCHEN
========================================================= */

add(
  'VAN /IMG_4675.JPG',
  'mobile-kitchen/01.webp'
);

add(
  'VAN /IMG_4683.JPG',
  'mobile-kitchen/02.webp'
);

add(
  'VAN /IMG_4693.JPG',
  'mobile-kitchen/03.webp'
);

/* =========================================================
   CONVERSION
========================================================= */

async function run() {
  console.log('');
  console.log('FOOD DREAMERS — OUR SPACE');
  console.log('Optimizando imágenes...');
  console.log('');

  let originalBytes = 0;
  let optimizedBytes = 0;

  for (let i = 0; i < jobs.length; i++) {
    const { input, output } = jobs[i];

    if (!fs.existsSync(input)) {
      console.error(`FALTA: ${input}`);
      continue;
    }

    fs.mkdirSync(
      path.dirname(output),
      { recursive: true }
    );

    const originalSize =
      fs.statSync(input).size;

    originalBytes += originalSize;

    console.log(
      `[${String(i + 1).padStart(2, '0')}/${jobs.length}] ${path.basename(input)}`
    );

    await sharp(input)
      .rotate()
      .resize({
        width: 2400,
        height: 2400,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(output);

    const optimizedSize =
      fs.statSync(output).size;

    optimizedBytes += optimizedSize;

    const reduction =
      100 -
      (optimizedSize / originalSize) * 100;

    console.log(
      `   ${(originalSize / 1024 / 1024).toFixed(1)} MB → ${(optimizedSize / 1024 / 1024).toFixed(2)} MB  (${reduction.toFixed(0)}% menos)`
    );
  }

  console.log('');
  console.log('==============================');
  console.log('OPTIMIZACION TERMINADA');
  console.log('==============================');

  console.log(
    `Usados originales: ${(originalBytes / 1024 / 1024).toFixed(1)} MB`
  );

  console.log(
    `WebP optimizados: ${(optimizedBytes / 1024 / 1024).toFixed(1)} MB`
  );

  console.log(
    `Reducción total: ${(
      100 -
      (optimizedBytes / originalBytes) * 100
    ).toFixed(1)}%`
  );
}

run().catch((error) => {
  console.error('');
  console.error('ERROR:');
  console.error(error);
  process.exit(1);
});
