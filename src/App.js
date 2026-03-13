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
// Replace the entire InvoicePage function in your App.js with this:
// Replace the entire InvoicePage function in your App.js with this:

const WINX_LOGO = "data:image/jpeg;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//2Q==";

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

          {/* Header with Big White BG Logo */}
          <div className="flex justify-between items-center" style={{ marginBottom: 28 }}>
            <div>
              <img
                src={WINX_LOGO}
                alt="WinX International"
                style={{
                  height: 90,
                  width: "auto",
                  objectFit: "contain",
                  background: "#ffffff",
                  borderRadius: 10,
                  padding: "8px 16px",
                  border: "1px solid #e2ede8",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
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
