const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

const resourcesDir = path.join(__dirname, 'resources');
const files = [
    'Haylide - Laundry Brochure.pdf',
    'Haylide Food Hygiene Brochure.pdf',
    'Haylide Hospital Brochure 2024.pdf'
];

async function extractText() {
    let output = '';
    for (const file of files) {
        const filePath = path.join(resourcesDir, file);
        if (fs.existsSync(filePath)) {
            const dataBuffer = fs.readFileSync(filePath);
            try {
                const data = await pdfParse(dataBuffer);
                output += `\n\n--- Content of ${file} ---\n\n`;
                output += data.text;
            } catch (err) {
                output += `\n\n--- Error reading ${file}: ${err.message} ---\n\n`;
            }
        } else {
            output += `\n\n--- File not found: ${file} ---\n\n`;
        }
    }
    fs.writeFileSync('extracted_texts.txt', output);
    console.log('Extraction complete.');
}

extractText();
