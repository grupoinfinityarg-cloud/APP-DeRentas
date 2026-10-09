import React, { useState, useEffect } from 'react';
import { Vehicle, Driver } from '../types/fleet';
import { FLEET_VEHICLES } from '../data/mockData';
import { InteractiveMap } from '../components/InteractiveMap';
import { 
  Radio, 
  MapPin, 
  List, 
  Layers, 
  Crosshair, 
  Gauge, 
  BatteryMedium, 
  Wifi, 
  Clock, 
  Phone, 
  Navigation, 
  BellRing, 
  Share2, 
  ShieldCheck, 
  AlertTriangle, 
  Sliders,
  CheckCircle2,
  ChevronDown,
  Car
} from 'lucide-react';

interface GpsTelemetryScreenProps {
  vehicle: Vehicle;
  driver: Driver;
  onOpenQuickControl: () => void;
  onOpenChat: () => void;
}

export const GpsTelemetryScreen: React.FC<GpsTelemetryScreenProps> = ({
  vehicle,
  driver,
  onOpenQuickControl,
  onOpenChat,
}) => {
  const [viewMode, setViewMode] = useState<'mapa' | 'lista'>('mapa');
  const [selectedPlate, setSelectedPlate] = useState<string>(vehicle.plate);
  const [showRouteTrail, setShowRouteTrail] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [livePingCount, setLivePingCount] = useState<number>(12);
  const [liveSpeed, setLiveSpeed] = useState<number>(42);

  // Simulate live ping updates
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePingCount((prev) => (prev > 2 ? prev - 1 : 15));
      // subtle fluctuation in speed
      setLiveSpeed((prev) => Math.min(65, Math.max(35, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleShareLive = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://derentas.com.ar/live/${selectedPlate}`);
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Telemetry Header & Switcher (Matches Image 13) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wide">
            GPS Celular Activo
          </span>
        </div>

        <div className="flex items-center p-0.5 bg-slate-200/80 rounded-xl border border-slate-300">
          <button
            type="button"
            onClick={() => setViewMode('mapa')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'mapa'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Mapa
          </button>
          <button
            type="button"
            onClick={() => setViewMode('lista')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              viewMode === 'lista'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            Lista
          </button>
        </div>
      </div>

      {/* 3 Metric Summary Tiles (Matches Image 13) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Radio className="w-4 h-4 text-emerald-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block tabular-nums">64</span>
          <span className="text-[11px] text-slate-500 font-medium leading-tight block">GPS Activo</span>
        </div>

        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <Wifi className="w-4 h-4 text-amber-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-900 block tabular-nums">2</span>
          <span className="text-[11px] text-slate-500 font-medium leading-tight block">Señal Baja</span>
        </div>

        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <span className="text-xl sm:text-2xl font-black text-red-600 block tabular-nums">3</span>
          <span className="text-[11px] text-slate-500 font-medium leading-tight block">Fuera Zona</span>
        </div>
      </div>

      {/* MAP / LIST VIEW CONTAINER */}
      {viewMode === 'mapa' ? (
        <InteractiveMap
          activeVehicle={vehicle}
          onSelectVehicle={(plate) => setSelectedPlate(plate)}
        />
      ) : (
        /* LIST VIEW */
        <div className="space-y-2">
          {FLEET_VEHICLES.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedPlate(v.plate)}
              className={`p-3 bg-white rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedPlate === v.plate ? 'border-2 border-slate-900 shadow-sm' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs font-mono">
                  {v.plate.slice(0, 2)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{v.driver}</span>
                    <span className="font-mono bg-slate-100 text-slate-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                      {v.plate}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{v.model}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-900 block tabular-nums">{v.speed} km/h</span>
                <span className={`text-[10px] font-bold uppercase ${
                  v.status === 'activo' ? 'text-emerald-600' : v.status === 'alerta' ? 'text-red-600' : 'text-slate-400'
                }`}>
                  {v.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DRIVER & VEHICLE TELEMETRY CARD (Matches Image 13) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Driver identity */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-900 text-sm">
              MG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900">{driver.name}</h3>
                <span className="bg-slate-100 text-slate-700 font-bold text-[10px] px-2 py-0.5 rounded-full border border-slate-200">
                  {driver.shift}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {vehicle.model} • <strong className="text-slate-900 font-mono font-bold">{vehicle.plate}</strong>
              </p>
            </div>
          </div>

          <ChevronDown className="w-5 h-5 text-slate-400" />
        </div>

        {/* 4 Telemetry Metrics Grid (Matches Image 13) */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <Gauge className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Velocidad</span>
              <p className="font-bold text-sm sm:text-base text-slate-900 mt-0.5 tabular-nums">
                {liveSpeed} km/h
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <BatteryMedium className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Batería Móvil</span>
              <p className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">
                {vehicle.battery}% • {vehicle.network}
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <Crosshair className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Precisión GPS</span>
              <p className="font-bold text-sm sm:text-base text-slate-900 mt-0.5">
                ± 4 metros
              </p>
            </div>
          </div>

          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-500 font-medium block">Último Ping</span>
              <p className="font-bold text-sm sm:text-base text-slate-900 mt-0.5 tabular-nums">
                hace {livePingCount} seg
              </p>
            </div>
          </div>
        </div>

        {/* Current Street Address */}
        <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-xl text-xs text-slate-800 font-medium">
          <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
          <span>{vehicle.currentAddress}</span>
        </div>

        {/* 4 Quick Actions (Llamar chofer, Ver recorrido, Enviar alerta, Compartir en vivo) */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href="tel:+5491145892310"
            className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-700" />
            <span>Llamar chofer</span>
          </a>

          <button
            type="button"
            onClick={() => setShowRouteTrail(!showRouteTrail)}
            className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 text-slate-700" />
            <span>{showRouteTrail ? 'Ocultar recorrido' : 'Ver recorrido'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenChat}
            className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <BellRing className="w-4 h-4 text-amber-600" />
            <span>Enviar alerta</span>
          </button>

          <button
            type="button"
            onClick={handleShareLive}
            className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-bold text-xs text-slate-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-700" />
            <span>{copiedLink ? '¡Link Copiado!' : 'Compartir en vivo'}</span>
          </button>
        </div>

      </div>

      {/* AUDITORÍA DE UBICACIÓN & PERMISOS SMARTPHONE (Matches Image 13) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h4 className="font-black text-sm text-slate-900 tracking-tight">Auditoría de Ubicación</h4>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Sincronizado
          </span>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold text-slate-900">Permisos Smartphone en Regla</p>
            <p className="text-slate-600 text-[11px] mt-0.5">
              Ubicación siempre concedida • Batería sin optimizar
            </p>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        </div>
      </div>

      {/* EVENTOS DEL TURNO (HOY) (Matches Image 13) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <h4 className="font-black text-xs text-slate-500 uppercase tracking-wider">
          Eventos del Turno (Hoy)
        </h4>

        <div className="space-y-2">
          {/* Event 1 */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                Detención Prolongada
              </span>
              <span className="font-mono font-bold text-slate-500 text-[11px]">14:22 hs</span>
            </div>
            <p className="text-xs text-slate-600">
              18 min con motor encendido en parada no programada.
            </p>
          </div>

          {/* Event 2 */}
          <div className="p-3 bg-red-50/60 rounded-xl border border-red-200 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-red-950 flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-red-600" />
                Exceso Puntual en Gral. Paz
              </span>
              <span className="font-mono font-bold text-red-700 text-[11px]">12:45 hs</span>
            </div>
            <p className="text-xs text-red-900">
              Registrado a 88 km/h en zona máxima de 80 km/h.
            </p>
          </div>
        </div>

        {/* Active Geofence footer */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Geocerca Activa:</span>
            <strong className="text-slate-900 font-bold">AMBA Restringido</strong>
          </div>
          <button
            type="button"
            onClick={() => alert('Parámetros de geocerca: Radio AMBA 45km con aviso de salida automático.')}
            className="text-amber-800 font-bold hover:underline"
          >
            Configurar
          </button>
        </div>
      </div>

    </div>
  );
};
