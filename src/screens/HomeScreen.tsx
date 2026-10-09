import React, { useState } from 'react';
import { TabType, Driver, Vehicle, UserRole, ThemeMode, FontScale } from '../types/fleet';
import { FLEET_VEHICLES } from '../data/mockData';
import { 
  Car, 
  FileText, 
  Wallet, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Wrench, 
  Sparkles, 
  Search, 
  X, 
  ExternalLink, 
  Coins, 
  QrCode, 
  Star, 
  Calendar, 
  Gauge, 
  TrendingUp,
  CreditCard,
  PhoneCall,
  Sun,
  Moon,
  Eye,
  Type
} from 'lucide-react';

interface HomeScreenProps {
  driver: Driver;
  vehicle: Vehicle;
  pendingBalance: number;
  totalInvoiced: number;
  onNavigate: (tab: TabType) => void;
  onOpenQuickControl: () => void;
  onOpenPaymentModal: () => void;
  onOpenAddItemModal: () => void;
  currentRole?: UserRole;
  maintenanceAlertsCount?: number;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  fontScale?: FontScale;
  onChangeFontScale?: (scale: FontScale) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  driver,
  vehicle,
  pendingBalance,
  totalInvoiced,
  onNavigate,
  onOpenQuickControl,
  onOpenPaymentModal,
  onOpenAddItemModal,
  currentRole = 'chofer',
  maintenanceAlertsCount = 2,
  theme = 'light',
  onToggleTheme,
  fontScale = 'normal',
  onChangeFontScale,
}) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const isDark = theme === 'dark';

  const filteredFleet = FLEET_VEHICLES.filter(v => 
    v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Dynamic Typography Helpers according to FontScale
  const getScaleClasses = () => {
    switch (fontScale) {
      case 'xlarge':
        return {
          h1: 'text-2xl sm:text-3xl font-black',
          h2: 'text-xl sm:text-2xl font-black',
          carTitle: 'text-xl sm:text-3xl font-black',
          plateText: 'text-base sm:text-lg font-black',
          balanceAmount: 'text-3xl sm:text-4xl font-black',
          cardTitle: 'text-base sm:text-lg font-black',
          body: 'text-sm sm:text-base leading-relaxed',
          subtext: 'text-xs sm:text-sm',
          btnText: 'text-sm font-bold',
        };
      case 'large':
        return {
          h1: 'text-xl sm:text-2xl font-black',
          h2: 'text-lg sm:text-xl font-black',
          carTitle: 'text-lg sm:text-2xl font-black',
          plateText: 'text-sm sm:text-base font-black',
          balanceAmount: 'text-2xl sm:text-3xl font-black',
          cardTitle: 'text-sm sm:text-base font-black',
          body: 'text-xs sm:text-sm leading-relaxed',
          subtext: 'text-[11px] sm:text-xs',
          btnText: 'text-xs sm:text-sm font-bold',
        };
      case 'normal':
      default:
        return {
          h1: 'text-xl sm:text-2xl font-black',
          h2: 'text-base sm:text-lg font-black',
          carTitle: 'text-lg sm:text-2xl font-black',
          plateText: 'text-sm sm:text-base font-black',
          balanceAmount: 'text-2xl sm:text-3xl font-black',
          cardTitle: 'text-sm sm:text-base font-black',
          body: 'text-xs leading-relaxed',
          subtext: 'text-[10px] sm:text-xs',
          btnText: 'text-xs font-bold',
        };
    }
  };

  const scale = getScaleClasses();

  return (
    <div className={`space-y-4 sm:space-y-5 pb-24 sm:pb-20 transition-colors duration-250 ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* ========================================================================= */}
      {/* 0. BARRA RÁPIDA DE ACCESIBILIDAD Y MODO NOCTURNO PARA CHOFERES EN CABINA   */}
      {/* ========================================================================= */}
      <div className={`rounded-2xl p-3 sm:p-4 border transition-all flex flex-wrap items-center justify-between gap-3 shadow-xs ${
        isDark 
          ? 'bg-slate-800/90 border-slate-700/80 text-slate-200' 
          : 'bg-white border-slate-200/90 text-slate-800'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
            isDark ? 'bg-amber-400/20 text-[#F6C300]' : 'bg-amber-100 text-amber-800'
          }`}>
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs">Visibilidad en Cabina</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                isDark ? 'bg-slate-700 text-amber-300' : 'bg-slate-100 text-slate-600'
              }`}>
                {isDark ? 'Modo Noche Activo' : 'Modo Día'}
              </span>
            </div>
            <p className={`${scale.subtext} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Alterná el tema o agrandá el tamaño de letra para lectura sin esfuerzo mientras manejás.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick theme toggle */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all active:scale-95 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F6C300]" />
                  <span>Modo Día</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Modo Noche</span>
                </>
              )}
            </button>
          )}

          {/* Quick Font Size Selector */}
          {onChangeFontScale && (
            <div className={`flex items-center p-0.5 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => onChangeFontScale('normal')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  fontScale === 'normal' 
                    ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs' 
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
                title="Texto normal 100%"
              >
                A
              </button>
              <button
                onClick={() => onChangeFontScale('large')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  fontScale === 'large' 
                    ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs' 
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
                title="Texto confortable 115%"
              >
                A+
              </button>
              <button
                onClick={() => onChangeFontScale('xlarge')}
                className={`px-2 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  fontScale === 'xlarge' 
                    ? 'bg-[#F6C300] text-slate-950 font-black shadow-xs' 
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
                title="Texto grande 130%"
              >
                A++
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ENCABEZADO DE PERFIL CON FOTO, NOMBRE Y TARJETA DESTACADA DEL AUTO     */}
      {/* ========================================================================= */}
      <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-xs space-y-4 transition-colors duration-250 ${
        isDark 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200/90'
      }`}>
        
        {/* Fila superior: Foto del chofer, nombre y estado activo */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={driver.avatarUrl}
                alt={driver.name}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border shadow-xs ${
                  isDark ? 'border-slate-700 ring-2 ring-slate-800' : 'border-slate-200'
                }`}
              />
              <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-1 -right-1" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Bienvenido Chofer
                </span>
                <span className="bg-[#FFE08E] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-300">
                  En Ruta • Activo
                </span>
              </div>
              <h1 className={`${scale.h1} tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {driver.name}
              </h1>
              <div className={`flex items-center gap-2 ${scale.subtext} ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className={`font-bold ml-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                    {driver.rating}
                  </span>
                </div>
                <span>• {driver.tripsCount} viajes completados</span>
                <span>• <strong className={isDark ? 'text-slate-200' : 'text-slate-700'}>{driver.shift}</strong></span>
              </div>
            </div>
          </div>

          {/* Botones de acción rápida en cabecera */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onOpenQuickControl}
              className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-xs active:scale-95 transition-all cursor-pointer ${scale.btnText} ${
                isDark 
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950' 
                  : 'bg-slate-950 hover:bg-slate-800 text-white'
              }`}
              title="Abrir vista legal express para control o retén policial"
            >
              <QrCode className={`w-4 h-4 ${isDark ? 'text-slate-950' : 'text-[#F6C300]'}`} />
              <span>Modo Retén</span>
            </button>
            <button
              onClick={() => onNavigate('perfil')}
              className={`px-3 py-2.5 rounded-xl font-bold flex items-center gap-1 active:scale-95 transition-all cursor-pointer ${scale.btnText} ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>Ver Ficha</span>
            </button>
          </div>
        </div>

        {/* Tarjeta destacada con los datos del auto (Modelo, Año y Patente) */}
        <div className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 shadow-md border ${
          isDark 
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-slate-700/80 ring-1 ring-amber-400/20' 
            : 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white border-slate-800'
        }`}>
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Información del auto y chapa patente */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F6C300]">
                  Vehículo Asignado
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                <span className="text-xs text-slate-400 font-medium">Año {vehicle.year}</span>
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className={`${scale.carTitle} tracking-tight text-white`}>
                  {vehicle.model}
                </h2>
                <span className="text-xs bg-slate-800 text-amber-300 font-semibold px-2 py-0.5 rounded-md border border-slate-700">
                  {vehicle.fuelType}
                </span>
              </div>

              {/* Chapa patente oficial argentina destacada */}
              <div className="flex items-center gap-3 pt-1">
                <div className="inline-flex items-center bg-white text-slate-950 rounded-lg px-3 py-1 border-2 border-slate-400 shadow-xs select-all">
                  <div className="w-2.5 h-4 bg-sky-500 rounded-xs mr-2" />
                  <span className={`font-mono font-black ${scale.plateText} tracking-widest`}>
                    {vehicle.plate}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 ml-2 tracking-tighter uppercase hidden xs:inline">
                    República Argentina
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-xs text-slate-300">
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3.5 h-3.5 text-slate-400" />
                    <strong>{vehicle.odometer.toLocaleString('es-AR')} km</strong>
                  </span>
                  <span>•</span>
                  <span>Próx. Service: <strong>{vehicle.nextServiceKm.toLocaleString('es-AR')} km</strong></span>
                </div>
              </div>
            </div>

            {/* Thumbnail del auto y estado del motor */}
            <div className="flex items-center sm:flex-col sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
              <div className="flex items-center gap-2">
                <img
                  src={vehicle.photoUrl}
                  alt={vehicle.model}
                  className="w-20 h-13 sm:w-28 sm:h-16 object-cover rounded-xl border border-slate-700 shadow-xs"
                />
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 sm:justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  GPS y Telemetría Online
                </span>
                <span className="text-[10px] text-slate-400 block">
                  {vehicle.currentAddress}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. SECCIÓN DE MÉTRICAS CON DOS TARJETAS: SALDO & ESTADO DE DOCUMENTACIÓN  */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        
        {/* Tarjeta 1: Saldo y Liquidación Semanal */}
        <div className={`p-5 rounded-2xl sm:rounded-3xl border shadow-xs flex flex-col justify-between space-y-4 transition-all group ${
          isDark 
            ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
            : 'bg-white border-slate-200/90 hover:border-slate-300'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                  isDark 
                    ? 'bg-amber-950/60 border-amber-800/80 text-[#F6C300]' 
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Finanzas del Conductor
                  </span>
                  <h3 className={`${scale.cardTitle} ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Saldo y Liquidación Semanal
                  </h3>
                </div>
              </div>

              <span className={`font-bold text-[10px] px-2.5 py-1 rounded-full border ${
                isDark 
                  ? 'bg-amber-950/80 text-amber-300 border-amber-800' 
                  : 'bg-amber-100 text-amber-900 border-amber-200'
              }`}>
                Semana #47
              </span>
            </div>

            {/* Monto destacado */}
            <div className={`p-3.5 rounded-2xl border space-y-2 ${
              isDark 
                ? 'bg-slate-800/70 border-slate-700/70' 
                : 'bg-slate-50/80 border-slate-100'
            }`}>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className={`text-xs font-medium block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Saldo Pendiente a Abonar
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className={`${scale.balanceAmount} tabular-nums ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      ${pendingBalance.toLocaleString('es-AR')}
                    </span>
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      ARS
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-xs font-medium block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Total Liquidado
                  </span>
                  <span className={`font-mono font-bold text-sm ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    ${totalInvoiced.toLocaleString('es-AR')} ARS
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className={`w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-slate-700' : 'bg-slate-200'
                }`}>
                  <div className="bg-[#F6C300] h-full rounded-full transition-all" style={{ width: '60%' }} />
                </div>
                <div className={`flex items-center justify-between text-[10px] font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  <span>60% abonado ($75.000 ARS)</span>
                  <span className={isDark ? 'text-amber-400 font-bold' : 'text-amber-800 font-bold'}>
                    Vence Domingo 23:59 hs
                  </span>
                </div>
              </div>
            </div>

            <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Incluye cuota base de alquiler 7 días, seguro todo riesgo con franquicia y 8 pasadas de TelePASE.
            </p>
          </div>

          {/* Botón de acción rápida */}
          <div className={`pt-2 border-t flex items-center gap-2 ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <button
              onClick={() => {
                onNavigate('liquidacion');
                onOpenPaymentModal();
              }}
              className={`flex-1 py-2.5 px-4 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-black rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${scale.btnText}`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Pagar o Informar Transferencia</span>
            </button>
            <button
              onClick={() => onNavigate('liquidacion')}
              className={`py-2.5 px-3 rounded-xl font-bold transition-all cursor-pointer ${scale.btnText} ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
              title="Ver desglose completo de la liquidación"
            >
              <span>Ver Detalle →</span>
            </button>
          </div>
        </div>

        {/* Tarjeta 2: Estado de Documentación (Cédula Verde y Seguro) */}
        <div className={`p-5 rounded-2xl sm:rounded-3xl border shadow-xs flex flex-col justify-between space-y-4 transition-all group ${
          isDark 
            ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
            : 'bg-white border-slate-200/90 hover:border-slate-300'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center font-bold ${
                  isDark 
                    ? 'bg-emerald-950/60 border-emerald-800/80 text-emerald-400' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Marco Jurídico & Legal
                  </span>
                  <h3 className={`${scale.cardTitle} ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Estado de Documentación
                  </h3>
                </div>
              </div>

              <span className={`font-bold text-[10px] px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                isDark 
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' 
                  : 'bg-emerald-100 text-emerald-900 border-emerald-200'
              }`}>
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                100% Habilitado
              </span>
            </div>

            {/* Items de Cédula Verde y Seguro */}
            <div className="space-y-2">
              {/* Item Cédula */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark 
                  ? 'bg-slate-800/70 border-slate-700/70' 
                  : 'bg-slate-50/80 border-slate-100'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isDark ? 'bg-emerald-900/60 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    ✓
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      Cédula Verde DNRPA
                    </h4>
                    <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Identificación Oficial Automotor • Sin Vencimiento
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  Digitalizada
                </span>
              </div>

              {/* Item Seguro */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDark 
                  ? 'bg-slate-800/70 border-slate-700/70' 
                  : 'bg-slate-50/80 border-slate-100'
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isDark ? 'bg-emerald-900/60 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    ✓
                  </div>
                  <div>
                    <h4 className={`font-bold text-xs ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                      Póliza de Seguro Todo Riesgo
                    </h4>
                    <span className={`text-[10px] block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      La Segunda • Póliza #{vehicle.insurancePolicy}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  isDark 
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800' 
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  Vence Nov 2025
                </span>
              </div>
            </div>

            <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              VTV aprobada con oblea vigente hasta Mayo 2026 y certificado GNC habilitado por ENARGAS.
            </p>
          </div>

          {/* Botón de acción rápida */}
          <div className={`pt-2 border-t flex items-center gap-2 ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <button
              onClick={() => onNavigate('documentos')}
              className={`flex-1 py-2.5 px-4 font-bold rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer ${scale.btnText} ${
                isDark 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                  : 'bg-slate-950 hover:bg-slate-800 text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-[#F6C300]" />
              <span>Ver Cédula Verde & Póliza</span>
            </button>
            <button
              onClick={onOpenQuickControl}
              className={`py-2.5 px-3 font-bold rounded-xl border transition-all cursor-pointer ${scale.btnText} ${
                isDark 
                  ? 'bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border-emerald-800' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}
              title="Abrir para exhibir ante control policial"
            >
              <span>Exhibir QR</span>
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. GRILLA DE ACCESOS RÁPIDOS PARA LAS 4 SECCIONES CLAVE DEL CHOFER        */}
      {/* ========================================================================= */}
      <div className={`rounded-2xl sm:rounded-3xl p-5 sm:p-6 border shadow-xs space-y-4 transition-colors duration-250 ${
        isDark 
          ? 'bg-slate-900 border-slate-800' 
          : 'bg-white border-slate-200/90'
      }`}>
        <div className={`flex items-center justify-between pb-1 border-b ${
          isDark ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <div>
            <h2 className={`${scale.h2} tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Accesos Rápidos del Conductor
            </h2>
            <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Herramientas de uso diario para tu jornada en calle
            </p>
          </div>
          <span className={`text-[11px] font-bold uppercase tracking-wider hidden sm:inline ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}>
            DeRentas Chofer
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
          
          {/* Acceso 1: Documentos */}
          <div
            onClick={() => onNavigate('documentos')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-emerald-500 hover:shadow-lg hover:-translate-y-0.5' 
                : 'bg-slate-50/70 hover:bg-white border-slate-200/90 hover:border-emerald-400 hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isDark 
                    ? 'bg-emerald-950/70 text-emerald-400 border-emerald-800' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  <FileText className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100/70 text-emerald-800'
                }`}>
                  100% Legal
                </span>
              </div>
              <div>
                <h3 className={`font-bold transition-colors ${scale.cardTitle} ${
                  isDark ? 'text-white group-hover:text-emerald-300' : 'text-slate-900 group-hover:text-emerald-800'
                }`}>
                  1. Documentos
                </h3>
                <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                  Cédula Verde digitalizada, póliza de seguro, contrato marco notarial y VTV en regla.
                </p>
              </div>
            </div>
            <div className={`pt-3 mt-3 border-t flex items-center justify-between font-bold ${scale.subtext} ${
              isDark 
                ? 'border-slate-700/60 text-emerald-400' 
                : 'border-slate-200/60 text-emerald-700'
            }`}>
              <span>Abrir Cédula</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Acceso 2: Historial de Saldos */}
          <div
            onClick={() => onNavigate('liquidacion')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-amber-400 hover:shadow-lg hover:-translate-y-0.5' 
                : 'bg-slate-50/70 hover:bg-white border-slate-200/90 hover:border-amber-400 hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isDark 
                    ? 'bg-amber-950/70 text-amber-300 border-amber-800' 
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  <Wallet className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-amber-950 text-amber-300' : 'bg-amber-100/80 text-amber-900'
                }`}>
                  Semana #47
                </span>
              </div>
              <div>
                <h3 className={`font-bold transition-colors ${scale.cardTitle} ${
                  isDark ? 'text-white group-hover:text-amber-300' : 'text-slate-900 group-hover:text-amber-800'
                }`}>
                  2. Historial de Saldos
                </h3>
                <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                  Detalle de liquidaciones anteriores, cuota semanal, débitos TelePASE y comprobantes.
                </p>
              </div>
            </div>
            <div className={`pt-3 mt-3 border-t flex items-center justify-between font-bold ${scale.subtext} ${
              isDark 
                ? 'border-slate-700/60 text-amber-300' 
                : 'border-slate-200/60 text-amber-800'
            }`}>
              <span>Ver Cuentas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Acceso 3: Ubicación / GPS */}
          <div
            onClick={() => onNavigate('gps')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-blue-400 hover:shadow-lg hover:-translate-y-0.5' 
                : 'bg-slate-50/70 hover:bg-white border-slate-200/90 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isDark 
                    ? 'bg-blue-950/70 text-blue-300 border-blue-800' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}>
                  <MapPin className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-blue-950 text-blue-300' : 'bg-blue-100/70 text-blue-800'
                }`}>
                  En Vivo
                </span>
              </div>
              <div>
                <h3 className={`font-bold transition-colors ${scale.cardTitle} ${
                  isDark ? 'text-white group-hover:text-blue-300' : 'text-slate-900 group-hover:text-blue-800'
                }`}>
                  3. Ubicación / GPS
                </h3>
                <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                  Mapa dinámico en tiempo real, monitoreo de geocerca AMBA y velocidad satelital.
                </p>
              </div>
            </div>
            <div className={`pt-3 mt-3 border-t flex items-center justify-between font-bold ${scale.subtext} ${
              isDark 
                ? 'border-slate-700/60 text-blue-400' 
                : 'border-slate-200/60 text-blue-700'
            }`}>
              <span>Ver Mapa GPS</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Acceso 4: Mensajes de la Administración */}
          <div
            onClick={() => onNavigate('mensajes')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
              isDark 
                ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 hover:border-purple-400 hover:shadow-lg hover:-translate-y-0.5' 
                : 'bg-slate-50/70 hover:bg-white border-slate-200/90 hover:border-purple-400 hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isDark 
                    ? 'bg-purple-950/70 text-purple-300 border-purple-800' 
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}>
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isDark ? 'bg-purple-950 text-purple-300' : 'bg-purple-100/70 text-purple-800'
                }`}>
                  Canal Oficial
                </span>
              </div>
              <div>
                <h3 className={`font-bold transition-colors ${scale.cardTitle} ${
                  isDark ? 'text-white group-hover:text-purple-300' : 'text-slate-900 group-hover:text-purple-800'
                }`}>
                  4. Mensajes Base
                </h3>
                <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1`}>
                  Comunicación con la administración, alertas mecánicas y avisos meteorológicos en ruta.
                </p>
              </div>
            </div>
            <div className={`pt-3 mt-3 border-t flex items-center justify-between font-bold ${scale.subtext} ${
              isDark 
                ? 'border-slate-700/60 text-purple-400' 
                : 'border-slate-200/60 text-purple-700'
            }`}>
              <span>Abrir Chat Oficial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MÓDULOS OPERATIVOS COMPLEMENTARIOS (Mantenimiento & Telemetría)         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        
        {/* Atajo al Registro de Mantenimiento (Maintenance Log) */}
        <div 
          onClick={() => onNavigate('mantenimiento')}
          className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border shadow-sm cursor-pointer hover:border-amber-400 transition-all flex items-center justify-between gap-3 group ${
            isDark 
              ? 'bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-slate-700/80 text-white' 
              : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-slate-800 text-white'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-[#F6C300] text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs group-hover:scale-105 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`${scale.cardTitle} text-white`}>
                  Historial de Mantenimiento
                </h4>
                {maintenanceAlertsCount > 0 && (
                  <span className="bg-red-600 text-white font-black text-[10px] px-1.5 py-0.2 rounded-full animate-pulse">
                    {maintenanceAlertsCount} Alertas
                  </span>
                )}
              </div>
              <p className={`${scale.body} text-slate-300 mt-0.5`}>
                Seguimiento de services: aceite, frenos y neumáticos con alertas de vencimiento.
              </p>
            </div>
          </div>

          <span className="text-[#F6C300] text-xs font-bold shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>Ver Taller</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Atajo al Tablero de Rendimiento (Recharts) */}
        <div 
          onClick={() => onNavigate('rendimiento')}
          className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border shadow-xs cursor-pointer transition-all flex items-center justify-between gap-3 group ${
            isDark 
              ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-white' 
              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 font-bold shadow-xs group-hover:scale-105 transition-transform ${
              isDark 
                ? 'bg-amber-950/60 border-amber-800/80 text-amber-300' 
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <TrendingUp className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className={`${scale.cardTitle} ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tablero de Rendimiento
              </h4>
              <p className={`${scale.body} ${isDark ? 'text-slate-400' : 'text-slate-500'} mt-0.5`}>
                Gráficos Recharts de ocupación de flota (95%), ingresos y costos de taller.
              </p>
            </div>
          </div>

          <span className={`text-xs font-bold shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform ${
            isDark ? 'text-amber-400' : 'text-amber-800'
          }`}>
            <span>Ver Métricas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 5. MODAL DE BÚSQUEDA DE CHOFER / PATENTE                                   */}
      {/* ========================================================================= */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border flex flex-col max-h-[85vh] ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
              isDark ? 'bg-slate-850 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  isDark ? 'bg-purple-950 text-purple-300' : 'bg-purple-100 text-purple-700'
                }`}>
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Búsqueda de Chofer o Patente</h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Localizá cualquier unidad activa en la flota DeRentas
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSearchModalOpen(false)}
                className={`p-1.5 rounded-full transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-800 hover:bg-slate-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-4 border-b ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
              <div className="relative">
                <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isDark ? 'text-slate-500' : 'text-slate-400'
                }`} />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Escribí patente (ej: AF 492), chofer o modelo..."
                  className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded-xl focus:outline-none focus:border-[#F6C300] ${
                    isDark 
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-400'
              }`}>
                {filteredFleet.length} vehículos encontrados
              </span>

              {filteredFleet.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    setSearchModalOpen(false);
                    onNavigate('gps');
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isDark 
                      ? 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 hover:border-amber-400' 
                      : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-xs ${
                      isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}>
                      {f.plate.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-xs sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {f.driver}
                        </span>
                        <span className={`font-mono font-bold px-1.5 py-0.2 rounded text-[10px] ${
                          isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-900'
                        }`}>
                          {f.plate}
                        </span>
                      </div>
                      <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {f.model} • {f.speed} km/h
                      </p>
                    </div>
                  </div>

                  <span className={`text-xs font-bold flex items-center gap-1 ${
                    isDark ? 'text-amber-400' : 'text-slate-900'
                  }`}>
                    <span>Ver</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>

            <div className={`p-3 border-t text-right ${isDark ? 'bg-slate-850 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <button
                onClick={() => setSearchModalOpen(false)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
