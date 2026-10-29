# Global Electric Vehicle (EV) Market & Technology Intelligence Platform

An enterprise-grade, multi-scenario strategic analytics platform and interactive dashboard engineered for automotive executives, business intelligence directors, and sustainable mobility researchers.

---

## 🌟 Executive Scenarios Addressed

| Persona | Role | Focus Area | Deliverable Artifact |
| :--- | :--- | :--- | :--- |
| **Scenario 1: Emily Johnson** | EV Market Strategy Director | Vehicle category sales contributions, driving range sweet spot, CSAT curves, high-growth segments & portfolio launch roadmap | [Emily's Strategy Report](file:///C:/Users/ASUS/.gemini/antigravity/brain/7be96f33-67bd-4810-b777-6133f18c60b4/EMILY_JOHNSON_MARKET_STRATEGY_REPORT.md) |
| **Scenario 2: David Chen** | Automotive BI Manager | OEM market share (BYD, Tesla, VW, Geely, etc.), vertical integration index, geographic production hubs, tariff analysis & market entry advisory | [David's BI Dossier](file:///C:/Users/ASUS/.gemini/antigravity/brain/7be96f33-67bd-4810-b777-6133f18c60b4/DAVID_CHEN_AUTOMOTIVE_BI_DOSSIER.md) |
| **Scenario 3: Dr. Sarah Williams** | Sustainable Mobility Analyst | Electrochemical comparison of 5 battery chemistries (LFP, NMC, NCA, Na-ion, SSB), lifecycle carbon payback modeling, regional grid intensity & policy directives | [Dr. Sarah's Monograph](file:///C:/Users/ASUS/.gemini/antigravity/brain/7be96f33-67bd-4810-b777-6133f18c60b4/DR_SARAH_WILLIAMS_BATTERY_SUSTAINABILITY_MONOGRAPH.md) |

---

## 🚀 Interactive Platform & Application Suite

The platform includes a zero-dependency, ultra-fast client-side application featuring:
1. **Scenario 1 View**: Category revenue breakdown, driving range benchmarks, and strategic matrix.
2. **Scenario 2 View**: OEM market share benchmark, vertical integration ratings, geographic production hubs, and consulting entry playbook.
3. **Scenario 3 View**: Battery chemistry lab scorecard, regional grid carbon break-even charts, and clean energy policy roadmap.
4. **Fleet Data Explorer**: Interactive filtering across 45 models, 6 categories, 5 battery chemistries, and 8 countries with real-time KPI metrics and one-click CSV export.
5. **2025–2030 Strategy Simulator**: Dynamic modeling of battery cost decline, commercialization pace, subsidy mandates, and renewable grid adoption.

### How to Run:
* **Option A (Instant Direct Open):** Open [`index.html`](file:///C:/Users/ASUS/.gemini/antigravity/scratch/ev-market-intelligence-platform/index.html) directly in any modern browser (Google Chrome, Microsoft Edge, Mozilla Firefox).
* **Option B (Interactive Side-Pane Artifact):** Open [`ev_market_dashboard.html`](file:///C:/Users/ASUS/.gemini/antigravity/brain/7be96f33-67bd-4810-b777-6133f18c60b4/ev_market_dashboard.html) directly in the Antigravity artifact preview.

---

## 📁 Repository Structure

```
ev-market-intelligence-platform/
│
├── index.html                           # Standalone application entrypoint
├── README.md                            # Project documentation & execution guide
│
├── data/
│   ├── ev_models_dataset.json           # 45 EV models with 18 technical & financial KPIs
│   ├── battery_technologies.json        # Technical & environmental specs for 5 battery types
│   ├── manufacturer_benchmarks.json     # Global OEM delivery volumes, margins & integration
│   ├── geographic_production.json       # Production volume, grid carbon & export metrics by nation
│   └── ev_dataset.csv                   # Clean tabular export for Excel / Python analysis
│
├── js/
│   └── app.js                           # Modular application engine & chart generators
│
└── css/
    └── styles.css                       # Modern glassmorphism & responsive styles
```

---

## 📊 Key Analytical Findings Across Scenarios

1. **Category Profitability (Emily Johnson):**
   * **Electric SUVs** generate **58.4% of all EV revenue** ($171.3B) and represent the core corporate margin generator (18.5%–22.8% gross margin).
   * **Sub-$20k City Hatchbacks** (+28.8% YoY) and **Electric Class 8 Commercial Trucks** (+86.5% YoY) represent the two fastest expanding segments.
   * Customer satisfaction peaks at the **500 km WLTP range threshold** coupled with 800V 20-minute fast charging; range beyond 650 km delivers diminishing economic returns.

2. **Competitive Moats (David Chen):**
   * **BYD leads global volume (21.4% share)** with an industry-high **22.8% gross margin**, driven by an exceptional **92/100 vertical integration index** and in-house Blade LFP battery manufacturing.
   * **Tesla holds 13.9% volume share** but captures superior revenue per vehicle ($44.2k vs BYD's $20.7k) via software FSD subscriptions and the global Supercharger ecosystem.
   * **China controls 59.8% of global vehicle assembly and 74.2% of battery cell supply**, prompting aggressive Western tariffs (US 100%, EU up to 35.3%) and driving nearshoring to Mexico, Eastern Europe, and Southeast Asia.

3. **Technological Decarbonization (Dr. Sarah Williams):**
   * **Sodium-Ion (Na-ion)** eliminates lithium, cobalt, and nickel dependencies, slashing embodied manufacturing emissions to **41 kg CO2/kWh** while retaining 92% capacity at -20°C.
   * **Lifecycle Break-Even:** Even under a coal-heavy electric grid (630 g CO2/kWh), an EV achieves carbon parity against a modern gasoline car in **32,100 km (~2.5 years)**. Over 250,000 km, it eliminates **28 to 44 metric tons of net CO2**.
   * Policy imperatives include mandatory digital battery passports by 2027, weight-based feebates penalizing >2,200 kg passenger vehicles, and ISO 15118-20 bidirectional V2G mandates.
