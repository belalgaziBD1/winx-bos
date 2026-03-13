import { useState } from "react";

// ─── DATA STORE ────────────────────────────────────────────────────────────────
const INITIAL_PRODUCTS = [
  { id: "P001", name: "WinX Detergent Powder 500g", sku: "WXD-500", category: "Detergent", weight: "500g", price: 85, dealerPrice: 70, stock: 450 },
  { id: "P002", name: "WinX Dishwash 250g", sku: "WXW-250", category: "Dishwash", weight: "250g", price: 60, dealerPrice: 50, stock: 280 },
];
const INITIAL_CUSTOMERS = [
  { id: "C001", name: "Sohel", phone: "01930833617", address: "Mirpur 1", city: "Dhaka", dealer: "Rahim Traders", notes: "Regular customer" },
  { id: "C002", name: "Karim Ahmed", phone: "01711223344", address: "Gulshan 2", city: "Dhaka", dealer: "Karim Enterprise", notes: "" },
  { id: "C003", name: "Nasrin Begum", phone: "01811223344", address: "Agrabad", city: "Chittagong", dealer: "City Store", notes: "Bulk buyer" },
];
const INITIAL_DEALERS = [
  { id: "D001", name: "Rahim Traders", phone: "01555001122", area: "Mirpur, Dhaka", creditLimit: 50000, outstanding: 12000 },
  { id: "D002", name: "Karim Enterprise", phone: "01666001122", area: "Gulshan, Dhaka", creditLimit: 75000, outstanding: 8500 },
  { id: "D003", name: "City Store", phone: "01777001122", area: "Agrabad, Chittagong", creditLimit: 40000, outstanding: 3200 },
];
const INITIAL_ORDERS = [
  { id: "ORD-10011", customerId: "C001", customerName: "Sohel", phone: "01930833617", address: "Mirpur 1, Dhaka", dealer: "Rahim Traders", items: [{ productId: "P001", name: "WinX Detergent Powder 500g", qty: 100, price: 70, total: 7000 }, { productId: "P002", name: "WinX Dishwash 250g", qty: 50, price: 0, total: 0 }], subtotal: 7000, discount: 0, deliveryCharge: 0, grandTotal: 7000, status: "Delivered", deliveryStatus: "Delivered", courier: "Sundarban Courier", trackingNo: "SB2026031101", date: "2026-03-11", paymentMethod: "Bank Transfer" },
  { id: "ORD-10012", customerId: "C002", customerName: "Karim Ahmed", phone: "01711223344", address: "Gulshan 2, Dhaka", dealer: "Karim Enterprise", items: [{ productId: "P001", name: "WinX Detergent Powder 500g", qty: 50, price: 70, total: 3500 }], subtotal: 3500, discount: 200, deliveryCharge: 100, grandTotal: 3400, status: "Processing", deliveryStatus: "Packed", courier: "SA Paribahan", trackingNo: "SA2026031201", date: "2026-03-12", paymentMethod: "Cash" },
  { id: "ORD-10013", customerId: "C003", customerName: "Nasrin Begum", phone: "01811223344", address: "Agrabad, Chittagong", dealer: "City Store", items: [{ productId: "P002", name: "WinX Dishwash 250g", qty: 80, price: 50, total: 4000 }], subtotal: 4000, discount: 0, deliveryCharge: 200, grandTotal: 4200, status: "Pending", deliveryStatus: "Pending", courier: "", trackingNo: "", date: "2026-03-12", paymentMethod: "Bank Transfer" },
];

const STOCK_LOG = [
  { id: 1, productId: "P001", type: "IN", qty: 500, note: "Initial stock", date: "2026-03-01" },
  { id: 2, productId: "P002", type: "IN", qty: 300, note: "Initial stock", date: "2026-03-01" },
  { id: 3, productId: "P001", type: "OUT", qty: 50, note: "ORD-10011", date: "2026-03-11" },
  { id: 4, productId: "P002", type: "OUT", qty: 20, note: "ORD-10012", date: "2026-03-12" },
];

// ─── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = ({ d, size = 20, color = "currentColor", stroke = 2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);
const Icons = {
  dashboard: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  customers: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  products: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  orders: "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 1 1 0 4H11a2 2 0 0 1-2-2z",
  invoice: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8",
  dealers: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  inventory: "M5 8h14M5 8a2 2 0 1 0 0-4h14a2 2 0 1 0 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M10 12h4",
  reports: "M18 20V10M12 20V4M6 20v-6",
  delivery: "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5m-4 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z",
  whatsapp: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z",
  close: "M18 6 6 18M6 6l12 12",
  check: "M20 6 9 17l-5-5",
  alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  download: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3",
  print: "M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  menu: "M3 12h18M3 6h18M3 18h18",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  roles: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
};

