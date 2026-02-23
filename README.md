
# 🛍️ E-Commerce Platform

<div align="center">
  <img src="./logo.png" alt="E-Commerce App Logo" width="180" height="180"/>
</div>

A full-stack e-commerce application built with modern technologies, featuring secure authentication, payment processing, and cloud deployment capabilities.

## 🏗️ Architecture Overview

This project follows a modular monolith architecture with clear separation between frontend and backend services:

- **Frontend:** Angular 17 + TypeScript + Bootstrap
- **Backend:** Spring Boot 3.2 + Java 17 + MySQL
- **Authentication:** Auth0 OAuth2/OIDC
- **Payments:** Stripe integration
- **Deployment:** AWS Lightsail with Docker containers

## 🛠️ Technology Stack

### Frontend
- **Framework:** Angular 17.3.0 with TypeScript 5.4
- **UI Library:** Bootstrap 5.3.8 with ng-bootstrap
- **Authentication:** Auth0 Angular SDK
- **Payment Processing:** Stripe.js
- **Icons:** Font Awesome
- **Development:** Angular CLI with Jasmine/Karma testing

### Backend
- **Framework:** Spring Boot 3.2.5 with Java 17
- **Database:** MySQL with Spring Data JPA + Hibernate
- **Security:** Spring Security with OAuth2 Resource Server
- **API:** RESTful APIs with Spring Data REST
- **Payments:** Stripe Java SDK
- **Database Migrations:** Flyway
- **Build Tool:** Maven

### Infrastructure
- **Containerization:** Docker with multi-stage builds
- **Web Server:** Nginx (frontend serving)
- **Application Server:** Embedded Tomcat (Spring Boot)
- **Cloud Provider:** AWS Lightsail
- **Database:** MySQL managed instance
- **SSL/TLS:** Let's Encrypt certificates

## 📁 Project Structure

```
ecommerce/
├── .github/workflows/     # CI/CD pipelines
├── docs/adr/              # Architecture Decision Records
├── backend/               # Spring Boot application
│   ├── src/main/java/     # Java source code
│   ├── src/main/resources/ # Configuration & migrations
│   ├── docs/adr/          # Backend-specific ADRs
│   └── Dockerfile         # Backend container build
├── frontend/              # Angular application
│   ├── src/app/           # Angular source code
│   ├── docs/adr/          # Frontend-specific ADRs
│   └── Dockerfile         # Frontend container build
├── docker-compose.yml     # Local development environment
├── docker-compose.dev.yml # Development configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 18+ (for local frontend development)
- Java 17+ (for local backend development)
- MySQL (if running locally without Docker)

### Running with Docker (Recommended)

1. **Clone the repository:**
```bash
git clone https://github.com/jacob-majesty/ecommerce.git
cd ecommerce
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start the application:**
```bash
docker-compose up --build
```

4. **Access the application:**
- Frontend: http://localhost:80
- Backend API: http://localhost:8080
- API Documentation: http://localhost:8080/api

### Local Development

#### Backend Development
```bash
cd backend
./mvnw spring-boot:run
```

#### Frontend Development
```bash
cd frontend
npm install
ng serve
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
MYSQL_DATABASE=ecommerce
MYSQL_USER=your_username
MYSQL_ROOT_PASSWORD=your_password

# Auth0 Configuration
AUTH0_DOMAIN=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_REDIRECT_URI=http://localhost:80
AUTH0_AUDIENCE=http://localhost:8080

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Database Setup

The application uses Flyway for database migrations. Migrations are located in:
- Backend: `backend/src/main/resources/db/migration/`

## 📚 API Documentation

The backend exposes RESTful APIs at `/api` endpoint. Key endpoints include:

- Products: `/api/products`
- Orders: `/api/orders`
- Users: `/api/users`
- Payments: Integrated via Stripe

## 🔐 Authentication & Security

- **Authentication:** Auth0 OAuth2/OIDC integration
- **Authorization:** JWT tokens with role-based access
- **API Security:** Spring Security with resource server configuration
- **Payment Security:** Stripe handles all payment data (PCI compliant)

## 💳 Payment Integration

The application integrates with Stripe for payment processing:

- **Frontend:** Stripe.js for secure payment forms
- **Backend:** Stripe Java SDK for payment processing
- **Security:** Card data never touches our servers (Stripe Elements)

## 🚀 Deployment

### AWS Lightsail Deployment

1. **Build and push containers:**
```bash
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml push
```

2. **Deploy to Lightsail:**
- Use AWS Lightsail container service
- Configure environment variables
- Set up SSL certificates with Let's Encrypt
- Configure domain and DNS

### CI/CD Pipeline

The project includes GitHub Actions workflows for:
- Automated testing on pull requests
- Docker image building and pushing
- Deployment to staging/production environments

## 🧪 Testing

### Backend Tests
```bash
cd backend
./mvnw test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📖 Architecture Decision Records

Detailed architectural decisions are documented in the `docs/adr/` directory:

- [Architecture Overview](docs/adr/architecture-decisions.md)
- [Backend Technology Stack](backend/docs/adr/0000-backend-adr.md)
- [Frontend Technology Stack](frontend/docs/adr/0001-frontend-adr.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For issues and questions:
- Check the [Architecture Decision Records](docs/adr/) for technical decisions
- Review the [API documentation](http://localhost:8080/api) when running locally
- Open an issue for bug reports or feature requests
