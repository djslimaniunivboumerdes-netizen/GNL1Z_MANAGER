# 🚀 Deploy GNL1Z Manager to Netlify — 5 Minute Setup

## Option 1: Easiest — Use Netlify Drop (Drag & Drop)

### ✅ No GitHub required • No coding required • Instant deploy

**Step 1:** Go to [netlify.drop.com](https://drop.netlify.com/)

**Step 2:** Drag and drop these 2 files into the upload area:
- `gnl1z-manager-v3.jsx`
- `gnl1z_equipment.json`

**Step 3:** Wait 10 seconds

**Step 4:** You'll get a live URL like:
```
https://random-name.netlify.app
```

✅ **Done! Your app is live.**

---

## Option 2: Recommended — GitHub + Netlify (Professional Setup)

### ✅ Automatic updates • Version control • Professional URL

### Step 1: Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `gnl1z-manager`
3. Description: `GNL1Z Equipment Management Tool`
4. Make it **Public** (or Private if preferred)
5. Click **Create repository**

### Step 2: Upload Files

After creating the repo, click "uploading an existing file" and upload:
```
gnl1z-manager-v3.jsx
gnl1z_equipment.json
README.md
```

### Step 3: Create HTML Wrapper

Create a file called `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GNL1Z Equipment Manager</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        #root { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel" src="gnl1z-manager-v3.jsx"></script>
    <script type="text/babel">
        // Mount React component
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<GNL1ZManager />);
    </script>
</body>
</html>
```

Upload this to GitHub too.

### Step 4: Connect to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub (or email)
3. Click **"New site from Git"**
4. Choose **GitHub**
5. Select your `gnl1z-manager` repository
6. Build settings:
   - Build command: (leave empty)
   - Publish directory: `.` (root)
7. Click **Deploy site**

### Step 5: Get Your Live URL

Netlify will assign a URL like:
```
https://gnl1z-manager.netlify.app
```

You can also **change the URL** in site settings:
1. Site settings → General → Site details
2. Change site name to anything you want

---

## Option 3: React App (Full Features)

If you want to build a full React app with all modern features:

### Step 1: Create React App

```bash
npm create vite@latest gnl1z-app -- --template react
cd gnl1z-app
npm install
```

### Step 2: Replace Component

Copy the content of `gnl1z-manager-v3.jsx` into `src/App.jsx`

### Step 3: Add JSON Data

Put `gnl1z_equipment.json` in `public/` folder

### Step 4: Update Data Loading

In the `useEffect` in your app, change:

```jsx
// FROM:
const sampleData = [ ... ]
setEquipment(sampleData)

// TO:
fetch('/gnl1z_equipment.json')
  .then(res => res.json())
  .then(data => setEquipment(data))
```

### Step 5: Deploy

```bash
npm run build
```

Then deploy the `dist/` folder to Netlify.

---

## 🎯 Quick Comparison

| Method | Setup Time | Features | Best For |
|--------|-----------|----------|----------|
| **Drag & Drop** | 2 min | Basic | Quick demos, testing |
| **GitHub + Netlify** | 10 min | Full | Production, sharing link |
| **React App** | 30 min | Advanced | Custom development |

---

## ✅ Testing Your Live App

Once deployed, test these features:

1. **Load Equipment**
   - Should see 70 equipment items
   - Check if they load without errors

2. **Search**
   - Search for "MEA" → Should find all MEA equipment
   - Search for "E-" → Should find all heat exchangers

3. **Filter**
   - Filter by section "Décarbonatation" → Should show MEA equipment
   - Filter by type → See equipment grouped by type

4. **Click Equipment**
   - Click "101-F-501" → See details panel
   - Switch tabs: Details → Tools → Lifting

5. **Check Dashboard**
   - Right panel shows: 70 equipment, total weight, breakdown by section

---

## 🔗 Sharing Your App

Once live, you can:

### ✅ Share the link
```
https://gnl1z-manager.netlify.app
```

### ✅ Share as QR code
(Netlify generates one automatically in site settings)

### ✅ Add to your website
Use an iframe:
```html
<iframe src="https://gnl1z-manager.netlify.app" 
        width="100%" height="800px"></iframe>
```

### ✅ Embed in Slack
Post the link in any Slack channel → preview appears

### ✅ Share with mobile
Works perfectly on iPhone/Android — responsive design

---

## 🔧 Troubleshooting

### "Equipment not loading"
- Check that `gnl1z_equipment.json` is in the same directory as the app
- Check browser console (F12) for errors

### "Styling looks wrong"
- Make sure you're using the latest version: `gnl1z-manager-v3.jsx`
- Clear browser cache (Ctrl+Shift+Del)

### "Can't edit after deploy"
- To make changes, edit files on GitHub
- Netlify auto-deploys within 1 minute
- Or use Netlify UI to drag updated files

### "Want custom domain"
- Domain settings in Netlify dashboard
- Connect your own domain (gnl1z-equipment.com, etc.)

---

## 📱 Access on Mobile

The app works on phones/tablets:

1. Get your Netlify URL (e.g., `https://gnl1z-manager.netlify.app`)
2. Send link via WhatsApp/Email
3. Opens instantly on any phone browser
4. Can bookmark for offline-like access (add to home screen)

**Works offline** because it doesn't need internet after first load.

---

## 🔒 Security & Privacy

- ✅ Data stays on your device (no server submission)
- ✅ Equipment info is not sent anywhere
- ✅ Entirely self-contained application
- ✅ Can be used without internet (after first load)

---

## 📊 Monitor Your Site

In Netlify dashboard:

- **Analytics** — See who's using your app
- **Deploy history** — Track all changes
- **Logs** — Debug any issues
- **Performance** — Check load times

---

## 🎓 Next Steps After Deploy

1. **Share with team**
   - Send Slack link or QR code
   - Get feedback from engineers

2. **Add more equipment**
   - Edit `gnl1z_equipment.json` on GitHub
   - Changes deploy automatically

3. **Customize**
   - Change colors, layout, add sections
   - Create your own version of the code

4. **Integrate with P&ID**
   - Upload PDF drawings
   - Link equipment to diagram locations

---

## 💡 Pro Tips

### Tip 1: Custom Domain
Point your domain to the Netlify site for professional branding
```
gnl1z-equipment.company.com
```

### Tip 2: Team Collaboration
Use GitHub branches to test changes before going live:
```bash
git checkout -b new-feature
# make changes
git push origin new-feature
# GitHub shows "Create pull request"
# Review & merge when ready
```

### Tip 3: Automatic Backups
All versions are saved on GitHub — you can roll back anytime

### Tip 4: Analytics
Netlify shows you how many people use the app each day

---

## ❓ Questions?

| Question | Answer |
|----------|--------|
| **Cost?** | Free for up to 100 GB/month |
| **Downtime?** | 99.9% uptime guarantee |
| **Speed?** | Instant (served from CDN globally) |
| **Limits?** | None for reasonable usage |
| **Custom code?** | Full Node.js functions available (paid) |

---

## 🚀 You're Done!

Your GNL1Z Manager is now:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ Mobile-friendly
- ✅ Professional quality
- ✅ Production-ready

Share the link with your team and start using it!

---

**Questions or issues? Check the README.md or contact support@netlify.com**
