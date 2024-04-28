# CinePro

A movie reservation app made with Spring, Bootstrap and Angular.

# Allo_Deneigement

A full stack website with MVC architechture made with Spring, Bootstrap and Angular, with a MySQL database.

![image](screenshots/accueil.png)

## Table of contents

- [CinePro](#cinepro)
- [Allo\_Deneigement](#allo_deneigement)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The project](#the-project)
      - [Screenshots](#screenshots)
    - [Technical Stack](#technical-stack)
    - [Local installation](#local-installation)
  - [Future plans](#future-plans)
  - [Acknowledgments](#acknowledgments)
  - [Contributors](#contributors)
- [FrontCinepro](#frontcinepro)
  - [Development server](#development-server)
  - [Code scaffolding](#code-scaffolding)
  - [Build](#build)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)

About OpenApi and project generation:

(.....)

## Overview

### The project

Allo_Deneigement is a full-stack website platform that aims to allow snow removal suppliers to communicate with potential clients. Four types of users can access the website: suppliers offering, clients searching, admins, and unlogged visitors. With a session created at first with the persisting information of the logged user and specific controllers, each profile can be directed to specific pages. Basic CRUD operators are enabled for each profiles, depending on authorization and identification.

#### Screenshots

Login page:

![image](https://github.com/Emimint/Allo_Deneigement/assets/90863470/ca353c1e-39e4-47ef-8d22-0b53a015655a)

Supplier list:

![image](https://github.com/Emimint/Allo_Deneigement/assets/90863470/43a550c5-a72a-4200-ae13-b0145e4797aa)

Client dashboard:

![image](https://github.com/Emimint/Allo_Deneigement/assets/90863470/bcbb35ac-96b0-482e-8607-aafae1ee06d7)

### Technical Stack

Built With

- Frontend
  - JavaScript,
  - Bootstrap 5
- Backend
  - PHP
- DB
  - MariaDB
- Geolocation
  - Geoapify
  - [Leaflet](https://leafletjs.com/)

### Local installation

1. To run the application locally, it is required to first download the project to your preferred web server (we used Apache [XAMPP](https://www.apachefriends.org/fr/download.html)). With XAMPP, install the app folder in the `htdocs` folder. Once you turn on Apache and MariaDB/MySQL, and set your database credentials (see next step below), the app should be served at `http://localhost/Allo_Deneigement/`.

2. In your preferred SQL database manager, load the database stored in the `database/deneigement_db.sql` file. A database called `deneigement_db` will be created.

3. To link the database to the app, you will need to configure your own `configBD.interface.php` file. It needs to be stored in `models/DAO/configs` (the `configs` folder needs to be manually created inside `models/DAO`). Here is the template of the file:

```
<?php

// Don't stage this file, update it with your own credentials

interface ConfigBD
{
	const BD_HOTE = "localhost";
	const BD_UTILISATEUR = "your_database_username";
	const BD_MOT_PASSE = "your_database_password";
	const BD_NOM = "deneigement_db";
}

```

4. You will need to provide your own credentials for the [Geoapify](https://www.geoapify.com/) key used to create new addresses. For that, create a `.env` file at the root of the project:

```
GEO_API_KEY = your-own-geoapify-key

```

With that, you are all set! Run your web server as you need to. `index.php` contains the main controller of the app.

## Future plans

- Improve UI (pagination, search bar, etc)
- Live deployment
- Add an english translation of the app
- Add admin profile
- Add more secure authentification (hash, salt for passwords)

## Acknowledgments

- Original project idea by Amine Fahmi

## Contributors

- Doupamby-Matoka Diboty-Tity
- [Cylia Oudiai](https://www.linkedin.com/in/cylia-oudiai-81b7891a0/)
- [Emilie Echevin](https://www.linkedin.com/in/emilie-echevin/)

-----------------------------------------------


# FrontCinepro

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
