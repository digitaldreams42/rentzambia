# API Documentation

This document outlines the API structure and endpoints for the RentZambia application.

## Overview

The RentZambia API follows RESTful principles and uses JSON for request/response formatting. All endpoints are prefixed with `/api/v1`.

## Authentication

Most endpoints require authentication via JWT tokens. Tokens should be included in the `Authorization` header:

```
Authorization: Bearer <token>
```

### Login

```
POST /api/v1/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "tenant"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "tenant"
  }
}
```

### Register

```
POST /api/v1/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+260971234567",
  "role": "tenant"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "role": "tenant"
  }
}
```

## Properties

### Get Properties

```
GET /api/v1/properties
```

**Query Parameters:**
- `search` (string): Search term
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `bedrooms` (number): Number of bedrooms
- `type` (string): Property type
- `furnished` (boolean): Furnished status
- `page` (number): Page number for pagination
- `limit` (number): Number of items per page

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Modern 2-Bedroom Apartment",
      "location": "Kabulonga, Lusaka",
      "price": 3500,
      "bedrooms": 2,
      "bathrooms": 2,
      "area": 85,
      "type": "apartment",
      "furnished": true,
      "images": ["image_url_1", "image_url_2"],
      "landlord": {
        "id": 10,
        "name": "Sarah Banda",
        "rating": 4.8
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "pages": 5
  }
}
```

### Get Property by ID

```
GET /api/v1/properties/{id}
```

**Response:**
```json
{
  "id": 1,
  "title": "Modern 2-Bedroom Apartment",
  "description": "Beautiful modern apartment...",
  "location": "Kabulonga, Lusaka",
  "price": {
    "monthly": 3500,
    "yearly": 38000,
    "shortTerm": 150
  },
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 85,
  "type": "apartment",
  "furnished": true,
  "availableFrom": "2025-03-01",
  "amenities": ["WiFi", "Parking", "Security"],
  "images": ["image_url_1", "image_url_2"],
  "landlord": {
    "id": 10,
    "name": "Sarah Banda",
    "rating": 4.8,
    "verified": true,
    "phone": "+260971234567",
    "email": "sarah@example.com"
  }
}
```

### Create Property (Landlord)

```
POST /api/v1/properties
```

**Request Body:**
```json
{
  "title": "Modern 2-Bedroom Apartment",
  "description": "Beautiful modern apartment...",
  "location": "Kabulonga, Lusaka",
  "price": {
    "monthly": 3500,
    "yearly": 38000,
    "shortTerm": 150
  },
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 85,
  "type": "apartment",
  "furnished": true,
  "availableFrom": "2025-03-01",
  "amenities": ["WiFi", "Parking", "Security"],
  "images": ["image_url_1", "image_url_2"]
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Modern 2-Bedroom Apartment",
  "description": "Beautiful modern apartment...",
  "location": "Kabulonga, Lusaka",
  "price": {
    "monthly": 3500,
    "yearly": 38000,
    "shortTerm": 150
  },
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 85,
  "type": "apartment",
  "furnished": true,
  "availableFrom": "2025-03-01",
  "amenities": ["WiFi", "Parking", "Security"],
  "images": ["image_url_1", "image_url_2"],
  "status": "pending",
  "landlordId": 10
}
```

### Update Property (Landlord)

```
PUT /api/v1/properties/{id}
```

**Request Body:**
```json
{
  "title": "Updated Property Title",
  "description": "Updated description...",
  "price": {
    "monthly": 3600
  }
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated Property Title",
  "description": "Updated description...",
  "location": "Kabulonga, Lusaka",
  "price": {
    "monthly": 3600,
    "yearly": 38000,
    "shortTerm": 150
  },
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 85,
  "type": "apartment",
  "furnished": true,
  "availableFrom": "2025-03-01",
  "amenities": ["WiFi", "Parking", "Security"],
  "images": ["image_url_1", "image_url_2"],
  "status": "pending",
  "landlordId": 10
}
```

### Delete Property (Landlord)

```
DELETE /api/v1/properties/{id}
```

**Response:**
```json
{
  "message": "Property deleted successfully"
}
```

## Users

### Get User Profile

```
GET /api/v1/users/profile
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+260971234567",
  "role": "tenant",
  "joinDate": "2025-01-15",
  "bio": "I'm a professional looking for accommodation...",
  "preferences": {
    "propertyType": "apartment",
    "budget": "2000-4000",
    "location": "Kabulonga, Roma",
    "moveInDate": "2025-03-01"
  }
}
```

### Update User Profile

```
PUT /api/v1/users/profile
```

**Request Body:**
```json
{
  "name": "John Smith",
  "phone": "+260961234567",
  "bio": "Updated bio...",
  "preferences": {
    "budget": "2500-4500"
  }
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Smith",
  "email": "user@example.com",
  "phone": "+260961234567",
  "role": "tenant",
  "joinDate": "2025-01-15",
  "bio": "Updated bio...",
  "preferences": {
    "propertyType": "apartment",
    "budget": "2500-4500",
    "location": "Kabulonga, Roma",
    "moveInDate": "2025-03-01"
  }
}
```

## Inquiries

### Create Inquiry

```
POST /api/v1/inquiries
```

**Request Body:**
```json
{
  "propertyId": 1,
  "message": "I'm interested in this property. When can I schedule a visit?"
}
```

**Response:**
```json
{
  "id": 1,
  "propertyId": 1,
  "userId": 5,
  "message": "I'm interested in this property. When can I schedule a visit?",
  "date": "2025-02-15T10:30:00Z",
  "status": "pending"
}
```

### Get Inquiries (Landlord)

```
GET /api/v1/inquiries
```

**Query Parameters:**
- `propertyId` (number): Filter by property
- `status` (string): Filter by status

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "propertyId": 1,
      "propertyTitle": "Modern 2-Bedroom Apartment",
      "userId": 5,
      "userName": "John Doe",
      "userEmail": "john@example.com",
      "userPhone": "+260971234567",
      "message": "I'm interested in this property...",
      "date": "2025-02-15T10:30:00Z",
      "status": "pending"
    }
  ]
}
```

