# Strato Stack

This project is a lightweight stack for building web applications using React Router, React, and Tailwind CSS. It leverages Shadcn components for UI and Drizzle ORM for database interactions with PostgreSQL.

## Installation

First, ensure you have Node.js (>=18.0.0) installed. Then, install the dependencies:

```bash
npm install
```

## Development

Ensure Docker Desktop is running and then run:

```bash
npm run dev:infra
```

To start the development server, run:

```bash
npm run dev
```

This will start the React Router development server.

## Building

To build the project for production, use:

```bash
npm run build
```

## Starting the Server

After building, you can start the server with:

```bash
npm run start
```

## Database Management

- **Generate Database Migrations**:
  ```bash
  npm run db:generate
  ```
- **Run Database Migrations**:
  ```bash
  npm run db:migrate
  ```
- **Check Database Status**:
  ```bash
  npm run db:check
  ```
- **Open Database Studio**:
  ```bash
  npm run db:studio
  ```

## Updating Dependencies

- **Check for Updates**:
  ```bash
  npm run update-check
  ```
- **Update All Dependencies**:
  ```bash
  npm run update-all
  ```
- **Update Safe (Minor Updates Only)**:
  ```bash
  npm run update-safe
  ```
- **Update React Router Packages**:
  ```bash
  npm run update-router
  ```

## Infrastructure Management

- **Start Development Infrastructure**:
  ```bash
  npm run dev:infra
  ```
- **Stop Development Infrastructure**:
  ```bash
  npm run dev:infra:down
  ```
- **Reset Development Infrastructure**:
  ```bash
  npm run dev:infra:reset
  ```

## Type Checking

To run type checks, execute:

```bash
npm run typecheck
```

## License

This project is licensed under the MIT License.
