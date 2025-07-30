import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Démarrage des tests de Laravel Tools.');

  test('Extension est chargée', () => {
    const extension = vscode.extensions.getExtension('laratools');
    assert.ok(extension);
  });

  test('Les commandes sont enregistrées', async () => {
    const commands = await vscode.commands.getCommands();
    assert.ok(commands.includes('laravelTools.detect'));
    assert.ok(commands.includes('laravelTools.generateArtisan'));
    assert.ok(commands.includes('laravelTools.runArtisan'));
    assert.ok(commands.includes('laravelTools.searchComponents'));
    assert.ok(commands.includes('laravelTools.runTests'));
    assert.ok(commands.includes('laravelTools.config'));
  });
});