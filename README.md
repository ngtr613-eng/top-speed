# TOP SPEED - Automotive Platform

A production-grade automotive platform featuring a premium car modification website, secure admin dashboard, interactive car configurator, and AI-powered recommendation engine.

## Features

### Public Website
- Dark automotive theme with cinematic UI
- Real car data from automotive APIs
- Smooth transitions and professional design
- Responsive mobile-first design
- PWA support for offline access

### Admin Dashboard
- Secure JWT-based authentication
- Manage cars, brands, and modifications
- Upload and manage car images
- Control car visibility
- Analytics and insights

### Car Modification Configurator
- Interactive customization tool
- Real-time performance impact calculations
- Multiple modification options:
  - Wheels and tires
  - Body kits
  - Exhaust systems
  - Performance upgrades
- Visual feedback with animations

### AI Recommendation Engine
- Rule-based + scoring system
- Recommend cars based on:
  - Performance preferences
  - Engine type
  - Driving style
  - Modification potential
- Clear recommendation explanations

## Tech Stack

**Frontend:**
- React 18+
- Vite
- Framer Motion
- TailwindCSS
- Lucide Icons (SVG-based)

**Backend:**
- Node.js + Express
- MongoDB
- JWT Authentication
- CORS Support

**APIs:**
- API-Ninjas Cars API (real automotive data)
- Real-time data proxy

## Project Structure

```
TOP_SPEED/
├── frontend/                 # React SPA
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API services
│   │   ├── contexts/        # React contexts
│   │   ├── utils/           # Utilities
│   │   ├── styles/          # Global styles
│   │   └── App.jsx
│   ├── dist/                # Build output (Vercel static)
│   ├── public/              # Static assets
│   └── package.json
├── api/                      # Express API (Vercel Serverless)
│   ├── index.js             # Express app entrypoint
│   ├── routes/              # API routes
│   ├── models/              # Database models
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── services/            # Business logic
│   ├── config/              # Configuration
│   └── package.json
├── vercel.json              # Vercel deployment config
├── .vercelignore            # Vercel ignore rules
├── .gitignore               # Git ignore rules
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 24+
- MongoDB (cloud or local)
- API-Ninjas API key
- Vercel account (for deployment)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ngtr613-eng/top-speed.git
   cd TOP_SPEED
   ```

2. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend: http://localhost:5173

3. **Setup API** (in new terminal)
   ```bash
   cd api
   npm install
   npm run dev
   ```
   API: http://localhost:5000

4. **Configure Environment Variables**
   Create `.env` in root:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   API_NINJAS_KEY=your_api_ninjas_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

## Deployment

### Deploy to Vercel

The project is optimized for Vercel deployment with:
- **Frontend:** Served as static site via `@vercel/static-build`
- **API:** Deployed as serverless function at `/api/*`

**Deploy Steps:**
```bash
# Ensure all changes are committed
git add .
git commit -m "Your message"
git push origin main

# Vercel auto-deploys on push, or manually:
vercel --prod
```

**Deployment URLs:**
- Frontend: https://top-speed-ts20.vercel.app/
- API: https://top-speed-ts20.vercel.app/api/



## API Endpoints

### Public APIs
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get car details
- `GET /api/brands` - Get all brands
- `POST /api/recommendations` - Get AI recommendations
- `POST /api/configurator/calculate` - Calculate modification impact

### Admin APIs (Protected)
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/cars` - Create car
- `PUT /api/admin/cars/:id` - Update car
- `DELETE /api/admin/cars/:id` - Delete car
- `POST /api/admin/modifications` - Manage modifications

## Security

- JWT-based authentication
- Secure password hashing (bcrypt)
- Environment variable protection
- CORS configuration
- Input validation
- Rate limiting

## Design

- Dark automotive theme (black, graphite backgrounds)
- Professional accent colors (red, neon blue, orange)
- Real SVG icons only (no emojis)
- Smooth CSS/Framer Motion animations
- Racing-inspired UI panels

## Footer

"Developed by Programmer Bilal Mohamed"

## License

Proprietary - All rights reserved

---

Built as a production-grade system for enterprise clients in the automotive industry.
