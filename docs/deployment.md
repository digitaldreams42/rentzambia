# Deployment Guide

This guide explains how to deploy the RentZambia application to production.

## Prerequisites

1. Node.js >= 18.17.0
2. npm >= 9.0.0
3. A Firebase project
4. A Cloudinary account
5. A SendGrid account (for email delivery)

## Environment Variables

Create a `.env.production` file with the following variables:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id

# Application Configuration
NEXT_PUBLIC_APP_NAME=RentZambia
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Configuration
SENDGRID_API_KEY=your_sendgrid_api_key
```

## Building the Application

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run tests to ensure everything works:

   ```bash
   npm run test
   npm run test:e2e
   ```

3. Build the application:
   ```bash
   npm run build
   ```

## Deploying to Vercel

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Login to your Vercel account:

   ```bash
   vercel login
   ```

3. Deploy the application:
   ```bash
   vercel --prod
   ```

## Setting up Firebase

1. Create a Firebase project at https://console.firebase.google.com/

2. Enable Authentication with Email/Password and Google providers

3. Set up Firestore database with the following collections:
   - `users`
   - `properties`
   - `inquiries`
   - `bookings`
   - `notifications`

4. Set up Cloud Storage for property images

## Setting up Cloudinary

1. Create a Cloudinary account at https://cloudinary.com/

2. Get your Cloud Name, API Key, and API Secret from the Dashboard

3. Set up an upload preset for property images

## Setting up SendGrid

1. Create a SendGrid account at https://sendgrid.com/

2. Create an API key with full access to email sending

3. Verify your sender identity

## Monitoring and Analytics

The application uses the following services for monitoring:

1. Vercel Analytics for web vitals and performance metrics
2. Firebase Analytics for user behavior tracking
3. Sentry for error tracking (optional)

## CI/CD Pipeline

The project includes GitHub Actions for continuous integration:

1. Code is automatically tested on every push to the `main` branch
2. Code is automatically deployed to production on every tag push

To set up CI/CD:

1. Add your environment variables as GitHub Secrets
2. Ensure your GitHub repository has the proper permissions

## Backup and Recovery

1. Regular backups of the Firebase Firestore database are recommended
2. Property images in Cloudinary should be backed up periodically
3. User data should be exported regularly for compliance purposes

## Security Considerations

1. All API keys should be stored as environment variables
2. Firebase rules should be configured to prevent unauthorized access
3. HTTPS should be enforced in production
4. Content Security Policy should be implemented
5. Regular security audits should be performed

## Troubleshooting

### Build Issues

If the build fails, check:

1. All environment variables are set correctly
2. Dependencies are up to date
3. There are no TypeScript errors

### Deployment Issues

If deployment fails, check:

1. Vercel project settings
2. Domain configuration
3. Custom server configuration (if applicable)

### Performance Issues

If the application is slow, check:

1. Image optimization settings
2. Database query performance
3. Third-party API response times
4. Bundle size optimization

## Support

For support, contact the development team or check the project documentation.
