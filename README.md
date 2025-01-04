# Ecommerce Platform - Fullstack Project 

Welcome to the Ecommerce Platform, a modern fullstack project built with **Spring Boot 3**, **Angular 18**, **Tailwind CSS**, **PostgreSQL**, and **Kinde**. This platform is designed to provide a seamless shopping experience with advanced features like an admin panel, a powerful filter engine, Angular SSR, Stripe integration, and a clean hexagonal architecture for the backend.

---

## 🚀 Key Features

- **🛠️ Admin Panel**: Manage products and categories with ease.
- **🔍✨ Filter Engine**: Advanced filtering for a better user experience.
- **🌐⚡ Angular SSR**: Server-side rendering for improved performance and SEO.
- **💳 Stripe Integration**: Secure and reliable payment processing.
- **🏢 Hexagonal Architecture**: Clean and maintainable backend architecture.

---

## 🛠️ Technologies Used

- **Frontend**: Angular 18, Tailwind CSS
- **Backend**: Spring Boot 3
- **Database**: PostgreSQL
- **Authentication**: Kinde
- **Payment Gateway**: Stripe
- **Deployment**: Docker

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **NodeJS 20.17 LTS**: [Download NodeJS](https://nodejs.org/)
- **Angular CLI v18**: Install via `npm install -g @angular/cli@18`
- **IDE**: VSCode or IntelliJ
- **JDK 21**: [Download JDK 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- **Docker**: [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Run the Spring Boot application**:
   - Open the project in your IDE (IntelliJ or VSCode).
   - Ensure JDK 21 is configured.
   - Run the `EcommerceApplication.java` file.

3. **Docker Setup for PostgreSQL**:
   - Ensure Docker Desktop is running.
   - Run the following command to start the PostgreSQL container:
     ```bash
     docker-compose up -d
     ```

### 3. Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the Angular application**:
   ```bash
   ng serve
   ```

4. **Build for production with SSR**:
   ```bash
   ng build --configuration production
   ng run ecommerce-platform:server
   ```

### 4. Stripe Integration

- Ensure you have a Stripe account and API keys.
- Add your Stripe keys to the backend configuration file (`application.properties` or `application.yml`).

### 5. Kinde Authentication

- Set up your Kinde account and configure the authentication settings in the backend and frontend.

---

## 🏗️ Project Structure

```
ecommerce-platform/
├── backend/               # Spring Boot backend
│   ├── src/               # Source code
│   ├── Dockerfile         # Docker configuration for backend
│   └── docker-compose.yml # Docker compose for PostgreSQL
├── frontend/              # Angular frontend
│   ├── src/               # Source code
│   ├── Dockerfile         # Docker configuration for frontend
│   └── angular.json       # Angular configuration
└── README.md              # Project documentation
```

---

## 🐳 Docker Deployment

To deploy the entire application using Docker:

1. **Build and run the backend**:
   ```bash
   cd backend
   docker-compose up -d
   ```

2. **Build and run the frontend**:
   ```bash
   cd frontend
   docker build -t ecommerce-frontend .
   docker run -p 4200:80 ecommerce-frontend
   ```

---

## 🙏 Acknowledgments

- **Spring Boot**: For a robust backend framework.
- **Angular**: For a powerful frontend framework.
- **Tailwind CSS**: For utility-first CSS styling.
- **PostgreSQL**: For a reliable database solution.
- **Kinde**: For seamless authentication.
- **Stripe**: For secure payment processing.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

