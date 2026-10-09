import React, { useState } from 'react';
import { Vehicle, Driver } from '../types/fleet';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  PhoneCall, 
  CheckCircle2, 
  Car, 
  FileCheck2, 
  ExternalLink,
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface QuickControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
  driver: Driver;
}

export const QuickControlModal: React.FC<QuickControlModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  driver,
}) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'cedula' | 'seguro' | 'autorizacion'>('cedula');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className={`w-full max-w-xl bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden border border-amber-400/40 flex flex-col ${fullscreen ? 'h-full max-h-none' : 'max-h-[95vh]'}`}>
        
        {/* POLICE CHECKPOINT BAR (High visibility, dark & electric amber) */}
        <div className="bg-[#F6C300] text-slate-950 px-5 py-3 flex items-center justify-between font-black tracking-wide">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-slate-950" />
            <span className="text-sm sm:text-base uppercase">CONTROL VEHICULAR • DE RENTAS OFICIAL</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-1.5 rounded-lg hover:bg-amber-400 text-slate-950 hidden sm:block"
              title="Pantalla completa"
            >
              {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-amber-400 text-slate-950"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* 100% LEGAL BANNER */}
          <div className="bg-slate-800/90 rounded-2xl p-4 border border-emerald-500/40 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  Habilitado para Circular - Ley 24.449
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Unidad habilitada por DNRPA y DeRentas Flota con seguro comercial y autorización notarial vigente.
              </p>
            </div>
            <div className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-center shrink-0">
              <span className="text-lg font-black block leading-none">100%</span>
              <span className="text-[10px] font-bold tracking-tight">LEGAL</span>
            </div>
          </div>

          {/* DRIVER & VEHICLE QUICK BADGE */}
          <div className="grid grid-cols-2 gap-3 bg-slate-800 rounded-2xl p-4 border border-slate-700">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Conductor Autorizado</span>
              <p className="text-base font-bold text-white mt-0.5">{driver.name}</p>
              <p className="text-xs text-amber-300 font-mono">DNI: {driver.dni}</p>
              <p className="text-[11px] text-slate-400">{driver.role}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Vehículo Asignado</span>
              <p className="text-base font-bold text-white mt-0.5">{vehicle.model}</p>
              <div className="inline-block mt-1 bg-white text-black font-mono font-black text-sm px-2.5 py-0.5 rounded border-2 border-black tracking-widest">
                {vehicle.plate}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Chasis: {vehicle.chassis}</p>
            </div>
          </div>

          {/* DOCUMENT TABS */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-800 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('cedula')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'cedula' ? 'bg-[#F6C300] text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Cédula Digital
            </button>
            <button
              onClick={() => setActiveTab('seguro')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'seguro' ? 'bg-[#F6C300] text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Póliza Seguro
            </button>
            <button
              onClick={() => setActiveTab('autorizacion')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === 'autorizacion' ? 'bg-[#F6C300] text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Poder Notarial
            </button>
          </div>

          {/* TAB 1: CÉDULA DIGITAL & QR */}
          {activeTab === 'cedula' && (
            <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Official Scanned Image */}
                <div className="w-full sm:w-1/2 aspect-16/10 rounded-xl overflow-hidden border border-slate-600 bg-slate-900 shadow-md relative">
                  <img
                    src="/src/assets/images/cedula_identificacion_1791556285619.jpg"
                    alt="Cédula Verde Argentina Escaneada"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] text-emerald-400 px-2 py-0.5 rounded font-mono">
                    HD Escaneado
                  </div>
                </div>

                {/* QR Code Container for Police Scanner */}
                <div className="w-full sm:w-1/2 bg-white text-slate-950 p-4 rounded-xl flex flex-col items-center justify-center text-center shadow-lg">
                  <div className="p-2 border-2 border-slate-950 rounded-lg bg-white mb-2">
                    <QrCode className="w-24 h-24 text-slate-950" />
                  </div>
                  <span className="text-xs font-black uppercase text-slate-900">QR Oficial DNRPA</span>
                  <p className="text-[10px] text-slate-600 mt-0.5">Escaneable por personal de tránsito / Gendarmería</p>
                  <span className="mt-1 text-[9px] font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-bold">
                    VALIDADO • EXP: 2026
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">VTV / RTO</span>
                  <span className="font-bold text-emerald-400">APROBADA</span>
                </div>
                <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Oblea GNC</span>
                  <span className="font-bold text-emerald-400">VIGENTE</span>
                </div>
                <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Infracciones</span>
                  <span className="font-bold text-emerald-400">SIN MULTAS</span>
                </div>
                <div className="p-2 bg-slate-900/80 rounded-lg border border-slate-700">
                  <span className="text-[10px] text-slate-400 block">Patentes</span>
                  <span className="font-bold text-emerald-400">AL DÍA</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PÓLIZA DE SEGURO */}
          {activeTab === 'seguro' && (
            <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                <div>
                  <h4 className="font-bold text-white text-sm">La Segunda Seguros / Allianz</h4>
                  <p className="text-xs text-slate-400">Póliza Flota Nº 938-20491-01</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Pago al Día
                </span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tipo de Cobertura:</span>
                  <span className="font-bold text-white">Todo Riesgo Comercial / Transporte</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Vigencia Póliza:</span>
                  <span className="font-bold text-amber-300">Hasta 15 de Noviembre de 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certificado Mercosur:</span>
                  <span className="font-bold text-emerald-400">Emitido & Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Auxilio Mecánico 24hs:</span>
                  <span className="font-bold text-white">0800-888-2424</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AUTORIZACIÓN NOTARIAL */}
          {activeTab === 'autorizacion' && (
            <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-700">
                <div>
                  <h4 className="font-bold text-white text-sm">Contrato de Alquiler Marco #DR-88219</h4>
                  <p className="text-xs text-slate-400">Poder Notarial de Conducción Comercial</p>
                </div>
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Firma Certificada
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Este documento certifica con plena validez jurídica que el chofer <strong className="text-white">{driver.name}</strong> cuenta con poder de tenencia, conducción y explotación comercial emitido por <strong className="text-[#F6C300]">DeRentas S.A.</strong> ante escribano público.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Apoderado DeRentas:</span>
                  <span className="font-bold text-white">Matías E. Gómez</span>
                </div>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Firma Digital Verificada
                </span>
              </div>
            </div>
          )}

          {/* LEGAL EMERGENCY BUTTON */}
          <div className="bg-amber-950/40 rounded-2xl p-4 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F6C300] text-slate-950 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">¿Inconveniente con un oficial en el retén?</p>
                <p className="text-[11px] text-amber-200/80">Llamá a nuestra mesa de guardia legal operativa 24/7</p>
              </div>
            </div>
            <a
              href="tel:08003338080"
              className="w-full sm:w-auto px-5 py-2.5 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <PhoneCall className="w-4 h-4" />
              Llamar Guardia Operativa
            </a>
          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="p-4 bg-slate-800 border-t border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl transition-all"
          >
            Volver a la App
          </button>
        </div>
      </div>
    </div>
  );
};
