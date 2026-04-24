# GNL1Z Equipment Manager v3.0

**Professional Digital Technical Reference Tool for LNG Plant Operations**

---

## 📋 Overview

GNL1Z Manager is a comprehensive web application designed to centralize and organize technical information for the GNL1Z LNG facility. It provides engineers and technicians with instant access to:

- **Equipment Database** — 70+ major equipment items from the LNG process
- **Tools & Wrenches** — Auto-calculated based on bolt sizes
- **Lifting Equipment** — Safety guidelines based on equipment weight
- **Technical Specifications** — Pressure ratings, volumes, serial numbers
- **Process Organization** — Equipment grouped by process sections (Décarbonatation, Déshydratation, etc.)

---

## 🚀 Quick Start

### Option 1: Deploy to Netlify (Recommended)

1. **Create a GitHub repository**
   ```bash
   mkdir gnl1z-manager
   cd gnl1z-manager
   git init
   git add gnl1z-manager-v3.jsx gnl1z_equipment.json
   git commit -m "GNL1Z Manager v3.0"
   git push origin main
   ```

2. **Deploy to Netlify**
   - Go to netlify.com → "New Site from Git"
   - Connect your GitHub repo
   - Build command: (leave blank for static site)
   - Publish directory: `.` (root)
   - Deploy

3. **Access your app**
   - Visit the Netlify URL provided
   - App loads with 70+ real GNL1Z equipment records

### Option 2: Run Locally with Vite

```bash
npm create vite@latest gnl1z-app -- --template react
cd gnl1z-app
npm install
```

Replace `src/App.jsx` with `gnl1z-manager-v3.jsx` content and run:
```bash
npm run dev
```

### Option 3: Embed in Existing Website

Copy this React component into your existing application:
```jsx
import GNL1ZManager from './gnl1z-manager-v3'

function App() {
  return <GNL1ZManager />
}
```

---

## 🎯 Features

### ✅ Equipment Database
- **70 real GNL1Z equipment items** loaded from actual plant data
- Equipment organized by:
  - Process section (Décarbonatation, Déshydratation, Propane Cycle, MCR, Liquéfaction, Fractionation)
  - Equipment type (Vessels, Heat Exchangers, Separators, Pumps, Valves, Safety Valves)
  - Status (Active, Maintenance, Inactive)

### ✅ Search & Filtering
- Real-time search by tag, name, or service
- Filter by:
  - Process section
  - Equipment type
  - Status
- Sort by: Tag, Name, Weight, Section

### ✅ Equipment Details Tab
Shows complete technical information:
- Equipment tag and type
- Process section and service
- Weight (in kg or tons)
- Volume (m³)
- Operating pressure ratings
- Serial number
- Current status

### ✅ Tools & Wrenches Tab
Automatically calculates required tools based on bolt size:
- **M12** → 19mm wrench
- **M16** → 24mm wrench
- **M20** → 30mm wrench
- **M24** → 36mm wrench
- Additional tools: gasket scrapers, thermowells, level gauges, etc.

### ✅ Lifting Equipment Tab
Safety guidelines for equipment handling:
- **Weight < 50 kg** — Manual handling (2 people)
- **50-100 kg** — Manual chain hoist (1 ton)
- **100-500 kg** — Chain hoist (2 ton) + spreader bar
- **500-2000 kg** — Heavy chain hoist (5 ton)
- **> 2000 kg** — External crane required

### ✅ Process Overview Dashboard
Right-side panel shows:
- Total equipment count
- Total plant weight
- Equipment by process section
- Equipment by type

---

## 📊 Data Structure

### Equipment Record Example
```json
{
  "tag": "101-F-501",
  "name": "Régénérateur de MEA",
  "type": "F",
  "icon": "🏭",
  "section": "Décarbonatation",
  "function": "Colonne de stripping",
  "service": "MEA",
  "weight_kg": 22950,
  "volume_m3": 27,
  "pressure_test": "8.4 Bars",
  "serial": "35959-6",
  "status": "Active",
  "bolt_size": "M20",
  "tools": ["Wrench 30mm", "Gasket scraper", "Level gauge"],
  "lifting": "chain_hoist_2t"
}
```

### Equipment Types
| Type | Label | Icon | Examples |
|------|-------|------|----------|
| F | Colonne/Vessel | 🏭 | Absorbeur, Régénérateur |
| E | Heat Exchanger | 🔄 | Condenseur, Rebouilleur, Refroidisseur |
| G | Separator/Drum | ⚙️ | Flash Drum, Separator |
| P/J | Pump | 💧 | Pompe solution, Compresseur |
| V | Valve | 🔧 | Vanne, Détente |
| PSV | Safety Valve | ⚠️ | Soupape de sécurité |

### Process Sections
1. **Décarbonatation** (MEA removal of CO₂)
2. **Déshydratation** (Dehydration)
3. **Propane Cycle** (Propane refrigeration)
4. **MCR** (Mixed Refrigerant Cycle)
5. **Liquéfaction** (Liquefaction)
6. **Fractionation** (Separation)

---

## 🔧 Customization

### Add New Equipment

