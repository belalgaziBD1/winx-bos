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
                  display: "block"
                }}
              />
              
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: "var(--g3)", letterSpacing: 4 }}>INVOICE</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>winxintbd.shop</div>
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
                  <th key={h} style={{ padding: "10px 14px", color: "#000", fontWeight: 700, fontSize: 12, textAlign: h === "TOTAL" || h === "PRICE" || h === "QTY" ? "right" : "left", border: "none" }}>{h}</th>
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
