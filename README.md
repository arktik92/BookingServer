# Booking Server

Server destiner à gérer la partie back-end de l'application BookingApp

## Start

Ces instructions vous permettront d'obtenir une copie du projet en cours d'exécution sur votre machine locale à des fins de développement et de test.

### Prérequis

Ce dont vous avez besoin pour installer le logiciel et comment l'installer.
- npm
- nodeJS

### Installation

Clonner le projet et installer les dépendances
```bash
git clone https://github.com/arktik92/BookingServer.git
cd BookingServer
npm install
```
Créer le fichiers .env
```bash
touch .env
```


Ajouter les configurations du fichier .env

```bash
echo -e "PORT=your_port
DB_HOST=your_host
DB_USER=your_user
DB_PASS=your_password
SECRET_KEY=your_secret_key
DB_NAME_DEV=database_development
DB_NAME_TEST=database_test
DB_NAME_PROD=database_production" > ".env"

```

Créer la DB avec sequelize-cli, migrer les modèles et les seeds
```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Utilisation 

Lancer le server
```bash
npm run start
```
