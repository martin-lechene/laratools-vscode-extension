# Laravel Tools pour VS Code

<img width="669" height="242" alt="image" src="https://github.com/user-attachments/assets/d10c4715-2035-4724-866d-1f8c300d2a94" />


## Description

Laravel Tools est une extension VS Code qui facilite le développement d'applications Laravel. Elle offre des fonctionnalités pratiques pour travailler avec Artisan, rechercher des composants Blade, exécuter des tests et plus encore.

## Fonctionnalités

- **Détection automatique de projets Laravel** - L'extension détecte automatiquement si vous travaillez sur un projet Laravel
- **Commandes Artisan intégrées** - Exécutez des commandes Artisan directement depuis VS Code
- **Générateur de code** - Générez rapidement des modèles, contrôleurs, migrations, etc.
- **Recherche de composants Blade** - Trouvez facilement les composants Blade dans votre projet
- **Exécution de tests** - Lancez vos tests PHPUnit ou Pest directement depuis VS Code
- **Configuration personnalisable** - Configurez l'extension selon vos préférences

## Installation

1. Ouvrez VS Code
2. Allez dans l'onglet Extensions (Ctrl+Shift+X)
3. Recherchez "Laravel Tools"
4. Cliquez sur Installer

## Utilisation

### Commandes disponibles

Toutes les commandes sont accessibles via la palette de commandes (Ctrl+Shift+P) :

- `Laravel Tools: Détecter le projet` - Détecte et affiche les informations sur le projet Laravel actuel
- `Laravel Tools: Générer avec Artisan` - Ouvre un assistant pour générer du code avec Artisan
- `Laravel Tools: Exécuter une commande Artisan` - Exécute une commande Artisan personnalisée
- `Laravel Tools: Rechercher des composants Blade` - Recherche des composants Blade dans le projet
- `Laravel Tools: Exécuter les tests` - Lance les tests du projet
- `Laravel Tools: Configuration` - Ouvre le panneau de configuration de l'extension

### Configuration

Vous pouvez configurer l'extension via la commande `Laravel Tools: Configuration` qui ouvre un panneau de configuration avec les options suivantes :

- **Utiliser Sail** - Exécute les commandes Artisan via Laravel Sail
- **Utiliser Pest** - Utilise Pest au lieu de PHPUnit pour les tests
- **Confirmer avant exécution** - Demande confirmation avant d'exécuter les commandes Artisan

## Développement

### Prérequis

- Node.js
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

### Compilation

```bash
npm run compile
```

### Empaquetage

```bash
npm run package
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Poussez vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Roadmap

Consultez le fichier [TODO.md](TODO.md) pour voir les fonctionnalités prévues.
