# Backend - Work Environment Review System

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database (or Neon serverless Postgres)
- Keycloak server running

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your actual configuration:
   
   - `NEON_DB_URL`: Your PostgreSQL connection string
   - `KEYCLOAK_BASE_URL`: URL where your Keycloak server is running
   - `KEYCLOAK_REALM`: Your Keycloak realm name
   - `KEYCLOAK_CLIENT_ID`: Your Keycloak client ID
   - `KEYCLOAK_SECRET`: Your Keycloak client secret
   - `KEYCLOAK_ADMIN_USERNAME`: Keycloak admin username for user management
   - `KEYCLOAK_ADMIN_PASSWORD`: Keycloak admin password
   - Mail settings (if using email features)

3. **Run database migrations**
   ```bash
   npm run migration:run
   ```

4. **Start the development server**
   ```bash
   npm run start:dev
   ```

The application should now be running on `http://localhost:4000`

## Common Issues

### "JwtStrategy requires a secret or key" Error

This error occurs when environment variables are not properly configured. Make sure:
1. You have created a `.env` file in the backend directory
2. All required environment variables are set (especially Keycloak configuration)
3. The `.env` file is in the correct location (`backend/.env`)

### Database Connection Issues

Ensure your `NEON_DB_URL` is correct and the database is accessible from your machine.

## Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:prod` - Start in production mode
- `npm run migration:run` - Run pending migrations
- `npm run migration:revert` - Revert last migration
- `npm run migration:generate` - Generate a new migration
