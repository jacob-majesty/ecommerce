
---

# 🛍️ Full Stack E-Commerce Platform
A production-oriented **Full Stack E-Commerce application** built with **Angular** and **Java Spring Boot**, designed to demonstrate modern software engineering practices, clean architecture, and real-world concerns such as security, payments, CI/CD, and cloud deployment.

**[Architecture Decision Records (ADR)](https://github.com)** • **[Live Demo](https://github.com)** • **[API Docs](https://github.com)**

---

### 📖 The Architectural Narrative

As a solo developer, I faced a classic trade-off: speed vs. scalability.

* **The Choice:** I implemented a **Modular Monolith**. This allowed for rapid iteration while ensuring clear "Bounded Contexts" so that modules (like Payment or Catalog) can be extracted into microservices if the domain complexity grows.
* **Atomic Deployments:** Using a **Monorepo structure**, I ensure the frontend and backend stay in sync during deployments, preventing version mismatch errors in production.

---

### 🛠️ The Tech Stack

A "Production-First" selection of modern tools:

* **Frontend:** Angular (SPA) with TypeScript for type-safe UI components.
* **Backend:** Java Spring Boot with a REST API and MySQL for reliable data persistence.
* **Messaging:** RabbitMQ for asynchronous event-driven communication (e.g., order processing and notification triggers).
* **Security:** Enterprise-grade identity via **Okta**, JWT, OAuth2, and OpenID Connect.
* **Payments:** Seamless credit card processing via **Stripe API**.
* **Infrastructure:** Containerized with **Docker** and orchestrated on **AWS ECS**.

---

### 🔄 Engineering Workflow

I treat the codebase as a professional production environment through a strict **PR-only workflow**.

* **Branching Strategy:** `feature` → `dev` (staging) → `main` (production).
* **Safety Nets:** GitHub Actions run automated CI suites on every PR to prevent local "experimental" code from polluting the stable integration history.
    * **Quality Gate:** A SonarQube scan is required to pass (checking for "Code Smells" and coverage) before any code is merged into the integration history.
* **Audit Trail:** Even as a solo dev, I use PRs for final self-reviews to maintain a clean history and high code quality.

---

### 📂 Project Structure

```text
ecommerce/
├── .github/workflows/   # Automated CI/CD Pipelines
├── docs/adr/            # Global Architecture Decision Records
├── backend/             # Spring Boot (Business Logic & ADRs)
├── frontend/            # Angular (UI & ADRs)
└── docker-compose.yml   # Single-command local environment

```

---

### 🚦 Getting Started

**Requirement:** Docker & Docker Compose.

1. **Spin up the stack:**
```bash
docker-compose up --build

```


2. **Access the platform:**
* **Storefront:** `http://localhost:80`
* **API Engine:** `http://localhost:8080`



---

### ⚖️ License

Educational and portfolio use.

---