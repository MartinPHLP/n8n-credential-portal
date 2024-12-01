# N8N Credentials Manager

A simple web interface to help customers securely connect their service providers (Google, IMAP, etc.) to N8N workflows.

## 🎯 Overview

This application provides a user-friendly interface that simplifies the process of managing credentials for N8N workflows. Instead of dealing directly with N8N's technical interface, customers can easily connect their services through a streamlined experience.

## ✨ Features

- Simple and intuitive user interface
- Secure credential management
- Support for multiple providers:
  - Google services
  - IMAP email accounts
  - ...
- Direct integration with N8N
- Automatic credential validation

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm
- PM2 (for production deployment)
- N8N instance with API access

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/n8n-credentials-manager.git
cd n8n-credentials-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create your environment configuration:
```bash
cp .env.example .env
```
Edit `.env` with your N8N instance details and API key.

4. Build and start the application:
```bash
npm run build
pm2 start npm --name "credentials-app" -- start
```

## 🛠️ Development

To run the application in development mode:
```bash
npm run dev
```

## 📊 Monitoring

Monitor your application using PM2:
```bash
pm2 logs credentials-app     # View logs
pm2 status                  # Check status
pm2 monit                   # Detailed monitoring
```

## 🔄 Updates

To update the application:
```bash
git pull                    # Get latest changes
npm install                 # Install new dependencies
npm run build              # Rebuild
pm2 restart credentials-app # Restart the application
```

## 🔒 Security

- All credentials are securely transmitted to N8N
- No sensitive data is stored in this application
- Communication with N8N is done via API keys

