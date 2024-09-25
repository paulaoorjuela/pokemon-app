# Pokémon Pokedex App

## Overview

The Pokémon Search App is a React application that allows users to search for Pokémon dynamically as they type in a search bar. Utilizing GraphQL, the app fetches Pokémon data and displays matching results based on user input, featuring pagination for easy navigation.

## Features

- **Search**: The app displays the Pokémon with the name that matches the input text.
- **Favorites**: Users can save their favorite Pokémon to a favorites list, stored in sessionStorage.
- **Pagination**: Navigate through Pokémon with next and previous buttons.
- **Detailed View**: Click on a Pokémon to view detailed information on a separate page.
- **Custom Alerts**: Alerts appear for user feedback, such as search results or errors.


## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Apollo Client**: State management library for managing data with GraphQL.
- **GraphQL**: A query language for APIs to fetch data.
- **React Router**: For handling routing in the application.
- **CSS**: For styling the application.

## Installation

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Steps to Install

1. **Clone the repository**:

   ```bash
   git clone https://github.com/paulaoorjuela/pokemon-app.git

2. **Navigate to the project directory:**:

   ```bash
   cd pokemon-app

3. **Install dependencies:**:

   ```bash
   npm install

4. **Run the application:**:

   ```bash
   npm run dev

### Usage

- Type in the search bar to see Pokémon that match your input, search by name or number.
- Use the "Previous" and "Next" buttons to navigate through the Pokémon list.
- Click on a Pokémon to view more details.

### Project Structure

    ```bash
/pokemon-search-app
├── /public
│   └── PokeballIcon.svg
├── /src
│   ├── /assets
│   │   ├── /images
│   │ 
│   ├── /components
│   │   ├── Alert.jsx
│   │   ├── Navbar.jsx
│   │   ├── PokemonList.jsx
│   │   ├── SearchInput.jsx
│   │ 
│   ├── /pages
│   │   ├── Favorites.jsx
│   │   ├── PokemonDetail.jsx
│   │
│   ├── apolloClient.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── styles.css
│ 
├── index.html
├── package.json
└── README.md


### Future Improvements

- Implement user authentication to save favorites on the server.
- Add more filtering options (e.g., by type).
- Improve error handling and loading states.

### Contributing
Contributions are welcome! If you have suggestions or improvements, please open an issue or submit a pull request.
