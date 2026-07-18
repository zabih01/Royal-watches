# Royal Watches

A full-stack luxury watch e-commerce application built with the MERN stack.

Royal Watches is designed to provide a modern online shopping experience for premium watches. The application includes a customer-facing storefront, secure user authentication, product management, cart functionality, order processing, and an admin panel for managing the store.

---

## About The Project

Royal Watches is a complete e-commerce web application built using:

- React.js for the frontend
- Node.js and Express.js for the backend
- MongoDB for database management
- Cloudinary for image storage and management

The project follows a separate frontend and backend architecture, making the application easier to maintain, scale, and deploy.

---

## Features

### Customer Features

- User registration and login
- Secure authentication
- Browse available watches
- View detailed product information
- Search and explore products
- Add products to cart
- Update cart items
- Remove products from cart
- Place orders
- View order information
- Responsive design for desktop and mobile devices

### Admin Features

- Admin authentication
- Add new watch products
- Update existing products
- Delete products
- Manage product images
- View customer orders
- Update order status
- Manage store inventory

---

## Tech Stack

### Frontend

- React.js
- JavaScript
- Vite
- React Router
- Axios
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- CORS

### Database and Services

- MongoDB
- Mongoose
- Cloudinary

### Development Tools

- Git
- GitHub
- VS Code
- Postman

---

## Project Structure

```text
Royal-Watches/
│
├── admin/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── backend/
│   │
│   ├── config/
│   │   ├── mongodb.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── productRoute.js
│   │   ├── cartRoute.js
│   │   └── orderRoute.js
│   │
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
└── README.md


The application is divided into three main parts:

                         ┌────────────────────┐
                         │      Customer      │
                         │   React Frontend   │
                         └─────────┬──────────┘
                                   │
                                   │ HTTP Requests
                                   ▼
                         ┌────────────────────┐
                         │    Express API     │
                         │   Node.js Backend   │
                         └─────────┬──────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    │              │              │
                    ▼              ▼              ▼
              ┌──────────┐   ┌──────────┐   ┌───────────┐
              │ MongoDB  │   │Cloudinary│   │   Admin   │
              │ Database │   │  Images  │   │ Dashboard │
              └──────────┘   └──────────┘   └───────────┘

Developed with dedication using the MERN stack.

If you found this project useful or interesting, consider giving the repository a star.

⭐ Star the repository if you like the project.


### Small recommendation for your GitHub repository

For the **most professional look**, I recommend keeping the README **clean and not overloading it with too many badges or random animations**. Your actual project structure is already strong, so the professional look should come from:

1. A good project banner or logo at the top.
2. A short project description.
3. Real screenshots of your frontend and admin panel.
4. A clear architecture section.
5. Correct API route prefixes, as above.
6. Accurate installation instructions.
7. A clean folder structure.

One important detail: I intentionally used the route prefixes exactly from your `server.js`:

```text
/api/user
/api/product
/api/cart
/api/order
