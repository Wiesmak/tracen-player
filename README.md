![Image](https://static.wikia.nocookie.net/umamusume/images/5/56/TazunaHayakawaStand.png/revision/latest?cb=20220502231449)

# Tracen Player
Umamusume kiosk quiz player built with Next.js and Redux Toolkit. Designed to work fully offline.
## Requirements
- [Bun](https://bun.sh/) (for dependency management and running scripts)
- Node.js (v20+)
## Installation
Install dependencies using Bun:
`
bun install
`
## Running the Project
First, generate data jsons:
`
bun run generate-data
`

To start the development server:
`
bun run dev
`

To build the project for production:
`
bun run build
`

To start the production server:
`
bun run serve
`
or run with any web server of your choice, serving the contents of the out/ directory

## Editing Data JSONs
The quiz data is primarily managed via JSON files in the data-entry/ directory.
1. **Create or edit files** in the data-entry/ folder. These files should follow the structure defined in the JSON schemas within the schema/ directory (specifically schema/data-entry.schema.json).
2. A typical data entry file defines a quiz, along with its associated questions, and answers.
3. After making any changes to the files in data-entry/, you must **generate the public data assets** by transpiling them:
`
bun run generate-data
`
*(or 
pm run generate-data)*
This script (scripts/transpile.mjs) will parse all JSON files in the data-entry/ directory and compile them into quizzes.json, questions.json, and answers.json inside the public/data/ folder. These generated files are then consumed by the frontend application to display the quizzes.
