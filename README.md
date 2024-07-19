# ProShop

## Overview

**ProShop** is an eCommerce application built using the MERN stack (MongoDB, Express, React, Node.js). The application provides a robust platform for managing products, users, and orders, complete with authentication and authorization features.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Author](#author)
- [License](#license)

## Installation

To get started with the ProShop application, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/h3nrzi/proshop.git
   cd proshop
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   npm install --prefix frontend
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `root` directory and configure your environment variables as required

5. **Run the application in development mode:**
   ```bash
   npm run start:dev
   ```

## Usage

### Importing Data

To import data into the database, run:

```bash
npm run data:import
```

### Destroying Data

To destroy data from the database, run:

```bash
npm run data:destroy
```

## Scripts

- **`data:import`**: Imports data into the database using the seeder script.
- **`data:destroy`**: Destroys data from the database using the seeder script.
- **`server`**: Starts the backend server with nodemon for development.
- **`client`**: Starts the frontend development server.
- **`start:dev`**: Runs both the backend and frontend development servers concurrently.
- **`build`**: Builds the backend and frontend for production.
- **`start`**: Starts the backend server in production.

## Dependencies

### Frontend

- `@paypal/react-paypal-js`: ^8.5.0
- `@reduxjs/toolkit`: ^1.9.3
- `axios`: ^1.3.5
- `bootstrap`: ^5.2.3
- `moment`: ^2.30.1
- `react`: ^18.3.1
- `react-bootstrap`: ^2.7.2
- `react-dom`: ^18.3.1
- `react-helmet-async`: ^2.0.5
- `react-icons`: ^4.8.0
- `react-redux`: ^8.0.5
- `react-router-dom`: ^6.10.0
- `react-toastify`: ^10.0.5

### Backend

- `bcryptjs`: ^2.4.3
- `colors`: ^1.4.0
- `cookie-parser`: ^1.4.6
- `express`: ^4.19.2
- `jsonwebtoken`: ^9.0.2
- `lodash`: ^4.17.21
- `mongoose`: ^7.0.1
- `morgan`: ^1.9.0
- `multer`: ^1.4.5-lts.1
- `react-hook-form`: ^7.52.0

## Author

**Hossein Rezaei**

## License

This project is licensed under the ISC License.
