# Quick Reference

## Commands

**Local Development**
```bash
# Install dependencies
npm install

# Start backend server
npm start

# Start frontend server (run in a separate terminal)
npx http-server -p 3000
```

**Git Workflow**
```bash
git add .
git commit -m "Update message"
git push
```

**Health Checks**
```bash
curl http://localhost:3001/health
curl https://your-server.onrender.com/health
```

## Important Files

**Backend (Render)**
- `server.js` (WebSocket logic)
- `package.json` (Dependencies)
- `render.yaml` (Deployment config)
- `.env` (Local environment variables; do not commit)

**Frontend (Vercel)**
- `index.html`, `script.js`, `style.css`
- `Pokemon_NewDataset.js`
- `vercel.json` (Static deployment config)

## Configuration Variables

If your multiplayer is failing to connect, check these two locations:

1. **In `script.js`:**
```javascript
// This must point to your Render URL in production
const SOCKET_URL = 'https://YOUR-SERVER.onrender.com';
```

2. **In Render Environment Variables:**
```
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```
*(Ensure FRONTEND_URL matches your Vercel URL exactly, including `https://` but with no trailing slash).*

## Troubleshooting

| Issue | Typical Cause |
|-------|---------------|
| `EADDRINUSE: port 3001` | A Node process is already running. Kill the process using port 3001. |
| CORS blocked | `FRONTEND_URL` in Render is incorrect or missing. |
| WebSocket connection failed | Render free tier goes to sleep after 15 minutes. It takes 30 seconds to wake up on the first request. |
| Room not found | Render restarted the server, which wipes the in-memory room state. |

## Important Links
- [Render Dashboard](https://dashboard.render.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Socket.IO Documentation](https://socket.io/docs)
