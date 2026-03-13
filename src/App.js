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
// ─── REPLACE the entire InvoicePage section in App.js with this ───

const WINX_LOGO = "data:image/jpeg;base64,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";

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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div>
              <img
                src={WINX_LOGO}
                alt="WinX International"
                style={{
                  height: 120,
                  width: "auto",
                  objectFit: "contain",
                  background: "#ffffff",
                  display: "block"
                }}
              />
              <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 4 }}>WINXINTBD.SHOP</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: "var(--g3)", letterSpacing: 4 }}>INVOICE</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>WINXINTBD.SHOP</div>
            </div>
          </div>

          <div style={{ height: 3, background: "linear-gradient(90deg,var(--g1),var(--g3))", borderRadius: 2, marginBottom: 28 }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
            <div>
              <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 6 }}>Invoice to:</div>
              <div style={{ fontWeight: 800, fontSize: 18 }}>{order.customerName}</div>
              <div style={{ fontFamily: "monospace", fontSize: 13, marginTop: 4 }}>{order.phone}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{order.address}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Invoice no: {invoiceNum}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{order.date}</div>
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 13, background: "var(--g1)", color: "#fff", padding: "6px 10px", borderRadius: 6 }}>PAYMENT METHOD:</div>
              <div style={{ fontSize: 13 }}>Bank Name: WinX International</div>
              <div style={{ fontSize: 13 }}>Account Number: 20501110100436609</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "var(--muted)" }}>Sub Total:</span><strong>{order.subtotal}</strong>
              </div>
              {order.discount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "var(--muted)" }}>Discount:</span><strong>- {order.discount}</strong>
                </div>
              )}
              {order.deliveryCharge > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: "var(--muted)" }}>Delivery:</span><strong>{order.deliveryCharge}</strong>
                </div>
              )}
              <div style={{ borderTop: "2px solid var(--g1)", paddingTop: 8, marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
