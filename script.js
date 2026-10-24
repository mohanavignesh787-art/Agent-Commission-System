/**
 * CommissionPro – Insurance Agent Commission Tracking & Calculation Platform
 * Task ID: WD-LIC-004
 * Complete Vanilla JavaScript Application Logic
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'commissionpro_data_v1';
  const AUTH_KEY = 'commissionpro_auth_v1';
  const THEME_KEY = 'commissionpro_theme_v1';
  const SETTINGS_KEY = 'commissionpro_settings_v1';

  // Seed Data Generation
  function getInitialSeedData() {
    const agents = [
      { id: 'AGT-1001', name: 'Rajesh Sharma', email: 'rajesh.sharma@lic-agent.in', phone: '+91 98201 44521', tier: 'Platinum', joiningDate: '2021-03-15', status: 'Active', policiesSold: 34, totalPremium: 2840000, totalCommission: 852000 },
      { id: 'AGT-1002', name: 'Priya Sundaram', email: 'priya.sundaram@lic-agent.in', phone: '+91 98410 88231', tier: 'Gold', joiningDate: '2021-07-20', status: 'Active', policiesSold: 28, totalPremium: 1850000, totalCommission: 462500 },
      { id: 'AGT-1003', name: 'Amit Patel', email: 'amit.patel@lic-agent.in', phone: '+91 98791 23412', tier: 'Gold', joiningDate: '2022-01-10', status: 'Active', policiesSold: 24, totalPremium: 1420000, totalCommission: 355000 },
      { id: 'AGT-1004', name: 'Sunita Verma', email: 'sunita.verma@lic-agent.in', phone: '+91 97112 34567', tier: 'Silver', joiningDate: '2022-04-18', status: 'Active', policiesSold: 19, totalPremium: 980000, totalCommission: 196000 },
      { id: 'AGT-1005', name: 'Vikram Malhotra', email: 'vikram.m@lic-agent.in', phone: '+91 98190 76543', tier: 'Silver', joiningDate: '2022-09-05', status: 'Active', policiesSold: 16, totalPremium: 820000, totalCommission: 164000 },
      { id: 'AGT-1006', name: 'Ananya Joshi', email: 'ananya.joshi@lic-agent.in', phone: '+91 98220 91823', tier: 'Silver', joiningDate: '2023-02-12', status: 'Active', policiesSold: 15, totalPremium: 740000, totalCommission: 148000 },
      { id: 'AGT-1007', name: 'Suresh Reddy', email: 'suresh.reddy@lic-agent.in', phone: '+91 98490 12894', tier: 'Bronze', joiningDate: '2023-05-19', status: 'Active', policiesSold: 11, totalPremium: 460000, totalCommission: 69000 },
      { id: 'AGT-1008', name: 'Sneha Gupta', email: 'sneha.gupta@lic-agent.in', phone: '+91 99100 87654', tier: 'Bronze', joiningDate: '2023-08-25', status: 'Active', policiesSold: 9, totalPremium: 380000, totalCommission: 57000 },
      { id: 'AGT-1009', name: 'Manoj Tiwari', email: 'manoj.tiwari@lic-agent.in', phone: '+91 94150 99887', tier: 'Bronze', joiningDate: '2023-11-04', status: 'Active', policiesSold: 8, totalPremium: 310000, totalCommission: 46500 },
      { id: 'AGT-1010', name: 'Deepa Nair', email: 'deepa.nair@lic-agent.in', phone: '+91 98470 54321', tier: 'Bronze', joiningDate: '2024-01-15', status: 'Active', policiesSold: 7, totalPremium: 270000, totalCommission: 40500 },
      { id: 'AGT-1011', name: 'Arvind Rao', email: 'arvind.rao@lic-agent.in', phone: '+91 98860 33445', tier: 'Starter', joiningDate: '2024-03-01', status: 'Active', policiesSold: 4, totalPremium: 160000, totalCommission: 16000 },
      { id: 'AGT-1012', name: 'Kavita Singh', email: 'kavita.singh@lic-agent.in', phone: '+91 98390 11223', tier: 'Starter', joiningDate: '2024-04-10', status: 'Active', policiesSold: 3, totalPremium: 120000, totalCommission: 12000 },
      { id: 'AGT-1013', name: 'Ramesh Nair', email: 'ramesh.nair@lic-agent.in', phone: '+91 98460 77889', tier: 'Starter', joiningDate: '2024-06-05', status: 'Active', policiesSold: 2, totalPremium: 80000, totalCommission: 8000 },
      { id: 'AGT-1014', name: 'Meera Iyer', email: 'meera.iyer@lic-agent.in', phone: '+91 98400 66778', tier: 'Starter', joiningDate: '2024-08-20', status: 'Active', policiesSold: 2, totalPremium: 75000, totalCommission: 7500 }
    ];

    const tiers = {
      Platinum: { rate: 30, minPremium: 1500000, minPolicies: 25 },
      Gold: { rate: 25, minPremium: 1000000, minPolicies: 18 },
      Silver: { rate: 20, minPremium: 500000, minPolicies: 12 },
      Bronze: { rate: 15, minPremium: 200000, minPolicies: 6 },
      Starter: { rate: 10, minPremium: 0, minPolicies: 0 }
    };

    const rules = {
      renewalRate: 7.5,
      highValueThreshold: 100000,
      highValueBonusRate: 2.5,
      tierUpgradeBonus: 5000
    };

    const transactions = [
      { id: 'TX-901', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', policyNumber: 'POL-84101', customerName: 'Rohan Deshmukh', policyType: 'Endowment Plan', category: 'first-year', premium: 125000, rate: 30, baseComm: 37500, bonus: 3125, totalComm: 40625, date: '2025-01-14', status: 'Paid' },
      { id: 'TX-902', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', policyNumber: 'POL-84102', customerName: 'Kavita Sengupta', policyType: 'Jeevan Labh', category: 'first-year', premium: 85000, rate: 30, baseComm: 25500, bonus: 0, totalComm: 25500, date: '2025-01-20', status: 'Paid' },
      { id: 'TX-903', agentId: 'AGT-1002', agentName: 'Priya Sundaram', policyNumber: 'POL-84103', customerName: 'Sanjay Krishnan', policyType: 'Tech Term', category: 'first-year', premium: 110000, rate: 25, baseComm: 27500, bonus: 2750, totalComm: 30250, date: '2025-01-28', status: 'Paid' },
      { id: 'TX-904', agentId: 'AGT-1003', agentName: 'Amit Patel', policyNumber: 'POL-84104', customerName: 'Bhavna Shah', policyType: 'Jeevan Umang', category: 'first-year', premium: 95000, rate: 25, baseComm: 23750, bonus: 0, totalComm: 23750, date: '2025-02-04', status: 'Paid' },
      { id: 'TX-905', agentId: 'AGT-1004', agentName: 'Sunita Verma', policyNumber: 'POL-84105', customerName: 'Gaurav Mehra', policyType: 'Money Back', category: 'first-year', premium: 70000, rate: 20, baseComm: 14000, bonus: 0, totalComm: 14000, date: '2025-02-12', status: 'Paid' },
      { id: 'TX-906', agentId: 'AGT-1005', agentName: 'Vikram Malhotra', policyNumber: 'POL-84106', customerName: 'Naveen Chopra', policyType: 'Endowment Plan', category: 'renewal', premium: 60000, rate: 7.5, baseComm: 4500, bonus: 0, totalComm: 4500, date: '2025-02-18', status: 'Paid' },
      { id: 'TX-907', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', policyNumber: 'POL-84107', customerName: 'Aakash Singhal', policyType: 'SIIP ULIP', category: 'first-year', premium: 150000, rate: 30, baseComm: 45000, bonus: 3750, totalComm: 48750, date: '2025-02-25', status: 'Paid' },
      { id: 'TX-908', agentId: 'AGT-1006', agentName: 'Ananya Joshi', policyNumber: 'POL-84108', customerName: 'Harish Kulkarni', policyType: 'Saral Pension', category: 'first-year', premium: 105000, rate: 20, baseComm: 21000, bonus: 2625, totalComm: 23625, date: '2025-03-02', status: 'Paid' },
      { id: 'TX-909', agentId: 'AGT-1007', agentName: 'Suresh Reddy', policyNumber: 'POL-84109', customerName: 'Venkat Raman', policyType: 'Endowment Plan', category: 'first-year', premium: 50000, rate: 15, baseComm: 7500, bonus: 0, totalComm: 7500, date: '2025-03-08', status: 'Paid' },
      { id: 'TX-910', agentId: 'AGT-1002', agentName: 'Priya Sundaram', policyNumber: 'POL-84110', customerName: 'Geeta Subramaniam', policyType: 'Jeevan Labh', category: 'renewal', premium: 80000, rate: 7.5, baseComm: 6000, bonus: 0, totalComm: 6000, date: '2025-03-15', status: 'Paid' },
      { id: 'TX-911', agentId: 'AGT-1008', agentName: 'Sneha Gupta', policyNumber: 'POL-84111', customerName: 'Manish Chawla', policyType: 'Money Back', category: 'first-year', premium: 45000, rate: 15, baseComm: 6750, bonus: 0, totalComm: 6750, date: '2025-03-22', status: 'Paid' },
      { id: 'TX-912', agentId: 'AGT-1003', agentName: 'Amit Patel', policyNumber: 'POL-84112', customerName: 'Dipesh Parikh', policyType: 'Tech Term', category: 'first-year', premium: 120000, rate: 25, baseComm: 30000, bonus: 3000, totalComm: 33000, date: '2025-03-29', status: 'Paid' },
      { id: 'TX-913', agentId: 'AGT-1009', agentName: 'Manoj Tiwari', policyNumber: 'POL-84113', customerName: 'Pankaj Tripathi', policyType: 'Endowment Plan', category: 'first-year', premium: 40000, rate: 15, baseComm: 6000, bonus: 0, totalComm: 6000, date: '2025-04-05', status: 'Paid' },
      { id: 'TX-914', agentId: 'AGT-1010', agentName: 'Deepa Nair', policyNumber: 'POL-84114', customerName: 'Unnikrishnan P', policyType: 'Jeevan Umang', category: 'first-year', premium: 55000, rate: 15, baseComm: 8250, bonus: 0, totalComm: 8250, date: '2025-04-12', status: 'Paid' },
      { id: 'TX-915', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', policyNumber: 'POL-84115', customerName: 'Devendra Rana', policyType: 'Tech Term', category: 'first-year', premium: 140000, rate: 30, baseComm: 42000, bonus: 3500, totalComm: 45500, date: '2025-04-19', status: 'Paid' },
      { id: 'TX-916', agentId: 'AGT-1011', agentName: 'Arvind Rao', policyNumber: 'POL-84116', customerName: 'Shashank Hegde', policyType: 'Endowment Plan', category: 'first-year', premium: 35000, rate: 10, baseComm: 3500, bonus: 0, totalComm: 3500, date: '2025-04-26', status: 'Paid' },
      { id: 'TX-917', agentId: 'AGT-1004', agentName: 'Sunita Verma', policyNumber: 'POL-84117', customerName: 'Meenakshi Kapoor', policyType: 'Jeevan Labh', category: 'first-year', premium: 75000, rate: 20, baseComm: 15000, bonus: 0, totalComm: 15000, date: '2025-05-03', status: 'Paid' },
      { id: 'TX-918', agentId: 'AGT-1002', agentName: 'Priya Sundaram', policyNumber: 'POL-84118', customerName: 'Karthik Raja', policyType: 'SIIP ULIP', category: 'first-year', premium: 130000, rate: 25, baseComm: 32500, bonus: 3250, totalComm: 35750, date: '2025-05-10', status: 'Paid' },
      { id: 'TX-919', agentId: 'AGT-1012', agentName: 'Kavita Singh', policyNumber: 'POL-84119', customerName: 'Raghavendra Bhat', policyType: 'Endowment Plan', category: 'first-year', premium: 30000, rate: 10, baseComm: 3000, bonus: 0, totalComm: 3000, date: '2025-05-17', status: 'Paid' },
      { id: 'TX-920', agentId: 'AGT-1005', agentName: 'Vikram Malhotra', policyNumber: 'POL-84120', customerName: 'Siddharth Roy', policyType: 'Money Back', category: 'first-year', premium: 90000, rate: 20, baseComm: 18000, bonus: 0, totalComm: 18000, date: '2025-05-24', status: 'Paid' },
      { id: 'TX-921', agentId: 'AGT-1006', agentName: 'Ananya Joshi', policyNumber: 'POL-84121', customerName: 'Pallavi Phadke', policyType: 'Jeevan Umang', category: 'renewal', premium: 70000, rate: 7.5, baseComm: 5250, bonus: 0, totalComm: 5250, date: '2025-06-02', status: 'Pending' },
      { id: 'TX-922', agentId: 'AGT-1007', agentName: 'Suresh Reddy', policyNumber: 'POL-84122', customerName: 'Madhava Rao', policyType: 'Saral Pension', category: 'first-year', premium: 65000, rate: 15, baseComm: 9750, bonus: 0, totalComm: 9750, date: '2025-06-09', status: 'Pending' },
      { id: 'TX-923', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', policyNumber: 'POL-84123', customerName: 'Vivek Oberoi', policyType: 'Endowment Plan', category: 'first-year', premium: 160000, rate: 30, baseComm: 48000, bonus: 4000, totalComm: 52000, date: '2025-06-15', status: 'Pending' },
      { id: 'TX-924', agentId: 'AGT-1003', agentName: 'Amit Patel', policyNumber: 'POL-84124', customerName: 'Hemant Desai', policyType: 'Jeevan Labh', category: 'first-year', premium: 105000, rate: 25, baseComm: 26250, bonus: 2625, totalComm: 28875, date: '2025-06-20', status: 'Pending' },
      { id: 'TX-925', agentId: 'AGT-1013', agentName: 'Ramesh Nair', policyNumber: 'POL-84125', customerName: 'Vijay Warrier', policyType: 'Tech Term', category: 'first-year', premium: 40000, rate: 10, baseComm: 4000, bonus: 0, totalComm: 4000, date: '2025-06-25', status: 'Pending' },
      { id: 'TX-926', agentId: 'AGT-1002', agentName: 'Priya Sundaram', policyNumber: 'POL-84126', customerName: 'Vandana Natarajan', policyType: 'Endowment Plan', category: 'first-year', premium: 115000, rate: 25, baseComm: 28750, bonus: 2875, totalComm: 31625, date: '2025-07-02', status: 'Pending' },
      { id: 'TX-927', agentId: 'AGT-1004', agentName: 'Sunita Verma', policyNumber: 'POL-84127', customerName: 'Arun Saxena', policyType: 'Money Back', category: 'renewal', premium: 50000, rate: 7.5, baseComm: 3750, bonus: 0, totalComm: 3750, date: '2025-07-08', status: 'Pending' },
      { id: 'TX-928', agentId: 'AGT-1008', agentName: 'Sneha Gupta', policyNumber: 'POL-84128', customerName: 'Preeti Aggarwal', policyType: 'Jeevan Umang', category: 'first-year', premium: 48000, rate: 15, baseComm: 7200, bonus: 0, totalComm: 7200, date: '2025-07-14', status: 'Pending' }
    ];

    const payouts = [
      { id: 'PAY-701', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', amount: 66125, requestDate: '2025-01-31', status: 'Paid', paymentMethod: 'NEFT / RTGS', reference: 'UTR-20250131-4821', processedDate: '2025-02-02' },
      { id: 'PAY-702', agentId: 'AGT-1002', agentName: 'Priya Sundaram', amount: 30250, requestDate: '2025-01-31', status: 'Paid', paymentMethod: 'IMPS', reference: 'IMPS-20250131-9921', processedDate: '2025-02-01' },
      { id: 'PAY-703', agentId: 'AGT-1003', agentName: 'Amit Patel', amount: 23750, requestDate: '2025-02-15', status: 'Paid', paymentMethod: 'NEFT / RTGS', reference: 'UTR-20250215-3819', processedDate: '2025-02-16' },
      { id: 'PAY-704', agentId: 'AGT-1004', agentName: 'Sunita Verma', amount: 14000, requestDate: '2025-02-28', status: 'Paid', paymentMethod: 'UPI', reference: 'UPI-20250228-7712', processedDate: '2025-03-01' },
      { id: 'PAY-705', agentId: 'AGT-1005', agentName: 'Vikram Malhotra', amount: 22500, requestDate: '2025-03-05', status: 'Paid', paymentMethod: 'NEFT / RTGS', reference: 'UTR-20250305-6612', processedDate: '2025-03-06' },
      { id: 'PAY-706', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', amount: 48750, requestDate: '2025-03-15', status: 'Paid', paymentMethod: 'NEFT / RTGS', reference: 'UTR-20250315-1102', processedDate: '2025-03-16' },
      { id: 'PAY-707', agentId: 'AGT-1006', agentName: 'Ananya Joshi', amount: 23625, requestDate: '2025-03-31', status: 'Paid', paymentMethod: 'IMPS', reference: 'IMPS-20250331-5544', processedDate: '2025-04-01' },
      { id: 'PAY-708', agentId: 'AGT-1007', agentName: 'Suresh Reddy', amount: 17250, requestDate: '2025-04-15', status: 'Paid', paymentMethod: 'NEFT / RTGS', reference: 'UTR-20250415-3321', processedDate: '2025-04-16' },
      { id: 'PAY-709', agentId: 'AGT-1008', agentName: 'Sneha Gupta', amount: 13950, requestDate: '2025-04-30', status: 'Paid', paymentMethod: 'UPI', reference: 'UPI-20250430-8891', processedDate: '2025-05-02' },
      { id: 'PAY-710', agentId: 'AGT-1003', agentName: 'Amit Patel', amount: 33000, requestDate: '2025-05-15', status: 'Paid', paymentMethod: 'NEFT / RTGS', reference: 'UTR-20250515-4429', processedDate: '2025-05-16' },
      { id: 'PAY-711', agentId: 'AGT-1001', agentName: 'Rajesh Sharma', amount: 52000, requestDate: '2025-06-25', status: 'Pending', paymentMethod: 'NEFT / RTGS', reference: '', processedDate: '' },
      { id: 'PAY-712', agentId: 'AGT-1002', agentName: 'Priya Sundaram', amount: 31625, requestDate: '2025-07-05', status: 'Pending', paymentMethod: 'NEFT / RTGS', reference: '', processedDate: '' },
      { id: 'PAY-713', agentId: 'AGT-1006', agentName: 'Ananya Joshi', amount: 5250, requestDate: '2025-07-08', status: 'Processing', paymentMethod: 'IMPS', reference: 'BATCH-2025-998', processedDate: '' },
      { id: 'PAY-714', agentId: 'AGT-1009', agentName: 'Manoj Tiwari', amount: 6000, requestDate: '2025-07-10', status: 'On Hold', paymentMethod: 'NEFT / RTGS', reference: 'HOLD-KYC-PENDING', processedDate: '' },
      { id: 'PAY-715', agentId: 'AGT-1011', agentName: 'Arvind Rao', amount: 3500, requestDate: '2025-07-12', status: 'Failed', paymentMethod: 'IMPS', reference: 'FAIL-IFSC-INVALID', processedDate: '' }
    ];

    const notifications = [
      { id: 'NOTIF-1', title: 'Commission Calculated', message: 'Recorded ₹40,625 for Rajesh Sharma (POL-84101)', category: 'commission', date: '2025-07-14 14:30', read: false },
      { id: 'NOTIF-2', title: 'Payout Request Pending', message: 'Payout PAY-711 for ₹52,000 awaiting manager approval', category: 'payout', date: '2025-07-13 11:15', read: false },
      { id: 'NOTIF-3', title: 'Agent Tier Upgrade', message: 'Priya Sundaram reached Gold Tier (25% commission rate)', category: 'tier', date: '2025-07-10 09:45', read: false },
      { id: 'NOTIF-4', title: 'Milestone Achieved', message: 'Rajesh Sharma crossed ₹25 Lakhs gross premium milestone', category: 'milestone', date: '2025-07-05 16:20', read: true },
      { id: 'NOTIF-5', title: 'New Agent Registered', message: 'Meera Iyer joined branch as Starter Agent (AGT-1014)', category: 'system', date: '2025-06-28 10:00', read: true }
    ];

    return { agents, tiers, rules, transactions, payouts, notifications };
  }

  // App Controller
  const app = {
    data: null,
    currentUser: null,
    activePage: 'dashboard',
    charts: {},
    selectedPayoutIds: new Set(),
    agentCurrentPage: 1,
    payoutCurrentPage: 1,
    historyCurrentPage: 1,
    itemsPerPage: 10,
    currency: 'INR',
    currencySymbol: '₹',

    init: function () {
      this.loadSettings();
      this.loadTheme();
      this.loadData();
      this.loadAuth();
      this.bindGlobalEvents();
      this.renderCurrentView();
      this.initLucide();
    },

    initLucide: function () {
      if (window.lucide) {
        window.lucide.createIcons();
      }
    },

    loadSettings: function () {
      try {
        const saved = localStorage.getItem(SETTINGS_KEY);
        if (saved) {
          const cfg = JSON.parse(saved);
          this.currency = cfg.currency || 'INR';
          this.itemsPerPage = parseInt(cfg.pageSize, 10) || 10;
        }
      } catch (e) {
        console.warn('Error reading settings', e);
      }
      this.updateCurrencySymbol();
    },

    updateCurrencySymbol: function () {
      switch (this.currency) {
        case 'USD': this.currencySymbol = '$'; break;
        case 'EUR': this.currencySymbol = '€'; break;
        case 'GBP': this.currencySymbol = '£'; break;
        default: this.currencySymbol = '₹'; break;
      }
    },

    saveSettings: function () {
      const cur = document.getElementById('settingCurrency').value;
      const size = document.getElementById('settingPageSize').value;
      this.currency = cur;
      this.itemsPerPage = parseInt(size, 10) || 10;
      this.updateCurrencySymbol();

      localStorage.setItem(SETTINGS_KEY, JSON.stringify({
        currency: this.currency,
        pageSize: this.itemsPerPage
      }));

      this.showToast('Settings saved successfully', 'success');
      this.renderCurrentView();
    },

    loadTheme: function () {
      const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      this.updateThemeIcon(savedTheme);
      const sel = document.getElementById('settingTheme');
      if (sel) sel.value = savedTheme;
    },

    setTheme: function (theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem(THEME_KEY, theme);
      this.updateThemeIcon(theme);
      this.renderCharts();
    },

    toggleDarkMode: function () {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      this.setTheme(next);
      this.showToast(`Switched to ${next === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    },

    updateThemeIcon: function (theme) {
      const icon = document.getElementById('themeIcon');
      if (icon) {
        icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
        this.initLucide();
      }
    },

    loadData: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.data = JSON.parse(raw);
        } else {
          this.data = getInitialSeedData();
          this.persistData();
        }
      } catch (e) {
        console.error('Data parsing error, reloading seed', e);
        this.data = getInitialSeedData();
        this.persistData();
      }
    },

    persistData: function () {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.updateBadges();
      } catch (e) {
        console.error('Storage quota or persistence error', e);
      }
    },

    loadAuth: function () {
      try {
        const saved = localStorage.getItem(AUTH_KEY);
        if (saved) {
          this.currentUser = JSON.parse(saved);
        } else {
          // Default to Admin demo session
          this.currentUser = {
            name: 'Administrator',
            email: 'admin@commissionpro.lic',
            role: 'admin'
          };
          localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
        }
      } catch (e) {
        this.currentUser = { name: 'Administrator', email: 'admin@commissionpro.lic', role: 'admin' };
      }
      this.updateUserUI();
    },

    quickLogin: function (role) {
      const users = {
        admin: { name: 'Administrator', email: 'admin@commissionpro.lic', role: 'admin' },
        manager: { name: 'Sanjay Deshmukh (Manager)', email: 'manager@commissionpro.lic', role: 'manager' },
        agent: { name: 'Rajesh Sharma (Agent)', email: 'rajesh.sharma@lic-agent.in', role: 'agent', agentId: 'AGT-1001' }
      };

      this.currentUser = users[role] || users.admin;
      localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
      this.updateUserUI();
      document.getElementById('authContainer').style.display = 'none';
      document.getElementById('appContainer').style.display = 'flex';
      this.showToast(`Logged in as ${this.currentUser.role.toUpperCase()}`, 'success');
      this.navigate('dashboard');
    },

    handleLogin: function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const role = document.getElementById('loginRole').value;
      const name = role === 'admin' ? 'Administrator' : role === 'manager' ? 'Branch Manager' : 'Agent User';

      this.currentUser = { name, email, role };
      localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
      this.updateUserUI();
      document.getElementById('authContainer').style.display = 'none';
      document.getElementById('appContainer').style.display = 'flex';
      this.showToast(`Signed in successfully as ${role}`, 'success');
      this.navigate('dashboard');
    },

    handleRegister: function (e) {
      e.preventDefault();
      const name = document.getElementById('regName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const role = document.getElementById('regRole').value;

      this.currentUser = { name, email, role };
      localStorage.setItem(AUTH_KEY, JSON.stringify(this.currentUser));
      this.updateUserUI();
      document.getElementById('authContainer').style.display = 'none';
      document.getElementById('appContainer').style.display = 'flex';
      this.showToast('Account created and logged in', 'success');
      this.navigate('dashboard');
    },

    switchAuthTab: function (tab) {
      const loginForm = document.getElementById('loginForm');
      const registerForm = document.getElementById('registerForm');
      const tabLogin = document.getElementById('authTabLogin');
      const tabRegister = document.getElementById('authTabRegister');

      if (tab === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLogin.className = 'btn btn-sm btn-primary';
        tabRegister.className = 'btn btn-sm btn-secondary';
      } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabLogin.className = 'btn btn-sm btn-secondary';
        tabRegister.className = 'btn btn-sm btn-primary';
      }
    },

    switchRole: function (role) {
      this.quickLogin(role);
      this.toggleProfileDropdown(false);
    },

    logout: function () {
      this.currentUser = null;
      localStorage.removeItem(AUTH_KEY);
      document.getElementById('appContainer').style.display = 'none';
      document.getElementById('authContainer').style.display = 'flex';
      this.showToast('You have signed out', 'info');
      this.initLucide();
    },

    updateUserUI: function () {
      if (!this.currentUser) return;
      const initials = this.currentUser.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
      
      const sAvatar = document.getElementById('sidebarUserAvatar');
      const sName = document.getElementById('sidebarUserName');
      const sRole = document.getElementById('sidebarUserRole');
      const tAvatar = document.getElementById('topbarUserAvatar');
      const tName = document.getElementById('topbarUserName');
      const tRole = document.getElementById('topbarUserRole');

      if (sAvatar) sAvatar.textContent = initials;
      if (sName) sName.textContent = this.currentUser.name;
      if (sRole) sRole.textContent = this.currentUser.role.toUpperCase();

      if (tAvatar) tAvatar.textContent = initials;
      if (tName) tName.textContent = this.currentUser.name;
      if (tRole) tRole.textContent = this.currentUser.role.toUpperCase();

      this.enforceRoleNavigation();
    },

    enforceRoleNavigation: function () {
      const role = this.currentUser ? this.currentUser.role : 'admin';
      // If agent, limit admin pages or personalize
      const structLink = document.querySelector('[data-page="structure"]');
      if (structLink) {
        if (role === 'agent') {
          structLink.style.display = 'none';
        } else {
          structLink.style.display = 'flex';
        }
      }
    },

    // Navigation System
    navigate: function (pageId, evt) {
      if (evt) evt.preventDefault();
      this.activePage = pageId;

      // Update sidebar nav active states
      document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
        el.classList.toggle('active', el.getAttribute('data-page') === pageId);
      });

      // Update breadcrumb
      const breadcrumb = document.getElementById('currentBreadcrumb');
      if (breadcrumb) {
        const titles = {
          dashboard: 'Dashboard',
          agents: 'Agent Management',
          structure: 'Commission Structure',
          calculator: 'Commission Calculator',
          payouts: 'Payout Management',
          performance: 'Performance Analytics',
          history: 'Commission History',
          reports: 'Reports & Analytics',
          leaderboard: 'Agent Leaderboard',
          notifications: 'Notifications',
          settings: 'Settings'
        };
        breadcrumb.textContent = titles[pageId] || 'Dashboard';
      }

      // Hide all pages, show target
      document.querySelectorAll('.page-view').forEach(view => {
        view.classList.remove('active');
      });

      const targetView = document.getElementById(`view${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`);
      if (targetView) {
        targetView.classList.add('active');
      }

      // Close mobile sidebar if open
      const sb = document.getElementById('sidebar');
      if (sb) sb.classList.remove('mobile-open');

      this.renderCurrentView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    renderCurrentView: function () {
      this.updateBadges();

      switch (this.activePage) {
        case 'dashboard':
          this.renderDashboard();
          break;
        case 'agents':
          this.renderAgents();
          break;
        case 'structure':
          this.renderStructure();
          break;
        case 'calculator':
          this.renderCalculator();
          break;
        case 'payouts':
          this.renderPayouts();
          break;
        case 'performance':
          this.renderPerformance();
          break;
        case 'history':
          this.renderHistory();
          break;
        case 'reports':
          this.renderReports();
          break;
        case 'leaderboard':
          this.renderLeaderboard();
          break;
        case 'notifications':
          this.renderNotifications();
          break;
        case 'settings':
          this.renderSettings();
          break;
      }

      this.initLucide();
    },

    updateBadges: function () {
      if (!this.data) return;
      const pendingPayouts = this.data.payouts.filter(p => p.status === 'Pending').length;
      const unreadNotifs = this.data.notifications.filter(n => !n.read).length;

      const pBadge = document.getElementById('pendingPayoutBadge');
      if (pBadge) pBadge.textContent = pendingPayouts;

      const nBadge = document.getElementById('unreadNotifBadge');
      if (nBadge) nBadge.textContent = unreadNotifs;

      const nDot = document.getElementById('topbarNotifDot');
      if (nDot) nDot.style.display = unreadNotifs > 0 ? 'block' : 'none';

      // Update quick notifications popup
      this.renderQuickNotifications();
    },

    // 1. DASHBOARD VIEW
    renderDashboard: function () {
      const agents = this.data.agents;
      const txs = this.data.transactions;
      const payouts = this.data.payouts;

      // Calculate totals
      const totalAgents = agents.length;
      const totalPolicies = txs.length;
      const totalCommission = txs.reduce((acc, t) => acc + (t.totalComm || 0), 0);
      const totalPayoutsPaid = payouts.filter(p => p.status === 'Paid').reduce((acc, p) => acc + (p.amount || 0), 0);
      const paidCount = payouts.filter(p => p.status === 'Paid').length;
      const pendingTxs = txs.filter(t => t.status === 'Pending');
      const pendingCommission = pendingTxs.reduce((acc, t) => acc + (t.totalComm || 0), 0);
      const grossRevenue = txs.reduce((acc, t) => acc + (t.premium || 0), 0);

      // Render KPIs
      document.getElementById('kpiTotalAgents').textContent = totalAgents;
      document.getElementById('kpiTotalPolicies').textContent = totalPolicies;
      document.getElementById('kpiTotalCommission').textContent = this.formatCurrency(totalCommission);
      document.getElementById('kpiPayoutsCompleted').textContent = this.formatCurrency(totalPayoutsPaid);
      document.getElementById('kpiPayoutCount').textContent = `${paidCount} disbursed`;
      document.getElementById('kpiPendingCommission').textContent = this.formatCurrency(pendingCommission);
      document.getElementById('kpiPendingCount').textContent = `${pendingTxs.length} pending`;
      document.getElementById('kpiGrossRevenue').textContent = this.formatCurrency(grossRevenue);

      // Render Dashboard Leaderboard
      const sortedAgents = [...agents].sort((a, b) => (b.totalCommission || 0) - (a.totalCommission || 0)).slice(0, 5);
      const lbTbody = document.getElementById('dashboardLeaderboardTable');
      if (lbTbody) {
        lbTbody.innerHTML = sortedAgents.map((ag, idx) => `
          <tr>
            <td><strong style="color: ${idx === 0 ? 'var(--primary)' : 'inherit'};">#${idx + 1}</strong></td>
            <td>
              <div style="font-weight: 700; color: var(--text-main);">${this.escape(ag.name)}</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">${ag.id}</div>
            </td>
            <td><span class="tier-tag tier-${ag.tier.toLowerCase()}">${ag.tier}</span></td>
            <td class="num-col tabular-nums">${ag.policiesSold}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(ag.totalPremium)}</td>
            <td class="num-col tabular-nums" style="font-weight: 700; color: var(--primary);">${this.formatCurrency(ag.totalCommission)}</td>
          </tr>
        `).join('');
      }

      // Recent Transactions
      const recentTxs = [...txs].slice(-5).reverse();
      const txTbody = document.getElementById('dashboardRecentTxTable');
      if (txTbody) {
        txTbody.innerHTML = recentTxs.map(t => `
          <tr>
            <td><strong class="tabular-nums">${t.policyNumber}</strong></td>
            <td>${this.escape(t.agentName)}</td>
            <td>${this.escape(t.customerName)}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(t.premium)}</td>
            <td class="num-col tabular-nums" style="font-weight: 700; color: var(--primary);">${this.formatCurrency(t.totalComm)}</td>
          </tr>
        `).join('');
      }

      // Recent Payouts
      const recentPayouts = [...payouts].slice(-5).reverse();
      const pTbody = document.getElementById('dashboardRecentPayoutsTable');
      if (pTbody) {
        pTbody.innerHTML = recentPayouts.map(p => `
          <tr>
            <td><strong class="tabular-nums">${p.id}</strong></td>
            <td>${this.escape(p.agentName)}</td>
            <td class="num-col tabular-nums" style="font-weight: 700;">${this.formatCurrency(p.amount)}</td>
            <td><span class="badge badge-${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span></td>
          </tr>
        `).join('');
      }

      this.renderDashboardCharts();
    },

    renderDashboardCharts: function () {
      if (!window.Chart) return;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#94A3B8' : '#64748B';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

      // 1. Monthly Commission Trend Chart
      const monthlyCtx = document.getElementById('monthlyTrendChart');
      if (monthlyCtx) {
        if (this.charts.monthlyTrend) this.charts.monthlyTrend.destroy();

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
        const baseData = [65000, 72000, 89000, 78000, 95000, 110000, 85000];
        const bonusData = [5875, 6375, 8375, 6500, 8250, 9500, 7500];

        this.charts.monthlyTrend = new window.Chart(monthlyCtx, {
          type: 'line',
          data: {
            labels: months,
            datasets: [
              {
                label: 'Base Commission (₹)',
                data: baseData,
                borderColor: '#D97706',
                backgroundColor: 'rgba(217, 119, 6, 0.12)',
                fill: true,
                tension: 0.35,
                borderWidth: 2.5,
                pointRadius: 4,
                pointBackgroundColor: '#D97706'
              },
              {
                label: 'Incentive Bonuses (₹)',
                data: bonusData,
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.35,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: '#10B981'
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { labels: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 12 } } },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` ${ctx.dataset.label}: ${app.formatCurrency(ctx.parsed.y)}`
                }
              }
            },
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: {
                grid: { color: gridColor },
                ticks: {
                  color: textColor,
                  callback: (val) => app.formatCompactCurrency(val)
                }
              }
            }
          }
        });
      }

      // 2. Commission by Tier Chart
      const tierCtx = document.getElementById('tierDistributionChart');
      if (tierCtx) {
        if (this.charts.tierDist) this.charts.tierDist.destroy();

        const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Starter'];
        const tierSums = tiers.map(t => {
          return this.data.agents
            .filter(a => a.tier === t)
            .reduce((sum, a) => sum + (a.totalCommission || 0), 0);
        });

        this.charts.tierDist = new window.Chart(tierCtx, {
          type: 'bar',
          data: {
            labels: tiers,
            datasets: [{
              label: 'Commission (₹)',
              data: tierSums,
              backgroundColor: ['#6366F1', '#F59E0B', '#64748B', '#EA580C', '#10B981'],
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (ctx) => ` Commission: ${app.formatCurrency(ctx.parsed.y)}`
                }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor } },
              y: {
                grid: { color: gridColor },
                ticks: {
                  color: textColor,
                  callback: (val) => app.formatCompactCurrency(val)
                }
              }
            }
          }
        });
      }

      // 3. Payout Status Doughnut Chart
      const payoutCtx = document.getElementById('payoutStatusChart');
      if (payoutCtx) {
        if (this.charts.payoutStatus) this.charts.payoutStatus.destroy();

        const counts = {
          Paid: this.data.payouts.filter(p => p.status === 'Paid').length,
          Pending: this.data.payouts.filter(p => p.status === 'Pending').length,
          Processing: this.data.payouts.filter(p => p.status === 'Processing').length,
          Other: this.data.payouts.filter(p => ['On Hold', 'Failed'].includes(p.status)).length
        };

        this.charts.payoutStatus = new window.Chart(payoutCtx, {
          type: 'doughnut',
          data: {
            labels: ['Paid', 'Pending', 'Processing', 'Hold/Failed'],
            datasets: [{
              data: [counts.Paid, counts.Pending, counts.Processing, counts.Other],
              backgroundColor: ['#16A34A', '#F59E0B', '#0284C7', '#DC2626'],
              borderWidth: 2,
              borderColor: isDark ? '#131C2E' : '#FFFFFF'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: { display: false }
            }
          }
        });

        const leg = document.getElementById('payoutLegendStats');
        if (leg) {
          leg.innerHTML = `
            <div><strong style="color: #16A34A;">${counts.Paid}</strong><div style="color: var(--text-muted);">Paid</div></div>
            <div><strong style="color: #F59E0B;">${counts.Pending}</strong><div style="color: var(--text-muted);">Pending</div></div>
            <div><strong style="color: #0284C7;">${counts.Processing}</strong><div style="color: var(--text-muted);">Processing</div></div>
            <div><strong style="color: #DC2626;">${counts.Other}</strong><div style="color: var(--text-muted);">Alerts</div></div>
          `;
        }
      }
    },

    // 2. AGENT MANAGEMENT
    renderAgents: function () {
      this.filterAgents();
    },

    filterAgents: function () {
      const search = (document.getElementById('agentSearchInput')?.value || '').toLowerCase().trim();
      const tierFilter = document.getElementById('agentTierFilter')?.value || '';
      const statusFilter = document.getElementById('agentStatusFilter')?.value || '';
      const sortBy = document.getElementById('agentSortBy')?.value || 'commission-desc';

      let filtered = this.data.agents.filter(a => {
        const matchesSearch = !search || a.name.toLowerCase().includes(search) || a.id.toLowerCase().includes(search);
        const matchesTier = !tierFilter || a.tier === tierFilter;
        const matchesStatus = !statusFilter || a.status === statusFilter;
        return matchesSearch && matchesTier && matchesStatus;
      });

      // Sorting
      filtered.sort((a, b) => {
        if (sortBy === 'commission-desc') return (b.totalCommission || 0) - (a.totalCommission || 0);
        if (sortBy === 'policies-desc') return (b.policiesSold || 0) - (a.policiesSold || 0);
        if (sortBy === 'premium-desc') return (b.totalPremium || 0) - (a.totalPremium || 0);
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'date-desc') return new Date(b.joiningDate) - new Date(a.joiningDate);
        return 0;
      });

      // Pagination
      const total = filtered.length;
      const pageSize = this.itemsPerPage;
      const totalPages = Math.ceil(total / pageSize) || 1;
      if (this.agentCurrentPage > totalPages) this.agentCurrentPage = totalPages;
      if (this.agentCurrentPage < 1) this.agentCurrentPage = 1;

      const startIdx = (this.agentCurrentPage - 1) * pageSize;
      const pageItems = filtered.slice(startIdx, startIdx + pageSize);

      const tbody = document.getElementById('agentsTableBody');
      if (tbody) {
        if (pageItems.length === 0) {
          tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 36px; color: var(--text-muted);">No agents match your filter criteria.</td></tr>`;
        } else {
          tbody.innerHTML = pageItems.map(ag => `
            <tr>
              <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div class="user-avatar" style="width: 32px; height: 32px; font-size: 0.75rem;">${ag.name.substring(0, 2).toUpperCase()}</div>
                  <div>
                    <div style="font-weight: 700; color: var(--text-main);">${this.escape(ag.name)}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">Joined ${this.formatDate(ag.joiningDate)}</div>
                  </div>
                </div>
              </td>
              <td><span class="tabular-nums font-mono font-bold" style="color: var(--text-main);">${ag.id}</span></td>
              <td>
                <div style="font-size: 0.78rem;">${this.escape(ag.email)}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${this.escape(ag.phone)}</div>
              </td>
              <td><span class="tier-tag tier-${ag.tier.toLowerCase()}">${ag.tier}</span></td>
              <td class="num-col tabular-nums font-bold">${ag.policiesSold}</td>
              <td class="num-col tabular-nums">${this.formatCurrency(ag.totalPremium)}</td>
              <td class="num-col tabular-nums" style="font-weight: 700; color: var(--primary);">${this.formatCurrency(ag.totalCommission)}</td>
              <td><span class="badge badge-${ag.status === 'Active' ? 'active' : 'inactive'}">${ag.status}</span></td>
              <td style="text-align: right; white-space: nowrap;">
                <button class="btn btn-sm btn-secondary" onclick="app.viewAgentDetails('${ag.id}')" title="View Details">
                  <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="app.editAgent('${ag.id}')" title="Edit Agent">
                  <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i>
                </button>
                <button class="btn btn-sm btn-secondary" onclick="app.promptDeleteAgent('${ag.id}')" title="Delete Agent" style="color: var(--error);">
                  <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                </button>
              </td>
            </tr>
          `).join('');
        }
      }

      // Pagination info
      const info = document.getElementById('agentsPaginationInfo');
      if (info) {
        info.textContent = total > 0
          ? `Showing ${startIdx + 1} to ${Math.min(startIdx + pageSize, total)} of ${total} agents`
          : `Showing 0 agents`;
      }

      // Pagination controls
      const ctrls = document.getElementById('agentsPaginationControls');
      if (ctrls) {
        ctrls.innerHTML = `
          <button class="page-btn" ${this.agentCurrentPage === 1 ? 'disabled' : ''} onclick="app.setAgentPage(${this.agentCurrentPage - 1})">Prev</button>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
            <button class="page-btn ${p === this.agentCurrentPage ? 'active' : ''}" onclick="app.setAgentPage(${p})">${p}</button>
          `).join('')}
          <button class="page-btn" ${this.agentCurrentPage === totalPages ? 'disabled' : ''} onclick="app.setAgentPage(${this.agentCurrentPage + 1})">Next</button>
        `;
      }

      this.initLucide();
    },

    setAgentPage: function (p) {
      this.agentCurrentPage = p;
      this.filterAgents();
    },

    openAddAgentModal: function () {
      document.getElementById('agentModalTitle').textContent = 'Add New Insurance Agent';
      document.getElementById('agentFormEditId').value = '';
      document.getElementById('agentForm').reset();
      // Generate next Agent ID
      const nextNum = 1000 + this.data.agents.length + 1;
      document.getElementById('agentFormId').value = `AGT-${nextNum}`;
      document.getElementById('agentFormJoining').value = new Date().toISOString().split('T')[0];
      this.openModal('agentModal');
    },

    editAgent: function (id) {
      const ag = this.data.agents.find(a => a.id === id);
      if (!ag) return;
      document.getElementById('agentModalTitle').textContent = `Edit Agent – ${ag.name}`;
      document.getElementById('agentFormEditId').value = ag.id;
      document.getElementById('agentFormName').value = ag.name;
      document.getElementById('agentFormId').value = ag.id;
      document.getElementById('agentFormId').readOnly = true;
      document.getElementById('agentFormTier').value = ag.tier;
      document.getElementById('agentFormEmail').value = ag.email;
      document.getElementById('agentFormPhone').value = ag.phone;
      document.getElementById('agentFormJoining').value = ag.joiningDate;
      document.getElementById('agentFormStatus').value = ag.status;
      this.openModal('agentModal');
    },

    handleAgentFormSubmit: function (e) {
      e.preventDefault();
      const editId = document.getElementById('agentFormEditId').value;
      const id = document.getElementById('agentFormId').value.trim();
      const name = document.getElementById('agentFormName').value.trim();
      const tier = document.getElementById('agentFormTier').value;
      const email = document.getElementById('agentFormEmail').value.trim();
      const phone = document.getElementById('agentFormPhone').value.trim();
      const joiningDate = document.getElementById('agentFormJoining').value;
      const status = document.getElementById('agentFormStatus').value;

      if (!editId) {
        // Prevent duplicate ID
        if (this.data.agents.some(a => a.id === id)) {
          this.showToast(`Agent ID ${id} already exists! Use a unique ID.`, 'error');
          return;
        }

        const newAgent = {
          id,
          name,
          email,
          phone,
          tier,
          joiningDate,
          status,
          policiesSold: 0,
          totalPremium: 0,
          totalCommission: 0
        };

        this.data.agents.push(newAgent);
        this.addNotification('New Agent Added', `Registered ${name} (${id}) on ${tier} Tier`, 'system');
        this.showToast(`Agent ${name} created successfully`, 'success');
      } else {
        const ag = this.data.agents.find(a => a.id === editId);
        if (ag) {
          const oldTier = ag.tier;
          ag.name = name;
          ag.email = email;
          ag.phone = phone;
          ag.tier = tier;
          ag.joiningDate = joiningDate;
          ag.status = status;

          if (oldTier !== tier) {
            this.addNotification('Agent Tier Changed', `${name} moved from ${oldTier} to ${tier}`, 'tier');
          }
          this.showToast(`Agent ${name} updated successfully`, 'success');
        }
      }

      this.persistData();
      this.closeModal('agentModal');
      this.renderAgents();
    },

    viewAgentDetails: function (id) {
      const ag = this.data.agents.find(a => a.id === id);
      if (!ag) return;

      const agentTxs = this.data.transactions.filter(t => t.agentId === id);
      const agentPayouts = this.data.payouts.filter(p => p.agentId === id);

      const body = document.getElementById('viewAgentModalBody');
      body.innerHTML = `
        <div style="display: flex; gap: 16px; align-items: center; margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid var(--border);">
          <div class="user-avatar" style="width: 52px; height: 52px; font-size: 1.2rem;">${ag.name.substring(0, 2).toUpperCase()}</div>
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--text-main);">${this.escape(ag.name)}</h3>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              ID: <strong>${ag.id}</strong> · <span class="tier-tag tier-${ag.tier.toLowerCase()}">${ag.tier}</span> · Status: <strong>${ag.status}</strong>
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;">
              ${this.escape(ag.email)} · ${this.escape(ag.phone)} · Joined ${this.formatDate(ag.joiningDate)}
            </div>
          </div>
        </div>

        <div class="kpi-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 20px;">
          <div style="background: var(--bg-hover); padding: 12px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Policies Sold</div>
            <div class="tabular-nums font-bold" style="font-size: 1.3rem; color: var(--text-main);">${ag.policiesSold}</div>
          </div>
          <div style="background: var(--bg-hover); padding: 12px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Total Premium</div>
            <div class="tabular-nums font-bold" style="font-size: 1.3rem; color: var(--text-main);">${this.formatCurrency(ag.totalPremium)}</div>
          </div>
          <div style="background: var(--primary-light); padding: 12px; border-radius: var(--radius-md); text-align: center;">
            <div style="font-size: 0.72rem; color: var(--primary-text); text-transform: uppercase;">Commission Earned</div>
            <div class="tabular-nums font-bold" style="font-size: 1.3rem; color: var(--primary);">${this.formatCurrency(ag.totalCommission)}</div>
          </div>
        </div>

        <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 8px;">Recent Recorded Policies (${agentTxs.length})</h4>
        <div class="table-responsive" style="max-height: 200px; overflow-y: auto;">
          <table class="data-table" style="font-size: 0.78rem;">
            <thead>
              <tr>
                <th>Policy No.</th>
                <th>Customer</th>
                <th>Type</th>
                <th class="num-col">Premium</th>
                <th class="num-col">Commission</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${agentTxs.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No policies recorded yet.</td></tr>' : agentTxs.map(t => `
                <tr>
                  <td><strong>${t.policyNumber}</strong></td>
                  <td>${this.escape(t.customerName)}</td>
                  <td>${t.policyType}</td>
                  <td class="num-col tabular-nums">${this.formatCurrency(t.premium)}</td>
                  <td class="num-col tabular-nums font-bold" style="color: var(--primary);">${this.formatCurrency(t.totalComm)}</td>
                  <td><span class="badge badge-${t.status.toLowerCase()}">${t.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

      this.openModal('viewAgentModal');
    },

    promptDeleteAgent: function (id) {
      const ag = this.data.agents.find(a => a.id === id);
      if (!ag) return;
      document.getElementById('deleteAgentId').value = id;
      document.getElementById('deleteAgentMsg').innerHTML = `Are you sure you want to delete agent <strong>${this.escape(ag.name)}</strong> (${id})?`;
      this.openModal('deleteAgentModal');
    },

    confirmDeleteAgent: function () {
      const id = document.getElementById('deleteAgentId').value;
      const idx = this.data.agents.findIndex(a => a.id === id);
      if (idx !== -1) {
        const deleted = this.data.agents.splice(idx, 1)[0];
        this.persistData();
        this.showToast(`Agent ${deleted.name} removed`, 'info');
        this.addNotification('Agent Deleted', `Agent ${deleted.name} (${id}) was deleted by admin`, 'system');
      }
      this.closeModal('deleteAgentModal');
      this.renderAgents();
    },

    // 3. COMMISSION STRUCTURE
    renderStructure: function () {
      const tiers = this.data.tiers;
      const rules = this.data.rules;

      document.getElementById('tierRatePlatinum').value = tiers.Platinum.rate;
      document.getElementById('tierRateGold').value = tiers.Gold.rate;
      document.getElementById('tierRateSilver').value = tiers.Silver.rate;
      document.getElementById('tierRateBronze').value = tiers.Bronze.rate;
      document.getElementById('tierRateStarter').value = tiers.Starter.rate;

      document.getElementById('renewalCommissionRate').value = rules.renewalRate;
      document.getElementById('highValueThreshold').value = rules.highValueThreshold;
      document.getElementById('highValueBonusRate').value = rules.highValueBonusRate;
      document.getElementById('tierUpgradeBonusAmount').value = rules.tierUpgradeBonus;
    },

    saveCommissionStructure: function () {
      this.data.tiers.Platinum.rate = parseFloat(document.getElementById('tierRatePlatinum').value) || 30;
      this.data.tiers.Gold.rate = parseFloat(document.getElementById('tierRateGold').value) || 25;
      this.data.tiers.Silver.rate = parseFloat(document.getElementById('tierRateSilver').value) || 20;
      this.data.tiers.Bronze.rate = parseFloat(document.getElementById('tierRateBronze').value) || 15;
      this.data.tiers.Starter.rate = parseFloat(document.getElementById('tierRateStarter').value) || 10;

      this.data.rules.renewalRate = parseFloat(document.getElementById('renewalCommissionRate').value) || 7.5;
      this.data.rules.highValueThreshold = parseFloat(document.getElementById('highValueThreshold').value) || 100000;
      this.data.rules.highValueBonusRate = parseFloat(document.getElementById('highValueBonusRate').value) || 2.5;
      this.data.rules.tierUpgradeBonus = parseFloat(document.getElementById('tierUpgradeBonusAmount').value) || 5000;

      this.persistData();
      this.showToast('Commission structure updated and saved!', 'success');
      this.addNotification('Structure Updated', 'Administrator modified commission tier rates and bonus configuration', 'system');
    },

    resetCommissionStructure: function () {
      this.data.tiers = {
        Platinum: { rate: 30, minPremium: 1500000, minPolicies: 25 },
        Gold: { rate: 25, minPremium: 1000000, minPolicies: 18 },
        Silver: { rate: 20, minPremium: 500000, minPolicies: 12 },
        Bronze: { rate: 15, minPremium: 200000, minPolicies: 6 },
        Starter: { rate: 10, minPremium: 0, minPolicies: 0 }
      };
      this.data.rules = {
        renewalRate: 7.5,
        highValueThreshold: 100000,
        highValueBonusRate: 2.5,
        tierUpgradeBonus: 5000
      };
      this.persistData();
      this.renderStructure();
      this.showToast('Commission tiers reset to default LIC baseline', 'info');
    },

    // 4. COMMISSION CALCULATION ENGINE
    renderCalculator: function () {
      const select = document.getElementById('calcAgentSelect');
      if (select) {
        select.innerHTML = '<option value="">-- Choose Agent --</option>' +
          this.data.agents.map(a => `
            <option value="${a.id}">${a.name} (${a.tier} - ${this.data.tiers[a.tier]?.rate || 10}%)</option>
          `).join('');
      }

      const saleDate = document.getElementById('calcSaleDate');
      if (saleDate && !saleDate.value) {
        saleDate.value = new Date().toISOString().split('T')[0];
      }

      this.recomputeLiveCalculation();
    },

    handleCalcAgentChange: function () {
      this.recomputeLiveCalculation();
    },

    recomputeLiveCalculation: function () {
      const agentId = document.getElementById('calcAgentSelect')?.value;
      const policyNo = document.getElementById('calcPolicyNumber')?.value.trim();
      const category = document.getElementById('calcCategory')?.value || 'first-year';
      const premium = parseFloat(document.getElementById('calcPremiumAmount')?.value) || 0;
      const manualBonus = parseFloat(document.getElementById('calcBonusAmount')?.value) || 0;

      // Duplicate check
      const dupWarning = document.getElementById('calcDuplicateWarning');
      const submitBtn = document.getElementById('calcSubmitBtn');
      const isDuplicate = policyNo && this.data.transactions.some(t => t.policyNumber.toLowerCase() === policyNo.toLowerCase());

      if (dupWarning) {
        dupWarning.style.display = isDuplicate ? 'block' : 'none';
      }
      if (submitBtn) {
        submitBtn.disabled = isDuplicate;
      }

      const agent = this.data.agents.find(a => a.id === agentId);
      const previewAgentName = document.getElementById('previewAgentName');
      const previewAgentTier = document.getElementById('previewAgentTier');
      const previewTierBadge = document.getElementById('previewTierBadge');
      const previewPremium = document.getElementById('previewPremium');
      const previewRate = document.getElementById('previewRate');
      const previewBaseComm = document.getElementById('previewBaseComm');
      const previewHighValueBonus = document.getElementById('previewHighValueBonus');
      const previewManualBonus = document.getElementById('previewManualBonus');
      const previewTotalComm = document.getElementById('previewTotalComm');

      if (!agent) {
        if (previewAgentName) previewAgentName.textContent = 'None selected';
        if (previewAgentTier) previewAgentTier.textContent = '--';
        if (previewTierBadge) {
          previewTierBadge.textContent = 'Select Agent';
          previewTierBadge.className = 'tier-tag tier-silver';
        }
        if (previewPremium) previewPremium.textContent = this.formatCurrency(premium);
        if (previewRate) previewRate.textContent = '0.0%';
        if (previewBaseComm) previewBaseComm.textContent = this.formatCurrency(0);
        if (previewHighValueBonus) previewHighValueBonus.textContent = this.formatCurrency(0);
        if (previewManualBonus) previewManualBonus.textContent = this.formatCurrency(0);
        if (previewTotalComm) previewTotalComm.textContent = this.formatCurrency(0);
        return;
      }

      if (previewAgentName) previewAgentName.textContent = agent.name;
      if (previewAgentTier) previewAgentTier.textContent = `${agent.tier} (${agent.id})`;
      if (previewTierBadge) {
        previewTierBadge.textContent = agent.tier;
        previewTierBadge.className = `tier-tag tier-${agent.tier.toLowerCase()}`;
      }

      // Calculation Formula
      let applicableRate = 0;
      if (category === 'renewal') {
        applicableRate = this.data.rules.renewalRate;
      } else {
        applicableRate = this.data.tiers[agent.tier]?.rate || 10;
      }

      // Base Commission = Eligible Premium × Applicable Rate / 100
      const baseCommission = (premium * applicableRate) / 100;

      // High-Value Bonus calculation
      let highValueBonus = 0;
      if (premium >= this.data.rules.highValueThreshold) {
        highValueBonus = (premium * this.data.rules.highValueBonusRate) / 100;
      }

      // Total Commission = Base Commission + Bonuses
      const totalCommission = baseCommission + highValueBonus + manualBonus;

      if (previewPremium) previewPremium.textContent = this.formatCurrency(premium);
      if (previewRate) previewRate.textContent = `${applicableRate.toFixed(1)}%`;
      if (previewBaseComm) previewBaseComm.textContent = this.formatCurrency(baseCommission);
      if (previewHighValueBonus) previewHighValueBonus.textContent = this.formatCurrency(highValueBonus);
      if (previewManualBonus) previewManualBonus.textContent = this.formatCurrency(manualBonus);
      if (previewTotalComm) previewTotalComm.textContent = this.formatCurrency(totalCommission);
    },

    confirmAndSaveCommission: function (e) {
      e.preventDefault();
      const agentId = document.getElementById('calcAgentSelect').value;
      const policyNumber = document.getElementById('calcPolicyNumber').value.trim();
      const customerName = document.getElementById('calcCustomerName').value.trim();
      const policyType = document.getElementById('calcPolicyType').value;
      const category = document.getElementById('calcCategory').value;
      const premium = parseFloat(document.getElementById('calcPremiumAmount').value);
      const saleDate = document.getElementById('calcSaleDate').value;
      const manualBonus = parseFloat(document.getElementById('calcBonusAmount').value) || 0;

      if (!agentId) {
        this.showToast('Please choose an agent first', 'error');
        return;
      }

      if (!premium || premium <= 0) {
        this.showToast('Premium amount must be greater than zero', 'error');
        return;
      }

      // Prevent duplicate policy entries
      if (this.data.transactions.some(t => t.policyNumber.toLowerCase() === policyNumber.toLowerCase())) {
        this.showToast(`Policy ${policyNumber} already recorded! Duplicate prevented.`, 'error');
        return;
      }

      const agent = this.data.agents.find(a => a.id === agentId);
      if (!agent) return;

      const rate = category === 'renewal'
        ? this.data.rules.renewalRate
        : (this.data.tiers[agent.tier]?.rate || 10);

      const baseComm = (premium * rate) / 100;
      let highValueBonus = 0;
      if (premium >= this.data.rules.highValueThreshold) {
        highValueBonus = (premium * this.data.rules.highValueBonusRate) / 100;
      }
      const totalBonus = highValueBonus + manualBonus;
      const totalComm = baseComm + totalBonus;

      const newTxId = `TX-${900 + this.data.transactions.length + 1}`;
      const newTx = {
        id: newTxId,
        agentId: agent.id,
        agentName: agent.name,
        policyNumber,
        customerName,
        policyType,
        category,
        premium,
        rate,
        baseComm,
        bonus: totalBonus,
        totalComm,
        date: saleDate,
        status: 'Pending'
      };

      this.data.transactions.push(newTx);

      // Update Agent portfolio
      agent.policiesSold += 1;
      agent.totalPremium += premium;
      agent.totalCommission += totalComm;

      // Also create a corresponding Pending Payout record for disbursement workflow
      const newPayId = `PAY-${700 + this.data.payouts.length + 1}`;
      this.data.payouts.push({
        id: newPayId,
        agentId: agent.id,
        agentName: agent.name,
        amount: totalComm,
        requestDate: saleDate,
        status: 'Pending',
        paymentMethod: 'NEFT / RTGS',
        reference: '',
        processedDate: ''
      });

      // Add Notification
      this.addNotification(
        'Commission Recorded',
        `Computed ${this.formatCurrency(totalComm)} for ${agent.name} on Policy ${policyNumber}`,
        'commission'
      );

      this.persistData();
      this.showToast(`Commission ${this.formatCurrency(totalComm)} recorded successfully!`, 'success');

      // Reset form
      this.resetCalcForm();
      this.navigate('history');
    },

    resetCalcForm: function () {
      document.getElementById('calcForm').reset();
      document.getElementById('calcSaleDate').value = new Date().toISOString().split('T')[0];
      this.recomputeLiveCalculation();
    },

    // 5. COMMISSION PAYOUT MANAGEMENT
    renderPayouts: function () {
      this.filterPayouts();
    },

    filterPayouts: function () {
      const search = (document.getElementById('payoutSearchInput')?.value || '').toLowerCase().trim();
      const statusFilter = document.getElementById('payoutStatusFilter')?.value || '';

      const filtered = this.data.payouts.filter(p => {
        const matchesSearch = !search || p.agentName.toLowerCase().includes(search) || p.id.toLowerCase().includes(search);
        const matchesStatus = !statusFilter || p.status === statusFilter;
        return matchesSearch && matchesStatus;
      });

      // Payout KPIs
      const paidSum = this.data.payouts.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
      const pendingSum = this.data.payouts.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);
      const procSum = this.data.payouts.filter(p => p.status === 'Processing').reduce((s, p) => s + p.amount, 0);
      const issueSum = this.data.payouts.filter(p => ['On Hold', 'Failed'].includes(p.status)).reduce((s, p) => s + p.amount, 0);

      document.getElementById('payoutKpiPaid').textContent = this.formatCurrency(paidSum);
      document.getElementById('payoutKpiPending').textContent = this.formatCurrency(pendingSum);
      document.getElementById('payoutKpiProcessing').textContent = this.formatCurrency(procSum);
      document.getElementById('payoutKpiIssues').textContent = this.formatCurrency(issueSum);

      // Pagination
      const total = filtered.length;
      const pageSize = this.itemsPerPage;
      const totalPages = Math.ceil(total / pageSize) || 1;
      if (this.payoutCurrentPage > totalPages) this.payoutCurrentPage = totalPages;
      if (this.payoutCurrentPage < 1) this.payoutCurrentPage = 1;

      const startIdx = (this.payoutCurrentPage - 1) * pageSize;
      const pageItems = filtered.slice(startIdx, startIdx + pageSize);

      const tbody = document.getElementById('payoutsTableBody');
      if (tbody) {
        if (pageItems.length === 0) {
          tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 36px; color: var(--text-muted);">No payout records match your filters.</td></tr>`;
        } else {
          tbody.innerHTML = pageItems.map(p => {
            const isChecked = this.selectedPayoutIds.has(p.id);
            return `
              <tr>
                <td>
                  <input type="checkbox" value="${p.id}" ${isChecked ? 'checked' : ''} onchange="app.handlePayoutCheckboxChange(event, '${p.id}')" />
                </td>
                <td><strong class="tabular-nums font-mono">${p.id}</strong></td>
                <td>
                  <div style="font-weight: 700; color: var(--text-main);">${this.escape(p.agentName)}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">${p.agentId}</div>
                </td>
                <td>
                  <div style="font-size: 0.78rem;">Commission Payout</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">${p.reference || 'Ref: Pending'}</div>
                </td>
                <td class="num-col tabular-nums font-bold" style="color: var(--text-main);">${this.formatCurrency(p.amount)}</td>
                <td><span style="font-size: 0.78rem;">${p.paymentMethod || 'NEFT'}</span></td>
                <td><span class="badge badge-${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span></td>
                <td><span class="tabular-nums" style="font-size: 0.78rem;">${this.formatDate(p.requestDate)}</span></td>
                <td style="text-align: right; white-space: nowrap;">
                  <button class="btn btn-sm btn-secondary" onclick="app.openProcessPayoutModal('${p.id}')" title="Process / Change Status">
                    <i data-lucide="cog" style="width: 14px; height: 14px;"></i> Process
                  </button>
                  <button class="btn btn-sm btn-secondary" onclick="app.viewPayoutReceipt('${p.id}')" title="View Receipt">
                    <i data-lucide="receipt" style="width: 14px; height: 14px;"></i>
                  </button>
                </td>
              </tr>
            `;
          }).join('');
        }
      }

      // Pagination Controls
      const info = document.getElementById('payoutsPaginationInfo');
      if (info) {
        info.textContent = total > 0
          ? `Showing ${startIdx + 1} to ${Math.min(startIdx + pageSize, total)} of ${total} payouts`
          : 'Showing 0 payouts';
      }

      const ctrls = document.getElementById('payoutsPaginationControls');
      if (ctrls) {
        ctrls.innerHTML = `
          <button class="page-btn" ${this.payoutCurrentPage === 1 ? 'disabled' : ''} onclick="app.setPayoutPage(${this.payoutCurrentPage - 1})">Prev</button>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => `
            <button class="page-btn ${pg === this.payoutCurrentPage ? 'active' : ''}" onclick="app.setPayoutPage(${pg})">${pg}</button>
          `).join('')}
          <button class="page-btn" ${this.payoutCurrentPage === totalPages ? 'disabled' : ''} onclick="app.setPayoutPage(${this.payoutCurrentPage + 1})">Next</button>
        `;
      }

      this.updateBulkSelectionUI();
      this.initLucide();
    },

    setPayoutPage: function (p) {
      this.payoutCurrentPage = p;
      this.filterPayouts();
    },

    handlePayoutCheckboxChange: function (e, id) {
      if (e.target.checked) {
        this.selectedPayoutIds.add(id);
      } else {
        this.selectedPayoutIds.delete(id);
      }
      this.updateBulkSelectionUI();
    },

    toggleSelectAllPayouts: function (e) {
      const isChecked = e.target.checked;
      this.data.payouts.forEach(p => {
        if (isChecked) {
          this.selectedPayoutIds.add(p.id);
        } else {
          this.selectedPayoutIds.delete(p.id);
        }
      });
      this.filterPayouts();
    },

    selectAllPendingPayouts: function () {
      this.data.payouts.filter(p => p.status === 'Pending').forEach(p => {
        this.selectedPayoutIds.add(p.id);
      });
      this.filterPayouts();
      this.showToast(`Selected all ${this.selectedPayoutIds.size} pending payouts`, 'info');
    },

    clearPayoutSelection: function () {
      this.selectedPayoutIds.clear();
      const mainChk = document.getElementById('selectAllPayoutsCheckbox');
      if (mainChk) mainChk.checked = false;
      this.filterPayouts();
    },

    updateBulkSelectionUI: function () {
      const countEl = document.getElementById('bulkSelectedCount');
      if (countEl) countEl.textContent = this.selectedPayoutIds.size;
    },

    openProcessPayoutModal: function (id) {
      const p = this.data.payouts.find(item => item.id === id);
      if (!p) return;

      document.getElementById('processPayoutId').value = p.id;
      document.getElementById('processPayoutSummary').innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Payout ID: <strong class="tabular-nums font-mono">${p.id}</strong></span>
          <span class="badge badge-${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span>
        </div>
        <div style="font-weight: 700; color: var(--text-main); font-size: 1rem;">${this.escape(p.agentName)} (${p.agentId})</div>
        <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary); margin-top: 6px;" class="tabular-nums">
          Disbursal Amount: ${this.formatCurrency(p.amount)}
        </div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
          Requested on ${this.formatDate(p.requestDate)}
        </div>
      `;

      document.getElementById('processPayoutMethod').value = p.paymentMethod || 'NEFT / RTGS';
      document.getElementById('processPayoutRef').value = p.reference || `UTR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`;
      document.getElementById('processPayoutDate').value = new Date().toISOString().split('T')[0];
      document.getElementById('processPayoutNewStatus').value = p.status === 'Pending' ? 'Paid' : p.status;

      this.openModal('processPayoutModal');
    },

    handleProcessPayoutSubmit: function (e) {
      e.preventDefault();
      const id = document.getElementById('processPayoutId').value;
      const method = document.getElementById('processPayoutMethod').value;
      const ref = document.getElementById('processPayoutRef').value.trim();
      const date = document.getElementById('processPayoutDate').value;
      const newStatus = document.getElementById('processPayoutNewStatus').value;

      const p = this.data.payouts.find(item => item.id === id);
      if (p) {
        const oldStatus = p.status;
        p.status = newStatus;
        p.paymentMethod = method;
        p.reference = ref;
        p.processedDate = date;

        this.addNotification(
          'Payout Updated',
          `Payout ${id} for ${p.agentName} (${this.formatCurrency(p.amount)}) marked as ${newStatus}`,
          'payout'
        );

        this.persistData();
        this.showToast(`Payout ${id} updated to ${newStatus}`, 'success');
      }

      this.closeModal('processPayoutModal');
      this.renderPayouts();
    },

    processBulkSelectedPayouts: function () {
      if (this.selectedPayoutIds.size === 0) {
        this.showToast('Please select at least one payout request first', 'warning');
        return;
      }

      const count = this.selectedPayoutIds.size;
      const batchRef = `BATCH-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;
      const today = new Date().toISOString().split('T')[0];

      let processedSum = 0;
      this.selectedPayoutIds.forEach(id => {
        const p = this.data.payouts.find(item => item.id === id);
        if (p) {
          p.status = 'Paid';
          p.paymentMethod = 'NEFT / RTGS';
          p.reference = batchRef;
          p.processedDate = today;
          processedSum += p.amount;
        }
      });

      this.addNotification(
        'Bulk Payout Disbursed',
        `Disbursed ${count} commission payouts totaling ${this.formatCurrency(processedSum)} (Batch ${batchRef})`,
        'payout'
      );

      this.persistData();
      this.clearPayoutSelection();
      this.showToast(`Successfully processed ${count} payouts (${this.formatCurrency(processedSum)})`, 'success');
      this.renderPayouts();
    },

    viewPayoutReceipt: function (id) {
      const p = this.data.payouts.find(item => item.id === id);
      if (!p) return;

      const body = document.getElementById('receiptModalBody');
      body.innerHTML = `
        <div style="border: 2px dashed var(--border); padding: 24px; border-radius: var(--radius-lg); background: var(--bg-card);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
            <div>
              <div style="font-weight: 800; font-size: 1.2rem; color: var(--text-main);">Life Insurance Corporation (LIC)</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">Commission Disbursal Advice & Voucher</div>
            </div>
            <div style="text-align: right;">
              <span class="badge badge-${p.status.toLowerCase().replace(/\s+/g, '-')}">${p.status}</span>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">Task ID: WD-LIC-004</div>
            </div>
          </div>

          <div class="kpi-grid" style="grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px; font-size: 0.82rem;">
            <div><strong>Voucher ID:</strong> <span class="tabular-nums font-mono">${p.id}</span></div>
            <div><strong>Disbursal Date:</strong> <span class="tabular-nums">${p.processedDate || p.requestDate}</span></div>
            <div><strong>Agent Name:</strong> ${this.escape(p.agentName)}</div>
            <div><strong>Agent ID:</strong> <span class="tabular-nums font-mono">${p.agentId}</span></div>
            <div><strong>Payment Mode:</strong> ${p.paymentMethod || 'NEFT'}</div>
            <div><strong>Bank Ref / UTR:</strong> <span class="tabular-nums font-mono">${p.reference || 'Pending'}</span></div>
          </div>

          <div style="background: var(--primary-light); padding: 16px; border-radius: var(--radius-md); text-align: center; margin-bottom: 16px;">
            <div style="font-size: 0.75rem; color: var(--primary-text); text-transform: uppercase; font-weight: 700;">Net Disbursed Amount</div>
            <div style="font-size: 1.8rem; font-weight: 800; color: var(--primary);" class="tabular-nums">${this.formatCurrency(p.amount)}</div>
          </div>

          <div style="font-size: 0.7rem; color: var(--text-muted); text-align: center;">
            Simulated educational voucher. Valid for demonstration of insurance commission disbursement workflows.
          </div>
        </div>
      `;

      this.openModal('receiptModal');
    },

    exportPayoutsCSV: function () {
      const headers = ['Payout ID', 'Agent ID', 'Agent Name', 'Amount', 'Status', 'Payment Method', 'Reference', 'Request Date', 'Processed Date'];
      const rows = this.data.payouts.map(p => [
        p.id,
        p.agentId,
        `"${p.agentName}"`,
        p.amount,
        p.status,
        `"${p.paymentMethod || ''}"`,
        `"${p.reference || ''}"`,
        p.requestDate,
        p.processedDate || ''
      ]);

      this.downloadCSV('payouts_report.csv', headers, rows);
    },

    // 6. AGENT PERFORMANCE VIEW
    renderPerformance: function () {
      const sel = document.getElementById('perfAgentSelect');
      if (sel && sel.options.length === 0) {
        sel.innerHTML = this.data.agents.map(a => `
          <option value="${a.id}">${a.name} (${a.tier})</option>
        `).join('');
      }

      this.loadAgentPerformance();
    },

    loadAgentPerformance: function () {
      const agentId = document.getElementById('perfAgentSelect')?.value || this.data.agents[0].id;
      const ag = this.data.agents.find(a => a.id === agentId);
      if (!ag) return;

      document.getElementById('perfAgentAvatar').textContent = ag.name.substring(0, 2).toUpperCase();
      document.getElementById('perfAgentName').textContent = ag.name;
      document.getElementById('perfAgentTierBadge').textContent = `${ag.tier} (${this.data.tiers[ag.tier]?.rate || 10}%)`;
      document.getElementById('perfAgentTierBadge').className = `tier-tag tier-${ag.tier.toLowerCase()}`;
      document.getElementById('perfAgentId').textContent = ag.id;
      document.getElementById('perfAgentJoining').textContent = this.formatDate(ag.joiningDate);
      document.getElementById('perfAgentEmail').textContent = ag.email;

      // Ranking
      const sortedByPrem = [...this.data.agents].sort((a, b) => b.totalPremium - a.totalPremium);
      const rank = sortedByPrem.findIndex(a => a.id === ag.id) + 1;
      document.getElementById('perfAgentRank').textContent = `#${rank}`;

      // Stats
      document.getElementById('perfPoliciesCount').textContent = ag.policiesSold;
      document.getElementById('perfPremiumTotal').textContent = this.formatCurrency(ag.totalPremium);
      document.getElementById('perfCommissionTotal').textContent = this.formatCurrency(ag.totalCommission);

      const avg = ag.policiesSold > 0 ? (ag.totalCommission / ag.policiesSold) : 0;
      document.getElementById('perfAvgCommission').textContent = this.formatCurrency(avg);

      // Score calculation (90 + policies * 0.25)
      const score = Math.min(99.5, (85 + (ag.policiesSold * 0.4) + (ag.totalPremium / 1000000)).toFixed(1));
      document.getElementById('perfScoreValue').textContent = score;

      // Tier progression
      const nextTierMap = {
        Starter: { next: 'Bronze', target: 200000 },
        Bronze: { next: 'Silver', target: 500000 },
        Silver: { next: 'Gold', target: 1000000 },
        Gold: { next: 'Platinum', target: 1500000 },
        Platinum: { next: 'Top Tier', target: 2500000 }
      };

      const info = nextTierMap[ag.tier];
      let pct = Math.min(100, Math.round((ag.totalPremium / info.target) * 100));
      if (ag.tier === 'Platinum') pct = 100;

      document.getElementById('perfTierProgressLabel').textContent = ag.tier === 'Platinum'
        ? 'Tier Progression: Platinum (Highest Tier Reached)'
        : `Progress toward ${info.next} Tier (${this.formatCurrency(info.target)} Target)`;
      document.getElementById('perfTierProgressPct').textContent = `${pct}% Achieved`;
      document.getElementById('perfTierProgressBar').style.width = `${pct}%`;
      document.getElementById('perfTierProgressHint').textContent = ag.tier === 'Platinum'
        ? 'Maintains top commission rate (30%) on all eligible first-year policy sales.'
        : `Generate ${this.formatCurrency(Math.max(0, info.target - ag.totalPremium))} more in premium to automatically qualify for ${info.next} tier rate!`;

      this.renderPerformanceCharts(ag);
    },

    renderPerformanceCharts: function (agent) {
      if (!window.Chart) return;
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#94A3B8' : '#64748B';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

      // Sales Volume Chart
      const salesCtx = document.getElementById('perfSalesChart');
      if (salesCtx) {
        if (this.charts.perfSales) this.charts.perfSales.destroy();
        this.charts.perfSales = new window.Chart(salesCtx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [{
              label: 'Policies Closed',
              data: [3, 4, 6, 5, 7, 5, 4],
              backgroundColor: '#D97706',
              borderRadius: 4
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { display: false }, ticks: { color: textColor } },
              y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 1 } }
            }
          }
        });
      }

      // Commission Earnings Chart
      const earnCtx = document.getElementById('perfEarningsChart');
      if (earnCtx) {
        if (this.charts.perfEarnings) this.charts.perfEarnings.destroy();
        this.charts.perfEarnings = new window.Chart(earnCtx, {
          type: 'line',
          data: {
            labels: months,
            datasets: [{
              label: 'Commission (₹)',
              data: [35000, 42000, 68000, 54000, 72000, 58000, 45000],
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              fill: true,
              tension: 0.3,
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { grid: { color: gridColor }, ticks: { color: textColor } },
              y: {
                grid: { color: gridColor },
                ticks: {
                  color: textColor,
                  callback: (val) => app.formatCompactCurrency(val)
                }
              }
            }
          }
        });
      }
    },

    // 7. COMMISSION HISTORY
    renderHistory: function () {
      this.filterHistory();
    },

    filterHistory: function () {
      const search = (document.getElementById('historySearchInput')?.value || '').toLowerCase().trim();
      const typeFilter = document.getElementById('historyTypeFilter')?.value || '';
      const statusFilter = document.getElementById('historyStatusFilter')?.value || '';

      const filtered = this.data.transactions.filter(t => {
        const matchesSearch = !search ||
          t.policyNumber.toLowerCase().includes(search) ||
          t.id.toLowerCase().includes(search) ||
          t.agentName.toLowerCase().includes(search) ||
          t.customerName.toLowerCase().includes(search);
        const matchesType = !typeFilter || t.category === typeFilter;
        const matchesStatus = !statusFilter || t.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
      });

      // Pagination
      const total = filtered.length;
      const pageSize = this.itemsPerPage;
      const totalPages = Math.ceil(total / pageSize) || 1;
      if (this.historyCurrentPage > totalPages) this.historyCurrentPage = totalPages;
      if (this.historyCurrentPage < 1) this.historyCurrentPage = 1;

      const startIdx = (this.historyCurrentPage - 1) * pageSize;
      const pageItems = filtered.slice(startIdx, startIdx + pageSize);

      const tbody = document.getElementById('historyTableBody');
      if (tbody) {
        if (pageItems.length === 0) {
          tbody.innerHTML = `<tr><td colspan="13" style="text-align: center; padding: 36px; color: var(--text-muted);">No transactions match your search.</td></tr>`;
        } else {
          tbody.innerHTML = pageItems.map(t => `
            <tr>
              <td><strong class="tabular-nums font-mono">${t.id}</strong></td>
              <td><span class="tabular-nums" style="font-size: 0.78rem;">${this.formatDate(t.date)}</span></td>
              <td>
                <div style="font-weight: 700; color: var(--text-main);">${this.escape(t.agentName)}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${t.agentId}</div>
              </td>
              <td><strong class="tabular-nums">${t.policyNumber}</strong></td>
              <td>${this.escape(t.customerName)}</td>
              <td><span style="font-size: 0.75rem; text-transform: capitalize;">${t.category.replace('-', ' ')}</span></td>
              <td class="num-col tabular-nums">${this.formatCurrency(t.premium)}</td>
              <td class="num-col tabular-nums">${t.rate}%</td>
              <td class="num-col tabular-nums">${this.formatCurrency(t.baseComm)}</td>
              <td class="num-col tabular-nums">${this.formatCurrency(t.bonus)}</td>
              <td class="num-col tabular-nums font-bold" style="color: var(--primary);">${this.formatCurrency(t.totalComm)}</td>
              <td><span class="badge badge-${t.status.toLowerCase()}">${t.status}</span></td>
              <td style="text-align: right; white-space: nowrap;">
                <button class="btn btn-sm btn-secondary" onclick="app.viewTransactionModal('${t.id}')">
                  <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
                </button>
              </td>
            </tr>
          `).join('');
        }
      }

      // Pagination
      const info = document.getElementById('historyPaginationInfo');
      if (info) {
        info.textContent = total > 0
          ? `Showing ${startIdx + 1} to ${Math.min(startIdx + pageSize, total)} of ${total} transactions`
          : 'Showing 0 transactions';
      }

      const ctrls = document.getElementById('historyPaginationControls');
      if (ctrls) {
        ctrls.innerHTML = `
          <button class="page-btn" ${this.historyCurrentPage === 1 ? 'disabled' : ''} onclick="app.setHistoryPage(${this.historyCurrentPage - 1})">Prev</button>
          ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
            <button class="page-btn ${p === this.historyCurrentPage ? 'active' : ''}" onclick="app.setHistoryPage(${p})">${p}</button>
          `).join('')}
          <button class="page-btn" ${this.historyCurrentPage === totalPages ? 'disabled' : ''} onclick="app.setHistoryPage(${this.historyCurrentPage + 1})">Next</button>
        `;
      }

      this.initLucide();
    },

    setHistoryPage: function (p) {
      this.historyCurrentPage = p;
      this.filterHistory();
    },

    viewTransactionModal: function (id) {
      const t = this.data.transactions.find(item => item.id === id);
      if (!t) return;

      const body = document.getElementById('receiptModalBody');
      body.innerHTML = `
        <div style="padding: 16px;">
          <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 4px;">Policy Commission Statement</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 18px;">Transaction Reference: <strong class="tabular-nums font-mono">${t.id}</strong></p>

          <div class="calc-preview-card" style="margin-top: 0;">
            <div class="calc-breakdown-row"><span>Agent Name:</span><strong>${this.escape(t.agentName)} (${t.agentId})</strong></div>
            <div class="calc-breakdown-row"><span>Policy Number:</span><strong class="tabular-nums font-mono">${t.policyNumber}</strong></div>
            <div class="calc-breakdown-row"><span>Customer Name:</span><span>${this.escape(t.customerName)}</span></div>
            <div class="calc-breakdown-row"><span>Plan Type:</span><span>${t.policyType}</span></div>
            <div class="calc-breakdown-row"><span>Booking Date:</span><span class="tabular-nums">${this.formatDate(t.date)}</span></div>
            <div class="calc-breakdown-row"><span>Commission Category:</span><span>${t.category}</span></div>
            <div class="calc-breakdown-row"><span>Eligible Premium:</span><span class="tabular-nums font-bold">${this.formatCurrency(t.premium)}</span></div>
            <div class="calc-breakdown-row"><span>Applied Rate:</span><span class="tabular-nums">${t.rate}%</span></div>
            <div class="calc-breakdown-row"><span>Base Commission:</span><span class="tabular-nums">${this.formatCurrency(t.baseComm)}</span></div>
            <div class="calc-breakdown-row"><span>Incentive Bonuses:</span><span class="tabular-nums">${this.formatCurrency(t.bonus)}</span></div>
            <div class="calc-breakdown-row total-row">
              <span>Total Payable Commission:</span>
              <span class="tabular-nums">${this.formatCurrency(t.totalComm)}</span>
            </div>
          </div>
        </div>
      `;
      this.openModal('receiptModal');
    },

    exportHistoryCSV: function () {
      const headers = ['Tx ID', 'Date', 'Agent ID', 'Agent Name', 'Policy No', 'Customer Name', 'Type', 'Category', 'Premium', 'Rate (%)', 'Base Commission', 'Bonus', 'Total Commission', 'Status'];
      const rows = this.data.transactions.map(t => [
        t.id,
        t.date,
        t.agentId,
        `"${t.agentName}"`,
        t.policyNumber,
        `"${t.customerName}"`,
        `"${t.policyType}"`,
        t.category,
        t.premium,
        t.rate,
        t.baseComm,
        t.bonus,
        t.totalComm,
        t.status
      ]);

      this.downloadCSV('commission_transactions_ledger.csv', headers, rows);
    },

    // 8. REPORTS AND ANALYTICS
    renderReports: function () {
      const fromInput = document.getElementById('reportDateFrom');
      const toInput = document.getElementById('reportDateTo');
      if (fromInput && !fromInput.value) fromInput.value = '2025-01-01';
      if (toInput && !toInput.value) toInput.value = new Date().toISOString().split('T')[0];

      this.generateSelectedReport();
    },

    generateSelectedReport: function () {
      const tpl = document.getElementById('reportTemplateSelect')?.value || 'agent-wise';
      const from = document.getElementById('reportDateFrom')?.value || '2025-01-01';
      const to = document.getElementById('reportDateTo')?.value || '2026-12-31';

      document.getElementById('reportGeneratedTimestamp').textContent = new Date().toLocaleString();

      const titleEl = document.getElementById('reportDisplayTitle');
      const subEl = document.getElementById('reportDisplaySubtitle');
      const thead = document.getElementById('reportTableHead');
      const tbody = document.getElementById('reportTableBody');
      const tfoot = document.getElementById('reportTableFoot');
      const strip = document.getElementById('reportSummaryStrip');

      // Filter txs by date range
      const txs = this.data.transactions.filter(t => t.date >= from && t.date <= to);

      if (tpl === 'agent-wise') {
        titleEl.textContent = 'Agent-Wise Commission & Premium Sales Report';
        subEl.textContent = `Consolidated performance across all registered insurance agents (${from} to ${to})`;

        const totalPrem = this.data.agents.reduce((s, a) => s + a.totalPremium, 0);
        const totalComm = this.data.agents.reduce((s, a) => s + a.totalCommission, 0);
        const totalPol = this.data.agents.reduce((s, a) => s + a.policiesSold, 0);

        strip.innerHTML = `
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Total Agents</span></div><div class="kpi-value tabular-nums">${this.data.agents.length}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Total Policies</span></div><div class="kpi-value tabular-nums">${totalPol}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Cumulative Premium</span></div><div class="kpi-value tabular-nums">${this.formatCurrency(totalPrem)}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Total Commission</span></div><div class="kpi-value tabular-nums" style="color: var(--primary);">${this.formatCurrency(totalComm)}</div></div>
        `;

        thead.innerHTML = `
          <tr>
            <th>Agent ID</th>
            <th>Agent Name</th>
            <th>Tier</th>
            <th class="num-col">Policies Sold</th>
            <th class="num-col">Gross Premium</th>
            <th class="num-col">Avg Comm Rate</th>
            <th class="num-col">Total Commission</th>
          </tr>
        `;

        tbody.innerHTML = this.data.agents.map(a => `
          <tr>
            <td><strong class="tabular-nums font-mono">${a.id}</strong></td>
            <td>${this.escape(a.name)}</td>
            <td><span class="tier-tag tier-${a.tier.toLowerCase()}">${a.tier}</span></td>
            <td class="num-col tabular-nums">${a.policiesSold}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(a.totalPremium)}</td>
            <td class="num-col tabular-nums">${this.data.tiers[a.tier]?.rate || 10}%</td>
            <td class="num-col tabular-nums font-bold" style="color: var(--primary);">${this.formatCurrency(a.totalCommission)}</td>
          </tr>
        `).join('');

        tfoot.innerHTML = `
          <tr style="font-weight: 800; background: var(--bg-hover);">
            <td colspan="3">Grand Totals</td>
            <td class="num-col tabular-nums">${totalPol}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(totalPrem)}</td>
            <td></td>
            <td class="num-col tabular-nums" style="color: var(--primary);">${this.formatCurrency(totalComm)}</td>
          </tr>
        `;

        this.renderReportChart(
          'bar',
          this.data.agents.slice(0, 8).map(a => a.name.split(' ')[0]),
          [{ label: 'Commission (₹)', data: this.data.agents.slice(0, 8).map(a => a.totalCommission), backgroundColor: '#D97706' }]
        );

      } else if (tpl === 'monthly-breakdown') {
        titleEl.textContent = 'Monthly Commission & Policy Breakdown';
        subEl.textContent = `Monthly aggregated financial overview (${from} to ${to})`;

        const monthsMap = {};
        txs.forEach(t => {
          const m = t.date.substring(0, 7);
          if (!monthsMap[m]) monthsMap[m] = { policies: 0, premium: 0, baseComm: 0, bonus: 0, totalComm: 0 };
          monthsMap[m].policies += 1;
          monthsMap[m].premium += t.premium;
          monthsMap[m].baseComm += t.baseComm;
          monthsMap[m].bonus += t.bonus;
          monthsMap[m].totalComm += t.totalComm;
        });

        const monthKeys = Object.keys(monthsMap).sort();

        thead.innerHTML = `
          <tr>
            <th>Month</th>
            <th class="num-col">Policies</th>
            <th class="num-col">Total Premium</th>
            <th class="num-col">Base Commission</th>
            <th class="num-col">Bonuses</th>
            <th class="num-col">Total Commission</th>
          </tr>
        `;

        tbody.innerHTML = monthKeys.map(m => `
          <tr>
            <td><strong>${m}</strong></td>
            <td class="num-col tabular-nums">${monthsMap[m].policies}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(monthsMap[m].premium)}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(monthsMap[m].baseComm)}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(monthsMap[m].bonus)}</td>
            <td class="num-col tabular-nums font-bold" style="color: var(--primary);">${this.formatCurrency(monthsMap[m].totalComm)}</td>
          </tr>
        `).join('');

        const totalP = monthKeys.reduce((s, m) => s + monthsMap[m].premium, 0);
        const totalC = monthKeys.reduce((s, m) => s + monthsMap[m].totalComm, 0);

        strip.innerHTML = `
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Active Months</span></div><div class="kpi-value tabular-nums">${monthKeys.length}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Filtered Policies</span></div><div class="kpi-value tabular-nums">${txs.length}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Filtered Premium</span></div><div class="kpi-value tabular-nums">${this.formatCurrency(totalP)}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Filtered Commission</span></div><div class="kpi-value tabular-nums" style="color: var(--primary);">${this.formatCurrency(totalC)}</div></div>
        `;

        tfoot.innerHTML = `
          <tr style="font-weight: 800; background: var(--bg-hover);">
            <td>Totals</td>
            <td class="num-col tabular-nums">${txs.length}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(totalP)}</td>
            <td></td>
            <td></td>
            <td class="num-col tabular-nums" style="color: var(--primary);">${this.formatCurrency(totalC)}</td>
          </tr>
        `;

        this.renderReportChart(
          'line',
          monthKeys,
          [
            { label: 'Commission (₹)', data: monthKeys.map(m => monthsMap[m].totalComm), borderColor: '#D97706', tension: 0.3 },
            { label: 'Premium (₹)', data: monthKeys.map(m => monthsMap[m].premium), borderColor: '#0284C7', tension: 0.3 }
          ]
        );

      } else {
        // Fallback or generic table for other templates
        titleEl.textContent = 'Financial Audit & Summary Report';
        subEl.textContent = `Generated audit ledger from ${from} to ${to}`;

        thead.innerHTML = `
          <tr>
            <th>Tx ID</th>
            <th>Date</th>
            <th>Agent</th>
            <th>Policy</th>
            <th class="num-col">Premium</th>
            <th class="num-col">Total Commission</th>
            <th>Status</th>
          </tr>
        `;

        tbody.innerHTML = txs.map(t => `
          <tr>
            <td><strong class="tabular-nums font-mono">${t.id}</strong></td>
            <td>${this.formatDate(t.date)}</td>
            <td>${this.escape(t.agentName)}</td>
            <td>${t.policyNumber}</td>
            <td class="num-col tabular-nums">${this.formatCurrency(t.premium)}</td>
            <td class="num-col tabular-nums font-bold" style="color: var(--primary);">${this.formatCurrency(t.totalComm)}</td>
            <td><span class="badge badge-${t.status.toLowerCase()}">${t.status}</span></td>
          </tr>
        `).join('');

        strip.innerHTML = `
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Total Records</span></div><div class="kpi-value tabular-nums">${txs.length}</div></div>
          <div class="kpi-card"><div class="kpi-header"><span class="kpi-title">Total Commission</span></div><div class="kpi-value tabular-nums" style="color: var(--primary);">${this.formatCurrency(txs.reduce((s, t) => s + t.totalComm, 0))}</div></div>
        `;

        tfoot.innerHTML = '';
        this.renderReportChart(
          'bar',
          ['Endowment', 'Jeevan Labh', 'Tech Term', 'Money Back', 'ULIP'],
          [{ label: 'Volume', data: [12, 8, 5, 4, 3], backgroundColor: '#D97706' }]
        );
      }

      this.initLucide();
    },

    renderReportChart: function (type, labels, datasets) {
      if (!window.Chart) return;
      const ctx = document.getElementById('reportDynamicChart');
      if (!ctx) return;
      if (this.charts.reportDynamic) this.charts.reportDynamic.destroy();

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#94A3B8' : '#64748B';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)';

      this.charts.reportDynamic = new window.Chart(ctx, {
        type: type,
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: textColor } }
          },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: textColor } },
            y: { grid: { color: gridColor }, ticks: { color: textColor } }
          }
        }
      });
    },

    printCurrentReport: function () {
      window.print();
    },

    downloadReportPDF: function () {
      // Use jsPDF or fall back to print
      if (window.jspdf && window.jspdf.jsPDF) {
        try {
          const { jsPDF } = window.jspdf;
          const doc = new jsPDF();
          doc.setFontSize(16);
          doc.text('CommissionPro – Financial Statement', 14, 20);
          doc.setFontSize(10);
          doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 28);
          doc.text('Report Template: ' + document.getElementById('reportDisplayTitle').textContent, 14, 34);

          let y = 46;
          doc.setFontSize(11);
          doc.text('Top Agent Summary:', 14, y);
          y += 8;

          this.data.agents.slice(0, 10).forEach((a, i) => {
            doc.setFontSize(9);
            doc.text(`${i + 1}. ${a.name} (${a.tier}) - Policies: ${a.policiesSold} | Comm: INR ${a.totalCommission}`, 14, y);
            y += 7;
          });

          doc.save('commission_financial_report.pdf');
          this.showToast('Report PDF downloaded successfully', 'success');
          return;
        } catch (e) {
          console.warn('PDF export error, falling back to print', e);
        }
      }
      window.print();
    },

    exportReportCSV: function () {
      const table = document.getElementById('reportDataTable');
      if (!table) return;

      const rows = [];
      const trs = table.querySelectorAll('tr');
      trs.forEach(tr => {
        const row = [];
        tr.querySelectorAll('th, td').forEach(td => {
          let text = td.innerText.replace(/"/g, '""').trim();
          row.push(`"${text}"`);
        });
        if (row.length) rows.push(row.join(','));
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
      const a = document.createElement('a');
      a.href = csvContent;
      a.download = `report_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.showToast('Report CSV exported', 'success');
    },

    // 9. AGENT LEADERBOARD
    renderLeaderboard: function () {
      const sorted = [...this.data.agents].sort((a, b) => b.totalPremium - a.totalPremium);

      // Top 3 Podium
      if (sorted[0]) {
        document.getElementById('podium1Name').textContent = sorted[0].name;
        document.getElementById('podium1Tier').textContent = sorted[0].tier;
        document.getElementById('podium1Sales').textContent = this.formatCurrency(sorted[0].totalPremium);
        document.getElementById('podium1Commission').textContent = this.formatCurrency(sorted[0].totalCommission);
      }
      if (sorted[1]) {
        document.getElementById('podium2Name').textContent = sorted[1].name;
        document.getElementById('podium2Tier').textContent = sorted[1].tier;
        document.getElementById('podium2Sales').textContent = this.formatCurrency(sorted[1].totalPremium);
        document.getElementById('podium2Commission').textContent = this.formatCurrency(sorted[1].totalCommission);
      }
      if (sorted[2]) {
        document.getElementById('podium3Name').textContent = sorted[2].name;
        document.getElementById('podium3Tier').textContent = sorted[2].tier;
        document.getElementById('podium3Sales').textContent = this.formatCurrency(sorted[2].totalPremium);
        document.getElementById('podium3Commission').textContent = this.formatCurrency(sorted[2].totalCommission);
      }

      // Full Table
      const tbody = document.getElementById('fullLeaderboardTableBody');
      if (tbody) {
        tbody.innerHTML = sorted.map((ag, idx) => {
          const score = (85 + (ag.policiesSold * 0.4) + (ag.totalPremium / 1000000)).toFixed(1);
          return `
            <tr>
              <td><strong style="color: ${idx === 0 ? '#F59E0B' : idx === 1 ? '#94A3B8' : idx === 2 ? '#D97706' : 'inherit'};">#${idx + 1}</strong></td>
              <td>
                <div style="font-weight: 700; color: var(--text-main);">${this.escape(ag.name)}</div>
                <div style="font-size: 0.72rem; color: var(--text-muted);">${ag.id} · Joined ${this.formatDate(ag.joiningDate)}</div>
              </td>
              <td><span class="tier-tag tier-${ag.tier.toLowerCase()}">${ag.tier}</span></td>
              <td class="num-col tabular-nums font-bold">${ag.policiesSold}</td>
              <td class="num-col tabular-nums">${this.formatCurrency(ag.totalPremium)}</td>
              <td class="num-col tabular-nums font-bold" style="color: var(--primary);">${this.formatCurrency(ag.totalCommission)}</td>
              <td class="num-col tabular-nums font-mono">${score}</td>
            </tr>
          `;
        }).join('');
      }

      this.initLucide();
    },

    // 10. NOTIFICATIONS
    renderNotifications: function (filterCategory = 'all') {
      let notifs = this.data.notifications;
      if (filterCategory === 'unread') {
        notifs = notifs.filter(n => !n.read);
      } else if (filterCategory !== 'all') {
        notifs = notifs.filter(n => n.category === filterCategory);
      }

      document.getElementById('notifCountAll').textContent = this.data.notifications.length;

      const list = document.getElementById('fullNotificationList');
      if (list) {
        if (notifs.length === 0) {
          list.innerHTML = `<div style="text-align: center; padding: 36px; color: var(--text-muted);">No notifications in this view.</div>`;
        } else {
          list.innerHTML = notifs.map(n => `
            <div class="notif-item ${!n.read ? 'unread' : ''}" onclick="app.markNotificationRead('${n.id}')">
              <div style="color: var(--primary); font-size: 1.1rem; margin-top: 2px;">
                <i data-lucide="${this.getNotifIcon(n.category)}" style="width: 18px; height: 18px;"></i>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <strong style="color: var(--text-main); font-size: 0.85rem;">${this.escape(n.title)}</strong>
                  <span style="font-size: 0.72rem; color: var(--text-muted);">${n.date}</span>
                </div>
                <p style="color: var(--text-secondary); margin-top: 2px;">${this.escape(n.message)}</p>
              </div>
              ${!n.read ? '<span style="width: 8px; height: 8px; border-radius: 50%; background: var(--primary); margin-top: 6px;"></span>' : ''}
            </div>
          `).join('');
        }
      }

      this.initLucide();
    },

    filterNotificationsTab: function (cat) {
      this.renderNotifications(cat);
    },

    renderQuickNotifications: function () {
      const qList = document.getElementById('notifQuickList');
      if (!qList) return;

      const unread = this.data.notifications.filter(n => !n.read).slice(0, 5);
      if (unread.length === 0) {
        qList.innerHTML = `<div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.78rem;">All caught up! No unread notifications.</div>`;
      } else {
        qList.innerHTML = unread.map(n => `
          <div class="notif-item unread" onclick="app.markNotificationRead('${n.id}')">
            <div style="color: var(--primary);"><i data-lucide="${this.getNotifIcon(n.category)}" style="width: 16px; height: 16px;"></i></div>
            <div style="flex: 1;">
              <div style="font-weight: 700; color: var(--text-main); font-size: 0.78rem;">${this.escape(n.title)}</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">${this.escape(n.message)}</div>
            </div>
          </div>
        `).join('');
      }

      this.initLucide();
    },

    addNotification: function (title, message, category = 'system') {
      const newNotif = {
        id: `NOTIF-${Date.now()}`,
        title,
        message,
        category,
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        read: false
      };
      this.data.notifications.unshift(newNotif);
      this.persistData();
    },

    markNotificationRead: function (id) {
      const n = this.data.notifications.find(item => item.id === id);
      if (n) {
        n.read = true;
        this.persistData();
        this.renderNotifications();
      }
    },

    markAllNotificationsRead: function () {
      this.data.notifications.forEach(n => { n.read = true; });
      this.persistData();
      this.renderNotifications();
      this.showToast('All notifications marked as read', 'info');
    },

    clearAllNotifications: function () {
      this.data.notifications = [];
      this.persistData();
      this.renderNotifications();
      this.showToast('Cleared all notifications', 'info');
    },

    getNotifIcon: function (cat) {
      switch (cat) {
        case 'commission': return 'coins';
        case 'payout': return 'wallet';
        case 'tier': return 'award';
        case 'milestone': return 'trophy';
        default: return 'bell';
      }
    },

    toggleNotificationsPopover: function (forceState) {
      const popover = document.getElementById('notifPopover');
      if (popover) {
        if (typeof forceState === 'boolean') {
          popover.classList.toggle('show', forceState);
        } else {
          popover.classList.toggle('show');
        }
      }
    },

    // 11. SETTINGS VIEW
    renderSettings: function () {
      const curSel = document.getElementById('settingCurrency');
      if (curSel) curSel.value = this.currency;

      const sizeSel = document.getElementById('settingPageSize');
      if (sizeSel) sizeSel.value = this.itemsPerPage.toString();
    },

    exportJsonBackup: function () {
      const json = JSON.stringify(this.data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `commissionpro_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast('JSON backup downloaded', 'success');
    },

    promptResetDemoData: function () {
      this.openModal('resetDataModal');
    },

    executeResetDemoData: function () {
      this.data = getInitialSeedData();
      this.persistData();
      this.closeModal('resetDataModal');
      this.showToast('Restored all demo data to initial seed state', 'success');
      this.renderCurrentView();
    },

    // Global Search
    handleGlobalSearch: function (e) {
      const query = (e.target.value || '').toLowerCase().trim();
      if (!query) return;

      // Check if matches an agent
      const foundAgent = this.data.agents.find(a => a.name.toLowerCase().includes(query) || a.id.toLowerCase().includes(query));
      if (foundAgent && this.activePage !== 'agents') {
        this.navigate('agents');
        const searchInput = document.getElementById('agentSearchInput');
        if (searchInput) searchInput.value = query;
        this.filterAgents();
      }
    },

    // UI Helpers
    openModal: function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('show');
      this.initLucide();
    },

    closeModal: function (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.remove('show');
    },

    toggleSidebar: function () {
      const sb = document.getElementById('sidebar');
      const icon = document.getElementById('sidebarCollapseIcon');
      if (sb) {
        const isCollapsed = sb.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed', isCollapsed);
        if (icon) {
          icon.setAttribute('data-lucide', isCollapsed ? 'panel-left-open' : 'panel-left-close');
          this.initLucide();
        }
      }
    },

    toggleMobileSidebar: function () {
      const sb = document.getElementById('sidebar');
      if (sb) sb.classList.toggle('mobile-open');
    },

    toggleProfileDropdown: function (forceState) {
      const dd = document.getElementById('profileDropdown');
      if (dd) {
        if (typeof forceState === 'boolean') {
          dd.classList.toggle('show', forceState);
        } else {
          dd.classList.toggle('show');
        }
      }
    },

    showToast: function (message, type = 'info') {
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
        <div style="font-weight: 700; color: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--primary)'};">
          <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-triangle' : 'info'}" style="width: 18px; height: 18px;"></i>
        </div>
        <div class="toast-msg">${this.escape(message)}</div>
      `;

      container.appendChild(toast);
      this.initLucide();

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => toast.remove(), 250);
      }, 3500);
    },

    formatCurrency: function (num) {
      const val = parseFloat(num) || 0;
      if (this.currency === 'INR') {
        // Indian Rupee formatting
        return '₹' + val.toLocaleString('en-IN', { maximumFractionDigits: 2 });
      } else {
        return `${this.currencySymbol}${val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    },

    formatCompactCurrency: function (num) {
      const val = parseFloat(num) || 0;
      if (this.currency === 'INR') {
        if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
        if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
        if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
        return `₹${val}`;
      } else {
        if (val >= 1000000) return `${this.currencySymbol}${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `${this.currencySymbol}${(val / 1000).toFixed(0)}k`;
        return `${this.currencySymbol}${val}`;
      }
    },

    formatDate: function (dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    },

    escape: function (str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    downloadCSV: function (filename, headers, rows) {
      const content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast(`Downloaded ${filename}`, 'success');
    },

    bindGlobalEvents: function () {
      // Close popups on click outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.profile-dropdown-wrapper')) {
          this.toggleProfileDropdown(false);
        }
        if (!e.target.closest('.notifications-panel') && !e.target.closest('[onclick="app.toggleNotificationsPopover()"]')) {
          this.toggleNotificationsPopover(false);
        }
      });

      // Handle window resize for charts
      window.addEventListener('resize', () => {
        Object.values(this.charts).forEach(c => {
          if (c && typeof c.resize === 'function') c.resize();
        });
      });
    }
  };

  // Attach app to window
  window.app = app;

  // Boot on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    app.init();
  });

})();