Edit `gnl1z_equipment.json` or modify the component's sample data:

```jsx
const newEquipment = {
  tag: "E-NEW-001",
  name: "New Equipment Name",
  type: "E",  // F, E, G, P, J, V, PSV
  icon: "🔄",
  section: "Décarbonatation",
  function: "Equipment function",
  service: "Service description",
  weight_kg: 600,
  volume_m3: 0,
  pressure_test: "10 Bars",
  serial: "SN-12345",
  status: "Active",
  bolt_size: "M16",
  tools: ["Wrench 24mm", "Gasket scraper"],
  lifting: "chain_hoist_2t"
};
```

### Change Equipment Status

Update the `status` field:
- `"Active"` — Green indicator
- `"Maintenance"` — Orange indicator
- `"Inactive"` — Blue indicator

### Customize Tool Requirements

Modify equipment `tools` array:
```json
"tools": [
  "Wrench 24mm",
  "Spring compressor",
  "Gasket scraper",
  "Teflon tape",
  "Pressure gauge"
]
```

### Adjust Lifting Categories

Edit `LIFTING_EQUIPMENT` object in code:
```javascript
const LIFTING_EQUIPMENT = {
  "manual": { icon: "🚶", desc: "Manual", weight_range: "< 50 kg" },
  "manual_hoist": { icon: "🪝", desc: "Manual Hoist (1t)", weight_range: "50-100 kg" },
  // ... add more as needed
};
```

### Add New Wrench Sizes

Edit `TOOLS_DATABASE` in code:
```javascript
const TOOLS_DATABASE = {
  "M36": { wrench_size: "55mm", bolt_diameter: "36mm" },
  "M42": { wrench_size: "65mm", bolt_diameter: "42mm" },
  // ... etc
};
```

---

## 🗂️ Files

| File | Purpose |
|------|---------|
| `gnl1z-manager-v3.jsx` | Main React component (latest version) |
| `gnl1z_equipment.json` | Equipment database (70 GNL1Z records) |
| `gnl1z-manager-enhanced.jsx` | Enhanced version with P&ID integration |
| `gnl1z-manager.jsx` | Original version with P&ID features |

---

## 📱 Browser Support

- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (responsive design)

---

## 🔐 Data Considerations

### Current Implementation
- Equipment data is embedded in the application
- No database backend required
- Can be deployed to any static hosting

### For Production
1. **Add authentication** (login/roles)
2. **Connect to backend database** (for live updates)
3. **Implement P&ID integration** (PDF upload and navigation)
4. **Add change history** (audit trail)
5. **Integrate with DCS** (real-time parameters)

---

## 🎓 Training Use Cases

### For New Engineers
1. Navigate to "Décarbonatation" section
2. Click on "Régénérateur de MEA" (101-F-501)
3. View all technical specifications
4. See required tools for maintenance
5. Understand lifting requirements

### For Field Teams
1. Search equipment by tag (e.g., "FT-101")
2. Check tools required before work
3. Verify weight and lifting procedures
4. Access serial numbers for spare parts

### For Maintenance Planning
1. Filter by "Maintenance" status
2. See all equipment currently under maintenance
3. Check pressure test schedules
4. Plan replacement parts based on type

---

## 🚀 Next Phase Enhancements

### Phase 2 — P&ID Integration
- Upload P&ID PDF
- Click equipment → highlights on drawing
- Click on P&ID → jumps to equipment details

### Phase 3 — DCS Connection
- Real-time parameter display
- Alarm integration
- Historical trend data

### Phase 4 — Predictive Maintenance
- Condition monitoring
- Alert generation
- Maintenance scheduling

### Phase 5 — Digital Twin
- Full equipment lifecycle
- Performance analytics
- Optimization recommendations

---

## 📞 Support & Contact

**Developer:** Slimani Djamel  
**Email:** dj.slimani.univ.boumerdes@gmail.com  
**LinkedIn:** slimani-djamel-3b15a4212  
**ORCID:** 0009-0006-9893-2800  

---

## 📄 License

This tool is developed for GNL1Z operational use. All equipment data is proprietary.

---

## 📝 Changelog

### v3.0 (Current)
- ✅ Real GNL1Z equipment database (70 items)
- ✅ Complete tools/wrenches system
- ✅ Lifting equipment guidelines
- ✅ Process section organization
- ✅ Advanced search and filtering
- ✅ Equipment dashboard

### v2.1
- P&ID visual navigation
- Advanced filtering with presets
- Tools and lifting features

### v1.0
- Initial equipment reference tool

---

## 🎯 Quick Navigation Guide

| Goal | Steps |
|------|-------|
| Find equipment by tag | Use search box at top left |
| See equipment in Décarbonatation | Filter → Select "Décarbonatation" |
| Check tools needed | Click equipment → "Tools" tab |
| Verify weight & lifting | Click equipment → "Lifting" tab |
| View all pressure ratings | Check "Details" tab of each equipment |
| Filter heat exchangers | Type filter → Select "Heat Exchanger" |
| See total plant weight | Look at right panel statistics |

---

**GNL1Z Manager — Centralizing Technical Knowledge for Efficient Operations**
