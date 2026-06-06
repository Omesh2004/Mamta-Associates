import os
import fitz  # PyMuPDF

files = [
    'resources/Haylide - Laundry Brochure.pdf',
    'resources/Haylide Food Hygiene Brochure.pdf',
    'resources/Haylide Hospital Brochure 2024.pdf'
]

with open('extracted_texts.txt', 'w', encoding='utf-8') as f:
    for file in files:
        f.write(f"\n\n--- Content of {file} ---\n\n")
        try:
            doc = fitz.open(file)
            for page in doc:
                f.write(page.get_text())
        except Exception as e:
            f.write(f"\n\n--- Error: {e} ---\n\n")
