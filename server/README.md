# Server - Backend API

The backend of the AI Ticket Management System is a robust Node.js application built with Express.js and TypeScript. It provides a comprehensive RESTful API with AI-powered ticket analysis, real-time WebSocket communication, JWT authentication, and background job processing using Inngest.

## Important Libraries

### Core Framework & Runtime
- **Express.js** - Fast, unopinionated web framework for Node.js with middleware support
- **Node.js** - JavaScript runtime environment for server-side development
- **TypeScript** - Type-safe JavaScript development with enhanced developer experience

### Database & ODM
- **Mongoose** - Elegant MongoDB object modeling with built-in type casting and validation
- **MongoDB** - NoSQL document database for flexible data storage

### Authentication & Security
- **JSON Web Token (jsonwebtoken)** - Secure token-based authentication implementation
- **bcrypt** - Password hashing library with salt generation for secure authentication
- **Helmet** - Security middleware that sets various HTTP headers
- **Express Rate Limit** - Basic rate-limiting middleware for Express applications
- **CORS** - Cross-Origin Resource Sharing middleware with configurable options

### AI & Background Processing
- **@inngest/agent-kit** - AI agent framework for intelligent ticket analysis
- **Inngest** - Durable function platform for background job processing and workflows
- **Google Gemini AI** - Advanced AI model integration for ticket analysis and prioritization

### Real-time Communication
- **Socket.io** - Real-time bidirectional event-based communication library

### API Documentation & Development
- **Swagger UI Express** - Interactive API documentation interface
- **YAMLJS** - YAML parser for Swagger documentation configuration
- **Nodemon** - Development utility that automatically restarts the server on file changes

### Email & Utilities
- **Nodemailer** - Email sending library for notifications and user verification
- **Cookie Parser** - Parse HTTP request cookies for session management
- **dotenv** - Environment variable loader for configuration management
- **HTTP Status Codes** - Constants for HTTP status codes

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── constants.ts         # Application-wide constants and configuration
│   │   ├── corsOptions.ts       # CORS configuration for cross-origin requests
│   │   ├── database.ts          # MongoDB connection setup and configuration
│   │   └── swagger.ts           # Swagger/OpenAPI documentation configuration
│   ├── controllers/
│   │   ├── authController.ts    # Authentication logic (register, login, token refresh)
│   │   ├── ticketsController.ts # Ticket CRUD operations and AI analysis
│   │   └── usersController.ts   # User management and profile operations
│   ├── errors/
│   │   └── CustomAPIError.ts    # Custom error class for consistent API responses
│   ├── inngest/
│   │   ├── client.ts            # Inngest client configuration
│   │   ├── handler.ts           # Inngest event handler setup
│   │   └── functions/
│   │       ├── onTicketCreated.ts    # Background job for AI ticket analysis
│   │       └── onUserSignup.ts       # Background job for user onboarding
│   ├── middleware/
│   │   ├── authenticateSocket.ts     # WebSocket authentication middleware
│   │   ├── authenticateUser.ts       # JWT authentication middleware
│   │   ├── authorize.ts              # Role-based authorization middleware
│   │   ├── errorHandler.ts           # Global error handling middleware
│   │   ├── notFound.ts               # 404 error handler middleware
│   │   └── rateLimiter.ts            # API rate limiting configuration
│   ├── models/
│   │   ├── RefreshToken.ts      # Refresh token schema and model
│   │   ├── Ticket.ts            # Ticket schema with AI analysis fields
│   │   └── User.ts              # User schema with role-based permissions
│   ├── routes/
│   │   ├── auth.ts              # Authentication routes (login, register, refresh)
│   │   ├── tickets.ts           # Ticket management routes (CRUD, assignment)
│   │   └── users.ts             # User management routes (profile, admin operations)
│   ├── sockets/
│   │   └── socket.ts            # WebSocket event handlers and room management
│   ├── types/
│   │   ├── auth.d.ts            # Authentication TypeScript definitions
│   │   ├── express.d.ts         # Express.js type extensions
│   │   ├── tickets.d.ts         # Ticket-related TypeScript definitions
│   │   └── users.d.ts           # User-related TypeScript definitions
│   ├── utils/
│   │   ├── analyzeTicket.ts     # AI-powered ticket analysis utility
│   │   ├── getRefreshTokenExpiryDate.ts  # Token expiry calculation
│   │   ├── sendAuthToken.ts     # JWT token generation and sending
│   │   ├── sendMail.ts          # Email sending utility
│   │   └── verifyToken.ts       # JWT token verification utility
│   └── index.ts                 # Application entry point and server setup
├── package.json                 # Dependencies and npm scripts
├── tsconfig.json                # TypeScript configuration
└── swagger.yaml                 # API documentation specification
```
