# Step-by-Step Local Setup and Deployment

This guide covers how to set up the Pokémon Battle Arena locally and prepare it for deployment.

## 1. Local Environment Setup

First, get the project running on your own machine. 

1. Create a directory and move your files into it.
2. Install the backend dependencies:
```bash
npm install
```
This installs `express` for the web server, `socket.io` for WebSockets, and `cors` to allow cross-origin requests from the frontend.

3. Copy the environment template:
```bash
cp .env.example .env
```
The `.env` file should contain `PORT=3001` and `FRONTEND_URL=http://localhost:3000`.

4. Start the Node server:
```bash
npm start
```
Verify the server is running by opening `http://localhost:3001/health`.

5. In a separate terminal session, serve the frontend files:
```bash
npx http-server -p 3000
```

To test multiplayer locally, simply open `http://localhost:3000` in two different browser tabs. Create a room in the first tab and join it in the second.

## 2. Integrating the Frontend and Backend

The frontend needs to know where the WebSocket server lives. 

At the bottom of `script.js`, the `SOCKET_URL` variable determines where the Socket.IO client connects. During local testing, it connects to `localhost:3001`. For production, it must be updated to your live Render URL.

```javascript
const SOCKET_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001'
    : 'https://pokemon-battle-server.onrender.com'; // Update this before deploying
```

## 3. Deploying to Production

The architecture is split: the Node.js server goes to Render, and the static HTML/JS files go to Vercel.

### Pushing to GitHub
Both Render and Vercel pull your code directly from GitHub.
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/Sapeksh2001/pokemon-battle-arena.git
git push -u origin main
```

### Hosting the Backend (Render)
1. Create a new Web Service on Render and connect your repository.
2. Ensure the Build Command is `npm install` and the Start Command is `npm start`.
3. Add a `NODE_ENV` environment variable set to `production`.
4. Add a `FRONTEND_URL` environment variable. Temporarily set this to `http://localhost:3000` until Vercel is set up.
5. Deploy and save the `onrender.com` URL.

### Hosting the Frontend (Vercel)
1. Update your `script.js` to use the new Render URL you just generated. Commit and push the change.
2. Create a new Project on Vercel and import the repository.
3. Vercel requires zero configuration for standard static sites. Click Deploy and save the `vercel.app` URL.

### Finalizing CORS
Render needs to explicitly trust requests coming from your new Vercel domain.
1. Go back to your Render dashboard.
2. Change the `FRONTEND_URL` environment variable from `localhost` to your exact Vercel URL (e.g., `https://pokemon-battle-arena.vercel.app`).
3. Save the changes to trigger a redeploy on Render.

Once Render finishes restarting, your multiplayer game is live and ready to play.
