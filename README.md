# Amadeus Flight Search

Demonstration: https://youtu.be/anHYrm4Q6A4

Apps photos are located at the end.
### Setting Up and Running the Flight Search App

This guide provides instructions on how to set up and run the Flight Search App, a React-based application.

Before you begin, ensure that you have Node.js installed on your system:


Installation
Follow these steps to set up the application on your local machine:

1. Clone the Repository

2. Install Dependencies
Navigate to the project directory and install the required dependencies. Run the following commands in the order listed:

Install the basic npm packages:

    npm install

Install Material-UI, its icons, and Emotion (a styling library used by Material-UI):

      npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

Install React Router for handling routing:

    npm install react-router-dom

Install Axios for making HTTP requests:

    npm install axios

Install additional Material-UI icons:

    npm install @mui/icons-material

Install the Roboto font used with Material-UI:

    npm install @fontsource/roboto

Install the MUI date picker components and the date-fns library:

    npm install @mui/lab @date-io/date-fns date-fns
    npm install @mui/material @mui/x-date-pickers @date-io/date-fns
    npm install @mui/x-date-pickers
    npm install date-fns@latest

Install styled-components and the MUI styled engine:

    npm install @mui/styled-engine-sc styled-components
    npm install @mui/material @emotion/react @emotion/styled

Install Day.js, a lightweight date library:

    npm install dayjs


3. Run the Application
Start the application by running the following command:

        npm start
   
This will launch the app in your default web browser. By default, it should be accessible at http://localhost:3000.

Key Dependencies:

The application uses several key libraries and frameworks:

React: A JavaScript library for building user interfaces.

Material-UI (MUI): A React UI framework for implementing Google's Material Design.

dayjs: A lightweight JavaScript date library.

#### Application Structure

App.js: The main application component.

mock-data-script.py: The script I created to generate flight data consisting of airport codes, cities, departure and arrival dates and times, flight duration and price.

mockFlightsDatacopy.json: Mock data representing flight information.
<img width="1440" alt="Screenshot 2024-01-28 at 21 15 58" src="https://github.com/aoayhan/Flight_Search/assets/106978383/d8a63671-5473-4009-bb89-a51ff2307318">
<img width="1440" alt="Screenshot 2024-01-28 at 21 30 53" src="https://github.com/aoayhan/Flight_Search/assets/106978383/77b1aa57-a2f2-46f4-bd56-88ea3fceb356">

This guide should help you get the Flight Search App up and running on your local machine. For further assistance, refer to the React and Material-UI documentation.

To check for empty data case (when there are no flights available, you can search for flights from JFK to LAX on 23.02.2024