### Update Inquiry Status (Landlord)

```
PUT /api/v1/inquiries/{id}
```

**Request Body:**
```json
{
  "status": "responded"
}
```

**Response:**
```json
{
  "id": 1,
  "propertyId": 1,
  "userId": 5,
  "message": "I'm interested in this property...",
  "date": "2025-02-15T10:30:00Z",
  "status": "responded"
}
```

## Bookings

### Create Booking

```
POST /api/v1/bookings
```

**Request Body:**
```json
{
  "propertyId": 1,
  "startDate": "2025-03-01",
  "endDate": "2025-03-31"
}
```

**Response:**
```json
{
  "id": 1,
  "propertyId": 1,
  "tenantId": 5,
  "startDate": "2025-03-01",
  "endDate": "2025-03-31",
  "status": "pending",
  "totalPrice": 3500
}
```

### Get Bookings

```
GET /api/v1/bookings
```

**Query Parameters:**
- `userId` (number): Filter by user (for tenants)
- `landlordId` (number): Filter by landlord
- `status` (string): Filter by status

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "property": {
        "id": 1,
        "title": "Modern 2-Bedroom Apartment",
        "location": "Kabulonga, Lusaka",
        "price": 3500
      },
      "tenant": {
        "id": 5,
        "name": "John Doe"
      },
      "startDate": "2025-03-01",
      "endDate": "2025-03-31",
      "status": "confirmed",
      "totalPrice": 3500
    }
  ]
}
```

### Update Booking Status

```
PUT /api/v1/bookings/{id}
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

