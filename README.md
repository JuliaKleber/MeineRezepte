# Meine Rezepte

This is a React application for managing and searching recipes.

## Features

- Add new recipes
- Search for recipes by keywords
- View selected recipes
- Update and delete recipes
- Display the recipes of the month, i.e. recipes where the ingredients are in season, on the home screen

## Built with

- React.js
- React Router
- Zustand
- Express.js
- MongoDB
- SCSS
- Docker

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/JuliaKleber/MeineRezepte.git
  ```

2. Navigate to the project directory:

  ```bash
  cd MeineRezepte
  ```

3. Build the Docker image:

  ```bash
  docker build -t meine-rezepte .
  ```

4. Run the Docker container:

  ```bash
docker-compose up
  ```

## Usage

To start the application, run:

  ```bash
  node backend/app.js
  ```

  ```bash
  npm start
  ```

The application will be available at http://localhost:3000.
The server will be available at http://localhost:3001.

## Screenshot

![image](https://github.com/JuliaKleber/MeineRezepte/assets/142741980/7c368824-64d8-4fd5-89e9-af8f6bf602dd)

## Author

[Julia Kleber](https://github.com/JuliaKleber)
