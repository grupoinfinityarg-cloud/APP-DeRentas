import React, { useState } from 'react';
import { PaymentRecord } from '../types/fleet';
import { X, CheckCircle, CreditCard, Landmark, Banknote, Upload, ShieldCheck } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payment: PaymentRecord) => void;
  pendingAmount: number;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  pendingAmount,
}) => {
  const [method, setMethod] = useState<'Mercado Pago' | 'Transferencia Bancaria' | 'Efectivo en Base'>('Mercado Pago');
  const [amountStr, setAmountStr] = useState<string>(pendingAmount > 0 ? pendingAmount.toLocaleString('es-AR') : '50.000');
  const [reference, setReference] = useState<string>('MP-' + Math.floor(100000 + Math.random() * 900000));
  const [uploadedReceipt, setUploadedReceipt] = useState<string>('comprobante_pago.pdf');

  if (!isOpen) return null;

  const numericAmount = parseInt(amountStr.replace(/\D/g, ''), 10) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numericAmount <= 0) return;

    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      method: method === 'Mercado Pago' ? 'Transferencia Mercado Pago' : method,
      reference: `#${reference}`,
      amount: numericAmount,
      date: `Hoy - ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}hs`,
      status: 'Acreditado',
    };

    onSubmit(newPayment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F6C300] text-slate-950 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">Informar Pago de Cuota</h2>
              <p className="text-xs text-slate-500">Imputación a Liquidación Semana #47</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto">
          {/* Method selector */}
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-2 uppercase tracking-wider">
              Medio de Pago Utilizado
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMethod('Mercado Pago');
                  setReference('MP-' + Math.floor(100000 + Math.random() * 900000));
                }}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                  method === 'Mercado Pago'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold text-slate-950'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Mercado Pago</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMethod('Transferencia Bancaria');
                  setReference('GAL-' + Math.floor(100000 + Math.random() * 900000));
                }}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                  method === 'Transferencia Bancaria'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold text-slate-950'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Transferencia</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMethod('Efectivo en Base');
                  setReference('REC-' + Math.floor(1000 + Math.random() * 9000));
                }}
                className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1 transition-all ${
                  method === 'Efectivo en Base'
                    ? 'border-2 border-[#F6C300] bg-amber-50 font-bold text-slate-950'
                    : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                  <Banknote className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Efectivo Base</span>
              </button>
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Monto Abonado (ARS) *</label>
            <div className="relative rounded-xl border-2 border-slate-900 bg-amber-50 flex items-center px-3 py-1">
              <span className="text-slate-900 font-bold text-xl mr-2">$</span>
              <input
                type="text"
                value={amountStr}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '');
                  setAmountStr(raw ? parseInt(raw, 10).toLocaleString('es-AR') : '');
                }}
                className="w-full text-2xl font-black text-slate-900 bg-transparent border-0 focus:outline-none"
                placeholder="0"
                required
              />
              <span className="text-xs font-bold text-slate-600">ARS</span>
            </div>
            {pendingAmount > 0 && (
              <p className="text-[11px] text-slate-500 mt-1">
                Saldo pendiente actual: <span className="font-bold text-slate-900">${pendingAmount.toLocaleString('es-AR')} ARS</span>
              </p>
            )}
          </div>

          {/* Reference input */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Nº Comprobante / Operación</label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full h-11 px-3 text-sm font-medium rounded-lg border border-slate-300 focus:outline-none focus:border-[#F6C300]"
              placeholder="Ej: 94821038"
              required
            />
          </div>

          {/* Receipt upload simulation */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Comprobante Digital</label>
            <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-semibold text-slate-800">{uploadedReceipt}</span>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">Adjunto OK</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <span>El pago se imputará en tiempo real y emitirá el recibo fiscal correspondiente.</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 rounded-xl text-xs font-bold shadow-md flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Confirmar Imputación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
