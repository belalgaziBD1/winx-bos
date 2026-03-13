import { useState } from "react";

const WINX_LOGO_IMG = "data:image/jpeg;base64,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";

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
const deliveryBadge = (s) => {
  const map = { Pending: "badge-gray", Packed: "badge-orange", Dispatched: "badge-blue", Delivered: "badge-green" };
  return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
};

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

// ─── INVOICE PAGE ─────────────────────────────────────────────────────────────
function InvoicePage({ order, onBack }) {
  if (!order) return null;
  const invoiceNum = order.id.replace("ORD-", "");
  return (
    <div>
      <div className="flex items-center gap-12" style={{ marginBottom: 20 }}>
        <button className="btn btn-ghost" onClick={onBack}>← Back</button>
        <div className="section-title" style={{ marginBottom: 0 }}>Invoice #{invoiceNum}</div>
        <div style={{ marginLeft: "auto" }}>
          <button className="btn btn-outline" onClick={() => window.print()}><Icon d={Icons.print} size={15} />Print</button>
        </div>
      </div>
      <div className="card" style={{ maxWidth: 750, margin: "0 auto" }}>
        <div style={{ padding: "40px 48px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28 }}>
            <div>
              <img src={WINX_LOGO_IMG} alt="WinX International" style={{ height:90, width:"auto", objectFit:"contain", display:"block" }} />
              
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:38, fontWeight:900, color:"var(--g3)", letterSpacing:4 }}>INVOICE</div>
              <div style={{ color:"var(--muted)", fontSize:13 }}>winxbd.shop</div>
            </div>
          </div>
          <div style={{ height:3, background:"linear-gradient(90deg,var(--g1),var(--g3))", borderRadius:2, marginBottom:28 }} />
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:28 }}>
            <div>
              <div style={{ color:"var(--muted)", fontSize:12, marginBottom:6 }}>Invoice to:</div>
              <div style={{ fontWeight:800, fontSize:18 }}>{order.customerName}</div>
              <div style={{ fontFamily:"monospace", fontSize:13, marginTop:4 }}>{order.phone}</div>
              <div style={{ color:"var(--muted)", fontSize:13 }}>{order.address}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:800, fontSize:16 }}>Invoice no: {invoiceNum}</div>
              <div style={{ color:"var(--muted)", fontSize:13 }}>{order.date}</div>
            </div>
          </div>
          <table style={{ width:"100%", borderCollapse:"collapse", marginBottom:24 }}>
            <thead>
              <tr style={{ background:"var(--g3)" }}>
                {["NO","DESCRIPTION","QTY","PRICE","TOTAL"].map(h => (
                  <th key={h} style={{ padding:"10px 14px", color:"#000", fontWeight:700, fontSize:12, textAlign:h==="TOTAL"||h==="PRICE"||h==="QTY"?"right":"left", border:"none" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {order.items.map((it, i) => (
                <tr key={i} style={{ background:i%2===0?"#fff":"var(--g4)" }}>
                  <td style={{ padding:"10px 14px", fontSize:13 }}>{i+1}</td>
                  <td style={{ padding:"10px 14px", fontSize:13 }}>{it.name}</td>
                  <td style={{ padding:"10px 14px", fontSize:13, textAlign:"right" }}>{it.qty}</td>
                  <td style={{ padding:"10px 14px", fontSize:13, textAlign:"right" }}>{it.price===0?"free":it.price}</td>
                  <td style={{ padding:"10px 14px", fontSize:13, textAlign:"right", fontWeight:600 }}>{it.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <div>
              <div style={{ fontWeight:700, marginBottom:8, fontSize:13, background:"var(--g1)", color:"#fff", padding:"6px 10px", borderRadius:6 }}>PAYMENT METHOD:</div>
              <div style={{ fontSize:13 }}>Bank Name: WinX International</div>
              <div style={{ fontSize:13 }}>Account Number: 20501110100436609</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ color:"var(--muted)" }}>Sub Total:</span><strong>{order.subtotal}</strong>
              </div>
              {order.discount > 0 && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ color:"var(--muted)" }}>Discount:</span><strong>- {order.discount}</strong></div>}
              {order.deliveryCharge > 0 && <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ color:"var(--muted)" }}>Delivery:</span><strong>{order.deliveryCharge}</strong></div>}
              <div style={{ borderTop:"2px solid var(--g1)", paddingTop:8, marginTop:8 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span style={{ fontWeight:700, background:"var(--g1)", color:"#fff", padding:"4px 10px", borderRadius:6 }}>GRAND TOTAL:</span>
                  <strong style={{ fontSize:20, color:"var(--g3)" }}>{order.grandTotal}</strong>
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginTop:32, borderTop:"1px solid var(--border)", paddingTop:20 }}>
            <div style={{ fontWeight:800, fontSize:15, marginBottom:4 }}>Thank you for business with us!</div>
            <div style={{ fontSize:13 }}><strong>Term and Conditions:</strong> Please send payment within 7 days of receiving this invoice.</div>
            <div style={{ textAlign:"right", marginTop:16, fontWeight:700 }}>Bellal Gazi<br /><span style={{ fontWeight:400, color:"var(--muted)", fontSize:13 }}>Sales Department</span></div>
          </div>
          <div style={{ marginTop:24, display:"flex", justifyContent:"space-between", borderTop:"3px solid var(--g1)", paddingTop:12 }}>
            <span style={{ fontSize:12, color:"var(--muted)" }}>📞 01580919593</span>
            <span style={{ fontSize:12, color:"var(--muted)" }}>✉ winxintbd@gmail.com</span>
            <span style={{ fontSize:12, color:"var(--muted)" }}>📍 Sher E Bangla Sarak, Barishal</span>
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

// ─── USERS ────────────────────────────────────────────────────────────────────
const USERS = [
  { id:1, name:"Bellal Gazi",  username:"admin",    password:"winx1234",  role:"Admin",    avatar:"BG" },
  { id:2, name:"Rahim Sales",  username:"salesman", password:"sales123",  role:"Salesman", avatar:"RS" },
  { id:3, name:"City Store",   username:"dealer",   password:"dealer123", role:"Dealer",   avatar:"CS" },
];

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    if (!username || !password) { setError("Username ও Password দিন"); return; }
    setLoading(true); setError("");
    setTimeout(() => {
      const user = USERS.find(u => u.username === username && u.password === password);
      if (user) { onLogin(user); }
      else { setError("Username বা Password ভুল!"); setLoading(false); }
    }, 700);
  };
  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#005229,#007a3d,#00a651)", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"sans-serif", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:"rgba(255,255,255,0.04)", top:-100, right:-100 }} />
      <div style={{ position:"absolute", width:250, height:250, borderRadius:"50%", background:"rgba(255,255,255,0.05)", bottom:-60, left:-60 }} />
      <div style={{ background:"#fff", borderRadius:20, padding:"44px 40px", width:"100%", maxWidth:420, boxShadow:"0 25px 60px rgba(0,0,0,0.3)", position:"relative", zIndex:1 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <img src={WINX_LOGO_IMG} alt="WinX International" style={{ height:70, width:"auto", objectFit:"contain", marginBottom:10 }} />
          <div style={{ fontSize:13, fontWeight:700, color:"#007a3d", letterSpacing:2, textTransform:"uppercase" }}>Business Operating System</div>
          <div style={{ fontSize:11, color:"#9bbdaa", marginTop:3 }}>WINXINTBD.SHOP</div>
        </div>
        <div style={{ height:2, background:"linear-gradient(90deg,#00a651,#005229)", borderRadius:2, marginBottom:24 }} />
        <div style={{ fontSize:18, fontWeight:800, color:"#1a2e22", marginBottom:4 }}>স্বাগতম! 👋</div>
        <div style={{ fontSize:13, color:"#6b8c77", marginBottom:20 }}>আপনার অ্যাকাউন্টে লগইন করুন</div>
        {error && <div style={{ background:"#fff0f0", border:"1px solid #fed7d7", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#c53030", marginBottom:14 }}>⚠️ {error}</div>}
        <div style={{ marginBottom:14 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#6b8c77", display:"block", marginBottom:5 }}>USERNAME</label>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>👤</span>
            <input type="text" placeholder="Username লিখুন" value={username}
              onChange={e => setUsername(e.target.value)} onKeyDown={e => e.key==="Enter" && handleLogin()}
              style={{ width:"100%", padding:"11px 12px 11px 36px", border:"1.5px solid #e2ede8", borderRadius:10, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
          </div>
        </div>
        <div style={{ marginBottom:22 }}>
          <label style={{ fontSize:12, fontWeight:700, color:"#6b8c77", display:"block", marginBottom:5 }}>PASSWORD</label>
          <div style={{ position:"relative" }}>
            <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}>🔒</span>
            <input type={showPass?"text":"password"} placeholder="Password লিখুন" value={password}
              onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key==="Enter" && handleLogin()}
              style={{ width:"100%", padding:"11px 36px 11px 36px", border:"1.5px solid #e2ede8", borderRadius:10, fontSize:14, fontFamily:"inherit", outline:"none", boxSizing:"border-box" }} />
            <span onClick={() => setShowPass(!showPass)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", cursor:"pointer" }}>{showPass?"🙈":"👁️"}</span>
          </div>
        </div>
        <button onClick={handleLogin} disabled={loading}
          style={{ width:"100%", padding:14, background:loading?"#9bbdaa":"linear-gradient(135deg,#00a651,#005229)", color:"#fff", border:"none", borderRadius:10, fontSize:15, fontWeight:700, cursor:loading?"not-allowed":"pointer", fontFamily:"inherit" }}>
          {loading?"⏳ লগইন হচ্ছে...":"🚀 লগইন করুন"}
        </button>
        <div style={{ marginTop:20, background:"#f0f4f2", borderRadius:10, padding:"14px 16px" }}>
          <div style={{ fontSize:11, fontWeight:700, color:"#6b8c77", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Demo Accounts — ক্লিক করুন</div>
          {USERS.map(u => (
            <div key={u.id} onClick={() => { setUsername(u.username); setPassword(u.password); setError(""); }}
              style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 10px", borderRadius:8, marginBottom:6, cursor:"pointer", background:"#fff", border:"1px solid #e2ede8" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:"#00a651", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }}>{u.avatar}</div>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#1a2e22" }}>{u.name}</div>
                  <div style={{ fontSize:11, color:"#9bbdaa" }}>{u.username} / {u.password}</div>
                </div>
              </div>
              <span style={{ fontSize:10, background:"#e8f7ef", color:"#007a3d", padding:"2px 8px", borderRadius:20, fontWeight:600 }}>{u.role}</span>
            </div>
          ))}
        </div>
        <div style={{ textAlign:"center", marginTop:18, fontSize:11, color:"#9bbdaa" }}>© 2026 WinX International</div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [dealers, setDealers] = useState(INITIAL_DEALERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [stockLog, setStockLog] = useState(STOCK_LOG);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  if (!currentUser) return <LoginPage onLogin={(user) => { setCurrentUser(user); setPage("dashboard"); }} />;

  const role = currentUser.role;
  const nav = [
    { id:"dashboard", label:"Dashboard",  icon:"dashboard",  section:"OVERVIEW",   roles:["Admin","Salesman"] },
    { id:"customers", label:"Customers",  icon:"customers",  section:"MANAGEMENT", roles:["Admin","Salesman"] },
    { id:"products",  label:"Products",   icon:"products",                          roles:["Admin"] },
    { id:"orders",    label:"Orders",     icon:"orders",                            roles:["Admin","Salesman","Dealer"] },
    { id:"dealers",   label:"Dealers",    icon:"dealers",                           roles:["Admin"] },
    { id:"inventory", label:"Inventory",  icon:"inventory",  section:"OPERATIONS", roles:["Admin"] },
    { id:"delivery",  label:"Delivery",   icon:"delivery",                          roles:["Admin","Salesman"] },
    { id:"reports",   label:"Reports",    icon:"reports",    section:"ANALYTICS",  roles:["Admin"] },
    { id:"whatsapp",  label:"WhatsApp",   icon:"whatsapp",                          roles:["Admin"] },
    { id:"roles",     label:"User Roles", icon:"roles",      section:"SETTINGS",   roles:["Admin"] },
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
            <div className="nav-item" onClick={() => { setCurrentUser(null); setPage("dashboard"); }} style={{ color:"#ff8080" }}>
              <Icon d={Icons.logout} size={18} color="#ff8080" />
              {!collapsed && <span className="nav-label" style={{ color:"#ff8080" }}>Logout</span>}
            </div>
          </div>
        </div>
        <div className="main">
          <div className="topbar">
            <div className="topbar-left">
              <div className="page-title">{nav.find(n => n.id === page)?.label || "WinX BOS"}</div>
            </div>
            <div className="topbar-right">
              <div className="topbar-icon" style={{ position:"relative" }}>
                <Icon d={Icons.bell} size={20} />
                <div className="notification-dot" />
              </div>
              <div className="flex items-center gap-8">
                <div className="avatar">{currentUser.avatar}</div>
                <div style={{ fontSize:12 }}>
                  <div style={{ fontWeight:700 }}>{currentUser.name}</div>
                  <div style={{ color:"var(--muted)" }}>{currentUser.role}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="content">
            {page === "dashboard" && <Dashboard {...pageProps} />}
            {page === "customers" && <Customers {...pageProps} />}
            {page === "products"  && <Products  {...pageProps} />}
            {page === "orders"    && <Orders    {...pageProps} />}
            {page === "dealers"   && <Dealers   {...pageProps} />}
            {page === "inventory" && <Inventory {...pageProps} />}
            {page === "delivery"  && <Delivery  {...pageProps} />}
            {page === "reports"   && <Reports   {...pageProps} />}
            {page === "whatsapp"  && <WhatsApp  {...pageProps} />}
            {page === "roles"     && <Roles />}
            {page === "invoice"   && <InvoicePage order={invoiceOrder} onBack={() => setPage("orders")} />}
          </div>
        </div>
      </div>
    </>
  );
}
