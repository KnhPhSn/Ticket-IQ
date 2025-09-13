# Client - Frontend Application

The frontend of the AI Ticket Management System is a modern React.js application built with TypeScript, providing an intuitive and responsive user interface for managing support tickets. The client features real-time updates, AI-powered insights, and a comprehensive dashboard for both users and administrators.

## Important Libraries

### Core Framework & Build Tools
- **React 19** - Latest version of React with modern features and performance improvements
- **TypeScript** - Type-safe JavaScript development with enhanced developer experience
- **Vite** - Fast build tool and development server with hot module replacement
- **React Router** - Declarative routing for React applications with protected routes

### State Management & Data Fetching
- **Redux Toolkit** - Simplified Redux state management with built-in best practices
- **Axios** - Promise-based HTTP client for API communication with interceptors

### UI Framework & Styling
- **Material-UI (MUI)** - Comprehensive React component library with modern design
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

### Real-time Communication
- **Socket.io Client** - Real-time bidirectional event-based communication with the server
- **React Toastify** - Elegant toast notifications for user feedback

## Project Structure

```
├── src/
│   ├── api/
│   │   ├── axios.ts             # Axios configuration and base setup
│   │   └── interceptors.ts      # Request/response interceptors for authentication
│   ├── components/
│   │   ├── AuthBox.tsx          # Authentication wrapper component
│   │   ├── PageLayout.tsx       # Main layout component with navigation
│   │   ├── PageLoading.tsx      # Loading spinner component
│   │   ├── ProtectedRoute.tsx   # Route protection for authenticated users
│   │   ├── TicketCard.tsx       # Individual ticket display component
│   │   ├── TicketsTabs.tsx      # Tabbed interface for ticket filtering
│   │   └── UserCard.tsx         # User profile display component
│   ├── context/
│   │   └── SocketContext.tsx    # React context for Socket.io management
│   ├── hooks/
│   │   ├── useAuth.ts           # Authentication logic and user management
│   │   ├── useCreateTicket.ts   # Ticket creation functionality
│   │   ├── useGetAssignedTickets.ts  # Fetch assigned tickets hook
│   │   ├── useGetCreatedTickets.ts   # Fetch created tickets hook
│   │   ├── useGetTicketById.ts  # Single ticket retrieval hook
│   │   ├── useGetUsers.ts       # User data fetching hook
│   │   ├── useTicketProgressToast.tsx # Toast notifications for ticket progress
│   │   └── useUpdateUser.ts     # User profile update functionality
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── Admin.tsx        # Admin dashboard with user management
│   │   │   └── UserCardSkeleton.tsx  # Loading skeleton for user cards
│   │   ├── Home/
│   │   │   ├── Home.tsx         # Main dashboard with ticket overview
│   │   │   └── BriefTicketSkeleton.tsx  # Loading skeleton for tickets
│   │   ├── Login/
│   │   │   └── Login.tsx        # User authentication page
│   │   ├── NotFound/
│   │   │   └── NotFound.tsx     # 404 error page
│   │   ├── Signup/
│   │   │   └── Signup.tsx       # User registration page
│   │   └── Ticket/
│   │       ├── Ticket.tsx       # Detailed ticket view and management
│   │       └── TicketSkeleton.tsx    # Loading skeleton for ticket details
│   ├── store/
│   │   ├── store.ts             # Redux store configuration
│   │   └── slices/
│   │       └── authSlice.ts     # Authentication state management
│   ├── types/
│   │   ├── auth.d.ts            # Authentication TypeScript definitions
│   │   ├── backend.d.ts         # Backend response TypeScript definitions
│   │   ├── tickets.d.ts         # Ticket-related TypeScript definitions
│   │   └── users.d.ts           # User-related TypeScript definitions
│   ├── utils/
│   │   ├── formatDate.ts        # Date formatting utilities
│   │   ├── formatTicketStatus.ts     # Ticket status display formatting
│   │   └── truncateText.ts      # Text truncation utility
│   ├── App.tsx                  # Main application component
│   ├── AppRoutes.tsx            # Application routing configuration
│   ├── main.tsx                 # Application entry point
│   ├── index.css                # Global styles and Tailwind imports
│   └── vite-env.d.ts            # Vite environment type definitions
├── public/
│   └── ticket-logo.svg          # Application logo
├── package.json                 # Dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TypeScript config
├── tsconfig.node.json           # Node.js TypeScript config
├── vite.config.ts               # Vite build configuration
├── eslint.config.js             # ESLint configuration
└── index.html                   # HTML entry point
```
