import React from 'react';
import { TabType, UserRole, Driver, Vehicle } from '../types/fleet';
import { 
  X, 
  Home, 
  MapPin, 
  CreditCard, 
  FileText, 
  ShieldCheck, 
  MessageSquare, 
  User, 
  Car, 
  LogOut, 
  Sparkles, 
  PhoneCall, 
  CheckCircle2, 
  UserCheck,
  TrendingUp
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  driver: Driver;
  vehicle: Vehicle;
  onOpenQuickControl: () => void;
  onOpenAddItemModal: () => void;
  onSignOut: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onNavigate,
  currentRole,
  onRoleChange,
  driver,
  vehicle,
  onOpenQuickControl,
  onOpenAddItemModal,
  onSignOut,
}) => {
  if (!isOpen) return null;

  const handleNav = (tab: TabType) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer content panel */}
      <div className="relative w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-250">
        
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-[#F6C300] font-black">
              <Car className="w-4 h-4" />
            </div>
            <span className="font-black text-lg tracking-tight text-slate-900">
              De<span className="text-[#F6C300]">Rentas</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card info in drawer */}
        <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={driver.avatarUrl}
              alt={driver.name}
              className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
            />
            <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
          </div>
          <div className="truncate">
            <h4 className="font-bold text-sm text-slate-900 truncate">{driver.name}</h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
              <span className="font-mono bg-slate-100 text-slate-800 font-bold px-1 rounded text-[10px]">
                {vehicle.plate}
              </span>
              <span className="truncate">{vehicle.model}</span>
            </div>
          </div>
        </div>

        {/* Role Switcher in Drawer */}
        <div className="p-3 bg-slate-50 border-b border-slate-200">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Rol de visualización
          </label>
          <div className="grid grid-cols-2 p-1 bg-white rounded-xl border border-slate-200 gap-1 text-xs">
            <button
              onClick={() => onRoleChange('chofer')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                currentRole === 'chofer'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Chofer
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${
                currentRole === 'admin'
                  ? 'bg-[#F6C300] text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </button>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <button
            onClick={() => handleNav('inicio')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'inicio'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>Inicio / Dashboard</span>
          </button>

          <button
            onClick={() => handleNav('gps')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'gps'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Telemetría GPS en Vivo</span>
          </button>

          <button
            onClick={() => handleNav('liquidacion')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'liquidacion'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Liquidación Semanal & Pagos</span>
          </button>

          <button
            onClick={() => handleNav('documentos')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'documentos'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Documentos & Cédula Verde</span>
          </button>

          <button
            onClick={() => handleNav('mensajes')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-colors ${
              activeTab === 'mensajes'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-4 h-4 text-purple-600" />
              <span>Mensajería & Alertas</span>
            </div>
            <span className="bg-[#F6C300] text-slate-950 text-[10px] font-black px-1.5 py-0.2 rounded-full">
              3
            </span>
          </button>

          <button
            onClick={() => handleNav('rendimiento')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'rendimiento'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-700" />
            <span>Tablero de Rendimiento (Recharts)</span>
          </button>

          <button
            onClick={() => handleNav('perfil')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${
              activeTab === 'perfil'
                ? 'bg-amber-50 text-amber-950 border border-amber-300'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 text-slate-600" />
            <span>Mi Perfil & Vehículo</span>
          </button>

          {/* Quick Retén shortcut */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                onOpenQuickControl();
                onClose();
              }}
              className="w-full p-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-3 shadow-xs active:scale-95 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-[#F6C300]" />
              <span>Abrir Modo Retén Policial</span>
            </button>
          </div>

          {/* Quick Edit item shortcut */}
          <button
            onClick={() => {
              onOpenAddItemModal();
              onClose();
            }}
            className="w-full p-2.5 rounded-xl border border-amber-300 bg-amber-50 text-slate-900 font-bold text-xs flex items-center gap-3 active:scale-95 transition-all mt-1"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Editar / Nuevo Ítem de Cobro</span>
          </button>
        </div>

        {/* Footer Actions in Drawer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-2">
          <a
            href="tel:08003338080"
            className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-slate-600" />
            <span>Auxilio 0800-333-8080</span>
          </a>

          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="w-full py-2 px-3 text-red-600 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

      </div>
    </div>
  );
};
