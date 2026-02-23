# Architecture Decisions Record

## Status
Accepted

## Context
As the project grows in complexity (Modular Monolith, Security, Payments, CI/CD), it becomes difficult to remember "why" certain technologies or patterns were chosen.
New contributors (or future versions of myself) need to understand the trade-offs made at specific points in time to avoid repeating mistakes or undoing intentional constraints.

## Decision
We will use Architecture Decision Records (ADRs) to document significant architectural choices.
- **Format:** Markdown files following the Nygard template (Status, Context, Decision, Consequences).
- **Location:** - Global decisions in `/docs/adr/`
    - Service-specific decisions in `backend/docs/adr/` or `frontend/docs/adr/`

## Consequences
- **Positive:** Clear technical history and "Architectural Knowledge Management."
- **Positive:** Forces a deliberate thought process before implementing major changes.
- **Negative:** Adds a small amount of documentation overhead to the development process.

## Architecture Overview

### Backend Technology Stack
- **Framework:** Spring Boot 3.2.5 with Java 17
- **Database:** MySQL with Spring Data JPA and Hibernate ORM
- **Security:** Spring Security with OAuth2 Resource Server (Auth0 integration)
- **API:** RESTful APIs with Spring Data REST
- **Payments:** Stripe Java SDK for payment processing
- **Database Migrations:** Flyway for version-controlled schema management
- **Containerization:** Multi-stage Docker build with Maven

**Rationale:** Chosen for rapid development, mature ecosystem, strong security posture, and comprehensive integration capabilities for ecommerce functionality.

### Frontend Technology Stack
- **Framework:** Angular 17.3.0 with TypeScript 5.4
- **UI Framework:** Bootstrap 5.3.8 with ng-bootstrap components
- **Authentication:** Auth0 Angular SDK for OAuth2/OIDC integration
- **Payments:** Stripe.js for secure client-side payment processing
- **Icons:** Font Awesome 7.1.0 for consistent visual elements
- **Development:** Angular CLI with Jasmine/Karma testing
- **Deployment:** Multi-stage Docker build with Nginx serving

**Rationale:** Selected for comprehensive framework capabilities, strong typing, responsive design, and secure authentication/payment integration.

### Deployment Infrastructure
- **Cloud Provider:** AWS Lightsail
- **Architecture:** Containerized deployment using Docker Compose
- **Web Server:** Nginx for frontend static file serving and reverse proxy
- **Application Server:** Spring Boot embedded Tomcat
- **Database:** MySQL managed database instance
- **SSL/TLS:** Let's Encrypt certificates for HTTPS
- **Monitoring:** Basic application logging and health checks

**Rationale:** AWS Lightsail provides simplified cloud infrastructure with predictable pricing, managed services, and easy scalability for small to medium ecommerce applications.