# Architecture Documentation

This document describes the architecture of the RentZambia application.

## Overview

RentZambia is a full-stack web application built with Next.js 15, TypeScript, and Tailwind CSS. It follows a modern, scalable architecture that separates concerns between the frontend, backend services, and data layer.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                            Client Layer                             │
├─────────────────────────────────────────────────────────────────────┤
│                       Next.js Frontend (React)                      │
│                        - Pages & Components                         │
│                        - State Management                           │
│                        - Routing & Navigation                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                           Service Layer                             │
├─────────────────────────────────────────────────────────────────────┤
│                        API Service Layer                            │
│                        - Authentication                             │
│                        - Property Management                        │
│                        - User Management                            │
│                        - Booking & Inquiries                        │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                            Data Layer                               │
├─────────────────────────────────────────────────────────────────────┤
│                        Database (MongoDB)                           │
│                        - Users Collection                           │
│                        - Properties Collection                      │
│                        - Bookings Collection                        │
│                        - Inquiries Collection                       │
└─────────────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Next.js App Router

The application uses Next.js 15's App Router for file-based routing:

```
src/app/
├── (auth)/          # Authentication routes (login, register)
├── admin/           # Admin dashboard routes
├── agent/           # Agent dashboard routes
├── landlord/        # Landlord dashboard routes
├── property/        # Property detail routes
├── tenant/          # Tenant dashboard routes
├── layout.tsx       # Root layout
└── page.tsx         # Home page
```

### Component Architecture

Components are organized by functionality:

```
src/components/
├── admin/           # Admin-specific components
├── auth/            # Authentication components
├── dashboard/       # Dashboard components
├── landlord/        # Landlord-specific components
├── property/        # Property-related components
├── tenant/          # Tenant-specific components
└── ui/              # Generic UI components
```

### State Management

The application uses a combination of state management approaches:

1. **React Context API** - For global state (authentication, theme)
2. **Component State** - For local UI state
3. **Custom Hooks** - For complex state logic and data fetching

### Styling

- **Tailwind CSS** - For utility-first styling
- **CSS Modules** - For component-specific styles
- **Custom CSS Variables** - For theming

## Backend Architecture

### API Layer

The API layer is implemented using Next.js API routes:

```
src/app/api/
├── v1/
│   ├── auth/        # Authentication endpoints
│   ├── properties/  # Property management endpoints
│   ├── users/       # User management endpoints
│   ├── bookings/    # Booking endpoints
│   ├── inquiries/   # Inquiry endpoints
│   └── admin/       # Admin endpoints
└── webhooks/        # Webhook endpoints
```

### Service Layer

Business logic is encapsulated in service classes:

```
src/services/
├── apiService.ts    # API service layer
├── authService.ts   # Authentication service
├── propertyService.ts # Property service
├── userService.ts   # User service
├── bookingService.ts # Booking service
└── inquiryService.ts # Inquiry service
```

## Data Layer

### Database Schema

The application uses MongoDB with the following collections:

#### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  role: String, // tenant, landlord, agent, admin
  status: String, // active, pending, suspended
  password: String, // hashed
  preferences: Object,
  joinDate: Date,
  lastLogin: Date
}
```

#### Properties Collection

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  location: String,
  price: {
    monthly: Number,
    yearly: Number,
    shortTerm: Number
  },
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  type: String,
  furnished: Boolean,
  availableFrom: Date,
  amenities: [String],
  images: [String],
  status: String, // draft, pending, published, rented, rejected
  landlordId: ObjectId,
  views: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Bookings Collection

```javascript
{
  _id: ObjectId,
  propertyId: ObjectId,
  tenantId: ObjectId,
  startDate: Date,
  endDate: Date,
  status: String, // pending, confirmed, cancelled, completed
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

#### Inquiries Collection

```javascript
{
  _id: ObjectId,
  propertyId: ObjectId,
  userId: ObjectId,
  message: String,
  status: String, // pending, responded, closed
  createdAt: Date,
  updatedAt: Date
}
```

## Security Architecture

### Authentication

- **JWT Tokens** - For stateless authentication
- **Password Hashing** - Using bcrypt
- **Role-Based Access Control** - For authorization
- **Session Management** - With refresh tokens

### Data Protection

- **Input Validation** - At API level
- **Sanitization** - To prevent XSS attacks
- **Rate Limiting** - To prevent abuse
- **CORS** - For secure cross-origin requests

### Network Security

- **HTTPS** - Enforced in production
- **Security Headers** - For additional protection
- **Content Security Policy** - To prevent injection attacks

## Deployment Architecture

### Infrastructure

- **Vercel** - For frontend hosting
- **MongoDB Atlas** - For database hosting
- **Cloudinary** - For image storage
- **Twilio** - For SMS notifications
- **SendGrid** - For email notifications

### CI/CD Pipeline

- **GitHub Actions** - For automated testing and deployment
- **Automated Testing** - Unit, integration, and E2E tests
- **Code Quality Checks** - Linting and formatting
- **Security Scanning** - Dependency vulnerability checks

## Performance Architecture

### Caching

- **Browser Caching** - For static assets
- **Server-Side Caching** - For API responses
- **Database Indexing** - For query optimization

### Optimization

- **Code Splitting** - For faster initial loads
- **Image Optimization** - Using Next.js Image component
- **Bundle Optimization** - Minification and tree-shaking
- **Database Query Optimization** - Proper indexing and aggregation

## Scalability Architecture

### Horizontal Scaling

- **Load Balancing** - Distribute traffic
- **Database Sharding** - For large datasets
- **CDN** - For global content delivery
- **Microservices** - For future expansion

### Vertical Scaling

- **Database Optimization** - Better hardware and indexing
- **Application Optimization** - Better algorithms and caching
- **Infrastructure Scaling** - More powerful servers

## Monitoring and Logging

### Application Monitoring

- **Error Tracking** - Sentry integration
- **Performance Monitoring** - Web Vitals tracking
- **User Analytics** - Usage patterns and behavior

### Infrastructure Monitoring

- **Server Monitoring** - CPU, memory, disk usage
- **Database Monitoring** - Query performance and connections
- **Network Monitoring** - Latency and uptime

### Logging

- **Application Logs** - Structured logging
- **Error Logs** - Detailed error tracking
- **Audit Logs** - Security and compliance

## Disaster Recovery

### Backup Strategy

- **Database Backups** - Daily automated backups
- **Code Backups** - Git repository
- **Configuration Backups** - Environment variables

### Recovery Procedures

- **Data Recovery** - From database backups
- **Application Recovery** - From Git repository
- **Infrastructure Recovery** - From infrastructure as code

## Future Architecture Improvements

### Planned Enhancements

1. **Microservices Architecture** - Separate services for different domains
2. **Real-time Features** - WebSocket integration for notifications
3. **Advanced Analytics** - Machine learning for property recommendations
4. **Mobile App** - Native mobile applications
5. **Multi-tenancy** - Support for multiple countries/regions

### Technology Roadmap

1. **GraphQL API** - For more flexible data fetching
2. **Redis Caching** - For improved performance
3. **Elasticsearch** - For advanced search capabilities
4. **Kubernetes** - For container orchestration
5. **Serverless Functions** - For event-driven architecture

## Conclusion

The RentZambia architecture is designed to be scalable, secure, and maintainable. It follows modern best practices and is built with future growth in mind. The separation of concerns between layers makes it easy to understand, test, and modify.
