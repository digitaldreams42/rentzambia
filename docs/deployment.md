# Deployment Guide

This document provides instructions for deploying the RentZambia application to various environments.

## Prerequisites

Before deploying, ensure you have:

1. Node.js 18.x or later installed
2. npm 9.x or later installed
3. Access to deployment environment (Vercel, hosting provider, etc.)
4. Environment variables configured
5. Database access (if using external database)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Application Settings
NEXT_PUBLIC_APP_NAME=RentZambia
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_nextauth_secret_here

# Database (if using external database)
DATABASE_URL=your_database_connection_string

# API Keys (if using external services)
CLOUDINARY_URL=your_cloudinary_url
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token

# Email Service
EMAIL_SERVER=your_email_server_config
EMAIL_FROM=noreply@yourdomain.com

# Payment Processing (if using Stripe/PayPal)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Local Development Deployment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Access the application at `http://localhost:3000`

## Production Build

1. Create a production build:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Vercel Deployment

### Automatic Deployment

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Next.js framework
3. Configure environment variables in the Vercel dashboard
4. Deployments will automatically trigger on pushes to the main branch

### Manual Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel --prod
   ```

## Docker Deployment

### Building the Docker Image

1. Build the Docker image:
   ```bash
   docker build -t rentzambia .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 rentzambia
   ```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.local
```

Run with Docker Compose:
```bash
docker-compose up -d
```

## Nginx Configuration

For production deployments behind Nginx, use the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Configuration

For HTTPS, obtain SSL certificates using Let's Encrypt:

1. Install Certbot:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. Obtain certificates:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## Database Deployment

### MongoDB (if using MongoDB)

1. Set up MongoDB Atlas or install MongoDB locally
2. Configure the connection string in environment variables
3. Ensure proper network access and firewall rules

### PostgreSQL (if using PostgreSQL)

1. Set up PostgreSQL database
2. Run database migrations:
   ```bash
   npm run db:migrate
   ```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Deploy to Vercel
      run: npx vercel --token $VERCEL_TOKEN --prod
      env:
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
```

## Monitoring and Logging

### Application Monitoring

Set up monitoring with tools like:

1. **Vercel Analytics** - Built-in analytics for Vercel deployments
2. **Sentry** - Error tracking and performance monitoring
3. **LogRocket** - Session replay and product analytics

### Log Management

Configure logging with:

1. **Winston** - For application logging
2. **Papertrail** - For log aggregation
3. **Datadog** - For infrastructure monitoring

## Backup Strategy

### Code Backup

1. Regular Git commits and pushes
2. GitHub repository backups
3. Branch protection rules

### Data Backup

1. Database backups (daily/weekly)
2. File storage backups (Cloudinary, etc.)
3. Configuration backups

## Security Considerations

### Application Security

1. Keep dependencies up to date:
   ```bash
   npm audit
   npm audit fix
   ```

2. Use environment variables for secrets
3. Implement proper authentication and authorization
4. Validate and sanitize all user inputs
5. Use HTTPS in production

### Network Security

1. Configure firewall rules
2. Use reverse proxy (Nginx)
3. Implement rate limiting
4. Secure database connections

## Performance Optimization

### Build Optimization

1. Optimize images with Next.js Image component
2. Use code splitting and dynamic imports
3. Implement caching strategies
4. Minimize bundle size

### Runtime Optimization

1. Enable compression (gzip/brotli)
2. Use CDN for static assets
3. Implement server-side rendering
4. Optimize database queries

## Scaling

### Horizontal Scaling

1. Use load balancers
2. Implement session management
3. Use external caching (Redis)
4. Database connection pooling

### Vertical Scaling

1. Increase server resources
2. Optimize database performance
3. Implement caching layers

## Troubleshooting

### Common Issues

1. **Build failures**: Check Node.js version compatibility
2. **Deployment errors**: Verify environment variables
3. **Performance issues**: Check resource utilization
4. **Database connection**: Verify connection strings and network access

### Debugging

1. Check application logs
2. Use monitoring tools
3. Enable debug mode if needed
4. Review error traces

## Maintenance

### Regular Tasks

1. Update dependencies
2. Review security vulnerabilities
3. Monitor application performance
4. Check backup integrity
5. Review logs for errors

### Updates

1. Test updates in staging environment
2. Backup before major updates
3. Follow semantic versioning
4. Document changes

## Rollback Procedures

### Code Rollback

1. Revert Git commits
2. Deploy previous version
3. Monitor for issues

### Data Rollback

1. Restore database from backup
2. Restore file storage
3. Update configuration if needed

## Support

For deployment issues, contact:
- Development team
- Hosting provider support
- Community forums

## Version History

- v1.0.0: Initial deployment
- v1.1.0: Added monitoring and logging
- v1.2.0: Implemented CI/CD pipeline

## License

This deployment guide is part of the RentZambia project and is licensed under the MIT License.