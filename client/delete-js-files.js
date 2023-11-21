import fs from 'fs';
import path from 'path';

function deleteJsFiles(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      deleteJsFiles(filePath); // Recursively process subdirectories
    } else {
      if (file.endsWith('.js') && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        console.log(`Deleting: ${filePath}`);
        fs.unlinkSync(filePath); // Delete the .js file
      }
    }
  });
}

const __filename = new URL(import.meta.url).pathname;
const projectRoot = path.dirname(__filename);
deleteJsFiles(projectRoot);
