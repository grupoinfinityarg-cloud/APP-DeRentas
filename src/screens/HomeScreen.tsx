import React, { useState } from 'react';
import { TabType, Driver, Vehicle } from '../types/fleet';
import { FLEET_VEHICLES } from '../data/mockData';
import { 
  Car, 
  Users, 
  CreditCard, 
  FileText, 
  Wallet, 
  MapPin, 
  Search, 
  MessageSquare, 
  Coins, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  SlidersHorizontal, 
  X, 
  PhoneCall,
  Sparkles,
  QrCode,
  AlertTriangle
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
}) => {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFleet = FLEET_VEHICLES.filter(v => 
    v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-24 sm:pb-20">
      
      {/* 1. SECCIÓN DE BIENVENIDA (Limpio, Profesional, Minimalista) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={driver.avatarUrl}
                alt={driver.name}
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
              />
              <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute -bottom-1 -right-1" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Bienvenido de nuevo</span>
                <span className="bg-[#FFE08E] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-amber-300">
                  Flota Conectada
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
                {driver.name}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Vehículo Asignado: <strong className="text-slate-900 font-bold">{vehicle.model}</strong> • Patente <strong className="font-mono bg-slate-100 text-slate-900 px-1.5 py-0.5 rounded border border-slate-200">{vehicle.plate}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={onOpenQuickControl}
              className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs active:scale-95 transition-all"
            >
              <QrCode className="w-4 h-4 text-[#F6C300]" />
              <span>Modo Retén</span>
            </button>
            <button
              onClick={() => onNavigate('rendimiento')}
              className="px-3.5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 active:scale-95 transition-all"
              title="Ver métricas de rendimiento con Recharts"
            >
              <TrendingUp className="w-4 h-4 text-amber-700" />
              <span className="hidden sm:inline">Rendimiento</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TRES TARJETAS DE MÉTRICAS RÁPIDAS (Autos Activos, Choferes en Ruta, Saldo Total) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        
        {/* Métrica 1: Autos Activos */}
        <div 
          onClick={() => onNavigate('gps')}
          className="p-4 sm:p-5 bg-white hover:bg-slate-50/60 rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Autos Activos
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center transition-transform group-hover:scale-105">
              <Car className="w-4 h-4" />
            </div>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">64</span>
              <span className="text-xs text-slate-500 font-semibold">/ 68 unidades</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>94.1% de la flota en calle</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>4 en taller preventivo</span>
            <span className="text-blue-700 font-bold group-hover:translate-x-0.5 transition-transform">Ver mapa →</span>
          </div>
        </div>

        {/* Métrica 2: Choferes en Ruta */}
        <div 
          onClick={() => onNavigate('mensajes')}
          className="p-4 sm:p-5 bg-white hover:bg-slate-50/60 rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Choferes en Ruta
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center transition-transform group-hover:scale-105">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">58</span>
              <span className="text-xs text-slate-500 font-semibold">conductores</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold mt-1">
              <span>Turno Tarde activo (CABA/AMBA)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>1 alerta técnica abierta</span>
            <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform">Chat flota →</span>
          </div>
        </div>

        {/* Métrica 3: Saldo Total */}
        <div 
          onClick={() => onNavigate('liquidacion')}
          className="p-4 sm:p-5 bg-white hover:bg-slate-50/60 rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Saldo Total Semanal
            </span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold transition-transform group-hover:scale-105">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>

          <div className="my-2.5">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">
                ${pendingBalance.toLocaleString('es-AR')}
              </span>
              <span className="text-xs font-bold text-slate-600">ARS</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-amber-800 font-bold mt-1">
              <span>Semana #47 • Vence Dom 23:59 hs</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Total: ${totalInvoiced.toLocaleString('es-AR')} ARS</span>
            <span className="text-amber-700 font-bold group-hover:translate-x-0.5 transition-transform">Liquidación →</span>
          </div>
        </div>

      </div>

      {/* 3. GRILLA CON TARJETAS INTERACTIVAS DE ACCESO DIRECTO (Las 6 secciones solicitadas) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Módulos del Sistema DeRentas
            </h2>
            <p className="text-xs text-slate-500">
              Acceso directo a las herramientas operativas, financieras y de telemetría
            </p>
          </div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            SaaS Flota v2.4
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
          
          {/* Tarjeta 1: Perfil y Documentación */}
          <div
            onClick={() => onNavigate('documentos')}
            className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                  100% Legal
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-800 transition-colors">
                  1. Perfil y Documentación
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Cédula Verde oficial DNRPA, póliza Todo Riesgo La Segunda, contrato notarial marco y VTV aprobada.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Abrir Cédula y Póliza</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tarjeta 2: Liquidación y Saldos */}
          <div
            onClick={() => onNavigate('liquidacion')}
            className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center font-bold">
                  <Wallet className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-full">
                  Semana #47
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                  2. Liquidación y Saldos
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Desglose semanal de cuota base, seguro con franquicia, 8 pasadas TelePASE y fondo preventivo de taller.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>Ver Cuentas y Recibos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tarjeta 3: Rastreo GPS */}
          <div
            onClick={() => onNavigate('gps')}
            className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-full">
                  En Vivo
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-800 transition-colors">
                  3. Rastreo GPS
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Mapa dinámico interactivo con geocerca AMBA, velocidad en tiempo real, telemetría y auditoría de ruta.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Visualizar Mapa Dinámico</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tarjeta 4: Búsqueda de Chofer/Patente */}
          <div
            onClick={() => setSearchModalOpen(true)}
            className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-purple-800 bg-purple-100/70 px-2 py-0.5 rounded-full">
                  Filtro Rápido
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-purple-800 transition-colors">
                  4. Búsqueda de Chofer/Patente
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Localizador instantáneo de unidades por matrícula (AF 492 KZ), modelo, conductor asignado o estado.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>Buscar Móvil o Chofer</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tarjeta 5: Mensajería de Administración */}
          <div
            onClick={() => onNavigate('mensajes')}
            className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 border border-red-200 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-red-800 bg-red-100/70 px-2 py-0.5 rounded-full">
                  1 Urgente
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-red-800 transition-colors">
                  5. Mensajería de Administración
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Centro de alertas operativas, soporte técnico para check engine, avisos de tormenta/granizo y difusión.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-red-700">
              <span>Abrir Mensajería Oficial</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tarjeta 6: Gestión de Cobros */}
          <div
            onClick={() => {
              onNavigate('liquidacion');
              onOpenPaymentModal();
            }}
            className="p-4 bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-400 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F6C300]/20 text-slate-950 border border-amber-300 flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5 text-amber-700" />
                </div>
                <span className="text-[10px] font-bold text-slate-900 bg-[#F6C300] px-2 py-0.5 rounded-full">
                  Imputación
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-800 transition-colors">
                  6. Gestión de Cobros
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Acreditación de transferencias Mercado Pago, recibos en Base Central, prorrateo en cuotas y ajustes.
                </p>
              </div>
            </div>
            <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-slate-900">
              <span>Informar o Ajustar Pagos</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. SHORTCUT BANNER: MODAL DE EDICIÓN COMERCIAL */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 rounded-2xl sm:rounded-3xl border border-amber-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-[#F6C300] text-slate-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-slate-900">
              Modal de Ajuste de Ítems & Prorrateo
            </h4>
            <p className="text-xs text-slate-600">
              Simulador interactivo para crear débitos, descuentos, cuotas 1/3 y notificaciones al chofer.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAddItemModal}
          className="w-full sm:w-auto px-5 py-2.5 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-black text-xs rounded-xl shadow-xs active:scale-95 transition-all shrink-0 flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Abrir Modal de Cobro</span>
        </button>
      </div>

      {/* 5. MODAL DE BÚSQUEDA DE CHOFER / PATENTE (Tarjeta 4) */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Búsqueda de Chofer o Patente</h3>
                  <p className="text-xs text-slate-500">Localizá cualquier unidad activa en la flota DeRentas</p>
                </div>
              </div>

              <button
                onClick={() => setSearchModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Search */}
            <div className="p-4 border-b border-slate-100 bg-white">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Escribí patente (ej: AF 492), chofer o modelo..."
                  className="w-full h-11 pl-10 pr-4 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#F6C300] focus:bg-white"
                />
              </div>
            </div>

            {/* Results list */}
            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {filteredFleet.length} vehículos encontrados
              </span>

              {filteredFleet.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    setSearchModalOpen(false);
                    onNavigate('gps');
                  }}
                  className="p-3 bg-slate-50 hover:bg-amber-50/60 rounded-xl border border-slate-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-mono font-bold text-xs text-slate-900">
                      {f.plate.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900">{f.driver}</span>
                        <span className="font-mono bg-slate-200 text-slate-900 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          {f.plate}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{f.model} • {f.speed} km/h</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <span>Ver</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSearchModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-lg"
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
