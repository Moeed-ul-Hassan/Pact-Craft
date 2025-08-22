# Legal Contract Template Generator

## Overview

This is a web application that generates professional legal contracts for freelancers, small agencies, and consultants. The system provides an affordable alternative to hiring lawyers by offering customizable contract templates with intelligent form generation and document export capabilities.

The application solves key pain points including high legal costs, time wasted searching for templates, difficulty in customization, and legal risks from using inadequate free templates. It focuses on essential contract types like NDAs, service agreements, freelance contracts, and specialized agreements for web development, graphic design, content writing, and consulting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation schemas

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for contract generation and management
- **Request Processing**: Express middleware for JSON parsing, logging, and error handling
- **Template Engine**: Custom contract generation system with placeholder replacement

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Storage Interface**: Abstracted storage layer with both database and in-memory implementations
- **Data Models**: Users and Contracts tables with JSON storage for contract data

### Authentication and Authorization
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **User Model**: Basic username/password authentication system
- **Access Control**: Contract ownership verification and user-specific data access

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting for production data storage
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL interactions

### Email Services
- **SendGrid**: Email delivery service for contract sharing and notifications
- **Configuration**: API key-based authentication for email sending capabilities

### UI Components and Styling
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility
- **shadcn/ui**: Pre-built component library built on top of Radix UI
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library for consistent iconography

### Document Generation
- **jsPDF**: Client-side PDF generation for contract exports
- **Custom Word Export**: HTML-to-Word conversion for .docx file generation

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **Replit Integration**: Development environment with runtime error overlays