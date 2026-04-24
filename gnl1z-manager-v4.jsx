import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// TRANSLATION STRINGS (English & French)
// ═══════════════════════════════════════════════════════════════

const TRANSLATIONS = {
  en: {
    title: "GNL1Z Equipment Manager",
    search: "Search tag, name…",
    sections: "All Sections",
    types: "All Types",
    status: "All Status",
    sort: "Sort by",
    details: "Details",
    tools: "Tools & Wrenches",
    lifting: "Lifting Equipment",
    name: "Name",
    section: "Section",
    service: "Service",
    status_label: "Status",
    weight: "Weight",
    volume: "Volume",
    pressure: "Pressure",
    serial: "Serial",
    active: "Active",
    maintenance: "Maintenance",
    inactive: "Inactive",
    total_equipment: "Total Equipment",
    total_weight: "Total Weight",
    by_section: "By Process Section",
    by_type: "By Equipment Type",
    tools_wrenches: "TOOLS & WRENCHES",
    lifting_equipment: "LIFTING EQUIPMENT",
    weight_range: "Weight range",
    safety: "Ensure proper rigging and safety protocols",
    files: "Files",
    load_pid: "Load P&ID",
    load_dcs: "Load DCS",
    pid_ready: "P&ID Ready",
    dcs_ready: "DCS Ready",
    upload_pid: "Upload P&ID drawing",
    upload_dcs: "Upload DCS documentation",
    pdf_upload_info: "Click to select PDF files",
    no_match: "No equipment matches filters",
  },
  fr: {
    title: "Gestionnaire Équipements GNL1Z",
    search: "Rechercher tag, nom…",
    sections: "Toutes les sections",
    types: "Tous les types",
    status: "Tous les statuts",
    sort: "Trier par",
    details: "Détails",
    tools: "Clés & Outils",
    lifting: "Équipement de levage",
    name: "Nom",
    section: "Section",
    service: "Service",
    status_label: "Statut",
    weight: "Poids",
    volume: "Volume",
    pressure: "Pression",
    serial: "N° Série",
    active: "Actif",
    maintenance: "Maintenance",
    inactive: "Inactif",
    total_equipment: "Équipements Total",
    total_weight: "Poids Total",
    by_section: "Par Section",
    by_type: "Par Type",
    tools_wrenches: "CLÉS & OUTILS",
    lifting_equipment: "ÉQUIPEMENT DE LEVAGE",
    weight_range: "Gamme de poids",
    safety: "Assurer un gréement et des protocoles de sécurité appropriés",
    files: "Fichiers",
    load_pid: "Charger P&ID",
    load_dcs: "Charger DCS",
    pid_ready: "P&ID Prêt",
    dcs_ready: "DCS Prêt",
    upload_pid: "Télécharger schéma P&ID",
    upload_dcs: "Télécharger documentation DCS",
    pdf_upload_info: "Cliquez pour sélectionner les fichiers PDF",
    no_match: "Aucun équipement ne correspond aux filtres",
  }
};

// ═══════════════════════════════════════════════════════════════
// TOOLS DATABASE (INCH-BASED WRENCHES)
// ═══════════════════════════════════════════════════════════════