**Response:**
```json
{
  "id": 1,
  "propertyId": 1,
  "tenantId": 5,
  "startDate": "2025-03-01",
  "endDate": "2025-03-31",
  "status": "confirmed",
  "totalPrice": 3500
}
```

## Admin Endpoints

### Get Users (Admin)

```
GET /api/v1/admin/users
```

**Query Parameters:**
- `role` (string): Filter by role
- `status` (string): Filter by status
- `search` (string): Search term

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "tenant",
      "status": "active",
      "properties": 0,
      "joinDate": "2025-01-15"
    }
  ]
}
```

### Update User Status (Admin)

```
PUT /api/v1/admin/users/{id}
```

**Request Body:**
```json
{
  "status": "suspended"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "tenant",
  "status": "suspended",
  "properties": 0,
  "joinDate": "2025-01-15"
}
```

### Get Properties (Admin)

```
GET /api/v1/admin/properties
```

**Query Parameters:**
- `status` (string): Filter by status
- `landlordId` (number): Filter by landlord
- `search` (string): Search term

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "title": "Modern 2-Bedroom Apartment",
      "location": "Kabulonga, Lusaka",
      "price": 3500,
      "status": "published",
      "views": 124,
      "landlord": {
        "id": 10,
        "name": "Sarah Banda"
      }
    }
  ]
}
```

### Update Property Status (Admin)

```
PUT /api/v1/admin/properties/{id}
```

**Request Body:**
```json
{
  "status": "published"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Modern 2-Bedroom Apartment",
  "location": "Kabulonga, Lusaka",
  "price": 3500,
  "status": "published",
  "views": 124,
  "landlordId": 10
}
```

## Error Handling

All API responses follow a consistent error format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The provided data is invalid",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- 100 requests per hour for unauthenticated endpoints
- 1000 requests per hour for authenticated endpoints
- 10 requests per minute for sensitive endpoints (login, register)

## Response Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `422`: Unprocessable Entity
- `429`: Too Many Requests
- `500`: Internal Server Error

## Webhooks

The API supports webhooks for real-time notifications:

### Property Published
Triggered when a property is published:
```
POST /webhooks/property-published
```

### Booking Confirmed
Triggered when a booking is confirmed:
```
POST /webhooks/booking-confirmed
```

## Data Models

### User
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "phone": "+260971234567",
  "role": "tenant|landlord|agent|admin",
  "status": "active|pending|suspended",
  "joinDate": "2025-01-15T00:00:00Z",
  "bio": "User biography",
  "preferences": {
    "propertyType": "apartment|house|studio",
    "budget": "string",
    "location": "string",
    "moveInDate": "2025-03-01"
  }
}
```

### Property
```json
{
  "id": 1,
  "title": "Property Title",
  "description": "Property description",
  "location": "Property location",
  "price": {
    "monthly": 3500,
    "yearly": 38000,
    "shortTerm": 150
  },
  "bedrooms": 2,
  "bathrooms": 2,
  "area": 85,
  "type": "apartment|house|studio",
  "furnished": true,
  "availableFrom": "2025-03-01",
  "amenities": ["WiFi", "Parking"],
  "images": ["image_url_1", "image_url_2"],
  "status": "draft|pending|published|rented|rejected",
  "landlordId": 10,
  "views": 124,
  "createdAt": "2025-01-15T00:00:00Z",
  "updatedAt": "2025-01-15T00:00:00Z"
}
```

### Inquiry
```json
{
  "id": 1,
  "propertyId": 1,
  "userId": 5,
  "message": "Inquiry message",
  "date": "2025-02-15T10:30:00Z",
  "status": "pending|responded|closed"
}
```

### Booking
```json
{
  "id": 1,
  "propertyId": 1,
  "tenantId": 5,
  "startDate": "2025-03-01",
  "endDate": "2025-03-31",
  "status": "pending|confirmed|cancelled|completed",
  "totalPrice": 3500,
  "createdAt": "2025-02-15T10:30:00Z"
}
```