# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and ESLint rules.

Currently, two official plugins are available:


# V-Analytics Dashboard

A modern analytics dashboard for visualizing payment KPIs and transaction data. Built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Interactive dashboard with key payment metrics
- Real-time data visualization (charts, tables)
- Responsive design for desktop and mobile
- Context-based state management
- Loading and error handling UI

## Tech Stack
- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **Data Layer:** Apollo Client (GraphQL)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/castorzombie/analytics-dashboard.git
   cd analytics-dashboard
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Available Scripts
- **Start development server:**
  ```sh
  npm run dev
  ```
- **Build for production:**
  ```sh
  npm run build
  ```
- **Lint code:**
  ```sh
  npm run lint
  ```

## Usage

After starting the development server, open [http://localhost:5173](http://localhost:5173) in your browser.

The dashboard provides:
- Key payment metrics: Total Amount, Total Payments, Captured Amount, Failed Count, Refunded Amount
- Visual charts and tables for payment data
- Loading spinners and error messages for data fetch states
- Pagination for payment details, allowing users to browse through large sets of transactions efficiently
- Routing powered by React Router, enabling navigation between dashboard overview, payment details, and other sections as needed

## Project Structure
```
src/
  components/
    features/        # Dashboard and feature components
    layout/          # Layout components
    ui/              # UI elements (charts, cards, spinners)
  context/           # React context providers
  hooks/             # Custom React hooks
  services/          # Data fetching and API services
  assets/            # Static assets
```