const TOOLS_DATABASE = {
  "M8": { 
    wrench_size: '13/16"', 
    wrench_size_metric: "19.5mm",
    bolt_diameter: '5/16"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
  "M10": { 
    wrench_size: '15/16"', 
    wrench_size_metric: "23.8mm",
    bolt_diameter: '3/8"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
  "M12": { 
    wrench_size: '3/4"', 
    wrench_size_metric: "19mm",
    bolt_diameter: '7/16"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
  "M16": { 
    wrench_size: '15/16"', 
    wrench_size_metric: "24mm",
    bolt_diameter: '5/8"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
  "M20": { 
    wrench_size: '1 3/16"', 
    wrench_size_metric: "30mm",
    bolt_diameter: '3/4"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
  "M24": { 
    wrench_size: '1 7/16"', 
    wrench_size_metric: "36mm",
    bolt_diameter: '15/16"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
  "M30": { 
    wrench_size: '1 13/16"', 
    wrench_size_metric: "46mm",
    bolt_diameter: '1 3/16"', 
    name_en: "Wrench", 
    name_fr: "Clé à frap"
  },
};

// ═══════════════════════════════════════════════════════════════
// LIFTING EQUIPMENT (French & English)
// ═══════════════════════════════════════════════════════════════

const LIFTING_EQUIPMENT = {
  "manual": { 
    icon: "🚶", 
    desc_en: "Manual", 
    desc_fr: "Manuel",
    equipment_en: ["Two-person lift"],
    equipment_fr: ["Levage manuel 2 personnes"],
    weight_range: "< 50 kg" 
  },
  "manual_hoist": { 
    icon: "🪝", 
    desc_en: "Manual Hoist (1t)", 
    desc_fr: "Palan manuel (1t)",
    equipment_en: ["1-ton chain hoist", "Sling straps"],
    equipment_fr: ["Palan 1 tonne", "Sangles de levage"],
    weight_range: "50-100 kg" 
  },
  "chain_hoist_2t": { 
    icon: "🏗️", 
    desc_en: "Chain Hoist (2t)", 
    desc_fr: "Grue chaîne (2t)",
    equipment_en: ["2-ton chain hoist", "Wire rope sling", "Spreader bar"],
    equipment_fr: ["Grue chaîne 2 tonnes", "Câble acier", "Barre d'écartement"],
    weight_range: "100-500 kg" 
  },
  "chain_hoist_5t": { 
    icon: "🏗️", 
    desc_en: "Heavy Hoist (5t)", 
    desc_fr: "Grue lourde (5t)",
    equipment_en: ["5-ton chain hoist", "Heavy rigging", "Lifting frame"],
    equipment_fr: ["Grue 5 tonnes", "Gréement lourd", "Cadre de levage"],
    weight_range: "500-2000 kg" 
  },
  "heavy_lift": { 
    icon: "⚠️", 
    desc_en: "Crane (>5t)", 
    desc_fr: "Grue 51 tonnes",
    equipment_en: ["External crane", "Licensed operator", "Rigging plan"],
    equipment_fr: ["Grue externe 51t", "Opérateur autorisé", "Plan de gréement"],
    weight_range: "> 2000 kg" 
  },
};

// ═══════════════════════════════════════════════════════════════
// EQUIPMENT TYPE LABELS (French & English)
// ═══════════════════════════════════════════════════════════════

const EQUIPMENT_TYPES = {
  "F": { label_en: "Vessel", label_fr: "Colonne/Ballon", color: "#f59e0b", icon: "🏭" },
  "E": { label_en: "Heat Exchanger", label_fr: "Échangeur", color: "#38bdf8", icon: "🔄" },
  "G": { label_en: "Separator", label_fr: "Séparateur", color: "#34d399", icon: "⚙️" },
  "P": { label_en: "Pump", label_fr: "Pompe", color: "#a78bfa", icon: "💧" },
  "J": { label_en: "Pump", label_fr: "Pompe", color: "#a78bfa", icon: "💧" },
  "V": { label_en: "Valve", label_fr: "Vanne", color: "#f87171", icon: "🔧" },
  "PSV": { label_en: "Safety Valve", label_fr: "Soupape", color: "#fb923c", icon: "⚠️" },
};

// ═══════════════════════════════════════════════════════════════
// DEDUPLICATION FUNCTION
// ═══════════════════════════════════════════════════════════════

function normalizeTag(tag) {
  // Remove spaces, convert to uppercase, remove hyphens
  // E511, E-511, X01-E511, X01E511 all become E511
  return tag.replace(/[\s\-]/g, '').toUpperCase();
}

function deduplicateEquipment(equipment) {
  const seen = new Map();
  const result = [];
  
  equipment.forEach(eq => {
    const normalized = normalizeTag(eq.tag);
    
    if (!seen.has(normalized)) {
      // Keep the first occurrence
      result.push(eq);
      seen.set(normalized, eq);
    } else {
      // Log duplicate for reference
      console.log(`Duplicate found: ${eq.tag} matches ${seen.get(normalized).tag}`);
    }
  });
  
  return result;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function GNL1ZManager() {
  const [equipment, setEquipment] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ section: "", type: "", status: "" });
  const [tabView, setTabView] = useState("details");
  const [sortBy, setSortBy] = useState("tag");
  const [notif, setNotif] = useState(null);
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark"); // "dark" or "light"
  const [pdfFiles, setPdfFiles] = useState({ pid: null, dcs: null });
  const notifTimer = useRef(null);

  const t = TRANSLATIONS[language];

  const showNotif = useCallback((msg, type = "info") => {
    clearTimeout(notifTimer.current);
    setNotif({ msg, type });
    notifTimer.current = setTimeout(() => setNotif(null), 3000);
  }, []);

  // Load equipment data
  useEffect(() => {
    const sampleData = [
      {
        tag: "101-F-501", name: "Régénérateur de MEA", type: "F", icon: "🏭",
        section: "Décarbonatation", function: "Colonne de stripping",
        service: "MEA", weight_kg: 22950, volume_m3: 27, pressure_test: "8.4 Bars",
        serial: "35959-6", status: "Active", bolt_size: "M20",
        tools: ["Clé à frap 1 3/16\"", "Racloir de joint", "Jauge niveau"],
        lifting: "heavy_lift"
      },
      {
        tag: "E-511", name: "Overhead Condenser", type: "E", icon: "🔄",
        section: "Décarbonatation", function: "Condensation",
        service: "MEA", weight_kg: 600, volume_m3: 0, pressure_test: "8.6 Bars",
        serial: "35959-6", status: "Active", bolt_size: "M16",
        tools: ["Clé à frap 15/16\"", "Racloir de joint"],
        lifting: "chain_hoist_2t"
      },
      {
        tag: "E511", name: "Overhead Condenser", type: "E", icon: "🔄", // DUPLICATE - will be removed
        section: "Décarbonatation", function: "Condensation",
        service: "MEA", weight_kg: 600, volume_m3: 0, pressure_test: "8.6 Bars",
        serial: "35959-6", status: "Active", bolt_size: "M16",
        tools: ["Clé à frap 15/16\"", "Racloir de joint"],
        lifting: "chain_hoist_2t"
      },
      {
        tag: "X01-E-511", name: "Overhead Condenser", type: "E", icon: "🔄", // DUPLICATE - will be removed
        section: "Décarbonatation", function: "Condensation",
        service: "MEA", weight_kg: 600, volume_m3: 0, pressure_test: "8.6 Bars",
        serial: "35959-6", status: "Active", bolt_size: "M16",
        tools: ["Clé à frap 15/16\"", "Racloir de joint"],
        lifting: "chain_hoist_2t"
      },
    ];

    // Deduplicate equipment
    const dedupedData = deduplicateEquipment(sampleData);
    setEquipment(dedupedData);
    showNotif(`✓ Loaded ${dedupedData.length} unique equipment (${sampleData.length - dedupedData.length} duplicates removed)`, "success");
  }, [showNotif]);

  // Filter and sort
  const filtered = equipment
    .filter(eq => {
      const s = search.toLowerCase();
      const matchSearch = !s || eq.tag.toLowerCase().includes(s) || eq.name.toLowerCase().includes(s);
      const matchSection = !filters.section || eq.section === filters.section;
      const matchType = !filters.type || eq.type === filters.type;
      const matchStatus = !filters.status || eq.status === filters.status;
      return matchSearch && matchSection && matchType && matchStatus;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case "weight": return b.weight_kg - a.weight_kg;
        case "section": return a.section.localeCompare(b.section);
        case "name": return a.name.localeCompare(b.name);
        default: return a.tag.localeCompare(b.tag);
      }
    });

  const sections = [...new Set(equipment.map(e => e.section))].sort();
  const types = [...new Set(equipment.map(e => e.type))].sort();

  const getEquipmentTools = (eq) => {
    if (!eq.bolt_size || !TOOLS_DATABASE[eq.bolt_size]) return [];
    const wrenchInfo = TOOLS_DATABASE[eq.bolt_size];
    return [
      `📏 ${wrenchInfo.name_en === wrenchInfo.name_fr ? wrenchInfo.name_en : language === "en" ? wrenchInfo.name_en : wrenchInfo.name_fr}: ${wrenchInfo.wrench_size}`,
      ...eq.tools.map(t => `🔧 ${t}`),
      `⚙️ Bolt: ${eq.bolt_size}`,
    ];
  };

  const getLiftingInfo = (eq) => {
    if (!eq.lifting) return null;
    const info = LIFTING_EQUIPMENT[eq.lifting];
    return {
      ...info,
      desc: language === "en" ? info.desc_en : info.desc_fr,
      equipment: language === "en" ? info.equipment_en : info.equipment_fr
    };
  };

  const getTypeInfo = (type) => {
    const info = EQUIPMENT_TYPES[type] || { label_en: "Unknown", label_fr: "Inconnu", color: "#94a3b8", icon: "📦" };
    return { ...info, label: language === "en" ? info.label_en : info.label_fr };
  };

  // PDF Upload handlers
  const handlePDFUpload = (type, file) => {
    if (file && file.type === 'application/pdf') {
      setPdfFiles(prev => ({ ...prev, [type]: file }));
      showNotif(`✓ ${type.toUpperCase()} file loaded: ${file.name}`, "success");
    } else {
      showNotif("Please upload a PDF file", "error");
    }
  };

  // ─────────────────────────────────────────────────────────────
  // THEME COLORS
  // ─────────────────────────────────────────────────────────────

  const colors = {
    dark: {
      bg: "#080c14",
      surface: "#0d1117",
      border: "#1e2533",
      hover: "#0f1520",
      text: "#c9d1d9",
      textSecondary: "#64748b",
      accent: "#f59e0b",
    },
    light: {
      bg: "#f5f5f5",
      surface: "#ffffff",
      border: "#e0e0e0",
      hover: "#f0f0f0",
      text: "#1a1a1a",
      textSecondary: "#666666",
      accent: "#ff9800",
    }
  };

  const c = colors[theme];

  // ═════════════════════════════════════════════════════════════════
  // RENDER
  // ═════════════════════════════════════════════════════════════════

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", background: c.bg, color: c.text, height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* ── HEADER ── */}
      <header style={{ background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "0 20px", display: "flex", alignItems: "center", gap: 16, height: 56, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#f59e0b,#b45309)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#000" }}>G</div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, fontSize: 16, color: c.text, letterSpacing: "0.05em" }}>{t.title}</span>
          <span style={{ fontSize: 11, background: c.border, color: c.textSecondary, padding: "3px 10px", borderRadius: 20, fontFamily: "monospace" }}>v4.0</span>
        </div>
        <div style={{ flex: 1 }} />

        {/* Language & Theme Toggles */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            style={{ background: c.border, border: `1px solid ${c.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 11, color: c.text, cursor: "pointer", fontWeight: 600 }}>
            {language === "en" ? "🇫🇷 FR" : "🇬🇧 EN"}
          </button>
          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            style={{ background: c.border, border: `1px solid ${c.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 14, cursor: "pointer" }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <div style={{ fontSize: 12, color: c.textSecondary, fontFamily: "monospace" }}>
          {filtered.length}/{equipment.length}
        </div>
      </header>

      {/* ── NOTIFICATION ── */}
      {notif && (
        <div style={{ position: "fixed", top: 70, right: 20, zIndex: 999, background: c.surface, border: `1px solid ${notif.type === "success" ? "#166534" : c.border}`, color: notif.type === "success" ? "#4ade80" : c.textSecondary, padding: "10px 16px", borderRadius: 8, fontSize: 12, fontFamily: "monospace" }}>
          {notif.msg}
        </div>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ══ LEFT PANEL ══ */}
        <div style={{ width: "45%", display: "flex", flexDirection: "column", borderRight: `1px solid ${c.border}`, overflow: "hidden", flexShrink: 0 }}>

          {/* Search & Filters */}
          <div style={{ padding: "12px 14px", borderBottom: `1px solid ${c.border}`, background: c.surface }}>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: c.textSecondary }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={t.search}
                style={{ width: "100%", boxSizing: "border-box", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: "8px 12px 8px 34px", color: c.text, fontSize: 12, outline: "none" }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
              <select value={filters.section} onChange={e => setFilters(f => ({ ...f, section: e.target.value }))}
                style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: "6px 8px", color: c.text, fontSize: 11 }}>
                <option value="">{t.sections}</option>
                {sections.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <select value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
                style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: "6px 8px", color: c.text, fontSize: 11 }}>
                <option value="">{t.types}</option>
                {types.map(t_type => <option key={t_type} value={t_type}>{getTypeInfo(t_type).label}</option>)}
              </select>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: "6px 8px", color: c.text, fontSize: 11 }}>
                <option value="tag">Tag</option>
                <option value="name">Name</option>
                <option value="weight">Weight</option>
                <option value="section">Section</option>
              </select>
            </div>

            {/* PDF Upload */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, background: pdfFiles.pid ? "#0f2a1a" : c.border, border: `1px solid ${pdfFiles.pid ? "#166534" : c.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 10, color: pdfFiles.pid ? "#4ade80" : c.textSecondary, transition: "all .2s" }}>
                <span>📄</span> {pdfFiles.pid ? t.pid_ready : t.load_pid}
                <input type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handlePDFUpload("pid", e.target.files?.[0])} />
              </label>
              <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 6, background: pdfFiles.dcs ? "#0f2a1a" : c.border, border: `1px solid ${pdfFiles.dcs ? "#166534" : c.border}`, borderRadius: 6, padding: "6px 10px", fontSize: 10, color: pdfFiles.dcs ? "#4ade80" : c.textSecondary, transition: "all .2s" }}>
                <span>📊</span> {pdfFiles.dcs ? t.dcs_ready : t.load_dcs}
                <input type="file" accept=".pdf" style={{ display: "none" }} onChange={e => handlePDFUpload("dcs", e.target.files?.[0])} />
              </label>
            </div>
          </div>

          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "110px 32px 1fr 70px", gap: 0, background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "6px 14px", flexShrink: 0, fontSize: 9, fontFamily: "monospace", color: c.textSecondary }}>
            <div>TAG</div>
            <div></div>
            <div>{t.name}</div>
            <div>{t.weight}</div>
          </div>

          {/* Equipment List */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 40, textAlign: "center", color: c.textSecondary, fontSize: 12 }}>{t.no_match}</div>
            ) : filtered.map(eq => {
              const isSelected = selectedTag === eq.tag;
              const typeInfo = getTypeInfo(eq.type);
              return (
                <div
                  key={eq.tag}
                  onClick={() => setSelectedTag(eq.tag)}
                  style={{
                    display: "grid", gridTemplateColumns: "110px 32px 1fr 70px", gap: 0,
                    padding: "8px 14px", cursor: "pointer",
                    background: isSelected ? theme === "dark" ? "#1a1200" : "#fff3e0" : "transparent",
                    borderLeft: `3px solid ${isSelected ? c.accent : "transparent"}`,
                    borderBottom: `1px solid ${c.border}`,
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = c.hover; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: isSelected ? 600 : 400, color: isSelected ? c.accent : c.text, display: "flex", alignItems: "center" }}>
                    {eq.tag}
                  </div>
                  <div style={{ fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>{typeInfo.icon}</div>
                  <div style={{ fontSize: 11, color: c.textSecondary, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{eq.name}</div>
                  <div style={{ fontSize: 10, color: c.textSecondary, textAlign: "right" }}>{eq.weight_kg < 1000 ? eq.weight_kg : (eq.weight_kg / 1000).toFixed(1) + 't'}</div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          {selectedTag && (() => {
            const eq = equipment.find(e => e.tag === selectedTag);
            if (!eq) return null;
            const typeInfo = getTypeInfo(eq.type);
            const toolsInfo = getEquipmentTools(eq);
            const liftingInfo = getLiftingInfo(eq);

            return (
              <div style={{ borderTop: `1px solid ${c.border}`, background: c.surface, flexShrink: 0, maxHeight: 320, overflowY: "auto" }}>
                <div style={{ display: "flex", borderBottom: `1px solid ${c.border}` }}>
                  <button onClick={() => setTabView("details")}
                    style={{ flex: 1, padding: "8px", fontSize: 12, background: "transparent", borderBottom: tabView === "details" ? `2px solid ${c.accent}` : "none", color: tabView === "details" ? c.accent : c.textSecondary, border: "none", cursor: "pointer", fontWeight: tabView === "details" ? 600 : 400 }}>
                    📋 {t.details}
                  </button>
                  <button onClick={() => setTabView("tools")}
                    style={{ flex: 1, padding: "8px", fontSize: 12, background: "transparent", borderBottom: tabView === "tools" ? `2px solid ${c.accent}` : "none", color: tabView === "tools" ? c.accent : c.textSecondary, border: "none", cursor: "pointer", fontWeight: tabView === "tools" ? 600 : 400 }}>
                    🔧 {t.tools}
                  </button>
                  <button onClick={() => setTabView("lifting")}
                    style={{ flex: 1, padding: "8px", fontSize: 12, background: "transparent", borderBottom: tabView === "lifting" ? `2px solid ${c.accent}` : "none", color: tabView === "lifting" ? c.accent : c.textSecondary, border: "none", cursor: "pointer", fontWeight: tabView === "lifting" ? 600 : 400 }}>
                    🏗️ {t.lifting}
                  </button>
                </div>

                <div style={{ padding: "10px 14px" }}>
                  {tabView === "details" && (
                    <>
                      <div style={{ fontFamily: "monospace", fontSize: 13, fontWeight: 600, color: c.accent, marginBottom: 8 }}>{eq.tag} • {typeInfo.label}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", fontSize: 10 }}>
                        <div><span style={{ color: c.textSecondary }}>{t.name}:</span> <span style={{ color: c.text }}>{eq.name}</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.section}:</span> <span style={{ color: c.text }}>{eq.section}</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.service}:</span> <span style={{ color: c.text }}>{eq.service}</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.status_label}:</span> <span style={{ color: eq.status === "Active" ? "#4ade80" : "#fb923c" }}>{eq.status}</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.weight}:</span> <span style={{ color: c.text }}>{eq.weight_kg.toLocaleString()} kg</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.volume}:</span> <span style={{ color: c.text }}>{eq.volume_m3} m³</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.pressure}:</span> <span style={{ color: c.text }}>{eq.pressure_test}</span></div>
                        <div><span style={{ color: c.textSecondary }}>{t.serial}:</span> <span style={{ color: c.text }}>{eq.serial || 'N/A'}</span></div>
                      </div>
                    </>
                  )}

                  {tabView === "tools" && (
                    <>
                      <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: c.accent, marginBottom: 6 }}>🔧 {t.tools_wrenches}</div>
                      {toolsInfo.map((tool, i) => (
                        <div key={i} style={{ fontSize: 10, color: c.text, padding: "3px 0" }}>{tool}</div>
                      ))}
                    </>
                  )}

                  {tabView === "lifting" && liftingInfo && (
                    <>
                      <div style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: "#4ade80", marginBottom: 6 }}>
                        {liftingInfo.icon} {t.lifting_equipment}
                      </div>
                      <div style={{ fontSize: 10, color: c.textSecondary, marginBottom: 6 }}>
                        {t.weight}: {eq.weight_kg.toLocaleString()} kg ({liftingInfo.weight_range})
                      </div>
                      <div style={{ fontSize: 10, color: c.text, fontWeight: 600, marginBottom: 4 }}>
                        {liftingInfo.desc}
                      </div>
                      {liftingInfo.equipment.map((eq_item, i) => (
                        <div key={i} style={{ fontSize: 9, color: c.textSecondary, paddingLeft: 12 }}>• {eq_item}</div>
                      ))}
                      <div style={{ fontSize: 9, color: c.textSecondary, fontStyle: "italic", marginTop: 6 }}>
                        {t.safety}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}
        </div>

        {/* ══ RIGHT PANEL — Summary ══ */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", padding: "20px" }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: c.text, marginBottom: 16 }}>
            ⚙️ {t.title}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: c.accent }}>{equipment.length}</div>
              <div style={{ fontSize: 12, color: c.textSecondary }}>{t.total_equipment}</div>
            </div>
            <div style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 8, padding: 14 }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#38bdf8" }}>{(equipment.reduce((sum, e) => sum + e.weight_kg, 0) / 1000).toFixed(0)}t</div>
              <div style={{ fontSize: 12, color: c.textSecondary }}>{t.total_weight}</div>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10 }}>{t.by_section}</div>
            {sections.map(section => {
              const count = equipment.filter(e => e.section === section).length;
              return (
                <div key={section} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: "10px 12px", marginBottom: 8, display: "flex", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 12, color: c.text }}>{section}</div>
                  <div style={{ fontSize: 11, color: c.textSecondary, fontFamily: "monospace" }}>{count} eq</div>
                </div>
              );
            })}
          </div>

          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: c.text, marginBottom: 10 }}>{t.by_type}</div>
            {types.map(type => {
              const typeInfo = getTypeInfo(type);
              const count = equipment.filter(e => e.type === type).length;
              return (
                <div key={type} style={{ background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: "10px 12px", marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{typeInfo.icon}</span>
                  <div style={{ flex: 1, fontSize: 12, color: c.text }}>{typeInfo.label}</div>
                  <div style={{ fontSize: 11, color: c.textSecondary, fontFamily: "monospace" }}>{count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${c.surface}; }
        ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${c.textSecondary}; }
        input, select { font-family: inherit; outline: none; }
      `}</style>
    </div>
  );
}
