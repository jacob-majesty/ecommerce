
![image](https://github.com/user-attachments/assets/18a550bd-3af2-4ad9-b7b3-7270c17298ad)

# Full-Stack Application with Angular and Spring Boot

## Project Overview
This project is a complete full-stack application built using Angular for the frontend and Spring Boot for the backend. The application provides a seamless shopping experience where users can browse products, manage a shopping cart, securely log in and out, and track their previous orders.

## Features
- **Product List:** View a catalog of products available for purchase.
- **Shopping Cart:** Add, update, and remove products from the shopping cart.
- **Checkout:** Complete purchases by proceeding through the checkout process.
- **User Authentication:** Secure login and logout functionality.
- **Order History:** View past orders for logged-in users.

## Technologies Used
- **Frontend:** Angular 15+
- **Backend:** Spring Boot 3+
- **Database:** MySQL
- **Security:** Spring Security for backend security
- **API Communication:** RESTful APIs
- **Documentation:** Swagger for API documentation
- **Build Tools:** Maven, npm

## Prerequisites
Before running this application, ensure you have the following installed:
- Node.js and npm
- Angular CLI
- Java 17+
- Maven
- MySQL

## Setup Instructions

### Backend (Spring Boot)
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <backend-directory>
   ```
2. Configure the database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/<your-database-name>
   spring.datasource.username=<your-username>
   spring.datasource.password=<your-password>
   ```
3. Build and run the application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
4. The backend will be available at `http://localhost:8080`.
5. Access Swagger API documentation at `http://localhost:8080/swagger-ui.html`.

### Frontend (Angular)
1. Navigate to the frontend directory:
   ```bash
   cd <frontend-directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. The frontend will be available at `http://localhost:4200`.

## Usage
1. Access the product list from the homepage.
2. Add products to your shopping cart and view the cart.
3. Proceed to checkout and complete your purchase.
4. Log in to view and track your previous orders.

## Security
- Spring Security has been implemented for user authentication.
- Passwords are securely stored using hashing techniques.

## API Endpoints
- **Product Endpoints:**
  - `GET /api/products`: Retrieve the list of products
  - `POST /api/cart`: Add a product to the cart
- **User Endpoints:**
  - `POST /api/auth/login`: User login
  - `POST /api/auth/logout`: User logout
  - `GET /api/orders`: View user order history

## Future Enhancements
- Implement product search and filtering.
- Add order tracking status.
- Improve UI/UX for a better user experience.

## Contributing
Feel free to fork this project and submit pull requests. All contributions are welcome.

## License
This project is licensed under the MIT License.

---


