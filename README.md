# Yacht Selling Platform
Description:

Yacht Selling Platform is a web application developed for buying and selling yachts. The platform provides a user-friendly interface built with React for the frontend, Node.js Express for the backend, and MySQL for database management. It incorporates TypeScript for improved code maintainability and reliability.

Users can seamlessly log in using their wallets, making the platform secure and convenient for yacht enthusiasts and buyers.

## Table of Contents
    Installation
    Usage
    Features
    Tech Stack
    Contributing
    License

## Installation

Follow these steps to set up the Yacht Selling Platform on your local machine:

Clone the repository:

    git clone https://github.com/bullpull02/smartket.git
    cd smartket
Install dependencies:
#### For frontend
    cd smartket-frontend
    npm install

#### For backend
    cd smartket-backend
    npm install
#### Set up the MySQL database:

    Create a MySQL database.
    Update the database configuration in backend/src/config/database.ts with your database details.
### Run the application:
#### For frontend
    cd smartket-frontend
    npm start

#### For backend
    cd smartket-backend
    npm run dev
    
Visit http://localhost:3000 in your browser to access the Yacht Selling Platform.

## Usage
You should have web3 wallet to login, register, update your information and sell, buy yatchs through this platform

## Features
User Authentication: Users can securely log in using their wallets.

Yacht Listings: Browse and search through a variety of yacht listings.

Buy and Sell: Facilitates buying and selling transactions between users.

## Tech Stack
    Frontend: React, Redux, TypeScript, MUI
    Backend: Node.js, Express, TypeScript, Sequelize
    Database: MySQL
## Contributing
Contributions are welcome! Follow these steps to contribute:

## Fork the repository.
    Create a new branch: git checkout -b feature-name
    Commit your changes: git commit -m 'Add some feature'
    Push to the branch: git push origin feature-name
    Submit a pull request.
## License
This project is licensed under the MIT License.
