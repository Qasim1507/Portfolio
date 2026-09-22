# Qasim Nalawala — ML & Software Engineer Portfolio

A personal portfolio website for **Qasim Fakharuddin Nalawala** (M.Sc. Computer Engineering at the National University of Singapore), engineered with the theme: **"A neural network being trained"**.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ⚡ Features & Design Highlights

- **Neural Network Background Canvas**: Low-CPU HTML5 canvas rendering a 5-layer network with forward-pass signal pulses and mouse proximity illumination. Pauses automatically when tab is hidden and respects `prefers-reduced-motion`.
- **Training HUD Progress Bar**: Scroll-aware progress bar tracking `epoch: %` and converging `loss`.
- **Interactive Terminal Hero**: Live typing training log with weights convergence (`qasim_nalawala.pt`) preceding candidate introduction.
- **Model Card About Section**: Research-grade model card summarizing academic pre-training, fine-tuning, and target deployment roles.
- **Experience Timeline**: Dynamic vertical line that fills on scroll, connecting activated role nodes with animated metric counters (SERIS, Samcom Electronics, Microsoft Innovators Club).
- **Project Model Zoo**: Interactive card grid with 3D tilt, scanning laser border animation, metric badges, and category filters (Computer Vision, NLP, Reinforcement Learning, Web).
- **Embedding Space Skills Visualizer**: Interactive 2D scatter plot with organic floating drift, domain clustering (Languages, ML/DL, Web, Cloud/Tools), and mobile chip fallbacks.
- **Inference Endpoint Contact**: `POST /hire/qasim` API card with copyable curl request and direct contact action links.
- **Dark / Light Mode**: Default "GPU room at night" dark palette with instant toggle.

---

## 🛠️ How to Customize

All candidate facts, roles, projects, skills, and links are centralized in a single file:

```
src/data.ts
```

- **Links**: Replace placeholders like `PROJECT_GITHUB_URL` and `PROJECT_DEMO_URL` with your actual repository and live deployment URLs.
- **Resume**: Replace `/public/resume.pdf` with your latest PDF resume.
- **Profile Photo**: Add your photo to `/public/profile.jpg` if desired.

---

## 🚀 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy to Vercel

### Option 1: Via Vercel Web Dashboard (Recommended)
1. Push your repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Framework Preset: **Vite**
5. Root Directory: `./`
6. Build Command: `npm run build`
7. Output Directory: `dist`
8. Click **Deploy**.

### Option 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
Follow the interactive prompts to deploy.

---

## 📄 License
MIT © 2026 Qasim Fakharuddin Nalawala
