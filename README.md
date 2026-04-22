<div align="center">

# **Drug Loan Management System**

### _An efficient, real-time application for managing inter-hospital drug loans, built with Vue 3, TypeScript, and Supabase._

<br>

<p>
  <a href="https://github.com/suradet-ps/drug-loan-app/commits/main">
    <img src="https://img.shields.io/github/last-commit/suradet-ps/drug-loan-app?style=for-the-badge&color=blue&logo=github" alt="Last Commit">
  </a>
  <a href="https://github.com/suradet-ps/drug-loan-app">
    <img src="https://img.shields.io/github/languages/top/suradet-ps/drug-loan-app?style=for-the-badge&color=3178C6&logo=typescript" alt="Top Language">
  </a>
  <a href="https://github.com/suradet-ps/drug-loan-app">
    <img src="https://img.shields.io/github/languages/count/suradet-ps/drug-loan-app?style=for-the-badge&color=informational" alt="Language Count">
  </a>
</p>

</div>

---

This repository contains the source code for a comprehensive Drug Loan Management System designed for Sabot Hospital. The application provides a secure and intuitive interface for pharmacists to track drug loans and returns between partner hospitals, ensuring accuracy and accountability.

The system is built as a Single Page Application (SPA) using a modern frontend stack and leverages **Supabase** for its backend, including authentication and a real-time database.

## ✨ Features

-   **Secure Authentication:** Users must log in to access the system, powered by Supabase Auth.
-   **Real-time Dashboard:** A central dashboard displays key metrics, including the number of outstanding loans and total quantity pending return.
-   **Loan & Return Management:** Dedicated forms for easily recording new drug loans and processing returns against existing loans.
-   **Outstanding Loan Tracking:** A dynamic list shows all active loans, their current return status, and a progress bar for visual tracking.
-   **Complete Transaction History:** A detailed log of every loan and return transaction for auditing and reference.
-   **Centralized State Management:** Uses **Pinia** to manage application state, ensuring data consistency across components.
-   **Type-Safe Codebase:** Fully written in **TypeScript** to enhance developer experience and reduce runtime errors.
-   **Responsive Design:** The UI is crafted with a custom, modern design that works seamlessly on both desktop and mobile devices.

## 🛠️ Built With the Tools and Technologies:

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vue.js&logoColor=4FC08D" alt="Vue.js">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Pinia-FFD859?style=for-the-badge&logo=pinia&logoColor=black" alt="Pinia">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint">
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier">
</p>

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v20 or higher recommended)
-   pnpm package manager (`npm install -g pnpm`)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/suradet-ps/drug-loan-app.git
    cd drug-loan-app
    ```

2.  **Install dependencies:**
    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Supabase credentials. You can find these in your Supabase project dashboard under `Project Settings > API`.

    ```env
    VITE_SUPABASE_URL="YOUR_SUPABASE_PROJECT_URL"
    VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
    ```

4.  **Run the development server:**
    ```sh
    pnpm dev
    ```
    The application will be available at `http://localhost:5173`.

## 📜 Available Scripts

-   `pnpm dev`: Starts the development server with hot-reloading.
-   `pnpm build`: Type-checks and builds the application for production.
-   `pnpm preview`: Serves the production build locally for testing.
-   `pnpm test:unit`: Runs unit tests using Vitest.
-   `pnpm lint`: Lints the codebase with ESLint and Oxc.
-   `pnpm format`: Formats all source files with Prettier.
