# Weather Dashboard

![Weather Dashboard](https://via.placeholder.com/800x200?text=Weather+Dashboard)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the **Weather Dashboard**! This React application provides real-time weather information, forecasts, and historical data for any city worldwide. With a modern and responsive design powered by Material-UI, users can easily search for cities, view detailed weather metrics, manage favorite locations, and visualize data through interactive charts and maps.

## Features

- **Real-Time Weather Data**: Displays current weather conditions, including temperature, humidity, pressure, and wind details.
- **5-Day Forecast**: Provides a 5-day weather forecast with average temperatures and descriptions.
- **Historical Data**: Shows historical weather data for the past five days.
- **Unit Toggle**: Allows users to switch between Celsius and Fahrenheit.
- **Favorite Cities**: Users can save and manage a list of favorite cities for quick access.
- **Geolocation Integration**: Automatically detects and displays weather information based on the user's current location.
- **Interactive Maps**: Visualizes the location of selected cities on a map.
- **Responsive Design**: Ensures a seamless experience across various devices and screen sizes.
- **Animations and Transitions**: Enhances user experience with smooth animations using Framer Motion.
- **Data Visualization**: Utilizes Recharts to display temperature trends in an interactive line chart.

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Redux**: State management library.
- **Redux Thunk**: Middleware for handling asynchronous actions in Redux.
- **Material-UI (MUI)**: UI framework for React to implement Material Design components.
- **Framer Motion**: Library for animations in React.
- **Recharts**: Library for building charts in React.
- **React-Leaflet & Leaflet**: Libraries for integrating interactive maps.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Icons**: Library for including popular icons in React projects.

## Installation

Follow these steps to set up and run the Weather Dashboard on your local machine.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **Yarn**

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/weather-dashboard.git
   cd weather-dashboard
2. **Install Dependencies**

Ensure that you have resolved any dependency conflicts as previously guided. Then, install the necessary packages:

Note: If you encounter dependency issues, refer to the troubleshooting steps provided earlier.

3. **Configure Environment Variables**

Create a .env file in the root directory and add your OpenWeatherMap API key:

env
REACT_APP_OPENWEATHERMAP_API_KEY=your_api_key_here
Replace your_api_key_here with your actual API key from OpenWeatherMap.

4. **Start the Development Server**

bash
npm start
The application will run on http://localhost:3000.

## Usage
1. **Search for a City**

Use the search bar to enter the name of any city.
Click the "Search" button or press Enter to fetch and display the weather data.

2. **Toggle Temperature Units**

Use the toggle buttons to switch between Celsius (°C) and Fahrenheit (°F).
The displayed temperatures will update accordingly.

3. **Manage Favorite Cities**

Click the heart icon next to the search bar to add the currently searched city to your favorites.
View and manage your favorite cities in the "Ciudades Favoritas" section.
Click on a favorite city to quickly fetch its weather data.

4. **View Weather Details**

Current Weather: Displays real-time weather information for the selected city.
5-Day Forecast: Navigate to the "Pronóstico" tab to view the weather forecast.
Historical Data: Navigate to the "Histórico" tab to view historical weather data.

5. **Interactive Maps and Charts**

The current weather section includes a map showing the location of the city.
The forecast tab features an interactive line chart visualizing temperature trends.


## Description
actions/: Contains Redux action creators for fetching weather data, managing units, and handling favorites.

components/: Houses all React components used in the application.
CurrentWeather.js: Displays current weather information.

ForecastChart.js: Renders the temperature trend chart.

ForecastTab.js: Shows the 5-day weather forecast.

Favorites.js: Manages and displays favorite cities.

Map.js: Integrates an interactive map showing the city's location.

SearchBar.js: Provides the search functionality for cities.

UnitToggle.js: Allows users to switch between Celsius and Fahrenheit.

HistoricalTab.js: Displays historical weather data.

reducers/: Contains Redux reducers to manage state changes based on actions.

store/: Configures the Redux store with middleware.

theme.js: Defines the Material-UI theme for consistent styling across components.

App.js: The main application component that orchestrates all other components.

index.js: The entry point of the React application, rendering the App component within the Redux Provider and Material-UI ThemeProvider.

styles/: Contains CSS files for additional styling if necessary.
Available Scripts

In the project directory, you can run:

npm start
Runs the app in the development mode.<br> Open http://localhost:3000 to view it in your browser.

The page will reload if you make edits.<br> You will also see any lint errors in the console.

npm run build
Builds the app for production to the build folder.<br> It correctly bundles React in production mode and optimizes the build for the best performance.

npm test
Launches the test runner in the interactive watch mode.<br> See the section about running tests for more information.

npm run eject
Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Contributing
Contributions are welcome! If you have suggestions or find any issues, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Happy Coding! 🚀