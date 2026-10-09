import React, { useState, useEffect } from 'react';
import { UserRole, TabType, BillingItem, PaymentRecord, MaintenanceRecord, ThemeMode, FontScale } from './types/fleet';
import { 
  INITIAL_DRIVER, 
  INITIAL_VEHICLE, 
  INITIAL_BILLING_ITEMS, 
  INITIAL_PAYMENTS, 
  INITIAL_CONVERSATIONS,
  INITIAL_MAINTENANCE_RECORDS
} from './data/mockData';

// Components & Modals
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { MobileDrawer } from './components/MobileDrawer';
import { BillingItemModal } from './components/BillingItemModal';
import { PaymentModal } from './components/PaymentModal';
import { QuickControlModal } from './components/QuickControlModal';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { BroadcastModal } from './components/BroadcastModal';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { GpsTelemetryScreen } from './screens/GpsTelemetryScreen';
import { MessagesTelemetryScreen } from './screens/MessagesTelemetryScreen';
import { SettlementBillingScreen } from './screens/SettlementBillingScreen';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { DriverProfileScreen } from './screens/DriverProfileScreen';
import { LoginScreen } from './screens/LoginScreen';
import { PerformanceDashboardScreen } from './screens/PerformanceDashboardScreen';
import { MaintenanceLogScreen } from './screens/MaintenanceLogScreen';

import { 
  CheckCircle2, 
  Bell, 
  X, 
  Radio, 
  Car, 
  ShieldCheck, 
  CreditCard,
  LogOut,
  Maximize2,
  Smartphone
} from 'lucide-react';

