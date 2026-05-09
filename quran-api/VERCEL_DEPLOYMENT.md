# Vercel Deployment Guide for Quran API

## Prerequisites
- Vercel Account (create at https://vercel.com)
- GitHub repository with your code
- PostgreSQL database (free tier available via Vercel Postgres)

## Step 1: Create GitHub Repository
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/quran-api.git
git branch -M main
git push -u origin main
```

## Step 2: Create Vercel Project
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Find and import your quran-api repository
5. Click "Import"

## Step 3: Configure Environment Variables
In Vercel dashboard:
1. Go to your project settings → "Environment Variables"
2. Add the following:

```
NODE_ENV = production
DATABASE_URL = (PostgreSQL connection string from Vercel Postgres)
PORT = 3000
```

## Step 4: Set Up Database
1. In Vercel Dashboard, go to "Storage" tab
2. Create a new "Postgres" database (free tier)
3. Copy the `POSTGRES_URL_NON_POOLING` value
4. Paste it into the `DATABASE_URL` environment variable

## Step 5: Deploy
1. Click "Deploy" button
2. Wait for deployment to complete
3. Your API will be live at: `https://YOUR_PROJECT.vercel.app`

## Important Notes

### Database Migration Needed
Your current SQLite database needs to be migrated to PostgreSQL:
- Export your current data from SQLite
- Import it into PostgreSQL on Vercel
- Update your code to use PostgreSQL drivers if needed

### Better SQLite3 Issue
The `better-sqlite3` native module may not work on Vercel. Consider:
- Using a PostgreSQL driver like `pg` or `@nestjs/typeorm`
- Or using serverless SQLite alternatives (Turso/D1)

### Current Setup Issues
Your `.env` references `DB_PATH=./quran.sqlite` which won't work on Vercel because:
- Vercel filesystem is ephemeral (data lost after each deployment)
- Native modules like `better-sqlite3` may not compile on Vercel's build environment

### Recommended Next Steps
1. Set up PostgreSQL database via Vercel
2. Update database service to use PostgreSQL
3. Migrate your SQLite data to PostgreSQL
4. Update environment variable handling to use `DATABASE_URL`
5. Deploy to Vercel

## Testing Locally Before Deployment
```bash
# Install dependencies
npm install

# Build
npm run build

# Start production server
npm run start:prod
```

## Troubleshooting

### Build fails with "better-sqlite3"
- This is expected on Vercel. You'll need to migrate to PostgreSQL or use serverless SQLite.

### Environment variables not loading
- Check Vercel dashboard → Project Settings → Environment Variables
- Ensure you've set `NODE_ENV=production`

### Database connection timeout
- Check DATABASE_URL is correct
- Ensure your PostgreSQL database is accessible from Vercel
- Check IP allowlist in database settings
