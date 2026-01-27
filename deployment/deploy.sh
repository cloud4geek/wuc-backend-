echo "🚀 Starting WUC Admission Portal Deployment..."

# 1. Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install dependencies
echo "📦 Installing dependencies..."
sudo apt install -y git nginx postgresql postgresql-contrib

# 3. Clone or update repository
echo "📦 Setting up application..."
if [ -d "/opt/wuc-admission-portal" ]; then
    cd /opt/wuc-admission-portal
    git pull origin main
else
    sudo git clone https://github.com/cloud4geek/wuc-admission-portal.git /opt/wuc-admission-portal
    cd /opt/wuc-admission-portal
fi

# 4. Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
cd backend
npm install --production
cd ../frontend
npm install --production
npm run build

# 5. Set up environment
echo "📦 Setting up environment..."
sudo cp /opt/wuc-admission-portal/deployment/.env.production /opt/wuc-admission-portal/backend/.env

# 6. Set up database
echo "📦 Setting up database..."
sudo -u postgres psql -c "CREATE DATABASE wuc_admissions;"
sudo -u postgres psql -c "CREATE USER wuc_admin WITH PASSWORD 'YourPasswordHere';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE wuc_admissions TO wuc_admin;"

# 7. Run database migrations
echo "📦 Running database migrations..."
cd /opt/wuc-admission-portal/database
sudo -u postgres psql -d wuc_admissions -f schema.sql

# 8. Set up PM2
echo "📦 Setting up PM2..."
cd /opt/wuc-admission-portal/backend
pm2 start server.js --name "wuc-admission-api"
pm2 save
pm2 startup

# 9. Set up Nginx
echo "📦 Setting up Nginx..."
sudo cp /opt/wuc-admission-portal/deployment/nginx.conf /etc/nginx/sites-available/wuc-admission
sudo ln -s /etc/nginx/sites-available/wuc-admission /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 10. Set up SSL (Let's Encrypt)
echo "📦 Setting up SSL..."
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d apply.wuc.edu.gh -d www.apply.wuc.edu.gh

echo "✅ Deployment completed! Visit https://apply.wuc.edu.gh"