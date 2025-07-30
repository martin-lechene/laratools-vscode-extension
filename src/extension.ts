import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let settings = {
  useSail: false,
  usePest: false,
  confirmBeforeCommand: true
};

// ---------- ACTIVATION ----------
export function activate(context: vscode.ExtensionContext) {
  const stored = context.globalState.get('laravelTools.settings');
  if (stored && typeof stored === 'object') Object.assign(settings, stored);

  context.subscriptions.push(
    vscode.commands.registerCommand('laravelTools.detect', () => detectLaravel(context)),
    vscode.commands.registerCommand('laravelTools.generateArtisan', () => generateArtisan(context)),
    vscode.commands.registerCommand('laravelTools.runArtisan', () => runArtisan(context)),
    vscode.commands.registerCommand('laravelTools.searchComponents', searchBladeComponents),
    vscode.commands.registerCommand('laravelTools.runTests', runTests),
    vscode.commands.registerCommand('laravelTools.config', () => openConfigWebview(context))
  );

  // Afficher un message si un projet Laravel est détecté
  if (detectLaravelRoot()) {
    vscode.window.showInformationMessage('Projet Laravel détecté! Utilisez les commandes Laravel Tools pour plus d\'options.');
  }
}

export function deactivate() {}

// ---------- CONFIGURATION WEBVIEW ----------
function openConfigWebview(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    'laravelToolsConfig', 'Laravel Tools: Configuration', vscode.ViewColumn.One, { enableScripts: true }
  );
  panel.webview.html = getConfigHtml(panel.webview);
  panel.webview.onDidReceiveMessage(msg => {
    if (msg.command === 'save') {
      settings = msg.settings;
      context.globalState.update('laravelTools.settings', settings);
      vscode.window.showInformationMessage('Configuration enregistrée !');
    }
  });
}
function getConfigHtml(webview: vscode.Webview): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; padding: 1rem; }
    label { display: block; margin: 0.5rem 0; }
    input[type=checkbox] { margin-right: 0.5rem; }
    button { margin-top: 1rem; padding: 0.5rem 1rem; background: #ff2d20; color: white; border: none; cursor: pointer; }
  </style>
</head>
<body>
  <h2>Configuration Laravel Tools</h2>
  <label><input type="checkbox" id="useSail"> Utiliser Sail</label>
  <label><input type="checkbox" id="usePest"> Utiliser Pest</label>
  <label><input type="checkbox" id="confirmBeforeCommand"> Confirmer avant exécution</label>
  <button onclick="save()">Enregistrer</button>
  <script>
    const vscode = acquireVsCodeApi();
    window.onload = () => {
      document.getElementById('useSail').checked = ${settings.useSail};
      document.getElementById('usePest').checked = ${settings.usePest};
      document.getElementById('confirmBeforeCommand').checked = ${settings.confirmBeforeCommand};
    };
    function save() {
      vscode.postMessage({
        command: 'save',
        settings: {
          useSail: document.getElementById('useSail').checked,
          usePest: document.getElementById('usePest').checked,
          confirmBeforeCommand: document.getElementById('confirmBeforeCommand').checked
        }
      });
    }
  </script>
</body>
</html>`;
}

// ---------- UTILS ----------
function existsSyncSafe(p: string): boolean {
  try { return fs.existsSync(p); } catch { return false; }
}
function detectLaravelRoot(): string | null {
  if (!vscode.workspace.workspaceFolders) return null;
  const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
  return existsSyncSafe(path.join(root, 'artisan')) ? root : null;
}
function confirm(msg: string): Thenable<boolean> {
  return vscode.window.showQuickPick(['Oui', 'Non'], { placeHolder: msg }).then(r => r === 'Oui');
}

// ---------- LARAVEL DETECTION ----------
async function detectLaravel(context: vscode.ExtensionContext) {
  const root = detectLaravelRoot();
  if (!root) return vscode.window.showErrorMessage('Aucun projet Laravel détecté');
  const version = await execArtisan(root, '--version');
  const features = [
    { name: 'Livewire', check: '/app/Http/Livewire' },
    { name: 'Jetstream', check: '/vendor/laravel/jetstream' },
    { name: 'Nova', check: '/vendor/laravel/nova' },
    { name: 'Filament', check: '/vendor/filament' },
    { name: 'Sail', check: 'docker-compose.yml' },
    { name: 'Pest', check: '/vendor/pestphp' }
  ].filter(f => existsSyncSafe(path.join(root, f.check)));
  vscode.window.showInformationMessage(`Laravel ${version.trim()}\n${features.map(f => f.name).join(', ')}`);
}

function execArtisan(cwd: string, args: string): Promise<string> {
  return new Promise((resolve) => {
    const term = vscode.window.createTerminal({ cwd });
    term.sendText(`${settings.useSail ? './vendor/bin/sail ' : 'php '}artisan ${args}`);
    resolve(args);
  });
}

// ---------- ARTISAN GENERATOR ----------
async function generateArtisan(context: vscode.ExtensionContext) {
  const types = ['model', 'controller', 'migration', 'seeder', 'factory', 'request', 'test'];
  const type = await vscode.window.showQuickPick(types, { placeHolder: 'Choisir un élément à générer' });
  if (!type) return;
  const name = await vscode.window.showInputBox({ prompt: `Nom du ${type}` });
  if (!name) return;
  const opts: string[] = [];
  if (type === 'model') {
    if (await confirm('Ajouter migration ?')) opts.push('--migration');
    if (await confirm('Ajouter factory ?')) opts.push('--factory');
    if (await confirm('Ajouter resource controller ?')) opts.push('--resource');
  }
  runArtisanCommand(`make:${type} ${name} ${opts.join(' ')}`);
}

function runArtisan(contextOrCmd?: any) {
  vscode.window.showInputBox({ prompt: 'Commande artisan (ex: migrate:fresh)' })
    .then(cmd => cmd && runArtisanCommand(cmd));
}

async function runArtisanCommand(cmd: string) {
  if (settings.confirmBeforeCommand && !(await confirm(`Exécuter "${cmd}" ?`))) return;
  const root = detectLaravelRoot();
  if (!root) return vscode.window.showErrorMessage('Projet Laravel introuvable');
  const term = vscode.window.createTerminal({ cwd: root });
  term.show();
  term.sendText(`${settings.useSail ? './vendor/bin/sail ' : 'php '}artisan ${cmd}`);
}

// ---------- BLADE COMPONENT SEARCH ----------
async function searchBladeComponents() {
  const root = detectLaravelRoot();
  if (!root) return;
  const results: string[] = [];
  const walk = (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (f.endsWith('.blade.php')) {
        const content = fs.readFileSync(full, 'utf8');
        if (content.match(/x-[\w\-]+|@livewire\([^)]*\)|wire:[a-z]+="/)) {
          results.push(full);
        }
      }
    }
  };
  walk(path.join(root, 'resources/views'));
  vscode.window.showQuickPick(results, { placeHolder: 'Composants Blade trouvés' })
    .then(file => file && vscode.window.showTextDocument(vscode.Uri.file(file)));
}

// ---------- RUN TESTS ----------
async function runTests() {
  const root = detectLaravelRoot();
  if (!root) return;
  const command = settings.usePest ? 'vendor/bin/pest' : 'vendor/bin/phpunit';
  const term = vscode.window.createTerminal({ cwd: root, name: 'Laravel Tests' });
  term.show();
  term.sendText(command);
}