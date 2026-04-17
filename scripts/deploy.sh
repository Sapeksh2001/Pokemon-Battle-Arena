#!/bin/bash
echo "Starting build process..."
npm run build
if [ $? -eq 0 ]; then
    echo "Build successful. committing and pushing..."
    git add .
    git commit -m "Fix: MIME error and parallel loading"
    git push origin main
    echo "Push successful. Deploying to Firebase..."
    firebase deploy
else
    echo "Build failed!"
    exit 1
fi
echo "Deployment complete."
