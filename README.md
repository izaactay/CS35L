# Project Setup

This project aims to simplify and enhance the grocery shopping experience, helping users save time and money by comparing prices across multiple stores.

This guide will walk you through setting up the project on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)

## Installation

1. Clone the repository:

   ```sh
   git clone <repository_url>
   ```

   Replace `<repository_url>` with the actual URL of the Git repository.

2. Change into the project directory:

   ```sh
   cd CS35L
   ```
3. Put the `.env` file inside the `client` and `server` directories with the relevant keys.

  
4. Set up the client:

   ```sh
   cd client
   npm ci
   npm start
   ```

   This will install the client-side dependencies and start the client application.

5. Set up the server (in a separate terminal window):

   ```sh
   cd  server
   npm ci
   npm start
   ```

   This will install the server-side dependencies and start the server.

6. Your app should now be up and running!

## Usage

You can access the web application by opening your web browser and navigating to [http://localhost:3000](http://localhost:3000). The application should be fully functional and ready for use.

## Troubleshooting

If you encounter any issues during setup, please check that you have all the prerequisites installed and that there are no errors in the terminal output. If you need further assistance, feel free to reach out to the project team for support.

## Credits

This projected was created by the following individuals:
- Alex Su
- Izaac Tay
- Samuel Chua
- Rakesh Selvaraj
- Yash Goyal