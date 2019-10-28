import process from 'process';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { exec } from 'child_process';

const [_, __, sourcePath] = process.argv;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (!sourcePath) {
    console.error('Brak folderu ze zdjeciami!');
    process.exit(-9);
}

console.log('Przerabiamy...');
const files = fs.readdirSync(sourcePath).filter((fileName) => fileName.includes('.jpg')).filter(Boolean);

files.forEach((fileName) => {
    const smallSizeName = fileName.replace(/\s+/gm, '').replace(',', '');
    const source = sourcePath + fileName;
    const dest = __dirname + "/images/thumbnails/" + smallSizeName;

    exec(`convert "${source}" -resize 880x660 "${dest}"`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
});
