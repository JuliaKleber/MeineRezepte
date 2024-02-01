# Meine Rezepte

This is a React application for managing and searching recipes.

Since this app is intended for my personal use only, user authentication has been omitted for simplicity. Instead of using a regular database, I store the recipes in a simple JSON file. This means the recipes don't have unique IDs.

## Features

- Add new recipes
- Search for recipes by keywords
- View selected recipes
- Update and delete recipes
- Upon login, the recipes of the month, i.e. recipes where the ingredients are in season, are shown

## Built with

- React.js
- React Router
- Zustand
- Express.js
- SCSS

## Installation

1. Clone the repository:

  ```bash
  git clone https://github.com/JuliaKleber/MeineRezepte.git
  ```

2. Navigate to the project directory:

  ```bash
  cd MeineRezepte
  ```

3. Install the dependencies:

  ```bash
  npm install
  ```

## Usage

To start the application, run:

  ```bash
  node backend/server.js
  ```

  ```bash
  npm start
  ```

The application will be available at http://localhost:3000.

## Screenshot

![image](https://github.com/JuliaKleber/MeineRezepte/assets/142741980/7c368824-64d8-4fd5-89e9-af8f6bf602dd)

## Author

[Julia Kleber](https://github.com/JuliaKleber)
