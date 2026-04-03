# Deployment Guide (Serverless Edition)

Since we migrated to Firebase, the Pokémon Battle Arena is now a **purely static application**. There is no longer a need for a separate Node.js/Render backend. This makes it much easier to deploy.

## Prerequisites

- A GitHub account
- A Firebase project (already configured in `js/api/socketClient.js`)
- The Realtime Database initialized in **Test Mode** on the Firebase Console.

## 1. Hosting on Firebase (Recommended)

Since your database is already on Firebase, this is the most professional option. It's completely **free** on the Spark plan.

1.  Open your terminal in the project folder.
2.  Log in to Firebase:
    ```bash
    npx firebase-tools login
    ```
3.  Deploy the game:
    ```bash
    npx firebase-tools deploy
    ```
4.  Firebase will provide a hosting URL like: `https://pokemon-1248.web.app`

## 2. Hosting on GitHub Pages (Alternative)

This is a great fallback if you don't want to use the Firebase CLI.

## 2. Hosting on Vercel

If you prefer Vercel, the project is already configured with a `vercel.json` file.

1. Install the Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root.
3. Follow the prompts to link your account and deploy.
4. Vercel will give you a production URL like `https://pokemon-battle-arena.vercel.app`.

## Troubleshooting

- **Multiplayer not connecting:** Ensure you have clicked **"Create Database"** in the Firebase Console (Realtime Database tab). Without this, the app will 404 when trying to create a room.
- **Images not loading:** GitHub Pages is case-sensitive. Ensure all file paths in your data files match the casing on the filesystem.
- **Loading Overlay hangs:** Check the browser console. This usually means a data file (like `movesets.js`) failed to download.
