# 🚀 React + Vite
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Install dependencies
```
npm install
```

## Start the development server
```
npm run dev
```

This will start the project locally (default port 5173):
```
http://localhost:5173
```

## Expose your app with HTTPS using Ngrok
Ngrok allows you to access your development environment from any network or device, using a valid HTTPS tunnel (required for camera, geolocation, etc.).

In another terminal, run:
```
ngrok http 5173
```

Ngrok will generate a public URL like:
```
https://xxxxxx.ngrok-free.app
```
Use this URL from any device (LAN or Internet) to test the app with camera and geolocation enabled.

## Production build
For production, you usually do not serve the app with Vite. Instead, you build the static assets and serve them via a real web server (e.g., Nginx, Apache, or Node.js with HTTPS).
```
npm run build
```
- This generates an optimized version of your app in the dist/ folder.
- The files in dist/ can be served by any static server.

## Environment Variables
Create a .env file in the project root:
```
VITE_API_URL=https://api.mydomain.com
VITE_APP_NAME=Job Tracker V2
VITE_ALLOWED_HOSTS=localhost,127.0.0.1,.ngrok-free.app
```
⚠️ Do not include https:// in variables like VITE_NGROK_HOST, since Vite expects only the hostname if you ever use it.

## Serve production locally (optional)
You can test the compiled app (dist/) locally. Using serve:
```
npm install -g serve
serve -s dist
```
By default, this serves on HTTP, not HTTPS.
