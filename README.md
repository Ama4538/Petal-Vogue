![Default Screenshot](image/screenshot.jpg)

# Petal Vogue 
A Fast Fashion E-commerce platform. Each product has its unique page, complemented by features such as a sorting system, search functionality, wishlist management, cart system, and much more.

## Table of Contents
- [Access](#Access)
- [Installation](#installation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Screenshots](#Screenshots)
- [License](#license)

## Access
Accessible from https://petal-vogue.vercel.app

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ama4538/Petal-Vogue.git
    cd Petal-Vogue
    ```
2. **Install dependencies:**
    ```bash
    npm i
    ```
3. **Build and Start the server:**
    ```bash
    npm run build
    npm run preview
    ```
4. **Access the application:**
Open your browser and go to localhost

## Features
- Unique Product Pages: Every product has its own distinct page with their own coloring, sizing, and randomly selected reviews.
- Sorting System: Sort products based on various criteria such as price, cateorgy, or gender.
- Search Functionality: Search for product at any page except for the home screen.
- Wishlist Management: Save your favorite items to a personalized wishlist for future reference.
- Cart System: Add and manage items in your shopping cart.
- Product Editing: Edit your product color and size from your wishlist or cart.
- Recommendation System: Recommends product based upon what you like.
- Responsiveness: Find your fit no matter your device
- Maintains data between refreshes: All data is store in the local storage

## Tech Stack
- React
- JS
- CSS
- HTML

## Project Structure
```
├── public/                 # Static Files
│   ├── bannerImage/        # All banner images
│   ├── homeImage/          # All main page images
│   ├── icons/              # All icons
│   ├── loadingImages/      # All loading screen images
│   ├── productimage/       # All product images
├── src/                    # Source folder
│   ├── component/          # Contains all react component
│   ├── data/               # Contains data of all product, details, and comments
│   ├── pages/              # Contains all pages made up from components
│   ├── main.css            # Styling
│   ├── main.jsx            # Entry point
├── index.html              # Starting html file
├── .gitignore              # Git ignore file
└── package.json            # Project metadata and dependencies
```

## Screenshots
![Edit Page](image/edit.png)
![Cart Page ](image/cart.png)
![Recommendation](image/recommendation.png)
![Product Page](image/product.png)
![Wishlist Page](image/wishlist.png)
![Search Page](image/search.png)

## License
Distributed under the MIT License. See `LICENSE` for more information.