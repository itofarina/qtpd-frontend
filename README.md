# ¿Qué tenés para dar? - Frontend

### Introduction
This is an Angular 8 project to consume a RESTful API (https://github.com/farinalvaro/qtpd-api) and show where the users can bring their donations based on what they have to donate and where they are.

### Installation

- To install this run:
    ```
    npm install
    ```

### Environment configurations
In order to run the app. You need to provide the following variables for the project:

- APIEndpoint - where the API is running
- googleMapsApiKey - the api key for google maps
- production - true or false depending on the environment you want to run

### Usage
- To start the project, run:
    ```
    npm start
    ```

### Development

- To run the project in development mode, run:
    ```
    ng serve -o
    ```

### Docker
A Dockerfile is provided in order to create your own image. Note that you will need to provide the environment variables for the docker image.

## Authors
Martin Manzo & Alvaro Farina
