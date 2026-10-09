import React from 'react';
import { UserRole, TabType, ThemeMode, FontScale } from '../types/fleet';
import { 
  Bell, 
  ShieldCheck, 
  Smartphone, 
  Monitor, 
  UserCheck, 
  Car,
  Menu,
  Wrench,
  Sun,
  Moon,
  TrendingUp
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
  onOpenMobileMenu: () => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  fontScale?: FontScale;
  onChangeFontScale?: (scale: FontScale) => void;
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
  onOpenMobileMenu,
  theme = 'light',
  onToggleTheme,
  fontScale = 'normal',
  onChangeFontScale,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-250 select-none ${
      isDark 
        ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-sm' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 h-14 sm:h-15 flex items-center justify-between gap-1.5 sm:gap-3">
        
        {/* Brand Zone + Mobile Hamburger Trigger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Hamburger button (Mobile only) */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={`md:hidden p-2 rounded-xl transition-colors active:scale-95 ${
              isDark 
                ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
            }`}
            aria-label="Abrir menú principal"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div 
            onClick={() => onTabChange('inicio')}
            className="flex items-center gap-2 cursor-pointer select-none group"
            title="Ir a Pantalla de Inicio"
          >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform ${
              isDark ? 'bg-slate-800 text-[#F6C300] border border-slate-700' : 'bg-slate-950 text-[#F6C300]'
            }`}>
              <Car className="w-4 h-4" />
            </div>
            <div className="flex items-baseline">
              <span className={`font-black text-lg sm:text-xl tracking-tight ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}>
                De<span className="text-[#F6C300] font-black">Rentas</span>
              </span>
            </div>
          </div>

          {/* Role badge selector (Hidden on tiny screens to avoid overflow, accessible in drawer) */}
          <div className={`hidden sm:flex items-center p-0.5 rounded-lg border ${
            isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => onRoleChange('chofer')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentRole === 'chofer'
                  ? isDark 
                    ? 'bg-slate-700 text-[#F6C300] shadow-xs' 
                    : 'bg-white text-slate-900 shadow-xs'
                  : isDark 
                    ? 'text-slate-400 hover:text-slate-200' 
                    : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Chofer
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentRole === 'admin'
                  ? 'bg-[#F6C300] text-slate-950 shadow-xs'
                  : isDark 
                    ? 'text-slate-400 hover:text-slate-200' 
                    : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              Admin Flota
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className={`hidden lg:flex items-center gap-1 text-xs font-bold ${
          isDark ? 'text-slate-300' : 'text-slate-600'
        }`}>
          <button
            onClick={() => onTabChange('inicio')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'inicio' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => onTabChange('gps')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'gps' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>GPS Mapa</span>
          </button>
          <button
            onClick={() => onTabChange('liquidacion')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'liquidacion' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Liquidación
          </button>
          <button
            onClick={() => onTabChange('documentos')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'documentos' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Documentos
          </button>
          <button
            onClick={() => onTabChange('mensajes')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'mensajes' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span>Mensajes</span>
            <span className="bg-[#F6C300] text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">3</span>
          </button>
          <button
            onClick={() => onTabChange('rendimiento')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'rendimiento' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            <span>Rendimiento</span>
          </button>
          <button
            onClick={() => onTabChange('mantenimiento')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
              activeTab === 'mantenimiento' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-500" />
            <span>Taller</span>
          </button>
          <button
            onClick={() => onTabChange('perfil')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'perfil' 
                ? isDark ? 'bg-slate-800 text-[#F6C300] font-black' : 'bg-slate-100 text-slate-950 font-extrabold' 
                : isDark ? 'hover:bg-slate-800 hover:text-white' : 'hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            Perfil
          </button>
        </nav>

        {/* Right Actions Zone: Accessibility Controls & Modals */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* ========================================================================= */}
          {/* 1. AJUSTE DE TAMAÑO DE FUENTE (A / A+ / A++)                              */}
          {/* ========================================================================= */}
          {onChangeFontScale && (
            <div 
              className={`flex items-center p-0.5 rounded-xl border transition-all ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}
              title="Ajuste de tamaño de fuente para lectura confortable en ruta"
              role="group"
              aria-label="Tamaño de tipografía"
            >
              <button
                type="button"
                onClick={() => onChangeFontScale('normal')}
                className={`px-1.5 sm:px-2 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  fontScale === 'normal'
                    ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs scale-102'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tamaño Estándar (100%)"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale('large')}
                className={`px-1.5 sm:px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  fontScale === 'large'
                    ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs scale-102'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tamaño Confortable (+15%) - Recomendado en auto"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => onChangeFontScale('xlarge')}
                className={`px-1.5 sm:px-2 py-1 rounded-lg text-[13px] font-extrabold transition-all cursor-pointer ${
                  fontScale === 'xlarge'
                    ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs scale-102'
                    : isDark 
                      ? 'text-slate-400 hover:text-slate-200' 
                      : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Tamaño Grande (+30%) - Máxima visibilidad"
              >
                A++
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* 2. SWITCH DE MODO OSCURO / MODO CLARO (Sol & Luna)                         */}
          {/* ========================================================================= */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
                isDark 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 shadow-xs' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-950 shadow-xs'
              }`}
              title={isDark ? 'Cambiar a Modo Claro (Día)' : 'Cambiar a Modo Oscuro (Noche para choferes)'}
              aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#F6C300] animate-in spin-in-180 duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-300" />
              )}
            </button>
          )}

          {/* Quick Checkpoint button (Retén Policial) */}
          <button
            onClick={onOpenQuickControl}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer ${
              isDark 
                ? 'bg-amber-400 text-slate-950 hover:bg-amber-300' 
                : 'bg-slate-950 hover:bg-slate-800 text-white'
            }`}
            title="Abrir Modo Control Rápido para retén policial"
          >
            <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-slate-950' : 'text-[#F6C300]'}`} />
            <span className="hidden sm:inline">Modo</span> Retén
          </button>

          {/* View Toggle (Simulator phone vs Full responsive) */}
          <button
            onClick={onToggleMobileView}
            className={`p-2 rounded-xl transition-colors hidden sm:flex items-center gap-1 text-xs font-semibold border cursor-pointer ${
              isDark 
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
                : 'bg-white border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-100'
            }`}
            title={isMobileView ? 'Cambiar a vista de escritorio expandida' : 'Cambiar a vista móvil smartphone'}
          >
            {isMobileView ? (
              <>
                <Monitor className="w-4 h-4" />
                <span className="text-[11px]">Expandir</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span className="text-[11px]">Móvil</span>
              </>
            )}
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
              isDark 
                ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
            }`}
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
