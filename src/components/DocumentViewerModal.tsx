import React from 'react';
import { X, Download, ShieldCheck, Printer, CheckCircle, FileText } from 'lucide-react';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle: string;
  docType: 'cedula_frente' | 'cedula_dorso' | 'seguro' | 'contrato' | 'vtv' | 'recibo';
  plate: string;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  docType,
  plate,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate simple blob text/json simulation for download
    const dummy = `DE RENTAS S.A. - DOCUMENTO OFICIAL\nTipo: ${title}\nVehiculo: ${plate}\nFecha: ${new Date().toLocaleDateString()}\nEstado: Verificado y Valido`;
    const blob = new Blob([dummy], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '_')}_${plate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-600" />
              {title}
            </h3>
            <p className="text-xs text-slate-500">{subtitle} • Patente: {plate}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Document Display Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-100 flex flex-col items-center justify-center">
          {docType === 'cedula_frente' || docType === 'cedula_dorso' ? (
            <div className="w-full max-w-lg bg-white rounded-2xl p-2 shadow-lg border border-slate-300 relative overflow-hidden">
              <img
                src="/src/assets/images/cedula_identificacion_1791556285619.jpg"
                alt="Cédula Verde Digital Oficial"
                className="w-full h-auto rounded-xl object-contain"
              />
              <div className="p-3 bg-white mt-1 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">DNRPA República Argentina</span>
                  <span className="text-[11px] text-slate-500 font-mono">Chasis Nº 8AP139420-KL92</span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Vigente 2026
                </span>
              </div>
            </div>
          ) : docType === 'seguro' ? (
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Certificado Mercosur</span>
                  <h4 className="font-black text-lg text-slate-900">LA SEGUNDA COOPERATIVA DE SEGUROS</h4>
                  <p className="text-xs text-slate-600">Póliza Nº 938-20491-01 • Certificado Ley 24.449</p>
                </div>
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-3 py-1 rounded-lg text-xs font-bold">
                  ACTIVO
                </div>
              </div>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Asegurado Titular:</span>
                  <span className="font-bold">DERENTAS FLOTA S.A.S.</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vehículo Asegurado:</span>
                  <span className="font-bold">CHEVROLET ONIX PLUS 1.0 TURBO LTZ</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Dominio / Patente:</span>
                  <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded">{plate}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Vigencia Desde / Hasta:</span>
                  <span className="font-bold text-slate-900">15/11/2024 al 15/11/2025</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tipo de Uso:</span>
                  <span className="font-bold text-amber-700">Comercial / Flota con Chofer</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 shadow-lg border border-slate-200 space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Poder Notarial</span>
                <h4 className="font-black text-lg text-slate-900">CONTRATO DE ALQUILER & PODER DE CONDUCCIÓN</h4>
                <p className="text-xs text-slate-500">Habilitación Legal Marco Chofer #DR-88219</p>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Por medio del presente instrumento privado con firmas certificadas notarialmente, <strong className="text-slate-900">DERENTAS FLOTA S.A.S.</strong> otorga la tenencia pacífica y explotación del rodado dominio <strong className="text-slate-900">{plate}</strong> a favor del conductor Marcos Alejandro Gómez (DNI 36.812.904).
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-900 font-bold block">Firma Apoderado DeRentas</span>
                  <span className="text-[11px] text-amber-800">Matías E. Gómez (T° 94 F° 210 CNP)</span>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  Validez Nacional
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3.5 bg-white border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            Documento verificado digitalmente • DNRPA & DeRentas S.A.
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Descargar PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
