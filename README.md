# Meine Rezepte

This is a React application for managing and searching recipes.

Since this app is intended for my personal use only, user authentication has been omitted for simplicity. Instead of using a regular database, I store the recipes in a simple JSON file. As a result, the recipes don't have unique IDs. Given that recipes lack IDs, the recipe name serves as the unique identifier. A check for name uniqueness is implemented when adding a new recipe. The requirement for unique names shouldn't be an issue since the app is designed for a single user.

## Features

- Add new recipes
- Search for recipes by keywords
- View selected recipes
- Update and delete recipes
- Show the recipes of the month, i.e. recipes where the ingredients are in season, on the home screen

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
