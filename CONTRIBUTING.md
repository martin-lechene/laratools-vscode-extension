# Guide de contribution

Merci de votre intérêt pour contribuer à Laravel Tools ! Ce document fournit des lignes directrices pour contribuer au projet.

## Comment contribuer

### Signaler des bugs

Si vous trouvez un bug, veuillez créer une issue en incluant :

- Une description claire du problème
- Les étapes pour reproduire le bug
- Le comportement attendu vs. le comportement observé
- Des captures d'écran si applicable
- Votre environnement (OS, version de VS Code, version de PHP, version de Laravel)

### Proposer des améliorations

Pour proposer une nouvelle fonctionnalité :

1. Créez une issue décrivant la fonctionnalité
2. Expliquez pourquoi cette fonctionnalité serait utile
3. Discutez de l'implémentation potentielle

### Pull Requests

1. Forkez le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Style de code

- Suivez les conventions TypeScript
- Utilisez ESLint pour vérifier votre code
- Écrivez des commentaires clairs pour les fonctions complexes
- Ajoutez des tests pour les nouvelles fonctionnalités

## Processus de développement

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/laratools-extension-vscode.git
cd laratools-extension-vscode

# Installer les dépendances
npm install
```

### Compilation

```bash
# Compiler en mode développement
npm run compile

# Compiler en mode watch
npm run watch
```

### Tests

```bash
# Exécuter les tests
npm test
```

### Débogage

Vous pouvez déboguer l'extension en appuyant sur F5 dans VS Code, ce qui lancera une nouvelle fenêtre VS Code avec l'extension chargée.

## Structure du projet

- `src/extension.ts` - Point d'entrée de l'extension
- `src/test` - Tests unitaires
- `.vscode` - Configuration VS Code pour le développement

## Versionnement

Nous utilisons [SemVer](http://semver.org/) pour le versionnement.

## Licence

En contribuant à ce projet, vous acceptez que vos contributions soient sous licence MIT.