// ─── STYLES ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --g1:#00a651;--g2:#007a3d;--g3:#005229;--g4:#e8f7ef;--g5:#c8edda;
    --bg:#f0f4f2;--card:#fff;--border:#e2ede8;
    --text:#1a2e22;--muted:#6b8c77;--light:#9bbdaa;
    --red:#e53e3e;--orange:#dd6b20;--blue:#2b6cb0;--purple:#6b46c1;
    --shadow:0 2px 8px rgba(0,100,50,.08);
    --shadow-lg:0 8px 32px rgba(0,100,50,.12);
    --r:12px;--r-sm:8px;
  }
  body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);font-size:14px;}
  .app{display:flex;height:100vh;overflow:hidden;}
  /* SIDEBAR */
  .sidebar{width:240px;background:var(--g3);display:flex;flex-direction:column;flex-shrink:0;transition:.3s;}
  .sidebar.collapsed{width:64px;}
  .sidebar-logo{padding:20px 16px;border-bottom:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:10px;}
  .logo-mark{width:36px;height:36px;background:var(--g1);border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .logo-text{color:#fff;font-weight:800;font-size:13px;line-height:1.2;white-space:nowrap;overflow:hidden;}
  .logo-text span{display:block;font-weight:400;font-size:10px;color:rgba(255,255,255,.6);letter-spacing:.5px;}
  .sidebar-nav{flex:1;padding:12px 8px;overflow-y:auto;}
  .nav-section{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.35);padding:12px 8px 4px;font-weight:600;white-space:nowrap;overflow:hidden;}
  .nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer;color:rgba(255,255,255,.7);transition:.15s;margin-bottom:2px;white-space:nowrap;overflow:hidden;}
  .nav-item:hover{background:rgba(255,255,255,.1);color:#fff;}
  .nav-item.active{background:var(--g1);color:#fff;font-weight:600;}
  .nav-item svg{flex-shrink:0;}
  .nav-label{font-size:13px;}
  .sidebar-footer{padding:12px 8px;border-top:1px solid rgba(255,255,255,.1);}
  /* MAIN */
  .main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
  .topbar{background:var(--card);border-bottom:1px solid var(--border);padding:0 24px;height:60px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-shrink:0;}
  .topbar-left{display:flex;align-items:center;gap:12px;}
  .page-title{font-size:18px;font-weight:700;color:var(--text);}
  .topbar-right{display:flex;align-items:center;gap:12px;}
  .content{flex:1;overflow-y:auto;padding:24px;}
  /* CARDS */
  .card{background:var(--card);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--shadow);}
  .card-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .card-title{font-size:15px;font-weight:700;}
  .card-body{padding:20px;}
  /* STAT CARDS */
  .stats-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;margin-bottom:24px;}
  .stat-card{background:var(--card);border-radius:var(--r);border:1px solid var(--border);padding:20px;display:flex;align-items:flex-start;gap:14px;box-shadow:var(--shadow);}
  .stat-icon{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .stat-icon.green{background:var(--g4);}
  .stat-icon.blue{background:#ebf4ff;}
  .stat-icon.orange{background:#fff3e0;}
  .stat-icon.red{background:#fff0f0;}
  .stat-icon.purple{background:#f3f0ff;}
  .stat-label{font-size:12px;color:var(--muted);font-weight:500;margin-bottom:4px;}
  .stat-value{font-size:24px;font-weight:800;color:var(--text);line-height:1;}
  .stat-sub{font-size:11px;color:var(--muted);margin-top:4px;}
  /* TABLE */
  .table-wrap{overflow-x:auto;}
  table{width:100%;border-collapse:collapse;}
  th{padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);font-weight:600;background:var(--bg);border-bottom:1px solid var(--border);}
  td{padding:12px 14px;border-bottom:1px solid var(--border);font-size:13px;}
  tr:last-child td{border-bottom:0;}
  tr:hover td{background:var(--g4);}
  /* BADGES */
  .badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;}
  .badge-green{background:var(--g4);color:var(--g2);}
  .badge-orange{background:#fff3e0;color:#c05621;}
  .badge-blue{background:#ebf4ff;color:#2b6cb0;}
  .badge-red{background:#fff0f0;color:#c53030;}
  .badge-purple{background:#f3f0ff;color:#553c9a;}
  .badge-gray{background:#f5f5f5;color:#555;}
  /* BUTTONS */
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:var(--r-sm);border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600;transition:.15s;}
  .btn-primary{background:var(--g1);color:#fff;}
  .btn-primary:hover{background:var(--g2);}
  .btn-outline{background:transparent;color:var(--g1);border:1.5px solid var(--g1);}
  .btn-outline:hover{background:var(--g4);}
  .btn-ghost{background:transparent;color:var(--muted);border:1.5px solid var(--border);}
  .btn-ghost:hover{background:var(--bg);}
  .btn-danger{background:#fff0f0;color:var(--red);}
  .btn-danger:hover{background:var(--red);color:#fff;}
  .btn-sm{padding:5px 10px;font-size:12px;}
  .btn-icon{padding:6px;border-radius:6px;}
  /* FORMS */
  .form-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:16px;}
  .form-group{display:flex;flex-direction:column;gap:5px;}
  .form-group.full{grid-column:1/-1;}
  label{font-size:12px;font-weight:600;color:var(--muted);}
  input,select,textarea{padding:9px 12px;border-radius:var(--r-sm);border:1.5px solid var(--border);font-family:inherit;font-size:13px;color:var(--text);background:#fff;outline:none;transition:.15s;width:100%;}
  input:focus,select:focus,textarea:focus{border-color:var(--g1);box-shadow:0 0 0 3px rgba(0,166,81,.12);}
  textarea{resize:vertical;min-height:80px;}
  /* MODAL */
  .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px;}
  .modal{background:#fff;border-radius:16px;width:100%;max-width:680px;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.2);}
  .modal-header{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
  .modal-title{font-size:17px;font-weight:700;}
  .modal-body{padding:24px;}
  .modal-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px;}
  /* CHARTS */
  .chart-bar{display:flex;align-items:flex-end;gap:6px;height:120px;}
  .bar-col{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;}
  .bar{width:100%;background:var(--g1);border-radius:4px 4px 0 0;transition:.3s;}
  .bar-label{font-size:10px;color:var(--muted);}
  .bar-val{font-size:9px;color:var(--muted);}
  /* MISC */
  .flex{display:flex;} .items-center{align-items:center;} .justify-between{justify-content:space-between;} .gap-8{gap:8px;} .gap-12{gap:12px;}
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;}
  .mt-16{margin-top:16px;} .mt-24{margin-top:24px;}
  .text-right{text-align:right;}
  .text-muted{color:var(--muted);}
  .text-sm{font-size:12px;}
  .font-mono{font-family:'JetBrains Mono',monospace;}
  .avatar{width:32px;height:32px;border-radius:50%;background:var(--g4);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:13px;color:var(--g2);}
  .alert-banner{background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:8px;font-size:13px;color:#b45309;}
  .section-title{font-size:16px;font-weight:700;margin-bottom:16px;}
  .tabs{display:flex;gap:4px;background:var(--bg);padding:4px;border-radius:8px;}
  .tab{padding:7px 14px;border-radius:6px;cursor:pointer;font-size:13px;font-weight:500;color:var(--muted);}
  .tab.active{background:#fff;color:var(--g1);font-weight:700;box-shadow:var(--shadow);}
  .divider{height:1px;background:var(--border);margin:16px 0;}
  .empty-state{text-align:center;padding:48px 20px;color:var(--muted);}
  .invoice-preview{font-family:'Plus Jakarta Sans',sans-serif;max-width:700px;margin:0 auto;padding:0;}
  .print-area{display:none;}
  @media print{.app,.topbar,.sidebar{display:none!important;}.print-area{display:block!important;}body{background:#fff;}}
  .role-switcher{display:flex;gap:4px;background:var(--g4);border-radius:20px;padding:3px;}
  .role-btn{padding:4px 12px;border-radius:16px;font-size:11px;font-weight:600;cursor:pointer;border:none;background:transparent;color:var(--g2);}
  .role-btn.active{background:var(--g1);color:#fff;}
  .search-box{position:relative;}
  .search-box input{padding-left:34px;}
  .search-box svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--light);}
  .progress-bar{height:6px;background:var(--g5);border-radius:3px;overflow:hidden;}
  .progress-fill{height:100%;background:var(--g1);border-radius:3px;transition:.5s;}
  .notification-dot{width:8px;height:8px;background:var(--red);border-radius:50%;position:absolute;top:0;right:0;}
  .topbar-icon{position:relative;cursor:pointer;padding:8px;border-radius:8px;color:var(--muted);}
  .topbar-icon:hover{background:var(--bg);}
  .order-timeline{display:flex;align-items:center;gap:0;}
  .timeline-step{display:flex;flex-direction:column;align-items:center;flex:1;}
  .timeline-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;}
  .timeline-dot.done{background:var(--g1);color:#fff;}
  .timeline-dot.current{background:#fff;border:2.5px solid var(--g1);color:var(--g1);}
  .timeline-dot.future{background:#f0f0f0;color:#aaa;}
  .timeline-line{height:2px;flex:1;background:#e0e0e0;}
  .timeline-line.done{background:var(--g1);}
  .timeline-label{font-size:10px;color:var(--muted);margin-top:4px;}
  .whatsapp-card{background:linear-gradient(135deg,#075e54,#25d366);border-radius:var(--r);padding:20px;color:#fff;}
  .wa-message{background:rgba(255,255,255,.15);border-radius:8px;padding:12px;font-size:13px;margin-top:12px;backdrop-filter:blur(4px);}
`;

// ─── HELPERS ────────────────────────────────────────────────────────────────────
const genId = (prefix) => `${prefix}-${Date.now().toString().slice(-5)}`;
const today = () => new Date().toISOString().split("T")[0];
const fmt = (n) => "৳" + Number(n).toLocaleString();
const statusBadge = (s) => {
  const map = { Pending: "badge-orange", Processing: "badge-blue", Shipped: "badge-purple", Delivered: "badge-green", Cancelled: "badge-red" };
  return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
};

// ─── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("dashboard");
  const [role, setRole] = useState("Admin");
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [dealers, setDealers] = useState(INITIAL_DEALERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [stockLog, setStockLog] = useState(STOCK_LOG);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const nav = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard", section: "OVERVIEW", roles: ["Admin", "Salesman"] },
    { id: "customers", label: "Customers", icon: "customers", section: "MANAGEMENT", roles: ["Admin", "Salesman"] },
    { id: "products", label: "Products", icon: "products", roles: ["Admin"] },
    { id: "orders", label: "Orders", icon: "orders", roles: ["Admin", "Salesman", "Dealer"] },
    { id: "dealers", label: "Dealers", icon: "dealers", roles: ["Admin"] },
    { id: "inventory", label: "Inventory", icon: "inventory", roles: ["Admin"], section: "OPERATIONS" },
    { id: "delivery", label: "Delivery", icon: "delivery", roles: ["Admin", "Salesman"] },
    { id: "reports", label: "Reports", icon: "reports", roles: ["Admin"], section: "ANALYTICS" },
    { id: "whatsapp", label: "WhatsApp", icon: "whatsapp", roles: ["Admin"] },
    { id: "roles", label: "User Roles", icon: "roles", roles: ["Admin"], section: "SETTINGS" },
  ];

  const visibleNav = nav.filter(n => n.roles.includes(role));
  let prevSection = null;

  const handleViewInvoice = (order) => { setInvoiceOrder(order); setPage("invoice"); };

  const pageProps = { products, setProducts, customers, setCustomers, dealers, setDealers, orders, setOrders, stockLog, setStockLog, onViewInvoice: handleViewInvoice, role };

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
          <div className="sidebar-logo">
            <div className="logo-mark">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            {!collapsed && <div className="logo-text">WinX BOS<span>Business Operating System</span></div>}
          </div>
          <nav className="sidebar-nav">
            {visibleNav.map(item => {
              const showSection = item.section && item.section !== prevSection;
              if (item.section) prevSection = item.section;
              return (
                <div key={item.id}>
                  {showSection && !collapsed && <div className="nav-section">{item.section}</div>}
                  <div className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => setPage(item.id)}>
                    <Icon d={Icons[item.icon]} size={18} color="currentColor" />
                    {!collapsed && <span className="nav-label">{item.label}</span>}
                  </div>
                </div>
              );
            })}
          </nav>
          <div className="sidebar-footer">
            <div className="nav-item" onClick={() => setCollapsed(!collapsed)}>
              <Icon d={Icons.menu} size={18} />
              {!collapsed && <span className="nav-label">Collapse</span>}
            </div>
          </div>
        </div>

        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div className="page-title">{nav.find(n => n.id === page)?.label || "WinX BOS"}</div>
            </div>
            <div className="topbar-right">
              <div className="role-switcher">
                {["Admin", "Salesman", "Dealer"].map(r => (
                  <button key={r} className={`role-btn ${role === r ? "active" : ""}`} onClick={() => { setRole(r); setPage("dashboard"); }}>{r}</button>
                ))}
              </div>
              <div className="topbar-icon" style={{ position: "relative" }}>
                <Icon d={Icons.bell} size={20} />
                <div className="notification-dot" />
              </div>
              <div className="flex items-center gap-8">
                <div className="avatar">BG</div>
                {!collapsed && <div style={{ fontSize: 12 }}><div style={{ fontWeight: 700 }}>Bellal Gazi</div><div style={{ color: "var(--muted)" }}>{role}</div></div>}
              </div>
            </div>
          </div>

          <div className="content">
            {page === "dashboard" && <Dashboard {...pageProps} />}
            {page === "customers" && <Customers {...pageProps} />}
            {page === "products" && <Products {...pageProps} />}
            {page === "orders" && <Orders {...pageProps} />}
            {page === "dealers" && <Dealers {...pageProps} />}
            {page === "inventory" && <Inventory {...pageProps} />}
            {page === "delivery" && <Delivery {...pageProps} />}
            {page === "reports" && <Reports {...pageProps} />}
            {page === "whatsapp" && <WhatsApp {...pageProps} />}
            {page === "roles" && <Roles />}
            {page === "invoice" && <InvoicePage order={invoiceOrder} onBack={() => setPage("orders")} />}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── DASHBOARD ──────────────────────────────────────────────────────────────────
function Dashboard({ orders, products, customers }) {
  const totalRevenue = orders.reduce((a, o) => a + o.grandTotal, 0);
  const todaySales = orders.filter(o => o.date === today()).reduce((a, o) => a + o.grandTotal, 0);
  const lowStock = products.filter(p => p.stock < 50);
  const pending = orders.filter(o => o.status === "Pending").length;

  const monthly = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({
    label: m, val: Math.floor(Math.random() * 80000 + 20000)
  }));
  monthly[2] = { label: "Mar", val: 14600 };
  const maxVal = Math.max(...monthly.map(m => m.val));

  const topProducts = products.map(p => {
    const sold = orders.reduce((a, o) => {
      const item = o.items.find(it => it.productId === p.id);
      return a + (item ? item.qty : 0);
    }, 0);
    return { ...p, sold };
  }).sort((a, b) => b.sold - a.sold);

  return (
    <div>
      {lowStock.length > 0 && (
        <div className="alert-banner" style={{ marginBottom: 16 }}>
          <Icon d={Icons.alert} size={16} color="#b45309" />
          <strong>Low Stock Alert:</strong>&nbsp;{lowStock.map(p => `${p.name} (${p.stock} left)`).join(", ")}
        </div>
      )}

      <div className="stats-grid">
        {[
          { label: "Total Revenue", val: fmt(totalRevenue), sub: "All time", icon: "reports", cls: "green", color: "var(--g1)" },
          { label: "Today's Sales", val: fmt(todaySales), sub: today(), icon: "orders", cls: "blue", color: "#2b6cb0" },
          { label: "Total Customers", val: customers.length, sub: "Registered", icon: "customers", cls: "purple", color: "#6b46c1" },
          { label: "Total Orders", val: orders.length, sub: `${pending} pending`, icon: "invoice", cls: "orange", color: "#dd6b20" },
          { label: "Low Stock Items", val: lowStock.length, sub: "Need restock", icon: "alert", cls: "red", color: "var(--red)" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className={`stat-icon ${s.cls}`}><Icon d={Icons[s.icon]} size={20} color={s.color} /></div>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.val}</div>
              <div className="stat-sub">{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Monthly Sales 2026</span></div>
          <div className="card-body">
            <div className="chart-bar">
              {monthly.map(m => (
                <div className="bar-col" key={m.label}>
                  <div className="bar-val">{m.val > 50000 ? fmt(m.val).replace("৳","") : ""}</div>
                  <div className="bar" style={{ height: `${(m.val / maxVal) * 100}%`, opacity: m.label === "Mar" ? 1 : 0.4 }} />
                  <div className="bar-label">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Top Products</span></div>
          <div className="card-body">
            {topProducts.map((p, i) => (
              <div key={p.id} style={{ marginBottom: 14 }}>
                <div className="flex justify-between" style={{ marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: "var(--muted)" }}>{p.sold} sold</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${Math.min((p.sold / 200) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card mt-16">
        <div className="card-header"><span className="card-title">Recent Orders</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {orders.slice(-5).reverse().map(o => (
                <tr key={o.id}>
                  <td className="font-mono" style={{ color: "var(--g2)", fontWeight: 600 }}>{o.id}</td>
                  <td>{o.customerName}</td>
                  <td className="text-muted">{o.date}</td>
                  <td style={{ fontWeight: 700 }}>{fmt(o.grandTotal)}</td>
                  <td>{statusBadge(o.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOMERS ──────────────────────────────────────────────────────────────────
function Customers({ customers, setCustomers, dealers }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", dealer: "", notes: "" });

  const filtered = customers.filter(c => `${c.name} ${c.phone} ${c.city}`.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm({ name: "", phone: "", address: "", city: "", dealer: "", notes: "" }); setModal(true); };
  const openEdit = (c) => { setEditing(c.id); setForm(c); setModal(true); };
  const save = () => {
    if (!form.name || !form.phone) return;
    if (editing) setCustomers(cs => cs.map(c => c.id === editing ? { ...form, id: editing } : c));
    else setCustomers(cs => [...cs, { ...form, id: genId("C") }]);
    setModal(false);
  };
  const del = (id) => setCustomers(cs => cs.filter(c => c.id !== id));

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div className="search-box" style={{ width: 260 }}>
          <Icon d={Icons.search} size={16} />
          <input placeholder="Search customers…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Icon d={Icons.plus} size={16} />Add Customer</button>
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Phone</th><th>City</th><th>Dealer</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td><div className="flex items-center gap-8"><div className="avatar">{c.name[0]}</div>{c.name}</div></td>
                  <td className="font-mono">{c.phone}</td>
                  <td>{c.city}</td>
                  <td><span className="badge badge-green">{c.dealer}</span></td>
                  <td><div className="flex gap-8">
                    <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(c)}><Icon d={Icons.edit} size={14} /></button>
                    <button className="btn btn-danger btn-sm btn-icon" onClick={() => del(c.id)}><Icon d={Icons.trash} size={14} /></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editing ? "Edit Customer" : "Add Customer"}</div>
              <button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><Icon d={Icons.close} size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                {[["name","Customer Name"],["phone","Phone"],["address","Address"],["city","City"]].map(([k,l]) => (
                  <div className="form-group" key={k}>
                    <label>{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Dealer</label>
                  <select value={form.dealer} onChange={e => setForm(f => ({...f,dealer:e.target.value}))}>
                    <option value="">Select Dealer</option>
                    {dealers.map(d => <option key={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div className="form-group full">
                  <label>Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({...f,notes:e.target.value}))} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save Customer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PRODUCTS ───────────────────────────────────────────────────────────────────
function Products({ products, setProducts }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", sku: "", category: "", weight: "", price: "", dealerPrice: "", stock: "" });

  const openAdd = () => { setEditing(null); setForm({ name: "", sku: "", category: "", weight: "", price: "", dealerPrice: "", stock: "" }); setModal(true); };
  const openEdit = (p) => { setEditing(p.id); setForm(p); setModal(true); };
  const save = () => {
    if (!form.name) return;
    const p = { ...form, price: +form.price, dealerPrice: +form.dealerPrice, stock: +form.stock };
    if (editing) setProducts(ps => ps.map(x => x.id === editing ? { ...p, id: editing } : x));
    else setProducts(ps => [...ps, { ...p, id: genId("P") }]);
    setModal(false);
  };
  const del = (id) => setProducts(ps => ps.filter(p => p.id !== id));

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>Product Catalog</div>
        <button className="btn btn-primary" onClick={openAdd}><Icon d={Icons.plus} size={16} />Add Product</button>
      </div>
      <div className="grid-2" style={{ marginBottom: 16 }}>
        {products.map(p => (
          <div className="card" key={p.id}>
            <div className="card-body">
              <div className="flex justify-between items-center" style={{ marginBottom: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                  <div className="text-muted text-sm font-mono">{p.sku}</div>
                </div>
                <div className="flex gap-8">
                  <button className="btn btn-ghost btn-sm btn-icon" onClick={() => openEdit(p)}><Icon d={Icons.edit} size={14} /></button>
                  <button className="btn btn-danger btn-sm btn-icon" onClick={() => del(p.id)}><Icon d={Icons.trash} size={14} /></button>
                </div>
              </div>
              <div className="grid-2" style={{ gap: 10 }}>
                {[["Category", p.category], ["Weight", p.weight], ["Retail Price", fmt(p.price)], ["Dealer Price", fmt(p.dealerPrice)]].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-muted text-sm">{k}</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div className="divider" />
              <div className="flex justify-between items-center">
                <span className="text-muted text-sm">Stock Level</span>
                <span style={{ fontWeight: 700, color: p.stock < 50 ? "var(--red)" : "var(--g1)" }}>{p.stock} units</span>
              </div>
              <div className="progress-bar" style={{ marginTop: 6 }}>
                <div className="progress-fill" style={{ width: `${Math.min((p.stock / 500) * 100, 100)}%`, background: p.stock < 50 ? "var(--red)" : undefined }} />
              </div>
              {p.stock < 50 && <div className="text-sm" style={{ color: "var(--red)", marginTop: 4 }}>⚠ Low stock — reorder needed</div>}
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{editing ? "Edit Product" : "Add Product"}</div>
              <button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><Icon d={Icons.close} size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid">
                {[["name","Product Name"],["sku","SKU"],["category","Category"],["weight","Weight"],["price","Retail Price"],["dealerPrice","Dealer Price"],["stock","Stock Quantity"]].map(([k,l]) => (
                  <div className="form-group" key={k}>
                    <label>{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} />
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={save}>Save Product</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ORDERS ─────────────────────────────────────────────────────────────────────
function Orders({ orders, setOrders, customers, products, dealers, stockLog, setStockLog, onViewInvoice, role }) {
  const [modal, setModal] = useState(false);
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({ customerId: "", customerName: "", phone: "", address: "", dealer: "", items: [{ productId: "", name: "", qty: 1, price: 0, total: 0 }], discount: 0, deliveryCharge: 0, paymentMethod: "Bank Transfer" });

  const filtered = filter === "All" ? orders : orders.filter(o => o.status === filter);

  const updateItem = (i, key, val) => {
    const items = [...form.items];
    items[i] = { ...items[i], [key]: val };
    if (key === "productId") {
      const p = products.find(x => x.id === val);
      if (p) { items[i].name = p.name; items[i].price = role === "Dealer" ? p.dealerPrice : p.dealerPrice; }
    }
    if (key === "qty" || key === "price") items[i].total = (items[i].qty || 0) * (items[i].price || 0);
    setForm(f => ({ ...f, items }));
  };
  const subtotal = form.items.reduce((a, it) => a + (it.total || 0), 0);
  const grandTotal = subtotal - +form.discount + +form.deliveryCharge;

  const submitOrder = () => {
    if (!form.customerName || form.items[0].productId === "") return;
    const newOrder = {
      id: `ORD-${10013 + orders.length + 1}`,
      ...form, subtotal, grandTotal,
      status: "Pending", deliveryStatus: "Pending",
      courier: "", trackingNo: "", date: today()
    };
    setOrders(os => [...os, newOrder]);
    // deduct stock
    form.items.forEach(it => {
      if (it.productId) setStockLog(sl => [...sl, { id: Date.now(), productId: it.productId, type: "OUT", qty: it.qty, note: newOrder.id, date: today() }]);
    });
    setModal(false);
  };

  const updateStatus = (id, status) => setOrders(os => os.map(o => o.id === id ? { ...o, status } : o));

  const selectCustomer = (id) => {
    const c = customers.find(x => x.id === id);
    if (c) setForm(f => ({ ...f, customerId: id, customerName: c.name, phone: c.phone, address: `${c.address}, ${c.city}`, dealer: c.dealer }));
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div className="tabs">
          {["All","Pending","Processing","Shipped","Delivered","Cancelled"].map(s => (
            <div key={s} className={`tab ${filter === s ? "active" : ""}`} onClick={() => setFilter(s)}>{s}</div>
          ))}
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ customerId: "", customerName: "", phone: "", address: "", dealer: "", items: [{ productId: "", name: "", qty: 1, price: 0, total: 0 }], discount: 0, deliveryCharge: 0, paymentMethod: "Bank Transfer" }); setModal(true); }}>
          <Icon d={Icons.plus} size={16} />New Order
        </button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Customer</th><th>Dealer</th><th>Date</th><th>Grand Total</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td className="font-mono" style={{ color: "var(--g2)", fontWeight: 700 }}>{o.id}</td>
                  <td><div style={{ fontWeight: 500 }}>{o.customerName}</div><div className="text-muted text-sm">{o.phone}</div></td>
                  <td>{o.dealer}</td>
                  <td className="text-muted">{o.date}</td>
                  <td style={{ fontWeight: 700, fontSize: 15 }}>{fmt(o.grandTotal)}</td>
                  <td>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} style={{ fontSize: 12, padding: "4px 8px", border: "1px solid var(--border)", borderRadius: 6 }}>
                      {["Pending","Processing","Shipped","Delivered","Cancelled"].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="btn btn-outline btn-sm" onClick={() => onViewInvoice(o)}>
                      <Icon d={Icons.invoice} size={13} />Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" style={{ maxWidth: 720 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Create New Order</div>
              <button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><Icon d={Icons.close} size={18} /></button>
            </div>
            <div className="modal-body">
              <div className="form-grid" style={{ marginBottom: 16 }}>
                <div className="form-group">
                  <label>Select Customer</label>
                  <select onChange={e => selectCustomer(e.target.value)}>
                    <option value="">Choose…</option>
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Customer Name</label><input value={form.customerName} onChange={e => setForm(f => ({...f,customerName:e.target.value}))} /></div>
                <div className="form-group"><label>Phone</label><input value={form.phone} onChange={e => setForm(f => ({...f,phone:e.target.value}))} /></div>
                <div className="form-group full"><label>Address</label><input value={form.address} onChange={e => setForm(f => ({...f,address:e.target.value}))} /></div>
                <div className="form-group">
                  <label>Dealer</label>
                  <select value={form.dealer} onChange={e => setForm(f => ({...f,dealer:e.target.value}))}>
                    <option value="">Select Dealer</option>
                    {dealers.map(d => <option key={d.id}>{d.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Payment Method</label>
                  <select value={form.paymentMethod} onChange={e => setForm(f => ({...f,paymentMethod:e.target.value}))}>
                    <option>Bank Transfer</option><option>Cash</option><option>bKash</option><option>Nagad</option>
                  </select>
                </div>
              </div>

              <div className="divider" />
              <div className="section-title" style={{ fontSize: 14 }}>Order Items</div>
              {form.items.map((it, i) => (
                <div className="form-grid" key={i} style={{ marginBottom: 10 }}>
                  <div className="form-group" style={{ gridColumn: "span 2" }}>
                    <label>Product</label>
                    <select value={it.productId} onChange={e => updateItem(i, "productId", e.target.value)}>
                      <option value="">Select Product</option>
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Qty</label>
                    <input type="number" min="1" value={it.qty} onChange={e => updateItem(i, "qty", +e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Price (৳)</label>
                    <input type="number" value={it.price} onChange={e => updateItem(i, "price", +e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Total</label>
                    <input readOnly value={it.total} style={{ background: "var(--bg)" }} />
                  </div>
                  {i > 0 && <div className="form-group" style={{ display: "flex", alignItems: "flex-end" }}>
                    <button className="btn btn-danger btn-sm" onClick={() => setForm(f => ({ ...f, items: f.items.filter((_,j) => j !== i) }))}>Remove</button>
                  </div>}
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" onClick={() => setForm(f => ({ ...f, items: [...f.items, { productId: "", name: "", qty: 1, price: 0, total: 0 }] }))}>
                <Icon d={Icons.plus} size={13} />Add Item
              </button>

              <div className="divider" />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ width: 260 }}>
                  {[["Subtotal", fmt(subtotal)],].map(([k,v]) => (
                    <div className="flex justify-between" style={{ marginBottom: 8 }} key={k}>
                      <span className="text-muted">{k}</span><strong>{v}</strong>
                    </div>
                  ))}
                  <div className="form-group"><label>Discount (৳)</label><input type="number" value={form.discount} onChange={e => setForm(f => ({...f,discount:+e.target.value}))} /></div>
                  <div className="form-group" style={{ marginTop: 8 }}><label>Delivery Charge (৳)</label><input type="number" value={form.deliveryCharge} onChange={e => setForm(f => ({...f,deliveryCharge:+e.target.value}))} /></div>
                  <div className="flex justify-between" style={{ marginTop: 12, padding: "10px 0", borderTop: "2px solid var(--g1)" }}>
                    <span style={{ fontWeight: 700 }}>Grand Total</span><strong style={{ color: "var(--g1)", fontSize: 18 }}>{fmt(grandTotal)}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitOrder}>Place Order</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INVOICE PAGE WITH LOGO ─────────────────────────────────────────────────────
// ─── INVOICE PAGE WITH LOGO ─────────────────────────────────────────────────────
// Replace the entire InvoicePage function in your App.js with this:

const WINX_LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAP6B7wDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIBQYCAwQBCf/EAFwQAQABAwIBBQYQCQkFBwUAAwABAgMEBREGBxIhMUEIEyJRYXEUFTI2N3J0gZGTobGys8HRFhcjQlJVYnWCJDNFU1aUtMLSGDRDleE1VGNzg5KiRGSF0/CEo8P/xAAcAQEAAwEBAQEBAAAAAAAAAAAABQYHBAMCAQj/xAA9EQEAAQMABAoIBQUBAQADAAAAAQIDBAUGETETIUFRYXGBobHREhQWIjSRweEVMlJTciMzNULwQ/EHF8L/2gAMAwEAAhEDEQA/AKZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==";

function InvoicePage({ order, onBack }) {
  if (!order) return null;
  const invoiceNum = order.id.replace("ORD-", "");

  return (
    <div>
      <div className="flex items-center gap-12" style={{ marginBottom: 20 }}>
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <div className="section-title" style={{ marginBottom: 0 }}>Invoice #{invoiceNum}</div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button className="btn btn-outline" onClick={() => window.print()}>
            <Icon d={Icons.print} size={15} />Print
          </button>
        </div>
      </div>

      <div className="card" style={{ maxWidth: 750, margin: "0 auto" }}>
        <div style={{ padding: "40px 48px" }}>
          {/* Header with Logo */}
          <div className="flex justify-between items-center" style={{ marginBottom: 28 }}>
            <div>
              <img
                src={WINX_LOGO}
                alt="WinX International"
                style={{
                  height: 70,
                  width: "auto",
                  objectFit: "contain",
                  backgroundColor: "#000",
                  borderRadius: 8,
                  padding: "6px 12px"
                }}
              />
              <div className="text-muted text-sm" style={{ marginTop: 6, paddingLeft: 4 }}>
                WINXINTBD.SHOP
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: "var(--g3)", letterSpacing: 3 }}>INVOICE</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>WINXINTBD.SHOP</div>
            </div>
          </div>

          <div style={{ height: 3, background: "linear-gradient(90deg,var(--g1),var(--g3))", borderRadius: 2, marginBottom: 28 }} />

          <div className="grid-2" style={{ marginBottom: 28 }}>
            <div>
              <div className="text-muted text-sm" style={{ marginBottom: 6 }}>Invoice to:</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{order.customerName}</div>
              <div className="font-mono" style={{ fontSize: 13, marginTop: 4 }}>{order.phone}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>{order.address}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Invoice no: {invoiceNum}</div>
              <div className="text-muted" style={{ fontSize: 13 }}>{order.date}</div>
            </div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 24 }}>
            <thead>
              <tr style={{ background: "var(--g3)" }}>
                {["NO","DESCRIPTION","QTY","PRICE","TOTAL"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", color: "#fff", fontWeight: 700, fontSize: 12, textAlign: h === "TOTAL" || h === "PRICE" || h === "QTY" ? "right" : "left", border: "none" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.items.map((it, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "var(--g4)" }}>
                  <td style={{ padding: "10px 14px", fontSize: 13 }}>{i + 1}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13 }}>{it.name}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, textAlign: "right" }}>{it.qty}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, textAlign: "right" }}>{it.price === 0 ? "free" : it.price}</td>
                  <td style={{ padding: "10px 14px", fontSize: 13, textAlign: "right", fontWeight: 600 }}>{it.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="grid-2">
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13, background: "var(--g1)", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>PAYMENT METHOD:</div>
              <div style={{ fontSize: 13 }}>Bank Name: WinX International</div>
              <div style={{ fontSize: 13 }}>Account Number: 20501110100436609</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="flex justify-between" style={{ marginBottom: 6 }}>
                <span className="text-muted">Sub Total:</span><strong>{order.subtotal}</strong>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between" style={{ marginBottom: 6 }}>
                  <span className="text-muted">Discount:</span><strong>- {order.discount}</strong>
                </div>
              )}
              {order.deliveryCharge > 0 && (
                <div className="flex justify-between" style={{ marginBottom: 6 }}>
                  <span className="text-muted">Delivery:</span><strong>{order.deliveryCharge}</strong>
                </div>
              )}
              <div style={{ borderTop: "2px solid var(--g1)", paddingTop: 8, marginTop: 8 }}>
                <div className="flex justify-between">
                  <span style={{ fontWeight: 700, background: "var(--g1)", color: "#fff", padding: "4px 10px", borderRadius: 6 }}>GRAND TOTAL:</span>
                  <strong style={{ fontSize: 20, color: "var(--g3)" }}>{order.grandTotal}</strong>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
            <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Thank you for business with us!</div>
            <div style={{ fontSize: 13 }}>
              <strong>Term and Conditions:</strong> Please send payment within 7 days of receiving this invoice.
            </div>
            <div style={{ textAlign: "right", marginTop: 16, fontWeight: 700 }}>
              Bellal Gazi<br />
              <span style={{ fontWeight: 400, color: "var(--muted)", fontSize: 13 }}>Sales Department</span>
            </div>
          </div>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", borderTop: "3px solid var(--g1)", paddingTop: 12 }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>📞 01580919593</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>✉ winxintbd@gmail.com</span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>📍 Sher E Bangla Sarak, Barishal</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DEALERS ────────────────────────────────────────────────────────────────────
function Dealers({ dealers, setDealers, orders }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", area: "", creditLimit: "", outstanding: "" });

  const save = () => {
    if (!form.name) return;
    const d = { ...form, creditLimit: +form.creditLimit, outstanding: +form.outstanding };
    if (editing) setDealers(ds => ds.map(x => x.id === editing ? { ...d, id: editing } : x));
    else setDealers(ds => [...ds, { ...d, id: genId("D") }]);
    setModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>Dealer Network</div>
        <button className="btn btn-primary" onClick={() => { setEditing(null); setForm({ name:"",phone:"",area:"",creditLimit:"",outstanding:"" }); setModal(true); }}><Icon d={Icons.plus} size={16} />Add Dealer</button>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Dealer Name</th><th>Phone</th><th>Area</th><th>Credit Limit</th><th>Outstanding</th><th>Available Credit</th><th>Actions</th></tr></thead>
            <tbody>
              {dealers.map(d => {
                const dealerOrders = orders.filter(o => o.dealer === d.name).reduce((a, o) => a + o.grandTotal, 0);
                return (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 600 }}>{d.name}</td>
                    <td className="font-mono">{d.phone}</td>
                    <td>{d.area}</td>
                    <td>{fmt(d.creditLimit)}</td>
                    <td style={{ color: "var(--orange)", fontWeight: 600 }}>{fmt(d.outstanding)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="progress-bar" style={{ width: 80 }}>
                          <div className="progress-fill" style={{ width: `${Math.min((d.outstanding / d.creditLimit) * 100, 100)}%`, background: d.outstanding / d.creditLimit > 0.7 ? "var(--red)" : undefined }} />
                        </div>
                        <span style={{ fontSize: 12 }}>{fmt(d.creditLimit - d.outstanding)}</span>
                      </div>
                    </td>
                    <td><div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm btn-icon" onClick={() => { setEditing(d.id); setForm(d); setModal(true); }}><Icon d={Icons.edit} size={14} /></button>
                      <button className="btn btn-danger btn-sm btn-icon" onClick={() => setDealers(ds => ds.filter(x => x.id !== d.id))}><Icon d={Icons.trash} size={14} /></button>
                    </div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">{editing ? "Edit" : "Add"} Dealer</div><button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><Icon d={Icons.close} size={18} /></button></div>
            <div className="modal-body">
              <div className="form-grid">
                {[["name","Dealer Name"],["phone","Phone"],["area","Area"],["creditLimit","Credit Limit (৳)"],["outstanding","Outstanding Balance (৳)"]].map(([k,l]) => (
                  <div className="form-group" key={k}><label>{l}</label><input value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} /></div>
                ))}
              </div>
            </div>
            <div className="modal-footer"><button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save Dealer</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INVENTORY ──────────────────────────────────────────────────────────────────
function Inventory({ products, setProducts, stockLog, setStockLog }) {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ productId: "", type: "IN", qty: "", note: "" });

  const save = () => {
    if (!form.productId || !form.qty) return;
    setStockLog(sl => [...sl, { id: Date.now(), ...form, qty: +form.qty, date: today() }]);
    setProducts(ps => ps.map(p => p.id === form.productId ? { ...p, stock: p.stock + (form.type === "IN" ? +form.qty : -+form.qty) } : p));
    setModal(false);
    setForm({ productId: "", type: "IN", qty: "", note: "" });
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: 16 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>Inventory Management</div>
        <button className="btn btn-primary" onClick={() => setModal(true)}><Icon d={Icons.plus} size={16} />Stock Adjustment</button>
      </div>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        {products.map(p => (
          <div className="card" key={p.id}>
            <div className="card-body">
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div className="font-mono text-muted text-sm">{p.sku}</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: p.stock < 50 ? "var(--red)" : "var(--g1)", margin: "12px 0 4px" }}>{p.stock}</div>
              <div className="text-muted text-sm">units in stock</div>
              <div className="progress-bar" style={{ marginTop: 8 }}>
                <div className="progress-fill" style={{ width: `${Math.min((p.stock/500)*100,100)}%`, background: p.stock<50?"var(--red)":undefined }} />
              </div>
              {p.stock < 50 && <div className="badge badge-red" style={{ marginTop: 8 }}>Low Stock</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Stock Transaction Log</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Product</th><th>Type</th><th>Qty</th><th>Note</th></tr></thead>
            <tbody>
              {stockLog.slice().reverse().map(l => {
                const p = products.find(x => x.id === l.productId);
                return (
                  <tr key={l.id}>
                    <td className="text-muted">{l.date}</td>
                    <td>{p?.name || l.productId}</td>
                    <td><span className={`badge ${l.type === "IN" ? "badge-green" : "badge-red"}`}>{l.type}</span></td>
                    <td style={{ fontWeight: 700, color: l.type === "IN" ? "var(--g1)" : "var(--red)" }}>{l.type === "IN" ? "+" : "-"}{l.qty}</td>
                    <td className="text-muted">{l.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Stock Adjustment</div><button className="btn btn-ghost btn-icon" onClick={() => setModal(false)}><Icon d={Icons.close} size={18} /></button></div>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group"><label>Product</label>
                  <select value={form.productId} onChange={e => setForm(f => ({...f,productId:e.target.value}))}>
                    <option value="">Select Product</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({...f,type:e.target.value}))}>
                    <option value="IN">Stock In</option><option value="OUT">Stock Out</option>
                  </select>
                </div>
                <div className="form-group"><label>Quantity</label><input type="number" value={form.qty} onChange={e => setForm(f => ({...f,qty:e.target.value}))} /></div>
                <div className="form-group full"><label>Note</label><input value={form.note} onChange={e => setForm(f => ({...f,note:e.target.value}))} /></div>
              </div>
            </div>
            <div className="modal-footer"><button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button><button className="btn btn-primary" onClick={save}>Save Adjustment</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DELIVERY ───────────────────────────────────────────────────────────────────
function Delivery({ orders, setOrders }) {
  const steps = ["Pending", "Packed", "Dispatched", "Delivered"];

  const update = (id, key, val) => setOrders(os => os.map(o => o.id === id ? { ...o, [key]: val } : o));

  return (
    <div>
      <div className="section-title">Delivery Tracking</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {orders.filter(o => o.status !== "Cancelled").map(o => {
          const stepIdx = steps.indexOf(o.deliveryStatus);
          return (
            <div className="card" key={o.id}>
              <div className="card-body">
                <div className="flex justify-between items-center" style={{ marginBottom: 14 }}>
                  <div>
                    <span className="font-mono" style={{ fontWeight: 700, color: "var(--g2)" }}>{o.id}</span>
                    <span style={{ marginLeft: 12, fontWeight: 500 }}>{o.customerName}</span>
                    <span className="text-muted text-sm" style={{ marginLeft: 8 }}>{o.address}</span>
                  </div>
                  <div style={{ fontWeight: 700 }}>{fmt(o.grandTotal)}</div>
                </div>

                <div className="order-timeline" style={{ marginBottom: 16 }}>
                  {steps.map((s, i) => (
                    <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                      <div className="timeline-step">
                        <div className={`timeline-dot ${i < stepIdx ? "done" : i === stepIdx ? "current" : "future"}`}>
                          {i < stepIdx ? "✓" : i + 1}
                        </div>
                        <div className="timeline-label">{s}</div>
                      </div>
                      {i < steps.length - 1 && <div className={`timeline-line ${i < stepIdx ? "done" : ""}`} style={{ flex: 1 }} />}
                    </div>
                  ))}
                </div>

                <div className="grid-3" style={{ gap: 10 }}>
                  <div className="form-group">
                    <label>Delivery Status</label>
                    <select value={o.deliveryStatus} onChange={e => update(o.id, "deliveryStatus", e.target.value)}>
                      {steps.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Courier Name</label>
                    <input value={o.courier} onChange={e => update(o.id, "courier", e.target.value)} placeholder="e.g. Sundarban Courier" />
                  </div>
                  <div className="form-group">
                    <label>Tracking Number</label>
                    <input value={o.trackingNo} onChange={e => update(o.id, "trackingNo", e.target.value)} className="font-mono" placeholder="e.g. SB20260312..." />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── REPORTS ────────────────────────────────────────────────────────────────────
function Reports({ orders, products, dealers }) {
  const [tab, setTab] = useState("daily");

  const total = orders.reduce((a, o) => a + o.grandTotal, 0);
  const delivered = orders.filter(o => o.status === "Delivered");
  const deliveredTotal = delivered.reduce((a, o) => a + o.grandTotal, 0);

  const dealerReport = dealers.map(d => {
    const dos = orders.filter(o => o.dealer === d.name);
    return { ...d, orders: dos.length, revenue: dos.reduce((a, o) => a + o.grandTotal, 0) };
  });

  const productReport = products.map(p => {
    const sold = orders.reduce((a, o) => {
      const it = o.items.find(i => i.productId === p.id);
      return a + (it ? it.qty : 0);
    }, 0);
    const revenue = orders.reduce((a, o) => {
      const it = o.items.find(i => i.productId === p.id);
      return a + (it ? it.total : 0);
    }, 0);
    return { ...p, sold, revenue };
  });

  return (
    <div>
      <div className="tabs" style={{ marginBottom: 20 }}>
        {[["daily","Daily"],["monthly","Monthly"],["products","Products"],["dealers","Dealers"]].map(([k,l]) => (
          <div key={k} className={`tab ${tab === k ? "active" : ""}`} onClick={() => setTab(k)}>{l} Report</div>
        ))}
      </div>

      {(tab === "daily" || tab === "monthly") && (
        <div>
          <div className="stats-grid">
            {[
              { label: "Total Revenue", val: fmt(total), icon: "reports", cls: "green", color: "var(--g1)" },
              { label: "Delivered Orders", val: fmt(deliveredTotal), icon: "delivery", cls: "blue", color: "#2b6cb0" },
              { label: "Total Orders", val: orders.length, icon: "orders", cls: "orange", color: "#dd6b20" },
              { label: "Avg Order Value", val: fmt(Math.round(total / orders.length)), icon: "invoice", cls: "purple", color: "#6b46c1" },
            ].map(s => (
              <div className="stat-card" key={s.label}>
                <div className={`stat-icon ${s.cls}`}><Icon d={Icons[s.icon]} size={20} color={s.color} /></div>
                <div><div className="stat-label">{s.label}</div><div className="stat-value">{s.val}</div></div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">Order Summary</span></div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id}>
                      <td className="font-mono" style={{ color: "var(--g2)" }}>{o.id}</td>
                      <td>{o.customerName}</td>
                      <td className="text-muted">{o.date}</td>
                      <td style={{ fontWeight: 700 }}>{fmt(o.grandTotal)}</td>
                      <td>{statusBadge(o.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "products" && (
        <div className="card">
          <div className="card-header"><span className="card-title">Product Sales Report</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Product</th><th>SKU</th><th>Units Sold</th><th>Revenue</th><th>Stock Left</th></tr></thead>
              <tbody>
                {productReport.map(p => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.name}</td>
                    <td className="font-mono text-muted">{p.sku}</td>
                    <td>{p.sold}</td>
                    <td style={{ fontWeight: 700, color: "var(--g1)" }}>{fmt(p.revenue)}</td>
                    <td><span style={{ color: p.stock < 50 ? "var(--red)" : "var(--g1)", fontWeight: 700 }}>{p.stock}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "dealers" && (
        <div className="card">
          <div className="card-header"><span className="card-title">Dealer Sales Report</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Dealer</th><th>Area</th><th>Orders</th><th>Revenue</th><th>Outstanding</th></tr></thead>
              <tbody>
                {dealerReport.map(d => (
                  <tr key={d.id}>
                    <td style={{ fontWeight: 600 }}>{d.name}</td>
                    <td>{d.area}</td>
                    <td>{d.orders}</td>
                    <td style={{ fontWeight: 700, color: "var(--g1)" }}>{fmt(d.revenue)}</td>
                    <td style={{ color: "var(--orange)", fontWeight: 600 }}>{fmt(d.outstanding)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WHATSAPP ───────────────────────────────────────────────────────────────────
function WhatsApp({ orders }) {
  const [sent, setSent] = useState({});
  const templates = [
    { id: "confirm", label: "Order Confirmed", msg: "আপনার WinX অর্ডার নিশ্চিত হয়েছে। আপনার অর্ডার প্রক্রিয়াধীন রয়েছে। ধন্যবাদ!" },
    { id: "shipped", label: "Order Shipped", msg: "আপনার WinX অর্ডার শিপ করা হয়েছে। শীঘ্রই আপনার কাছে পৌঁছাবে।" },
    { id: "delivered", label: "Delivered", msg: "আপনার WinX অর্ডার সফলভাবে ডেলিভারি হয়েছে। ব্যবসা করার জন্য ধন্যবাদ!" },
  ];
  const [template, setTemplate] = useState(templates[0]);

  const send = (order) => {
    const msg = encodeURIComponent(`Dear ${order.customerName},\n\n${template.msg}\n\nOrder: ${order.id}\nAmount: ৳${order.grandTotal}\n\n- WinX International\n📞 01580919593`);
    window.open(`https://wa.me/+88${order.phone}?text=${msg}`, "_blank");
    setSent(s => ({ ...s, [order.id]: true }));
  };

  return (
    <div>
      <div className="whatsapp-card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Icon d={Icons.whatsapp} size={28} color="#fff" />
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>WhatsApp Automation</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>Send instant messages to customers</div>
          </div>
        </div>
        <div className="wa-message">
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Message Template:</div>
          <div style={{ fontSize: 13 }}>Thank you for ordering WinX. Your order is being processed. — WinX International</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-body">
          <div className="section-title" style={{ fontSize: 14, marginBottom: 12 }}>Select Template</div>
          <div style={{ display: "flex", gap: 8 }}>
            {templates.map(t => (
              <button key={t.id} className={`btn ${template.id === t.id ? "btn-primary" : "btn-ghost"}`} onClick={() => setTemplate(t)}>{t.label}</button>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: 12, background: "var(--g4)", borderRadius: 8, fontSize: 13 }}>{template.msg}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Send Messages to Customers</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Customer</th><th>Phone</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td className="font-mono" style={{ color: "var(--g2)" }}>{o.id}</td>
                  <td>{o.customerName}</td>
                  <td className="font-mono">{o.phone}</td>
                  <td>{statusBadge(o.status)}</td>
                  <td>
                    <button className={`btn btn-sm ${sent[o.id] ? "btn-ghost" : "btn-primary"}`} onClick={() => send(o)} style={sent[o.id] ? { background: "#e8f7ef", color: "var(--g1)" } : { background: "#25d366" }}>
                      <Icon d={Icons.whatsapp} size={13} />
                      {sent[o.id] ? "Sent ✓" : "Send WhatsApp"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── ROLES ──────────────────────────────────────────────────────────────────────
function Roles() {
  const roles = [
    { name: "Admin", color: "var(--g1)", desc: "Full system access", perms: ["Dashboard","Customers","Products","Orders","Dealers","Inventory","Delivery","Reports","WhatsApp","User Roles"] },
    { name: "Salesman", color: "#2b6cb0", desc: "Sales & order management", perms: ["Dashboard","Customers","Orders","Delivery"] },
    { name: "Dealer", color: "#6b46c1", desc: "Order placement only", perms: ["Orders (own only)"] },
  ];

  return (
    <div>
      <div className="section-title">User Roles & Permissions</div>
      <div className="grid-3">
        {roles.map(r => (
          <div className="card" key={r.name}>
            <div className="card-body">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: r.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon d={Icons.user} size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{r.name}</div>
                  <div className="text-muted text-sm">{r.desc}</div>
                </div>
              </div>
              <div className="divider" />
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Module Access:</div>
              {r.perms.map(p => (
                <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, fontSize: 13 }}>
                  <Icon d={Icons.check} size={14} color={r.color} stroke={2.5} />{p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-16">
        <div className="card-header"><span className="card-title">Team Members</span></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Role</th><th>Module Access</th><th>Status</th></tr></thead>
            <tbody>
              {[
                { name: "Bellal Gazi", role: "Admin", modules: "All Modules", status: "Active" },
                { name: "Rahim Sales", role: "Salesman", modules: "Dashboard, Orders, Customers, Delivery", status: "Active" },
                { name: "City Store Portal", role: "Dealer", modules: "Orders (own)", status: "Active" },
              ].map(u => (
                <tr key={u.name}>
                  <td><div className="flex items-center gap-8"><div className="avatar">{u.name[0]}</div>{u.name}</div></td>
                  <td><span className="badge badge-green">{u.role}</span></td>
                  <td className="text-muted text-sm">{u.modules}</td>
                  <td><span className="badge badge-green">{u.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
