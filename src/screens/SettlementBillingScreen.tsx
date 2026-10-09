import React, { useState } from 'react';
import { BillingItem, PaymentRecord } from '../types/fleet';
import { BANK_DETAILS } from '../data/mockData';
import { 
  CreditCard, 
  Plus, 
  SlidersHorizontal, 
  CheckCircle2, 
  Copy, 
  Check, 
  Download, 
  MessageSquareText, 
  ShieldCheck, 
  Car, 
  Coins, 
  Wrench, 
  Clock, 
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface SettlementBillingScreenProps {
  billingItems: BillingItem[];
  payments: PaymentRecord[];
  onOpenAddItemModal: () => void;
  onOpenEditItemModal: (item: BillingItem) => void;
  onOpenPaymentModal: () => void;
  onOpenSupport: () => void;
  driverName: string;
  vehicleModel: string;
  plate: string;
}

export const SettlementBillingScreen: React.FC<SettlementBillingScreenProps> = ({
  billingItems,
  payments,
  onOpenAddItemModal,
  onOpenEditItemModal,
  onOpenPaymentModal,
  onOpenSupport,
  driverName,
  vehicleModel,
  plate,
}) => {
  const [copiedAlias, setCopiedAlias] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('Semana #47');

  // Dynamic calculations
  const totalInvoiced = billingItems.reduce((acc, item) => {
    return item.type === 'cargo' ? acc + item.amount : acc - item.amount;
  }, 0);

  const totalPaid = payments.reduce((acc, pay) => acc + pay.amount, 0);
  const pendingBalance = Math.max(0, totalInvoiced - totalPaid);
  const percentCompleted = totalInvoiced > 0 ? Math.min(100, Math.round((totalPaid / totalInvoiced) * 100)) : 100;

  const handleCopyAlias = () => {
    navigator.clipboard.writeText(BANK_DETAILS.alias);
    setCopiedAlias(true);
    setTimeout(() => setCopiedAlias(false), 2500);
  };

  const handleDownloadReceipt = () => {
    const text = `COMPROBANTE DE LIQUIDACIÓN DE RENTAS S.A.\nSemana: ${selectedWeek}\nChofer: ${driverName}\nVehículo: ${vehicleModel} (${plate})\nTotal Facturado: $${totalInvoiced.toLocaleString('es-AR')} ARS\nTotal Pagado: $${totalPaid.toLocaleString('es-AR')} ARS\nSaldo Pendiente: $${pendingBalance.toLocaleString('es-AR')} ARS\nFecha de emisión: ${new Date().toLocaleDateString('es-AR')}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `liquidacion_${selectedWeek.replace(/\s+/g, '_')}_${plate}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Top Driver & Unit Header Banner */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200 font-bold shrink-0">
            <Car className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900">{driverName}</h3>
              <span className="font-mono bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-bold px-2 py-0.5 rounded">
                {plate}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{vehicleModel} (2023)</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="bg-[#FFE08E] text-slate-950 font-black text-xs px-2.5 py-1 rounded-full border border-amber-300">
            {selectedWeek}
          </span>
          <span className="text-xs text-slate-500 font-medium">18 Nov - 24 Nov</span>
        </div>
      </div>

      {/* MAIN SETTLEMENT STATUS CARD (Matches Image 7) */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
              <CreditCard className="w-4 h-4" />
            </div>
            <h2 className="font-black text-sm sm:text-lg text-slate-900 tracking-tight uppercase">
              Estado de Liquidación
            </h2>
          </div>
          <span className="bg-amber-100 text-amber-900 font-bold text-[11px] sm:text-xs px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            Vence Dom 23:59hs
          </span>
        </div>

        {/* Financial Metrics Split */}
        <div className="grid grid-cols-2 gap-4 pt-1">
          <div>
            <span className="text-xs text-slate-500 font-medium block">Total Semanal</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight tabular-nums">
                ${totalInvoiced.toLocaleString('es-AR')}
              </span>
              <span className="text-[11px] font-bold text-slate-500">ARS</span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">facturados</span>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium block">Abonado a la Fecha</span>
            <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight tabular-nums">
                ${totalPaid.toLocaleString('es-AR')}
              </span>
              <span className="text-xs font-bold text-emerald-700">{percentCompleted}%</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-medium">liquidado</span>
          </div>
        </div>

        {/* Pending Balance Banner with [Pagar] button */}
        <div className="p-4 bg-amber-50/70 rounded-xl border border-amber-200/80 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-wider block">
              Saldo Pendiente de Pago
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black text-slate-950 tracking-tight tabular-nums">
                ${pendingBalance.toLocaleString('es-AR')}
              </span>
              <span className="text-xs font-bold text-slate-700">ARS</span>
            </div>
          </div>

          {pendingBalance > 0 ? (
            <button
              onClick={onOpenPaymentModal}
              className="px-5 py-2.5 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-bold text-xs rounded-xl shadow-sm active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pagar</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-xl font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Liquidación Cancelada</span>
            </div>
          )}
        </div>

        {/* Progress Bar & Countdown Warning */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600 font-medium">
            <span>Meta de pago semanal</span>
            <span className="font-bold text-slate-900">{percentCompleted}% completado</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-[#F6C300] transition-all duration-500 rounded-full"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 pt-0.5">
            Quedan <strong className="text-slate-900 font-bold">2 días</strong> para evitar recargo administrativo de mora ($3.500)
          </p>
        </div>

        {/* Main Action Buttons (Informar Pago vs Ajustar Ítems) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
          <button
            onClick={onOpenPaymentModal}
            className="h-12 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-bold text-sm rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Informar Pago</span>
          </button>

          <button
            onClick={onOpenAddItemModal}
            className="h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl shadow-xs active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#F6C300]" />
            <span>Ajustar Ítems</span>
          </button>
        </div>

      </div>

      {/* DESGLOSE DE LIQUIDACIÓN CARD (Matches Image 7) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <span className="text-xs">≡</span>
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Desglose de Liquidación
            </h3>
          </div>

          <button
            onClick={onOpenAddItemModal}
            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1 transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Ítem</span>
          </button>
        </div>

        {/* Item Rows */}
        <div className="space-y-2">
          {billingItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenEditItemModal(item)}
              className="p-3.5 bg-slate-50/70 hover:bg-amber-50/50 rounded-xl border border-slate-200 hover:border-amber-300 transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5 group-hover:border-amber-400">
                  {item.category.includes('Alquiler') ? (
                    <Car className="w-4 h-4 text-amber-600" />
                  ) : item.category.includes('Seguro') ? (
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  ) : item.category.includes('TelePASE') ? (
                    <Coins className="w-4 h-4 text-purple-600" />
                  ) : item.category.includes('Taller') ? (
                    <Wrench className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-600" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-900">
                      {item.category}
                    </p>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium border border-slate-200">
                      {item.installments > 1 ? `${item.installments} cuotas` : '7 días'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-1">{item.concept}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">Imputado: {item.imputationDate}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-sm sm:text-base font-extrabold tabular-nums block ${
                  item.type === 'descuento' ? 'text-emerald-600' : 'text-slate-950'
                }`}>
                  {item.type === 'descuento' ? '-' : ''}${item.amount.toLocaleString('es-AR')}
                </span>
                <span className="text-[10px] text-slate-400 font-bold block">ARS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal Footer */}
        <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs font-bold text-slate-900">
          <span className="text-slate-500 uppercase tracking-wider text-[11px]">
            Subtotal Cargos Semanales:
          </span>
          <span className="text-base font-black tabular-nums">
            ${totalInvoiced.toLocaleString('es-AR')} ARS
          </span>
        </div>
      </div>

      {/* PAGOS IMPUTADOS CARD (Matches Image 7) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm sm:text-base text-slate-900">Pagos Imputados</h3>
          </div>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
            {payments.length} pagos validados
          </span>
        </div>

        <div className="space-y-2">
          {payments.map((pay) => (
            <div
              key={pay.id}
              className="p-3 bg-slate-50/70 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">{pay.method}</p>
                    <span className="text-[10px] font-mono text-slate-500">{pay.reference}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{pay.date}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-extrabold text-emerald-700 tabular-nums block">
                  -${pay.amount.toLocaleString('es-AR')}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 uppercase">
                  {pay.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Pagado Semanal */}
        <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-xs font-bold">
          <span className="text-slate-500 uppercase tracking-wider text-[11px]">
            Total Pagado Semanal:
          </span>
          <span className="text-base font-black text-emerald-700 tabular-nums">
            ${totalPaid.toLocaleString('es-AR')} ARS
          </span>
        </div>
      </div>

      {/* DATOS BANCARIOS OFICIALES DERENTAS (Matches Image 7) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
              🏛
            </div>
            <h3 className="font-bold text-sm sm:text-base text-slate-900">
              Datos Bancarios Oficiales DeRentas
            </h3>
          </div>

          <button
            onClick={handleCopyAlias}
            className="px-2.5 py-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg border border-slate-200 flex items-center gap-1 active:scale-95 transition-all"
          >
            {copiedAlias ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAlias ? '¡Copiado!' : 'Copiar Alias'}</span>
          </button>
        </div>

        <div className="space-y-1.5 text-xs text-slate-700">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Titular:</span>
            <span className="font-bold text-slate-900">{BANK_DETAILS.titular}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">CUIT:</span>
            <span className="font-mono font-bold text-slate-900">{BANK_DETAILS.cuit}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Banco:</span>
            <span className="font-bold text-slate-900">{BANK_DETAILS.banco}</span>
          </div>
          <div className="flex justify-between items-center py-2 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200">
            <span className="text-xs font-bold text-amber-950">Alias:</span>
            <span className="font-mono font-black text-xs sm:text-sm text-slate-950 bg-white px-2.5 py-1 rounded-md border border-amber-300">
              {BANK_DETAILS.alias}
            </span>
          </div>
        </div>

        {/* Footer Support & Receipt */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <button
            onClick={onOpenSupport}
            className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <MessageSquareText className="w-4 h-4 text-emerald-600" />
            <span>Soporte Contable</span>
          </button>

          <button
            onClick={handleDownloadReceipt}
            className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-700" />
            <span>Descargar Recibo</span>
          </button>
        </div>
      </div>

    </div>
  );
};
