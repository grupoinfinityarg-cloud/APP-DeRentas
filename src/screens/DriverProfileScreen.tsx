import React, { useState } from 'react';
import { Driver, Vehicle } from '../types/fleet';
import { 
  Star, 
  Car, 
  Phone, 
  CreditCard, 
  FileText, 
  Wrench, 
  AlertTriangle, 
  ChevronRight, 
  Calendar, 
  Gauge, 
  Clock, 
  LifeBuoy, 
  ShieldCheck, 
  CheckCircle2,
  Share2
} from 'lucide-react';

interface DriverProfileScreenProps {
  driver: Driver;
  vehicle: Vehicle;
  onOpenSettlement: () => void;
  onOpenDocuments: () => void;
  onOpenChat: () => void;
  onOpenIncidence: () => void;
}

export const DriverProfileScreen: React.FC<DriverProfileScreenProps> = ({
  driver,
  vehicle,
  onOpenSettlement,
  onOpenDocuments,
  onOpenChat,
  onOpenIncidence,
}) => {
  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Breadcrumb & ID (Matches Image 9) */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="bg-slate-100 text-slate-800 text-xs font-black px-2.5 py-0.5 rounded border border-slate-200">
            PANEL DE OPERACIONES
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-xs font-mono font-bold text-slate-500">ID #{driver.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Perfil de Chofer
          </h1>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Activo / En ruta
          </span>
        </div>
      </div>

      {/* Driver Identity Card (Matches Image 9) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={driver.avatarUrl}
              alt={driver.name}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-xs"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 block border-2 border-white" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-bold text-base sm:text-lg text-slate-900">{driver.name}</h2>
              <span className="bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                {driver.rating} ({driver.tripsCount} viajes)
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              {driver.role} • Turno Completo
            </p>
          </div>
        </div>

        {/* DNI & Phone Blocks (Matches Image 9) */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-500">DNI:</span>
            <span className="font-mono font-bold text-slate-900">{driver.dni}</span>
          </div>

          <a
            href={`tel:${driver.phone}`}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <span className="font-bold text-slate-500">Tel:</span>
            <span className="font-bold text-slate-900 underline">{driver.phone}</span>
          </a>
        </div>
      </div>

      {/* VEHÍCULO EN ALQUILER (Featured in Image 9) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Subheader */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-slate-700" />
            <span className="text-xs font-bold text-slate-900">Vehículo en Alquiler</span>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-500">Contrato vigente #CT-2024</span>
        </div>

        {/* Vehicle Real Photo */}
        <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
          <img
            src={vehicle.photoUrl}
            alt={vehicle.model}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
            <span>{vehicle.fuelType}</span>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-slate-100 text-slate-800 text-xs font-extrabold px-3 py-1 rounded-full border border-slate-200">
              FLOTA COMPACTO PLUS
            </span>
            <span className="bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Cuota semanal al día
            </span>
          </div>

          <div>
            <h3 className="text-lg font-black text-slate-900">{vehicle.model}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {vehicle.engine} • 4 Puertas • Baúl Amplio
            </p>
          </div>

          {/* Patente Registrada (Official Argentine Plate Badge) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              PATENTE REGISTRADA
            </span>
            <div className="inline-flex flex-col items-center bg-white border-2 border-slate-900 rounded-lg px-4 py-1 shadow-xs">
              <span className="text-[8px] font-bold text-blue-700 tracking-widest uppercase">
                REPÚBLICA ARGENTINA
              </span>
              <span className="font-mono text-xl font-black text-slate-950 tracking-widest">
                {vehicle.plate}
              </span>
            </div>
          </div>

          {/* Insurance */}
          <div className="text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              SEGURO OBLIGATORIO
            </span>
            <div className="flex items-center gap-1.5 text-slate-900 font-bold mt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{vehicle.insuranceCompany}</span>
            </div>
          </div>

          {/* Stats Grid: Kilometraje, Service, Vencimiento (Matches Image 9) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5" />
                KILOMETRAJE ACTUAL
              </span>
              <p className="text-base font-black text-slate-900 mt-1 tabular-nums">
                {vehicle.odometer.toLocaleString('es-AR')} km
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                PRÓXIMO SERVICE
              </span>
              <p className="text-base font-black text-slate-900 mt-1 tabular-nums">
                {vehicle.nextServiceKm.toLocaleString('es-AR')} km
              </p>
              <span className="text-[10px] text-amber-700 font-bold">
                (En {(vehicle.nextServiceKm - vehicle.odometer).toLocaleString('es-AR')} km)
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                VENCIMIENTO SEMANA
              </span>
              <p className="text-base font-black text-slate-900 mt-1">
                Lunes 18 Nov
              </p>
              <span className="text-[10px] text-emerald-700 font-bold">
                • $75.000 (Abonado)
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ACCESOS RÁPIDOS (Matches Image 9) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 pb-1">
          <span>⚡</span>
          <span>Accesos rápidos</span>
        </span>

        {/* Acceso 1: Reportar Incidencia */}
        <button
          type="button"
          onClick={onOpenIncidence}
          className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Reportar incidencia</p>
              <p className="text-[11px] text-slate-500">Avería, siniestro o mecánico</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Acceso 2: Historial de Pagos */}
        <button
          type="button"
          onClick={onOpenSettlement}
          className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Historial de pagos</p>
              <p className="text-[11px] text-slate-500">Recibos semanales y facturas</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Acceso 3: Contactar Administración */}
        <button
          type="button"
          onClick={onOpenChat}
          className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Contactar administración</p>
              <p className="text-[11px] text-slate-500">Guardia 24hs y contratos</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* ROADSIDE ASSISTANCE 0800 CARD (Matches Image 9) */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-950 text-[#F6C300] flex items-center justify-center shrink-0">
            <span className="text-xl">✻</span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900">Línea de auxilio mecánico en ruta</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Remolque y asistencia gratuita incluida en tu plan DeRentas.
            </p>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="tel:08003338080"
            className="w-full h-11 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl font-mono font-bold text-xs sm:text-sm text-slate-950 flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-700" />
            <span>0800-333-8080</span>
          </a>
        </div>
      </div>

    </div>
  );
};
