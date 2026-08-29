import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const sourceRoot = path.resolve('public/FOTOS FINALES BOOK');
const outputRoot = path.resolve('public/photo-book-final');

const folders = [
  ['BEBIDAS', 'bebidas'],
  ['SALADO', 'salado'],
  ['DULCE', 'dulce'],
  ['CON PRODUCTO', 'con-producto'],
  ['KIDS', 'kids'],
  ['TEMPORALIDADES', 'temporalidades'],
  ['CREATIVO', 'creativo'],
];

const supportedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.tif',
  '.tiff',
]);

await fs.rm(outputRoot, {
  recursive: true,
  force: true,
});

await fs.mkdir(outputRoot, {
  recursive: true,
});

const skipped = [];
const results = [];

for (const [sourceFolder, outputFolder] of folders) {
  const sourceDir = path.join(
    sourceRoot,
    sourceFolder
  );

  const outputDir = path.join(
    outputRoot,
    outputFolder
  );

  await fs.mkdir(outputDir, {
    recursive: true,
  });

  const entries = await fs.readdir(
    sourceDir,
    {
      withFileTypes: true,
    }
  );

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name !== '.DS_Store')
    .sort((a, b) =>
      a.localeCompare(
        b,
        undefined,
        {
          numeric: true,
          sensitivity: 'base',
        }
      )
    );

  let outputIndex = 1;

  for (const filename of files) {
    const extension =
      path.extname(filename).toLowerCase();

    const inputPath = path.join(
      sourceDir,
      filename
    );

    if (
      !supportedExtensions.has(extension)
    ) {
      skipped.push(
        `${sourceFolder}/${filename}`
      );
      continue;
    }

    const outputName =
      `${String(outputIndex).padStart(2, '0')}.webp`;

    const outputPath = path.join(
      outputDir,
      outputName
    );

    try {
      await sharp(inputPath)
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
        .toFile(outputPath);

      results.push({
        section: outputFolder,
        number: outputIndex,
        source: filename,
        output: outputName,
      });

      console.log(
        `✓ ${sourceFolder}/${filename} -> ${outputFolder}/${outputName}`
      );

      outputIndex += 1;
    } catch (error) {
      skipped.push(
        `${sourceFolder}/${filename} [ERROR: ${error.message}]`
      );
    }
  }
}

console.log('\n==============================');
console.log('OPTIMIZACIÓN TERMINADA');
console.log('==============================');

for (const [, outputFolder] of folders) {
  const count = results.filter(
    (item) =>
      item.section === outputFolder
  ).length;

  console.log(
    `${outputFolder}: ${count}`
  );
}

if (skipped.length) {
  console.log('\nARCHIVOS NO CONVERTIDOS:');

  for (const file of skipped) {
    console.log(`- ${file}`);
  }
}

await fs.writeFile(
  path.join(
    outputRoot,
    'manifest.json'
  ),
  JSON.stringify(
    results,
    null,
    2
  )
);

console.log(
  '\nManifest:',
  path.join(
    outputRoot,
    'manifest.json'
  )
);
