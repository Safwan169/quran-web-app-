# Turso + Vercel Deployment Guide

This guide explains how to deploy your Quran API to Vercel with a free Turso serverless SQLite database.

## Why Turso?

✅ **Free** - No credit card required, generous free tier  
✅ **SQLite** - Your existing database format works seamlessly  
✅ **Serverless** - No database management needed  
✅ **Replicated** - Automatic data replication globally  
✅ **Works with Vercel** - Perfect for serverless deployments  

---

## Prerequisites

- GitHub account with your repository
- Vercel account (free tier available)
- Turso account (free tier available)
- Node.js 18+

---

## Step 1: Set Up Turso

### 1a. Create Turso Account
1. Go to https://turso.tech
2. Click "Sign Up"
3. Sign up with GitHub (recommended) or email

### 1b. Create a Database
```bash
# Install Turso CLI
npm install -g @turso/cli

# Or use Homebrew on macOS
brew install turso

# Authenticate
turso auth login

# Create a new database
turso db create quran_api

# Get your connection string
turso db show quran_api --url

# Get your auth token (for Vercel)
turso db tokens create quran_api
```

Save these values:
- **Connection URL**: Something like `libsql://quran_api-username.turso.io`
- **Auth Token**: Your secret token for Vercel

### 1c. Verify Seeding Works Locally
```bash
# Update .env with your local Turso database
TURSO_CONNECTION_URL=file:./quran.sqlite
NODE_ENV=development

# Run the application
npm run start:dev

# The application will automatically seed the database on first run
```

---

## Step 2: Deploy to GitHub

```bash
# Initialize git if not already done
git init

# Add all changes
git add .

# Commit
git commit -m "Add Turso SQLite support for Vercel deployment"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/quran-api.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### 3a. Create Vercel Project
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Click "Import Git Repository"
4. Find and select `quran-api`
5. Click "Import"

### 3b. Add Environment Variables

On the Vercel project settings page, go to **Settings** → **Environment Variables** and add:

```
TURSO_CONNECTION_URL = libsql://quran_api-username.turso.io
TURSO_AUTH_TOKEN = your_auth_token_from_turso
NODE_ENV = production
PORT = 3000
```

Replace:
- `libsql://quran_api-username.turso.io` with your actual Turso URL
- `your_auth_token_from_turso` with your actual auth token

### 3c. Deploy
1. Vercel will automatically start building when you push to GitHub
2. Wait for the deployment to complete
3. Your API will be live at: `https://quran-api-username.vercel.app`

---

## Step 4: Verify Deployment

### Check Health Endpoint
```bash
curl https://quran-api-username.vercel.app/health
```

Expected response:
```json
{
  "status": "ok",
  "db": "connected",
  "uptime": 123.45,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Test API
```bash
# Get all surahs
curl https://quran-api-username.vercel.app/surahs

# Search
curl "https://quran-api-username.vercel.app/search?q=peace&lang=en"

# Get a surah
curl https://quran-api-username.vercel.app/surahs/1/ayahs
```

---

## Troubleshooting

### Database Not Seeding

**Problem**: "Cannot find module @libsql/client"

**Solution**:
```bash
npm install @libsql/client
npm run build
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

---

### Connection Refused

**Problem**: "Error: Connection refused"

**Solution**: 
1. Verify `TURSO_CONNECTION_URL` and `TURSO_AUTH_TOKEN` are correct in Vercel
2. Check that your Turso database exists: `turso db list`
3. Restart the Vercel deployment

---

### Database Empty

**Problem**: API returns empty results

**Solution**:
The database seeds automatically on first run. Wait 1-2 minutes after deployment for seeding to complete. Check Vercel logs:
1. Go to Vercel project → Deployments
2. Click the latest deployment
3. Check logs for "Quran database seed completed"

---

## Managing Your Turso Database

### View Database Size
```bash
turso db show quran_api
```

### Backup Your Data
```bash
turso db dump quran_api > backup.sql
```

### Scale Your Database
Turso free tier includes:
- Up to 3 databases
- 9 GB combined storage
- Unlimited queries (within fair use)

For production with higher traffic, upgrade to Turso Pro ($29/month).

---

## Local Development

### Using Local SQLite
For faster local development, use a local file:

```env
TURSO_CONNECTION_URL=file:./quran.sqlite
NODE_ENV=development
```

### Using Remote Turso
To test with remote database locally:

```env
TURSO_CONNECTION_URL=libsql://quran_api-username.turso.io
TURSO_AUTH_TOKEN=your_auth_token
NODE_ENV=development
```

---

## Cost Breakdown

✅ **Vercel**: Free (generous free tier for hobby projects)  
✅ **Turso**: Free (3 databases, 9 GB storage)  
✅ **Total**: **$0/month**

Upgrade when you need:
- Vercel Pro: $20/month (faster builds, more bandwidth)
- Turso Pro: $29/month (more databases, 24/7 support)

---

## Next Steps

- [ ] Deploy to GitHub
- [ ] Create Vercel project
- [ ] Set environment variables
- [ ] Verify health endpoint
- [ ] Test API endpoints
- [ ] Set up domain (optional)
- [ ] Monitor Vercel logs

---

## Useful Links

- [Turso Docs](https://docs.turso.tech)
- [Vercel Docs](https://vercel.com/docs)
- [NestJS + Turso](https://docs.turso.tech/sdk-reference/typescript-nodejs)
- [LibSQL Client](https://github.com/tursodatabase/libsql-client-ts)

---

## Support

If you encounter issues:
1. Check Vercel logs: Dashboard → Deployments → Latest → Logs
2. Check Turso dashboard: https://console.turso.tech
3. See "Troubleshooting" section above
