# Backend Project Template

This repository serves as a template for creating backend applications using Node.js, TypeScript, Apollo Server, TypeORM, and PostgreSQL. This template provides a solid foundation for developing scalable, maintainable, and well-structured backend services.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [License](#license)

## Features

- **Node.js**: Backend built with Node.js.
- **TypeScript**: Strongly-typed code for better tooling and readability.
- **TypeORM**: ORM for interacting with PostgreSQL, supporting entities and migrations.
- **Apollo Server**: GraphQL server for building APIs.
- **PostgreSQL**: Relational database for data storage.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (version 14 or later)
- **npm** (comes with Node.js) or **Yarn**
- **PostgreSQL** (version 12 or later)
- **Git** (for cloning the repository)

## Installation

### 1. Clone the Repository

Clone this repository to your local machine using Git:

\`\`\`bash
git clone https://github.com/your-username/backend-template.git
cd backend-template
\`\`\`

### 2. Install Dependencies

Install the required Node.js dependencies using npm or Yarn:

```bash
npm install
```

Or, if you prefer Yarn:

```bash
yarn install
```

### 3. Install PostgreSQL

If you don't have PostgreSQL installed, follow these instructions:

#### macOS:

Install via Homebrew:

```bash
brew install postgresql
brew services start postgresql
```

#### Ubuntu/Debian:

Install via APT:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Windows:

Download the installer from the official PostgreSQL website [here](https://www.postgresql.org/download/windows/) and follow the setup instructions.

### 4. Set Up PostgreSQL

After installation, set up a new PostgreSQL user and database:

#### Create a PostgreSQL User and Database:

1. Open a terminal and enter the PostgreSQL prompt:

   ```bash
   psql -U postgres
   ```

2. Create a new database and user:

   ```sql
   CREATE DATABASE your_database_name;
   CREATE USER your_username WITH ENCRYPTED PASSWORD 'your_password';
   ```

3. Grant privileges to the new user:

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE your_database_name TO your_username;
   ```

4. Exit the PostgreSQL prompt:

   ```sql
   \q
   ```

### 5. Configure Environment Variables

Create a `.env` file in the root directory of your project based on the `.env.example` provided. Update the values according to your environment:

**Example `.env`:**

```plaintext
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## Running the Application

After setting up the environment and database, you can start the application.

### 1. Compile TypeScript to JavaScript:

```
npm run compile
```

### 2. Start the Application:

```
npm start
```

This will start the server on the specified port (default is 4000). You can access the GraphQL API at `http://localhost:4000/graphql`.

## Project Structure

Here’s an overview of the project structure:

```plaintext
backend-template/
├── src/
│   ├── entities/
│   │   └── Embedding.ts     # TypeORM entity definition
│   ├── resolvers/
│   │   └── index.ts         # GraphQL resolvers
│   ├── schemas/
│   │   └── typeDefs.ts      # GraphQL type definitions
│   ├── ormconfig.ts         # TypeORM configuration
│   └── index.ts             # Application entry point
├── .env                     # Environment variables
├── .gitignore               # Files and directories to ignore in Git
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
