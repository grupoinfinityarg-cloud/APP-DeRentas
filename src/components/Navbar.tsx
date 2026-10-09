import React from 'react';
import { UserRole, TabType } from '../types/fleet';
import { 
  Bell, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  Car,
  KeyRound,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenQuickControl: () => void;
  isMobileView: boolean;
  onToggleMobileView: () => void;
  onOpenNotifications: () => void;
  unreadNotifications: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenQuickControl,
  isMobileView,
  onToggleMobileView,
  onOpenNotifications,
  unreadNotifications,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-15 flex items-center justify-between gap-3">
        
        {/* Brand Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <div 
            onClick={() => onTabChange('inicio')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-[#F6C300] shadow-sm group-hover:scale-105 transition-transform">
              <Car className="w-4 h-4" />
            </div>
            <div className="flex items-baseline">
              <span className="text-slate-950 font-black text-xl tracking-tight">
                De<span className="text-[#F6C300] font-black">Rentas</span>
              </span>
            </div>
          </div>

          {/* Role badge selector */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200">
            <button
              onClick={() => onRoleChange('chofer')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                currentRole === 'chofer'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Chofer
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${
                currentRole === 'admin'
                  ? 'bg-[#F6C300] text-slate-950 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              Admin Flota
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-600">
          <button
            onClick={() => onTabChange('inicio')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'inicio' ? 'bg-slate-100 text-slate-950 font-extrabold' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            GPS Telemetría
          </button>
          <button
            onClick={() => onTabChange('mensajes')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'mensajes' ? 'bg-slate-100 text-slate-950 font-extrabold' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>Mensajes</span>
            <span className="bg-[#F6C300] text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">3</span>
          </button>
          <button
            onClick={() => onTabChange('liquidacion')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'liquidacion' ? 'bg-slate-100 text-slate-950 font-extrabold' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Liquidación Semanal
          </button>
          <button
            onClick={() => onTabChange('documentos')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'documentos' ? 'bg-slate-100 text-slate-950 font-extrabold' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Documentos & Cédula
          </button>
          <button
            onClick={() => onTabChange('perfil')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'perfil' ? 'bg-slate-100 text-slate-950 font-extrabold' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Perfil & Auto
          </button>
        </nav>

        {/* Right Actions Zone */}
        <div className="flex items-center gap-2">
          {/* Quick Checkpoint button */}
          <button
            onClick={onOpenQuickControl}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            title="Abrir Modo Control Rápido para retén policial"
          >
            <ShieldCheck className="w-4 h-4 text-[#F6C300]" />
            <span className="hidden sm:inline">Modo</span> Retén
          </button>

          {/* View Toggle (Simulator phone vs Full responsive) */}
          <button
            onClick={onToggleMobileView}
            className="p-2 text-slate-600 hover:text-slate-950 hover:bg-slate-100 rounded-xl transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold border border-slate-200"
            title={isMobileView ? 'Cambiar a vista de escritorio expandida' : 'Cambiar a vista móvil smartphone'}
          >
            {isMobileView ? (
              <>
                <Monitor className="w-4 h-4 text-slate-700" />
                <span className="text-[11px]">Expandir</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4 text-slate-700" />
                <span className="text-[11px]">Móvil</span>
              </>
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            title="Ver notificaciones"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifications > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white ring-1 ring-amber-400" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
