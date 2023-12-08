# Grocery+ 

Target, Trader Joes, Ralphs, Whole foods… In Westwood alone, there are a multitude of grocery shops where you can do your shopping from. But as cash strapped college students, we want to know which grocery store is offering the best price for the items we want to buy. Currently, this would require either physically going down to every super market, or individually checking the website of each grocery store, both of which is inconvenient and wastes a lot of time, especially if you want to buy many items. 

Discover Grocery+, your all-in-one shopping companion! Sign up, log in, and start saving on your grocery bill with ease. Search and compare prices for your favorite items across multiple stores, create a personalized favorites list and effortlessly manage your shopping cart. With data from popular retailers like Trader Joe's, Whole Foods, and Target, Grocery+ ensures you always get the best deals. Shopping smarter has never been this convenient. 

Overall, our full-stack web application as part of the CS35L project aims to simplify and enhance the grocery shopping experience, helping users save time and money by comparing prices across multiple stores.  

# Features 
## Signup/Login + Homepage
<img width="454" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/d58fd9bc-5cb1-4e18-9127-42bc89064496">

- Uploading data from client to backend
- Display dynamic data
- Authentication by Supabase

## Search Result Page
<img width="401" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/a409eff3-a627-4a66-8e48-1f92de6cb4ef">

- Search through server-side data

## Detailed Item View
<img width="409" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/01114711-af3b-4bef-9c76-c9ec551be187">

## Comparing Prices 
<img width="367" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/cee481ce-f961-4852-ac34-6f34b8176f5a">

## Shopping Cart Page
<img width="409" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/bd9ef8a5-ce78-486f-ab41-7e61a6c12d32">

- Add Items to Cart

## Favorites Page
<img width="376" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/31c140c7-6d7b-4c70-8c2b-8d914ecae29d">

- Add Items to Favorites

## Logout Page
<img width="422" alt="image" src="https://github.com/izaactay/CS35L/assets/9492646/99a54d9a-ea87-43e0-83e0-c03bb8c83795">

# Project Setup
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
