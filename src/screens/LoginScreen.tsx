import React, { useState } from 'react';
import { UserRole } from '../types/fleet';
import { 
  Car, 
  UserCheck, 
  ShieldCheck, 
  Info, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Fingerprint, 
  MessageCircle,
  Sparkles
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [role, setRole] = useState<UserRole>('chofer');
  const [emailOrDni, setEmailOrDni] = useState<string>('marcos.gomez@derentas.com');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [keepActive, setKeepActive] = useState<boolean>(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(role);
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    onLoginSuccess(demoRole);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-6 px-4 max-w-md mx-auto">
      
      {/* Top OS System Connected Status */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-wide">SISTEMA OPERATIVO CONECTADO</span>
        </div>
        <span className="text-slate-400 font-mono">v2.4</span>
      </div>

      <div className="my-auto py-6 space-y-5">
        
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-200 text-slate-900 mb-1">
            <Car className="w-7 h-7 text-slate-950" />
          </div>
          <h1 className="text-2xl font-black text-slate-950 tracking-tight">
            De<span className="text-[#F6C300]">Rentas</span>
          </h1>
          <p className="text-xs text-slate-600 font-medium">Tu flota, tus reglas</p>
        </div>

        {/* Role Toggle (Chofer vs Administrador) */}
        <div className="grid grid-cols-2 p-1.5 bg-white rounded-2xl border border-slate-200 shadow-xs gap-1.5">
          <button
            type="button"
            onClick={() => {
              setRole('chofer');
              setEmailOrDni('marcos.gomez@derentas.com');
            }}
            className={`p-3 rounded-xl text-left transition-all flex flex-col gap-0.5 ${
              role === 'chofer'
                ? 'bg-amber-50/70 border border-amber-300 text-slate-950 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <UserCheck className="w-4 h-4 text-slate-900" />
              <span>Chofer</span>
            </div>
            <span className="text-[10px] text-slate-500 leading-tight">Turnos, Recaudación y Auto</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setEmailOrDni('admin@derentas.com');
            }}
            className={`p-3 rounded-xl text-left transition-all flex flex-col gap-0.5 ${
              role === 'admin'
                ? 'bg-amber-50/70 border border-amber-300 text-slate-950 shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-slate-900" />
              <span>Administrador</span>
            </div>
            <span className="text-[10px] text-slate-500 leading-tight">Telemetría, Flota y Pagos</span>
          </button>
        </div>

        {/* Information Callout */}
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center gap-2.5 text-xs text-slate-700">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>Acceso optimizado para control de kilómetros, entregas y cobros diarios.</span>
        </div>

        {/* Login Form Container */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* User identifier */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Correo Electrónico o DNI
              </label>
              <div className="relative rounded-xl border border-slate-300 bg-white focus-within:border-[#F6C300] flex items-center px-3">
                <Mail className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={emailOrDni}
                  onChange={(e) => setEmailOrDni(e.target.value)}
                  placeholder="Ej. chofer@derentas.com o 4099887"
                  className="w-full h-11 text-xs sm:text-sm bg-transparent border-0 focus:outline-none text-slate-900"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-800">Contraseña</label>
                <a href="#recuperar" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
                  ¿Olvidaste tu clave?
                </a>
              </div>
              <div className="relative rounded-xl border border-slate-300 bg-white focus-within:border-[#F6C300] flex items-center px-3">
                <Lock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 text-xs sm:text-sm bg-transparent border-0 focus:outline-none text-slate-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember device checkbox */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={keepActive}
                onChange={(e) => setKeepActive(e.target.checked)}
                className="w-4 h-4 rounded text-slate-900 focus:ring-[#F6C300] border-slate-300"
              />
              <span className="text-xs text-slate-700 font-medium">
                Mantener sesión activa en este vehículo
              </span>
            </label>

            {/* Primary Submit */}
            <button
              type="submit"
              className="w-full h-12 bg-white hover:bg-slate-50 border-2 border-slate-900 text-slate-950 font-black text-sm rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Iniciar Sesión</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Access Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              O Acceso Rápido
            </span>
          </div>

          {/* Biometrics button */}
          <button
            type="button"
            onClick={() => handleQuickDemo(role)}
            className="w-full h-12 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Fingerprint className="w-5 h-5 text-slate-700" />
            <span>Entrar con Huella / Face ID</span>
          </button>
        </div>

        {/* 24/7 Driver WhatsApp Assistance */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200 shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Asistencia al Conductor 24/7</p>
              <p className="text-[11px] text-slate-500">Soporte directo ante siniestro o fallas</p>
            </div>
          </div>

          <a
            href="https://wa.me/5491145892310"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

      </div>

      {/* Footer Legal */}
      <footer className="text-center text-[11px] text-slate-500 pt-4 space-y-1">
        <p>© 2025 DeRentas Fleet Systems Inc. • Políticas de Privacidad • Términos de Conducción</p>
      </footer>

    </div>
  );
};
