#!/bin/bash

# Add environment variables to Vercel Backend
echo "Adding environment variables to Vercel Backend..."

vercel env add DATABASE_URL production main << EOF
mongodb+srv://Bilal:Bilal1422005@cluster0.os3ng3l.mongodb.net/top_speed_db?retryWrites=true&w=majority
EOF

vercel env add JWT_SECRET production main << EOF
top_speed_secret_key_2026
EOF

vercel env add NODE_ENV production main << EOF
production
EOF

vercel env add EMAIL_USER production main << EOF
ngtr613@gmail.com
EOF

vercel env add EMAIL_APP_PASSWORD production main << EOF
zyhiqnowewzrcfkg
EOF

vercel env add SMTP_HOST production main << EOF
smtp.gmail.com
EOF

vercel env add SMTP_PORT production main << EOF
587
EOF

vercel env add SMTP_USER production main << EOF
ngtr613@gmail.com
EOF

vercel env add SMTP_PASS production main << EOF
zyhiqnowewzrcfkg
EOF

vercel env add TEAM_EMAIL production main << EOF
ngtr613@gmail.com
EOF

vercel env add DEV_EMAILS production main << EOF
belalmohamedyousry@gmail.com
EOF

echo "All environment variables added successfully!"
