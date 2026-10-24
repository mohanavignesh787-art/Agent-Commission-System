# CommissionPro – Insurance Agent Commission Tracking & Calculation Platform

**Task ID:** WD-LIC-004  
**Domain:** Agent Commission Insurance  
**Industry:** Insurance & Finance (Life Insurance Corporation / General Insurance)  
**Project Type:** Frontend-only web development project  
**Developer:** Data Alcott Systems Free Web Development Internship Online Task Submission  

---

## 1. Project Overview

**CommissionPro** is an enterprise-grade, responsive financial management web platform engineered for insurance branch administrators, team managers, and field agents. It automates and visualizes insurance agent commission calculations, tier-based hierarchies, policy ledgers, performance scorecards, and disbursement workflows.

The application is built entirely as a client-side single page application (SPA) running vanilla HTML5, CSS3, and JavaScript, leveraging browser `LocalStorage` for session persistence without requiring external database setups, server APIs, or paid subscription keys.

---

## 2. Key Features & Modules

### A. Role-Based Authentication & Demo Access
- Simulated role authorization supporting three distinct roles:
  - **Administrator:** Full administrative privileges (tier structure editing, agent CRUD, commission rules, payouts, reports, system settings).
  - **Branch Manager:** Team oversight, payout approval workflows, and agent performance auditing.
  - **Insurance Agent:** Individual portfolio view, sales tracking, tier advancement tracking, and personal commission statements.
- One-click demo login buttons for instant evaluation.

### B. Executive KPI Dashboard
- Real-time dynamic KPI metric cards:
  - Total Active Agents
  - Total Policy Sales
  - Total Commission Earned
  - Payouts Completed
  - Pending Commissions
  - Gross Underwritten Premium Revenue
- Interactive **Chart.js** data visualizations:
  - Monthly Commission & Bonus Trends (Smooth Area Line Chart)
  - Commission Distribution by Agent Tier (Categorical Bar Chart)
  - Payout Status Breakdown (Doughnut Chart)
- Top 5 agent leaderboard preview and recent transaction audit trail.

### C. Agent Management (Full CRUD)
- **Create:** Add new agents with unique Agent ID validation, tier assignment, contact details, and joining date.
- **Read:** Comprehensive agent table with live search by name or Agent ID, tier filtering (Platinum, Gold, Silver, Bronze, Starter), and status toggling (Active/Inactive).
- **Update:** Modal for modifying agent details, tier elevations, and contact info.
- **Delete:** Safe deletion workflow with confirmation modal.
- Sorting by Commission Earned, Policies Sold, Gross Premium, Name (A-Z), and Joining Date.
- Dynamic pagination with customizable page sizes (10, 25, 50).

### D. Commission Structure & Rules Engine
- Default configured agent tiers:
  - **Platinum:** 30% base commission rate (₹15,00,000+ target)
  - **Gold:** 25% base commission rate (₹10,00,000 - ₹15,00,000 target)
  - **Silver:** 20% base commission rate (₹5,00,000 - ₹10,00,000 target)
  - **Bronze:** 15% base commission rate (₹2,00,000 - ₹5,00,000 target)
  - **Starter:** 10% base commission rate (₹0 - ₹2,00,000 target)
- Configurable renewal commission rate (default 7.5% flat).
- High-value policy threshold (₹1,00,000+) bonus rate (default 2.5%).
- Tier upgrade bonuses and performance incentives.
- All calculation formulas dynamically use stored structure parameters.

### E. Interactive Commission Calculation Engine
- Live calculation form:
  - Agent selector (auto-retrieves current tier and applicable rate)
  - Policy Number input with **live duplicate prevention** against existing records
  - Customer Name & Policy Type (Endowment, Jeevan Labh, Tech Term, SIIP ULIP, etc.)
  - Commission Category (First-Year Tier Base vs Renewal Policy Rate)
  - Premium Amount validation (> 0)
  - Optional Performance / Festival Bonus amount
- **Live Preview Card:** Computes and breaks down Eligible Premium, Rate, Base Commission, High-Value Bonus, and Total Payable Commission in real time.
- Direct recording saves transaction to history, updates agent totals, generates a pending payout record, and triggers an in-app notification.

### F. Commission Payout Management
- Complete disbursal lifecycle tracking: `Paid`, `Pending`, `Processing`, `On Hold`, `Failed`.
- Single-click or bulk payout processing (mark as Paid, assign UTR/Reference code, and set payment method).
- Simulated payment methods: NEFT / RTGS, IMPS, Corporate UPI, Bank Demand Draft.
- Printable disbursal receipt vouchers with transaction audit references.

### G. Agent Performance & Portfolio Analytics
- Comprehensive individual performance views with company ranking.
- Visual **Tier Progression Bar** calculating distance and remaining premium required to unlock the next commission tier.
- Dual visual charts: Monthly Policies Closed and Monthly Commission Earnings.

### H. Commission History & Ledger
- Searchable transaction ledger with date, policy number, agent, customer, rate, base commission, bonus, and payment status.
- Export filtered ledger directly to CSV.
- Detailed policy commission statement modal.

### I. Reports & Financial Analytics
- 7 built-in financial reporting templates:
  1. Agent-Wise Commission & Sales Report
  2. Monthly Commission Trend & Payouts Report
  3. Tier-Wise Performance & Margin Report
  4. Premium Sales by Policy Type Report
  5. Commission Payout & Disbursal Audit Report
  6. Outstanding Pending Commission Report
  7. Performance & Incentive Bonus Report
