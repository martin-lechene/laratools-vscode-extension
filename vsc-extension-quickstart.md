# Guide de démarrage rapide

## Structure du projet

* `package.json` - Manifeste de l'extension
* `tsconfig.json` - Configuration TypeScript
* `webpack.config.js` - Configuration Webpack
* `src/extension.ts` - Point d'entrée de l'extension
* `src/test` - Dossier contenant les tests

## Mise en place

* Installez les dépendances : `npm install`
* Compilez l'extension : `npm run compile`
* Appuyez sur `F5` pour ouvrir une nouvelle fenêtre avec votre extension chargée
* Définissez des points d'arrêt dans votre code pour déboguer votre extension
* Trouvez la sortie de votre extension dans le panneau de débogage

## Apporter des modifications

* Vous pouvez recharger la fenêtre VS Code (`Ctrl+R` ou `Cmd+R` sur Mac) pour charger vos modifications
* Lorsque vous modifiez le code dans `src/extension.ts`, vous pouvez exécuter la commande `Developer: Reload Window` depuis la palette de commandes (`Ctrl+Shift+P`)

## Exécuter les tests

* Ouvrez le fichier de test dans VS Code
* Appuyez sur `F5` pour exécuter les tests en mode débogage
* Les tests sont également exécutés automatiquement lors de l'exécution de `npm test`

## Empaqueter l'extension

* Exécutez `npm run package` pour créer un fichier VSIX
* Vous pouvez installer ce fichier VSIX dans VS Code en utilisant la commande `Extensions: Install from VSIX...`

## Publier l'extension

* Créez un compte sur https://marketplace.visualstudio.com/
* Exécutez `vsce publish` pour publier (ou `vsce package` pour créer un fichier VSIX sans publier)
* Plus d'informations sur la publication : https://code.visualstudio.com/api/working-with-extensions/publishing-extension