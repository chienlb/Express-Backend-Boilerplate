# Database Setup Guide

## MongoDB Database Configuration

This Express.js boilerplate uses MongoDB as the database with Mongoose ODM.

### Prerequisites

1. **Local MongoDB Installation**
   - Install MongoDB Community Server from https://www.mongodb.com/try/download/community
   - Or use Docker: `docker run -d -p 27017:27017 --name mongodb mongo:latest`

2. **MongoDB Atlas (Cloud Option)**
   - Create account at https://www.mongodb.com/atlas
   - Create a cluster and get connection string
   - Replace MONGODB_URI in .env file

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the MongoDB connection string in `.env`:
   ```env
   # For local MongoDB
   MONGODB_URI=mongodb://localhost:27017/express_boilerplate_db
   
   # For MongoDB Atlas
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/express_boilerplate_db?retryWrites=true&w=majority
   ```

### Database Models

The application includes the following MongoDB models:

1. **User Model** (`src/models/user.model.ts`)
   - Name, email, password
   - Role reference
   - Address, phone (optional)
   - Email verification fields
   - Active/deleted status flags
   - Timestamps

2. **Role Model** (`src/models/role.model.ts`)
   - Name, permissions array
   - Description
   - Active/deleted status flags
   - Timestamps

### Migration & Seeding

Run database migrations to seed initial roles:

```bash
# Seed roles (admin, moderator, user)
npm run migrate:up

# Remove all roles
npm run migrate:down
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run migrate:up   # Seed database with initial roles
npm run migrate:down # Remove all roles from database
```

### Database Connection

The database connection is configured in `src/configs/database.config.ts`:
- Automatic connection on server start
- Connection error handling
- Graceful disconnection on server shutdown

### Verification

1. Start the server: `npm run dev`
2. Check logs for "MongoDB connected successfully"
3. Run migration: `npm run migrate:up`
4. Verify roles are created in your MongoDB database

### Troubleshooting

1. **Connection Refused Error**
   - Ensure MongoDB is running locally or connection string is correct
   - Check network connectivity for Atlas

2. **Authentication Failed**
   - Verify username/password in connection string
   - Ensure IP whitelist includes your IP (for Atlas)

3. **Database Not Found**
   - MongoDB creates databases automatically when first document is inserted
   - Run `npm run migrate:up` to create initial data