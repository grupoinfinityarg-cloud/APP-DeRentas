import React, { useState } from 'react';
import { Vehicle } from '../types/fleet';
import { 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  QrCode, 
  FileText, 
  Eye, 
  Download, 
  Camera, 
  Upload, 
  PhoneCall, 
  CheckCircle2, 
  Plus, 
  Check, 
  ShieldAlert, 
  FileCheck,
  AlertTriangle,
  Flame,
  Award
} from 'lucide-react';

interface DocumentsScreenProps {
  vehicle: Vehicle;
  onOpenQuickControl: () => void;
  onViewDoc: (title: string, subtitle: string, docType: 'cedula_frente' | 'cedula_dorso' | 'seguro' | 'contrato' | 'vtv' | 'recibo') => void;
  onCallAssistance: () => void;
}

export const DocumentsScreen: React.FC<DocumentsScreenProps> = ({
  vehicle,
  onOpenQuickControl,
  onViewDoc,
  onCallAssistance,
}) => {
  const [openSection, setOpenSection] = useState<'cedula' | 'seguro' | 'contrato' | 'vtv' | null>('cedula');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleSection = (sec: 'cedula' | 'seguro' | 'contrato' | 'vtv') => {
    setOpenSection(openSection === sec ? null : sec);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-4 pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Mis Documentos y Cédula
          </h1>
          <span className="bg-emerald-100 text-emerald-800 font-black text-[11px] px-2.5 py-0.5 rounded-full border border-emerald-300">
            ONLINE
          </span>
        </div>
        <p className="text-xs text-slate-600">
          Vehículo Asignado: <strong className="text-slate-900 font-bold">{vehicle.model}</strong> • Patente <strong className="text-slate-900 font-mono font-bold bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">{vehicle.plate}</strong>
        </p>
      </div>

      {/* MODO CONTROL RÁPIDO BUTTON (Featured prominently in screenshot Image 1) */}
      <button
        type="button"
        onClick={onOpenQuickControl}
        className="w-full h-12 bg-white hover:bg-slate-50 border-2 border-slate-900 text-slate-950 font-black text-sm rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 group"
      >
        <QrCode className="w-5 h-5 text-slate-950 group-hover:scale-110 transition-transform" />
        <span>Modo Control Rápido</span>
      </button>

      {/* 100% LEGAL BANNER (Featured in Image 1) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                Documentación Habilitada para Circular
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Todos los comprobantes están validados con DeRentas y la DNRPA. Válidos ante control policial, Gendarmería o agentes viales en todo el país.
              </p>
            </div>
          </div>

          <div className="text-center p-2 rounded-xl bg-emerald-50 border border-emerald-200 shrink-0">
            <span className="text-sm font-black text-emerald-800 block leading-none">100%</span>
            <span className="text-[10px] font-extrabold text-emerald-700 uppercase">LEGAL</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Sin multas impeditivas</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">Cobertura comercial activa</span>
          </div>
        </div>
      </div>

      {/* ACCORDION 1: CÉDULA VERDE / IDENTIFICACIÓN */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection('cedula')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900">Cédula Verde / Identificación</h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Vigente
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                DNRPA República Argentina • Chasis Nº {vehicle.chassis}
              </p>
            </div>
          </div>
          {openSection === 'cedula' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {openSection === 'cedula' && (
          <div className="p-4 pt-0 space-y-4 border-t border-slate-100 bg-slate-50/50">
            {/* Frente del Documento */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">Frente del Documento</span>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">HD Escaneado</span>
              </div>
              <div className="aspect-16/9 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative group">
                <img
                  src="/src/assets/images/cedula_identificacion_1791556285619.jpg"
                  alt="Cédula Verde Escaneada Frente"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-slate-500 text-[11px]">Actualizado hace 3 días</span>
                <button
                  type="button"
                  onClick={() => onViewDoc('Cédula de Identificación Automotor (Frente)', 'DNRPA Oficial República Argentina', 'cedula_frente')}
                  className="font-bold text-slate-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Completo</span>
                </button>
              </div>
            </div>

            {/* Dorso (Código QR Oficial) */}
            <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900">Dorso (Código QR Oficial)</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">Validado</span>
              </div>
              <div className="p-4 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200">
                <div className="bg-white p-3 rounded-lg shadow-xs flex items-center gap-3">
                  <QrCode className="w-16 h-16 text-slate-950" />
                  <div className="text-left text-xs">
                    <p className="font-bold text-slate-900">QR Oficial DNRPA</p>
                    <p className="text-slate-500 text-[11px]">Validador Nacional Automotor</p>
                    <p className="text-[10px] text-emerald-700 font-bold mt-1">Listo para escáner policial</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-slate-500 text-[11px]">QR legible para escáner</span>
                <button
                  type="button"
                  onClick={() => onViewDoc('Cédula de Identificación Automotor (Dorso y QR)', 'Código de Validación Oficial DNRPA', 'cedula_dorso')}
                  className="font-bold text-slate-900 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Completo</span>
                </button>
              </div>
            </div>

            {/* Action buttons inside accordion */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => showToast('Cámara abierta para escanear nueva cédula física')}
                className="w-full h-10 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4 text-slate-600" />
                <span>Tomar foto o subir nueva cédula</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onViewDoc('Cédula Verde Digital', 'DNRPA', 'cedula_frente');
                  showToast('Descargando archivo PDF de la Cédula...');
                }}
                className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xs"
              >
                <Download className="w-4 h-4 text-[#F6C300]" />
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 2: PÓLIZA Y TARJETA DE SEGURO */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection('seguro')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center border border-blue-200">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900">Póliza y Tarjeta de Seguro</h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Pago al Día
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {vehicle.insuranceCompany} • Póliza Nº {vehicle.insurancePolicy}
              </p>
            </div>
          </div>
          {openSection === 'seguro' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {openSection === 'seguro' && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-100 bg-slate-50/50">
            <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 text-[11px]">Compañía</span>
                <p className="font-bold text-slate-900 mt-0.5">{vehicle.insuranceCompany}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Tipo Cobertura</span>
                <p className="font-bold text-slate-900 mt-0.5">Todo Riesgo / Flota</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Vigencia Hasta</span>
                <p className="font-bold text-slate-900 mt-0.5">{vehicle.insuranceExpiry}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Auxilio 24hs</span>
                <a href="tel:08008882424" className="font-bold text-amber-700 block mt-0.5 hover:underline">
                  0800-888-2424
                </a>
              </div>
            </div>

            {/* Document attachment box */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center border border-red-200 shrink-0 font-bold text-xs">
                  PDF
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Comprobante_Seguro_Obligatorio_2025</p>
                  <p className="text-[11px] text-slate-500">Certificado Mercosur & Ley Nacional de Tránsito 24.449</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onViewDoc('Póliza y Certificado Mercosur', 'La Segunda Seguros', 'seguro')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Visualizar
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Descargando póliza de seguro oficial...')}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast('Módulo de actualización de póliza abierto')}
              className="w-full h-10 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <span>Actualizar recibo de pago o póliza del mes</span>
            </button>
          </div>
        )}
      </div>

      {/* ACCORDION 3: CONTRATO DE ALQUILER Y AUTORIZACIÓN */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection('contrato')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900">Contrato de Alquiler y Autorización</h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Firma Certificada
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Contrato Marco DeRentas #DR-88219 • Habilitación Chofer
              </p>
            </div>
          </div>
          {openSection === 'contrato' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {openSection === 'contrato' && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-100 bg-slate-50/50">
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <p className="text-slate-700 leading-relaxed">
                Este documento certifica que el conductor designado cuenta con poder contractual expreso emitido por <strong className="text-slate-900 font-bold">DeRentas S.A.</strong> para la tenencia, conducción comercial y custodia de la unidad.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Firmante:</span>
                  <span className="font-bold text-slate-900">Matías E. Gómez (Apoderado DeRentas)</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Firma Digital Válida</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onViewDoc('Carta Poder Notarial DeRentas', 'Colegio de Escribanos de la Ciudad de Buenos Aires', 'contrato')}
                className="h-10 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Abrir Carta Poder Notarial</span>
              </button>

              <button
                type="button"
                onClick={() => showToast('Descargando contrato completo certificado PDF...')}
                className="h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-[#F6C300]" />
                <span>Descargar Contrato Completo (PDF)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION 4: VTV / RTO & OBLEA GNC */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div
          onClick={() => toggleSection('vtv')}
          className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors select-none"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-slate-900">VTV / RTO & Oblea GNC</h4>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  Aprobadas
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Revisión Técnica Obligatoria y Oblea de Gas ENARGAS
              </p>
            </div>
          </div>
          {openSection === 'vtv' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>

        {openSection === 'vtv' && (
          <div className="p-4 pt-0 space-y-3 border-t border-slate-100 bg-slate-50/50">
            {/* VTV Card */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-slate-900">VTV / RTO CABA & PBA</h5>
                  <p className="text-[11px] text-slate-500">Certificado {vehicle.vtvCertNumber}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  Apta
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px]">Vencimiento:</span>
                  <p className="font-bold text-slate-900">{vehicle.vtvExpiry}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Planta verificadora:</span>
                  <p className="font-bold text-slate-900">{vehicle.vtvStation}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Abrir cámara para subir foto de oblea en parabrisas')}
                className="w-full mt-1 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Actualizar Foto Oblea</span>
              </button>
            </div>

            {/* Oblea GNC */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="font-bold text-slate-900">Oblea GNC ENARGAS</h5>
                  <p className="text-[11px] text-slate-500">Cilindro Nº {vehicle.gncCylinderNumber}</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                  Vigente
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 text-[11px]">Vencimiento Oblea:</span>
                  <p className="font-bold text-slate-900">{vehicle.gncExpiry}</p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Taller instalador:</span>
                  <p className="font-bold text-slate-900">{vehicle.gncWorkshop}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Actualización de oblea GNC abierta')}
                className="w-full mt-1 h-9 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-amber-600" />
                <span>Actualizar Oblea Parabrisas</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER RETÉN CALL ASSISTANCE (Matches Image 1) */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-slate-950 flex items-center justify-center shrink-0 border border-amber-200">
            <PhoneCall className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">¿Inconveniente con un oficial en el retén?</p>
            <p className="text-[11px] text-slate-500">Llamá directo a nuestra mesa de guardia legal operativa 24/7</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onCallAssistance}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
        >
          <PhoneCall className="w-3.5 h-3.5 text-[#F6C300]" />
          <span>Llamar Guardia</span>
        </button>
      </div>

      {/* Floating "+ Subir nuevo comprobante" Button */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={() => showToast('Seleccione archivo para nuevo comprobante')}
          className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 rounded-full font-bold text-xs shadow-md flex items-center gap-2 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 text-slate-900" />
          <span>Subir nuevo comprobante</span>
        </button>
      </div>
    </div>
  );
};
