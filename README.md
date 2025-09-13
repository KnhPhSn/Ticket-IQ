# Ticket IQ: AI Ticket Management System

An intelligent full-stack web application that revolutionizes support ticket management with AI-powered analysis and real-time collaboration. Built with React.js frontend and Node.js backend, the system automatically analyzes incoming tickets using Google's Gemini AI to determine priority levels, generate summaries, and provide helpful resources for efficient resolution.

## Tech Stack

- <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=white&style=flat" alt="html5">
- <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3&logoColor=white&style=flat" alt="css3">
- <img src="https://img.shields.io/badge/-TypeScript-3178C6?logo=TypeScript&logoColor=white&style=flat" alt="TypeScript">
- <img src="https://img.shields.io/badge/-React-61DAFB?logo=React&logoColor=black&style=flat" alt="React.js">
- <img src="https://img.shields.io/badge/-Redux-764ABC?logo=Redux&logoColor=white&style=flat" alt="Redux">
- <img src="https://img.shields.io/badge/-Node.js-339933?logo=Node.js&logoColor=white&style=flat" alt="Node.js">
- <img src="https://img.shields.io/badge/-Express.js-000000?logo=Express&logoColor=white&style=flat" alt="Express.js">
- <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=MongoDB&logoColor=white&style=flat" alt="MongoDB">
- <img src="https://img.shields.io/badge/-Socket.io-25c2a0?logo=Socket.io&logoColor=white&style=flat" alt="Socket.io">

## Features

### 🤖 AI-Powered Ticket Analysis
- **Automatic Priority Assessment**: AI analyzes ticket content to determine urgency levels (low, medium, high, critical)
- **Intelligent Summarization**: Generates concise summaries of complex technical issues
- **Resource Recommendations**: Provides relevant documentation links and helpful notes for moderators
- **Skill Matching**: Identifies technical skills required for ticket resolution

### 👥 User Management & Authentication
- **Secure Authentication**: JWT-based authentication with refresh token support
- **Role-Based Access Control**: Admin and user roles with appropriate permissions
- **User Profiles**: Comprehensive user management with email verification
- **Protected Routes**: Client-side route protection based on authentication status

### 🎫 Advanced Ticket Management
- **Real-time Updates**: Live ticket status updates using WebSocket connections
- **Ticket Assignment**: Smart assignment system for moderators and technicians
- **Status Tracking**: Complete ticket lifecycle management (TODO → IN_PROGRESS → ASSIGNED → DONE)
- **Advanced Filtering**: Filter tickets by status, priority, and assignment

### ⚡ Real-time Collaboration
- **Live Notifications**: Instant updates on ticket progress and assignments
- **Socket Integration**: Real-time communication between users and moderators
- **Progress Tracking**: Live toast notifications for ticket analysis and assignment

### 🔧 Technical Features
- **RESTful API**: Well-structured backend API with comprehensive endpoints
- **Data Validation**: Input validation and sanitization for security
- **Error Handling**: Comprehensive error handling with custom error classes
- **Rate Limiting**: API rate limiting for enhanced security
- **API Documentation**: Swagger/OpenAPI documentation for easy integration

## Privacy Terms

Please note that all ticket information, user data, and communication within the web application will be securely stored in MongoDB. These data points will be handled responsibly and will not be misused in any way.

For users signing in with **email**, only your email address and profile information will be visible to administrators for ticket assignment purposes, while your **password** is securely hashed using bcrypt and remains inaccessible.

**AI Analysis**: Ticket content is processed by Google's Gemini AI to provide intelligent analysis and recommendations. This processing is done securely and no sensitive data is retained by the AI service beyond the analysis session.

**Real-time Communication**: WebSocket connections are used for real-time updates and are secured with proper authentication mechanisms.

**Your privacy and data security are paramount.** All sensitive information is encrypted in transit and at rest.

## Run Locally

Clone the project

```bash
git clone https://github.com/AdhamElRouby/Ticket-IQ.git
```

Go to the project directory

```bash
cd Ticket-IQ
```

### Backend Setup

Navigate to the server directory

```bash
cd server
```

Install server dependencies

```bash
npm install
```

Create environment file and add your variables

```bash
cp .env.example .env
```

Required environment variables:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `GEMINI_API_KEY` - Google Gemini AI API key
- `EMAIL_SERVICE` - Email service configuration
- `INNGEST_EVENT_KEY` - Inngest event key for background jobs

Start the development server

```bash
npm run dev
```

Start the Inngest development server (in a separate terminal)

```bash
npm run inngest-dev
```

### Frontend Setup

Navigate to the client directory

```bash
cd client
```

Install client dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- API Documentation: `http://localhost:3000/api-docs`

## Contributing

I welcome contributions to this project! Feel free to submit pull requests and suggest improvements. 
If you have any questions or need assistance, don’t hesitate to contact me at adhamelrouby@aucegypt.edu.

## License

This project is licensed under the [MIT License](LICENSE).