- Date-range filtering (From Date to To Date).
- Export to **CSV**, browser **Print**, and **PDF** generation via jsPDF.

### J. Agent Leaderboard
- Recognition podium highlighting Top 3 insurance advisors (Rank 1 Gold, Rank 2 Silver, Rank 3 Bronze).
- Full network rankings with policies sold, premium generated, and dynamic performance scores.

### K. In-App Notifications
- Real-time audit trail of calculation recordings, tier upgrades, payout status changes, and milestone events.
- Unread badge counters in topbar and sidebar with mark-as-read and clear-all actions.

### L. Settings & Theme Support
- Dark Mode / Light Mode toggle with persistence.
- Currency display switcher (₹ INR default, $ USD, € EUR, £ GBP).
- Complete JSON data backup export.
- **Reset to Factory Demo Data** option with modal confirmation.

---

## 3. Technology Stack

- **HTML5:** Semantic markup, accessibility attributes, modal overlays, print containers.
- **CSS3:** Custom properties (`--primary: #D97706`), flexbox, CSS grid, dark mode variables, print stylesheets (`@media print`), and responsive breakpoints.
- **Vanilla JavaScript (ES6+):** Pure client-side application logic, event delegation, calculation engine, state management, and modal lifecycle.
- **Chart.js (v4.4.1):** Responsive canvas-based charts for trend lines, tier distribution bars, and status doughnuts.
- **Lucide Icons:** Clean UI iconography.
- **jsPDF (v2.5.1):** Browser-side PDF document generation.
- **HTML5 LocalStorage:** Persistent storage across browser refreshes under key `commissionpro_data_v1`.

---

## 4. Folder Structure

```text
├── index.html          # Main application markup (all views, modals, topbar & auth)
├── style.css           # Styling, themes, responsive layout, animations, print rules
├── script.js           # Core application controller, state management, calculation engine
├── metadata.json       # Application metadata and capability declarations
├── package.json        # Project manifest
└── README.md           # Project documentation and user guide
```

---

## 5. Local Setup & Execution Instructions

This application requires **no server installation, database setup, or npm build steps** to run for local evaluation.

### Option 1: Direct Browser Launch
1. Double-click or open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. The application will initialize with default sample data immediately.

### Option 2: VS Code Live Server Extension
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by Ritwick Dey if not already installed.
3. Right-click `index.html` and click **"Open with Live Server"**.
4. The application will launch at `http://127.0.0.1:5500/index.html`.

### Option 3: Local Node.js Dev Server (Vite)
If using the included Vite dev server:
```bash
npm install
npm run dev
```
Navigate to `http://localhost:3000`.

---

## 6. Demo Login Credentials

The login screen provides both **one-click quick login buttons** and manual form authentication:

| Role | Email Address | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@commissionpro.lic` | `demo1234` | Full access: CRUD agents, edit tiers, process payouts, export reports |
| **Manager** | `manager@commissionpro.lic` | `demo1234` | Team oversight, payout approvals, performance monitoring |
| **Agent** | `rajesh.sharma@lic-agent.in` | `demo1234` | Individual portfolio, sales calculator, commission history |

---

## 7. Sample Commission Calculation Walkthrough

### Formula
$$\text{Base Commission} = \frac{\text{Eligible Premium Amount} \times \text{Applicable Commission Rate}}{100}$$

$$\text{Total Commission} = \text{Base Commission} + \text{Eligible Bonuses}$$

### Example Scenario
- **Agent:** Rajesh Sharma (Assigned Tier: **Platinum = 30%**)
- **Policy Type:** LIC Endowment Assurance (First-Year Policy)
- **Premium Amount:** ₹1,25,000
- **High-Value Threshold:** ₹1,00,000 (Qualifies for +2.5% high-value bonus)
- **Manual / Festival Bonus:** ₹0

### Step-by-Step Calculation:
1. **Base Commission:**
   $$\text{Base} = \frac{₹1,25,000 \times 30}{100} = ₹37,500.00$$
2. **High-Value Policy Bonus (2.5%):**
   $$\text{Bonus} = \frac{₹1,25,000 \times 2.5}{100} = ₹3,125.00$$
3. **Total Payable Commission:**
   $$\text{Total} = ₹37,500.00 + ₹3,125.00 = ₹40,625.00$$

*(Note: For Renewal Policies, the engine automatically selects the configured renewal rate of 7.5% rather than the agent's first-year tier rate).*

---

## 8. Data Persistence & Resetting Demo Data

- All agent records, transaction entries, payouts, tier rates, notifications, and user settings are saved in your browser's `localStorage` under `commissionpro_data_v1`.
- Any added agent, calculated commission, or disbursed payout persists when refreshing the page or closing the tab.
- To restore the original 14-agent, 28-transaction seed dataset at any time:
  1. Open the left sidebar and click **Settings & Preferences**.
  2. Under **Demo Data & Storage Management**, click **"Reset All Data to Original Seed State"**.
  3. Confirm in the dialog. The dataset will reset cleanly.

---

## 9. Security & Academic Demonstration Disclaimer

- **Frontend Simulation:** This project is developed specifically for an educational web development internship task (Task ID: WD-LIC-004).
- **Authentication:** Role-based authentication is handled in client-side JavaScript for interactive demonstration purposes and is **not secure for production financial systems**.
- **Simulated Payouts:** Disbursal actions, bank references (UTR numbers), and vouchers simulate financial transactions; no actual bank funds or banking APIs are connected.
- **Privacy:** All agent names, customer identities, policy numbers, and contact details are purely fictional and do not represent real persons or LIC policyholders.
