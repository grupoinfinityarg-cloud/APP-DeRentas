import React from 'react';
import { TabType, UserRole, Driver, Vehicle, ThemeMode, FontScale } from '../types/fleet';
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
  TrendingUp,
  Wrench,
  Sun,
  Moon,
  Eye,
  Type
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
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  fontScale?: FontScale;
  onChangeFontScale?: (scale: FontScale) => void;
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
  theme = 'light',
  onToggleTheme,
  fontScale = 'normal',
  onChangeFontScale,
}) => {
  if (!isOpen) return null;

  const isDark = theme === 'dark';

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
      <div className={`relative w-full max-w-xs h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-left duration-250 ${
        isDark ? 'bg-slate-900 text-slate-100 border-r border-slate-800' : 'bg-white text-slate-900'
      }`}>
        
        {/* Top Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-[#F6C300] font-black shadow-xs">
              <Car className="w-4 h-4" />
            </div>
            <span className={`font-black text-lg tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              De<span className="text-[#F6C300]">Rentas</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card info in drawer */}
        <div className={`p-4 border-b flex items-center gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
        }`}>
          <div className="relative shrink-0">
            <img
              src={driver.avatarUrl}
              alt={driver.name}
              className={`w-12 h-12 rounded-2xl object-cover border ${
                isDark ? 'border-slate-700' : 'border-slate-200'
              }`}
            />
            <span className="w-3 h-3 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
          </div>
          <div className="truncate">
            <h4 className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {driver.name}
            </h4>
            <div className={`flex items-center gap-1.5 text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span className={`font-mono font-bold px-1 rounded text-[10px] ${
                isDark ? 'bg-slate-800 text-amber-300' : 'bg-slate-100 text-slate-800'
              }`}>
                {vehicle.plate}
              </span>
              <span className="truncate">{vehicle.model}</span>
            </div>
          </div>
        </div>

        {/* Accessibility & Visual Comfort controls in Drawer */}
        <div className={`p-3 border-b space-y-2 ${
          isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              <span>Accesibilidad & Visibilidad</span>
            </span>
            <span className="text-[10px] font-bold text-amber-400">En Conducción</span>
          </div>

          <div className="flex items-center justify-between gap-2">
            {/* Mode toggle button */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-slate-800 border-slate-700 text-amber-300' 
                    : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                }`}
              >
                {isDark ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#F6C300]" />
                    <span>Tema Claro</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-700" />
                    <span>Tema Oscuro</span>
                  </>
                )}
              </button>
            )}

            {/* Font scale selector */}
            {onChangeFontScale && (
              <div className={`flex items-center p-0.5 rounded-xl border ${
                isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <button
                  type="button"
                  onClick={() => onChangeFontScale('normal')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    fontScale === 'normal' 
                      ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs' 
                      : isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                  title="Tamaño normal"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => onChangeFontScale('large')}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    fontScale === 'large' 
                      ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs' 
                      : isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                  title="Tamaño confortable"
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => onChangeFontScale('xlarge')}
                  className={`px-2 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    fontScale === 'xlarge' 
                      ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs' 
                      : isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}
                  title="Tamaño grande"
                >
                  A++
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Role Switcher in Drawer */}
        <div className={`p-3 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <label className={`block text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-400'
          }`}>
            Rol de visualización
          </label>
          <div className={`grid grid-cols-2 p-1 rounded-xl border gap-1 text-xs ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          }`}>
            <button
              onClick={() => onRoleChange('chofer')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                currentRole === 'chofer'
                  ? isDark ? 'bg-slate-700 text-[#F6C300] shadow-xs' : 'bg-slate-950 text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Chofer
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-[#F6C300] text-slate-950 shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
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
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'inicio'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Home className="w-4 h-4 text-amber-600" />
            <span>Inicio Chofer</span>
          </button>

          <button
            onClick={() => handleNav('gps')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'gps'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <div className="flex items-center justify-between w-full">
              <span>Mapa GPS en Vivo</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </button>

          <button
            onClick={() => handleNav('liquidacion')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'liquidacion'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span>Liquidación & Cobros Semanales</span>
          </button>

          <button
            onClick={() => handleNav('documentos')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'documentos'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            <div className="flex items-center justify-between w-full">
              <span>Documentación Oficial</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                DNRPA
              </span>
            </div>
          </button>

          <button
            onClick={() => handleNav('mensajes')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'mensajes'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-600" />
            <div className="flex items-center justify-between w-full">
              <span>Mensajería Base</span>
              <span className="bg-[#F6C300] text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                3
              </span>
            </div>
          </button>

          <button
            onClick={() => handleNav('rendimiento')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'rendimiento'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>Tablero de Rendimiento</span>
          </button>

          <button
            onClick={() => handleNav('mantenimiento')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'mantenimiento'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Wrench className="w-4 h-4 text-amber-600" />
            <span>Historial de Mantenimiento & Taller</span>
          </button>

          <button
            onClick={() => handleNav('perfil')}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors cursor-pointer ${
              activeTab === 'perfil'
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-amber-50 text-amber-950 border border-amber-300'
                : isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Mi Perfil & Vehículo</span>
          </button>

          {/* Quick Retén shortcut */}
          <div className={`pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <button
              onClick={() => {
                onOpenQuickControl();
                onClose();
              }}
              className="w-full p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-3 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-slate-950" />
              <span>Abrir Modo Retén Policial</span>
            </button>
          </div>

          {/* Quick Edit item shortcut */}
          <button
            onClick={() => {
              onOpenAddItemModal();
              onClose();
            }}
            className={`w-full p-2.5 rounded-xl font-bold text-xs flex items-center gap-3 active:scale-95 transition-all mt-1 cursor-pointer ${
              isDark 
                ? 'border border-slate-700 bg-slate-800 text-slate-200' 
                : 'border border-amber-300 bg-amber-50 text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Editar / Nuevo Ítem de Cobro</span>
          </button>
        </div>

        {/* Footer Actions in Drawer */}
        <div className={`p-4 border-t space-y-2 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <a
            href="tel:08003338080"
            className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-colors ${
              isDark 
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800' 
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
            }`}
          >
            <PhoneCall className="w-4 h-4 text-slate-400" />
            <span>Auxilio 0800-333-8080</span>
          </a>

          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="w-full py-2 px-3 text-red-500 hover:text-red-400 text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

      </div>
    </div>
  );
};
