import * as path from 'path';
import { runTests } from '@vscode/test-electron';

async function main() {
  try {
    // Le dossier racine de l'extension
    const extensionDevelopmentPath = path.resolve(__dirname, '../../');

    // Le dossier contenant les tests
    const extensionTestsPath = path.resolve(__dirname, './suite/index');

    // Télécharge VS Code, l'installe, puis exécute les tests
    await runTests({ extensionDevelopmentPath, extensionTestsPath });
  } catch (err) {
    console.error('Échec des tests', err);
    process.exit(1);
  }
}

main();