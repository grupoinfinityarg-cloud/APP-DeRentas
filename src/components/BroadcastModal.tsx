import React, { useState } from 'react';
import { X, Radio, CloudRain, Clock, Wrench, Send, AlertTriangle, ShieldCheck } from 'lucide-react';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendBroadcast: (template: string, message: string, urgency: string) => void;
  activeVehiclesCount: number;
}

export const BroadcastModal: React.FC<BroadcastModalProps> = ({
  isOpen,
  onClose,
  onSendBroadcast,
  activeVehiclesCount,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<'tormenta' | 'cuota' | 'mantenimiento' | 'custom'>('tormenta');
  const [urgency, setUrgency] = useState<'Alta' | 'Media' | 'Informativa'>('Alta');
  const [messageText, setMessageText] = useState<string>(
    'ALERTA METEOROLÓGICA: Se aproxima fuerte tormenta con riesgo de caída de granizo en CABA y corredor Norte AMBA. Resguardar vehículos bajo techo de inmediato en estaciones o playas de estacionamiento habilitadas.'
  );

  if (!isOpen) return null;

  const handleTemplateSelect = (type: 'tormenta' | 'cuota' | 'mantenimiento' | 'custom') => {
    setSelectedTemplate(type);
    if (type === 'tormenta') {
      setUrgency('Alta');
      setMessageText('ALERTA METEOROLÓGICA: Se aproxima fuerte tormenta con riesgo de caída de granizo en CABA y corredor Norte AMBA. Resguardar vehículos bajo techo de inmediato.');
    } else if (type === 'cuota') {
      setUrgency('Media');
      setMessageText('RECORDATORIO DE LIQUIDACIÓN: Hoy a las 20:00 hs vence la liquidación de la Semana #47. Por favor informá tu pago mediante la app para evitar recargos administrativos.');
    } else if (type === 'mantenimiento') {
      setUrgency('Media');
      setMessageText('SERVICE PREVENTIVO: Las unidades próximas a cumplir 50.000 km deben coordinar turno de service de frenos y fluidos en Base Central antes del viernes.');
    } else {
      setUrgency('Informativa');
      setMessageText('');
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    onSendBroadcast(selectedTemplate, messageText, urgency);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F6C300] text-slate-950 flex items-center justify-center font-bold">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">Nueva Difusión Masiva</h2>
              <p className="text-xs text-slate-500">Alcance: {activeVehiclesCount} vehículos activos en calle</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSend} className="p-5 space-y-4 overflow-y-auto">
          {/* Templates */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              Plantillas Operativas Rápidas
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleTemplateSelect('tormenta')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2 ${
                  selectedTemplate === 'tormenta'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <CloudRain className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Aviso Granizo</p>
                  <p className="text-[10px] text-slate-500">Resguardo inmediato</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTemplateSelect('cuota')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2 ${
                  selectedTemplate === 'cuota'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Recordatorio Cuota</p>
                  <p className="text-[10px] text-slate-500">Cierre semanal 20hs</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTemplateSelect('mantenimiento')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2 ${
                  selectedTemplate === 'mantenimiento'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <Wrench className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Mantenimiento</p>
                  <p className="text-[10px] text-slate-500">Revisión de frenos</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleTemplateSelect('custom')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2 ${
                  selectedTemplate === 'custom'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <AlertTriangle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-900">Comunicado Libre</p>
                  <p className="text-[10px] text-slate-500">Texto personalizado</p>
                </div>
              </button>
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wider">
              Nivel de Prioridad
            </label>
            <div className="flex gap-2">
              {(['Alta', 'Media', 'Informativa'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                    urgency === lvl
                      ? lvl === 'Alta'
                        ? 'bg-red-500 text-white border-red-600 shadow-sm'
                        : lvl === 'Media'
                        ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm'
                        : 'bg-slate-800 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Message Text */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mensaje Oficial a Enviar *
            </label>
            <textarea
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Escribe el aviso a toda la flota..."
              className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#F6C300]"
              required
            />
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Se transmitirá por notificación Push prioritaria y WhatsApp a los {activeVehiclesCount} choferes.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Transmitir Difusión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