export default function App() {
  // App state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentRole, setCurrentRole] = useState<UserRole>('chofer');
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Theme & Accessibility Font Scale state with localStorage persistence
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('derentas_theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [fontScale, setFontScale] = useState<FontScale>(() => {
    try {
      const saved = localStorage.getItem('derentas_font_scale');
      return (saved === 'large' || saved === 'xlarge') ? saved : 'normal';
    } catch {
      return 'normal';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('derentas_theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      document.documentElement.setAttribute('data-theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('derentas_font_scale', fontScale);
      document.documentElement.setAttribute('data-font-scale', fontScale);
    } catch {
      // ignore
    }
  }, [fontScale]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    showToast(nextTheme === 'dark' ? 'Modo Oscuro activado (visión nocturna)' : 'Modo Claro activado');
  };

  const handleChangeFontScale = (scale: FontScale) => {
    setFontScale(scale);
    const labels: Record<FontScale, string> = {
      normal: 'Texto estándar (100%)',
      large: 'Texto confortable en auto (+15%)',
      xlarge: 'Texto grande de alta visibilidad (+30%)',
    };
    showToast(`Accesibilidad: ${labels[scale]}`);
  };

  // Domain data
  const [billingItems, setBillingItems] = useState<BillingItem[]>(INITIAL_BILLING_ITEMS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [vehicle, setVehicle] = useState(INITIAL_VEHICLE);
  const [driver, setDriver] = useState(INITIAL_DRIVER);
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE_RECORDS);

  // Modals state
  const [isBillingModalOpen, setIsBillingModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<BillingItem | null>(null);

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isQuickControlOpen, setIsQuickControlOpen] = useState<boolean>(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState<boolean>(false);

  const [docViewer, setDocViewer] = useState<{
    isOpen: boolean;
    title: string;
    subtitle: string;
    docType: 'cedula_frente' | 'cedula_dorso' | 'seguro' | 'contrato' | 'vtv' | 'recibo';
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
    docType: 'cedula_frente',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations for settlement
  const currentTotal = billingItems.reduce((acc, it) => {
    return it.type === 'cargo' ? acc + it.amount : acc - it.amount;
  }, 0);

  const totalPaid = payments.reduce((acc, p) => acc + p.amount, 0);
  const pendingAmount = Math.max(0, currentTotal - totalPaid);

  // Modal Handlers
  const handleSaveBillingItem = (savedItem: BillingItem) => {
    if (editingItem) {
      setBillingItems((prev) =>
        prev.map((item) => (item.id === savedItem.id ? savedItem : item))
      );
      showToast(`Ítem "${savedItem.concept.slice(0, 24)}..." actualizado.`);
    } else {
      setBillingItems((prev) => [savedItem, ...prev]);
      showToast(`Nuevo ítem añadido a la liquidación: $${savedItem.amount.toLocaleString('es-AR')} ARS`);
    }
    setEditingItem(null);
  };

  const handleDeleteBillingItem = (id: string) => {
    setBillingItems((prev) => prev.filter((it) => it.id !== id));
    showToast('Ítem eliminado de la liquidación.');
    setEditingItem(null);
  };

  const handleRegisterPayment = (newPayment: PaymentRecord) => {
    setPayments((prev) => [newPayment, ...prev]);
    showToast(`Pago de $${newPayment.amount.toLocaleString('es-AR')} ARS imputado.`);
  };

  const handleSendBroadcast = (template: string, message: string, urgency: string) => {
    showToast(`Difusión masiva enviada a 64 unidades (${urgency}).`);
  };

  const handleAddMaintenanceRecord = (record: MaintenanceRecord) => {
    setMaintenanceRecords((prev) => [record, ...prev]);
    showToast(`Mantenimiento registrado para ${record.vehiclePlate}: $${record.costARS.toLocaleString('es-AR')} ARS`);
  };

  const handleUpdateMaintenanceRecord = (record: MaintenanceRecord) => {
    setMaintenanceRecords((prev) =>
      prev.map((r) => (r.id === record.id ? record : r))
    );
    showToast(`Mantenimiento actualizado para ${record.vehiclePlate}.`);
  };

  const handleDeleteMaintenanceRecord = (id: string) => {
    setMaintenanceRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Registro de taller eliminado.');
  };

  const handleOpenDocViewer = (
    title: string,
    subtitle: string,
    docType: 'cedula_frente' | 'cedula_dorso' | 'seguro' | 'contrato' | 'vtv' | 'recibo'
  ) => {
    setDocViewer({
      isOpen: true,
      title,
      subtitle,
      docType,
    });
  };

  // If user signed out, show Login Screen
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLoginSuccess={(role) => {
          setCurrentRole(role);
          setIsLoggedIn(true);
          showToast(`Sesión iniciada como ${role === 'admin' ? 'Administrador de Flota' : 'Chofer Marcos Gómez'}`);
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-[#F6C300] selection:text-slate-950 flex flex-col transition-colors duration-250 ${
      theme === 'dark' ? 'bg-[#0b1120] text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-amber-400/30 animate-in fade-in slide-in-from-top duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#F6C300]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top App Navbar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(r) => {
          setCurrentRole(r);
          showToast(`Vista cambiada a: ${r === 'admin' ? 'Modo Administrador' : 'Modo Chofer'}`);
        }}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenQuickControl={() => setIsQuickControlOpen(true)}
        isMobileView={isMobileView}
        onToggleMobileView={() => setIsMobileView(!isMobileView)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadNotifications={3}
        onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        fontScale={fontScale}
        onChangeFontScale={handleChangeFontScale}
      />

      {/* Perspective / Demo Banner bar */}
      <div className={`${theme === 'dark' ? 'bg-slate-950 border-b border-slate-800' : 'bg-slate-900'} text-white text-xs py-1.5 px-3 sm:px-4 transition-colors`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-[#F6C300] shrink-0" />
            <span className="font-semibold text-slate-300 truncate text-[11px] sm:text-xs">
              {currentRole === 'admin' 
                ? 'Panel de Flota: Gestión de telemetría GPS, ítems de cobro y difusiones.'
                : 'Panel de Chofer: Inicio, liquidación semanal, telemetría y cédula oficial.'}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setEditingItem(null);
                setIsBillingModalOpen(true);
              }}
              className="text-[#F6C300] hover:underline font-bold text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <span>+ Nuevo Ítem</span>
            </button>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-slate-400 hover:text-white font-medium text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER (Mobile-first priority: edge-to-edge on mobile with safe padding) */}
      <main className="flex-1 flex justify-center py-3 sm:py-5 px-2.5 sm:px-4 overflow-x-hidden">
        <div className={`w-full transition-all duration-300 ${
          isMobileView 
            ? `max-w-md ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200/80'} rounded-3xl shadow-xl border p-3 sm:p-4 min-h-[88vh]` 
            : 'max-w-xl sm:max-w-4xl'
        }`}>

          {/* ACTIVE TAB ROUTING */}
          {activeTab === 'inicio' && (
            <HomeScreen
              driver={driver}
              vehicle={vehicle}
              pendingBalance={pendingAmount}
              totalInvoiced={currentTotal}
              onNavigate={setActiveTab}
              onOpenQuickControl={() => setIsQuickControlOpen(true)}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              onOpenAddItemModal={() => {
                setEditingItem(null);
                setIsBillingModalOpen(true);
              }}
              currentRole={currentRole}
              maintenanceAlertsCount={maintenanceRecords.filter(m => m.status === 'overdue' || m.status === 'due_soon').length}
              theme={theme}
              onToggleTheme={handleToggleTheme}
              fontScale={fontScale}
              onChangeFontScale={handleChangeFontScale}
            />
          )}

          {activeTab === 'gps' && (
            <GpsTelemetryScreen
              vehicle={vehicle}
              driver={driver}
              onOpenQuickControl={() => setIsQuickControlOpen(true)}
              onOpenChat={() => setActiveTab('mensajes')}
            />
          )}

          {activeTab === 'mensajes' && (
            <MessagesTelemetryScreen
              conversations={conversations}
              onOpenBroadcastModal={() => setIsBroadcastModalOpen(true)}
              onSelectVehicleLocation={() => setActiveTab('gps')}
              onOpenDriverDocuments={() => setActiveTab('documentos')}
            />
          )}

          {activeTab === 'liquidacion' && (
            <SettlementBillingScreen
              billingItems={billingItems}
              payments={payments}
              onOpenAddItemModal={() => {
                setEditingItem(null);
                setIsBillingModalOpen(true);
              }}
              onOpenEditItemModal={(item) => {
                setEditingItem(item);
                setIsBillingModalOpen(true);
              }}
              onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
              onOpenSupport={() => setActiveTab('mensajes')}
              driverName={driver.name}
              vehicleModel={vehicle.model}
              plate={vehicle.plate}
            />
          )}

          {activeTab === 'documentos' && (
            <DocumentsScreen
              vehicle={vehicle}
              onOpenQuickControl={() => setIsQuickControlOpen(true)}
              onViewDoc={handleOpenDocViewer}
              onCallAssistance={() => alert('Conectando con la Mesa de Guardia Legal 24/7 DeRentas: 0800-333-8080')}
            />
          )}

          {activeTab === 'perfil' && (
            <DriverProfileScreen
              driver={driver}
              vehicle={vehicle}
              onOpenSettlement={() => setActiveTab('liquidacion')}
              onOpenDocuments={() => setActiveTab('documentos')}
              onOpenChat={() => setActiveTab('mensajes')}
              onOpenIncidence={() => {
                setActiveTab('mensajes');
                showToast('Canal de incidencias técnicas abierto.');
              }}
            />
          )}

          {activeTab === 'rendimiento' && (
            <PerformanceDashboardScreen />
          )}

          {activeTab === 'mantenimiento' && (
            <MaintenanceLogScreen
              records={maintenanceRecords}
              onAddRecord={handleAddMaintenanceRecord}
              onUpdateRecord={handleUpdateMaintenanceRecord}
              onDeleteRecord={handleDeleteMaintenanceRecord}
              onOpenQuickControl={() => setIsQuickControlOpen(true)}
            />
          )}

        </div>
      </main>

      {/* MOBILE DRAWER (HAMBURGER MENU) */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        activeTab={activeTab}
        onNavigate={setActiveTab}
        currentRole={currentRole}
        onRoleChange={(r) => {
          setCurrentRole(r);
          showToast(`Rol actualizado a: ${r === 'admin' ? 'Administrador' : 'Chofer'}`);
        }}
        driver={driver}
        vehicle={vehicle}
        onOpenQuickControl={() => setIsQuickControlOpen(true)}
        onOpenAddItemModal={() => {
          setEditingItem(null);
          setIsBillingModalOpen(true);
        }}
        onSignOut={() => setIsLoggedIn(false)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        fontScale={fontScale}
        onChangeFontScale={handleChangeFontScale}
      />

      {/* FIXED BOTTOM NAVIGATION BAR (Thumb zone on mobile) */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        unreadMessagesCount={3}
        theme={theme}
      />

      {/* ======================================================== */}
      {/* MODALS */}
      {/* ======================================================== */}

      {/* 1. Core Feature: BillingItemModal (Elevated from user's provided HTML code) */}
      <BillingItemModal
        isOpen={isBillingModalOpen}
        onClose={() => {
          setIsBillingModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveBillingItem}
        onDelete={handleDeleteBillingItem}
        initialItem={editingItem}
        currentTotal={currentTotal}
      />

      {/* 2. Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSubmit={handleRegisterPayment}
        pendingAmount={pendingAmount}
      />

      {/* 3. Quick Control Retén Police Modal */}
      <QuickControlModal
        isOpen={isQuickControlOpen}
        onClose={() => setIsQuickControlOpen(false)}
        vehicle={vehicle}
        driver={driver}
      />

      {/* 4. Broadcast Modal */}
      <BroadcastModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        onSendBroadcast={handleSendBroadcast}
        activeVehiclesCount={64}
      />

      {/* 5. Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={docViewer.isOpen}
        onClose={() => setDocViewer((prev) => ({ ...prev, isOpen: false }))}
        title={docViewer.title}
        subtitle={docViewer.subtitle}
        docType={docViewer.docType}
        plate={vehicle.plate}
      />

      {/* 6. Notification Center Drawer / Modal */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-slate-900">Notificaciones de Flota</h3>
              </div>
              <button
                onClick={() => setNotificationsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-800 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto">
              <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs space-y-1">
                <span className="font-bold text-red-950 flex items-center gap-1">
                  ⚠ Alerta Mecánica: AF 492 KZ
                </span>
                <p className="text-red-900">Marcos Gómez reportó check engine y vibración en Av. Libertador.</p>
                <span className="text-[10px] text-red-700 font-mono">Hace 10 min</span>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs space-y-1">
                <span className="font-bold text-amber-950 flex items-center gap-1">
                  💳 Comprobante de Pago Recibido
                </span>
                <p className="text-amber-900">Florencia Rivas adjuntó transferencia de cuota semana #47.</p>
                <span className="text-[10px] text-amber-700 font-mono">Hace 1 hora</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-900 flex items-center gap-1">
                  📑 Vencimiento de Oblea GNC
                </span>
                <p className="text-slate-600">3 vehículos requieren renovación de oblea antes de fin de mes.</p>
                <span className="text-[10px] text-slate-500 font-mono">Ayer</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-center">
              <button
                onClick={() => setNotificationsOpen(false)}
                className="text-xs font-bold text-slate-700 hover:text-slate-900"
              >
                Marcar todas como leídas
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
