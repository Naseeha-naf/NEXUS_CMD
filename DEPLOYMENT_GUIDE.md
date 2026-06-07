# Complete Deployment Guide

This guide outlines the step-by-step process to deploy the **AI Satellite Mission Control** platform to production using **GitHub**, **Vercel** (Frontend), and **Render** (Backend).

## Step 1: Push to GitHub

Both Vercel and Render deploy automatically from GitHub repositories.

1. Create a new public or private repository on [GitHub](https://github.com/).
2. Open a terminal in your project's root folder (`c:\Users\Naseeha Nafrin\Desktop\Satellite`).
3. Run the following commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for production deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   git push -u origin main
   ```

---

## Step 2: Deploy Backend to Render

1. Go to [Render.com](https://render.com/) and create an account.
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub account and select your repository.
4. Render will automatically detect the `render.yaml` file in the root directory and begin building your backend!
5. **Configure Environment Variables:**
   - In the Render dashboard for your new Web Service, go to the **Environment** tab.
   - Add `MONGO_URI` and paste your MongoDB Atlas connection string.
   - Add `JWT_SECRET` and type a secure random string (e.g., `my_secure_mission_control_key`).
   - Add `FRONTEND_URL` and leave it blank for now (we will update this after deploying Vercel).
6. Copy your new Render backend URL (e.g., `https://nexus-backend-xyz.onrender.com`).

---

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com/) and create an account.
2. Click **Add New... > Project**.
3. Import your GitHub repository.
4. In the configuration screen, make sure:
   - **Framework Preset** is set to `Vite`.
   - **Root Directory** is set to `frontend`.
5. **Configure Environment Variables:**
   - Open the "Environment Variables" dropdown.
   - Add `VITE_API_URL`.
   - For the value, paste your Render backend URL (e.g., `https://nexus-backend-xyz.onrender.com`).
6. Click **Deploy**. Vercel will automatically build the React app and give you a live URL (e.g., `https://nexus-frontend.vercel.app`).

---

## Step 4: Final Security Link (Optional but Recommended)

Now that both are deployed, restrict your backend so it only accepts requests from your specific Vercel frontend.

1. Go back to Render.
2. Under your backend Web Service, go to **Environment**.
3. Update `FRONTEND_URL` to your new Vercel URL (e.g., `https://nexus-frontend.vercel.app`).
4. Render will automatically redeploy with the new secure CORS configuration.

## Success!
Your application is now globally accessible, mobile responsive, and fully automated! You can continue making changes locally, and whenever you `git push`, Vercel and Render will automatically update your live site.
