# TOP SPEED - Deployment Guide

## 🚀 Live Deployment URLs

- **Frontend:** https://topspeed.vercel.app
- **Backend API:** https://backend-blush-eta-78.vercel.app
- **GitHub Repository:** https://github.com/ngtr613-eng/top-speed

---

## 📊 Current Hosting Setup

### Frontend (Vercel)
- **Status:** 24/7 Online
- **Plan:** Free (Vercel Hobby)
- **Bandwidth:** Unlimited
- **Build:** Automatic on git push
- **CDN:** Global (Fast worldwide access)

### Backend (Vercel)
- **Status:** 24/7 Online
- **Plan:** Free (Vercel Hobby)
- **Compute:** 100 hours/month
- **Database:** MongoDB Atlas (Free tier)
- **Auto-deploy:** From GitHub main branch

### Database (MongoDB Atlas)
- **Status:** 24/7 Online
- **Plan:** Free M0 (Shared)
- **Storage:** 512 MB
- **Connection:** Automatic pooling

---

## 🔧 Environment Variables Set

### Backend (Vercel)
- ✅ DATABASE_URL
- ✅ JWT_SECRET
- ✅ NODE_ENV=production
- ✅ EMAIL_USER
- ✅ EMAIL_APP_PASSWORD
- ✅ SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
- ✅ TEAM_EMAIL
- ✅ DEV_EMAILS

### Frontend (Vercel - Optional)
- ✅ VITE_API_URL (optional - fallback to hardcoded URL)

---

## 📱 Features

### Desktop (md+ breakpoints)
- Full navigation header with all menus
- Settings and logout buttons
- Admin Dashboard access
- Responsive layout

### Mobile (sm - md)
- Hamburger menu (☰)
- All navigation items in dropdown
- Touch-friendly buttons
- Optimized spacing

---

## 🔄 How to Update

### Push to Production
```bash
# Make changes locally
git add .
git commit -m "Your message"
git push origin main

# Frontend auto-deploys from GitHub
# Backend auto-deploys from GitHub
```

### Redeploy Manually (if needed)
```bash
# Frontend
cd frontend
vercel --prod

# Backend
cd backend
vercel --prod
```

---

## 🛡️ Monitoring & Maintenance

### Check Status
- Frontend: https://vercel.com/dashboard
- Backend: https://vercel.com/dashboard
- Database: https://cloud.mongodb.com

### Logs
- **Vercel Logs:** Dashboard → Deployments → Logs
- **Backend Health:** https://backend-blush-eta-78.vercel.app/api/health

---

## 💡 Future Improvements

### Upgrade Options (when needed)

**Backend:**
- Upgrade to Vercel Pro ($20/month) → Unlimited compute
- Move to Railway/Render → More affordable serverless

**Database:**
- Upgrade MongoDB M2 ($9/month) → 2GB storage
- Or use PostgreSQL (cheaper alternative)

**Frontend:**
- Already optimal on Vercel Free

---

## 🚨 Important Notes

1. **Vercel Free Tier:** 100 hours/month for Backend
   - Enough for development/small projects
   - Monitor usage in Vercel Dashboard

2. **MongoDB Free Tier:** 512 MB storage
   - Use indexing for better performance
   - Avoid storing large files

3. **GitHub Connection:** Auto-deploys on push
   - Make sure main branch is production-ready
   - Use branches for development

4. **API Limits:** API-Ninjas has rate limits
   - Free tier: 50 requests/month
   - Upgrade key in backend .env if needed

---

## 📞 Support

- **Repository:** https://github.com/ngtr613-eng/top-speed
- **Issues:** Create GitHub issues for bugs
- **Deployment Problems:** Check Vercel logs

---

**Last Updated:** February 23, 2026
**Status:** ✅ All Systems Online
