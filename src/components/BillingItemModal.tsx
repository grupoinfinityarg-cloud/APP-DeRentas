import React, { useState, useEffect } from 'react';
import { BillingItem } from '../types/fleet';
import { 
  ReceiptText, 
  X, 
  PlusCircle, 
  MinusCircle, 
  Car, 
  ShieldAlert, 
  Coins, 
  Gavel, 
  Wrench, 
  Clock, 
  Plus, 
  Split, 
  Calendar, 
  FileImage, 
  Eye, 
  Trash2, 
  BellRing, 
  ArrowRight, 
  Save, 
  CheckCircle2 
} from 'lucide-react';

interface BillingItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: BillingItem) => void;
  onDelete?: (id: string) => void;
  initialItem?: BillingItem | null;
  currentTotal: number;
}

const CATEGORIES = [
  { label: 'Cuota Base Alquiler', icon: Car },
  { label: 'Seguro & Franquicia', icon: ShieldAlert },
  { label: 'TelePASE / Peajes', icon: Coins },
  { label: 'Multa de Tránsito', icon: Gavel },
  { label: 'Fondo Taller / Mant.', icon: Wrench },
  { label: 'Mora / Recargo', icon: Clock },
  { label: 'Personalizado', icon: Plus },
];

export const BillingItemModal: React.FC<BillingItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialItem,
  currentTotal,
}) => {
  const [type, setType] = useState<'cargo' | 'descuento'>('cargo');
  const [category, setCategory] = useState<string>('Seguro & Franquicia');
  const [concept, setConcept] = useState<string>('Franquicia siniestro leve paragolpes trasero');
  const [amountStr, setAmountStr] = useState<string>('25.000');
  const [splitOption, setSplitOption] = useState<'single' | 'split'>('split');
  const [imputationDate] = useState<string>('Lunes 18 Nov, 2024');
  const [dueDate] = useState<string>('Domingo 24 Nov • 23:59 hs');
  const [hasFile, setHasFile] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>('siniestro_paragolpe_trasero_onix.jpg');
  const [notifyDriver, setNotifyDriver] = useState<boolean>(true);
  const [previewFileModal, setPreviewFileModal] = useState<boolean>(false);

  useEffect(() => {
    if (initialItem) {
      setType(initialItem.type);
      setCategory(initialItem.category);
      setConcept(initialItem.concept);
      setAmountStr(initialItem.amount.toLocaleString('es-AR'));
      setSplitOption(initialItem.installments > 1 ? 'split' : 'single');
      setNotifyDriver(initialItem.notifyDriver);
      setHasFile(!!initialItem.attachmentName);
      if (initialItem.attachmentName) setFileName(initialItem.attachmentName);
    } else {
      setType('cargo');
      setCategory('Seguro & Franquicia');
      setConcept('Franquicia siniestro leve paragolpes trasero');
      setAmountStr('25.000');
      setSplitOption('split');
      setHasFile(true);
      setFileName('siniestro_paragolpe_trasero_onix.jpg');
      setNotifyDriver(true);
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  // Numeric parsing
  const cleanNumeric = parseInt(amountStr.replace(/\D/g, ''), 10) || 0;
  const isSplit = splitOption === 'split';
  const effectiveCharge = isSplit ? Math.round(cleanNumeric / 3) : cleanNumeric;
  const impactAmount = type === 'cargo' ? effectiveCharge : -effectiveCharge;
  const projectedTotal = currentTotal + (initialItem ? (impactAmount - initialItem.amount) : impactAmount);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '');
    if (!raw) {
      setAmountStr('');
      return;
    }
    const val = parseInt(raw, 10);
    setAmountStr(val.toLocaleString('es-AR'));
  };

  const handleCategorySelect = (catLabel: string) => {
    setCategory(catLabel);
    if (!initialItem) {
      if (catLabel === 'Cuota Base Alquiler') {
        setConcept('Alquiler semanal unidad Chevrolet Onix');
      } else if (catLabel === 'Seguro & Franquicia') {
        setConcept('Franquicia siniestro leve paragolpes trasero');
      } else if (catLabel === 'TelePASE / Peajes') {
        setConcept('TelePASE adicional - Días no imputados');
      } else if (catLabel === 'Multa de Tránsito') {
        setConcept('Infracción exceso velocidad Gral. Paz');
      } else if (catLabel === 'Fondo Taller / Mant.') {
        setConcept('Reparación tren delantero y alineación');
      } else if (catLabel === 'Mora / Recargo') {
        setConcept('Recargo por pago fuera de término');
      } else {
        setConcept('Concepto especial acordado');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!concept.trim()) return;

    const newItem: BillingItem = {
      id: initialItem ? initialItem.id : `item-${Date.now()}`,
      type,
      category,
      concept,
      amount: effectiveCharge,
      installments: isSplit ? 3 : 1,
      currentInstallment: isSplit ? 1 : undefined,
      imputationDate: 'Lun 18 Nov',
      dueDate: 'Dom 24 Nov • 23:59 hs',
      attachmentName: hasFile ? fileName : undefined,
      attachmentSize: hasFile ? '2.4 MB' : undefined,
      notifyDriver,
      createdAt: new Date().toISOString(),
    };

    onSave(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-[2px] p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Container */}
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[840px] overflow-hidden border border-slate-200 animate-in slide-in-from-bottom duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Tactile Drag Bar */}
        <div className="w-full pt-3 pb-1 flex justify-center sm:hidden bg-white">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* MODAL HEADER */}
        <div className="px-5 pt-3 pb-4 border-b border-slate-200 flex items-start justify-between bg-white shrink-0">
          <div className="space-y-1.5 pr-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#F6C300] text-slate-950 shadow-sm shrink-0 font-bold">
                <ReceiptText className="w-5 h-5" />
              </span>
              <h2 className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight">
                {initialItem ? 'Editar Ítem de Cobro' : 'Editar / Nuevo Ítem de Cobro'}
              </h2>
            </div>
            <div className="flex items-center flex-wrap gap-1.5 text-xs text-slate-600">
              <span className="font-bold text-slate-900">Marcos Gómez</span>
              <span className="text-slate-300">•</span>
              <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-mono font-medium border border-slate-200">
                Chevrolet Onix AF 492 KZ
              </span>
              <span className="text-slate-300">•</span>
              <span className="bg-slate-900 text-white font-bold px-2 py-0.5 rounded text-[11px]">
                Semana #47
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors active:scale-95 shrink-0"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL SCROLLABLE FORM BODY */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-white">
          {/* 1. SELECTOR TIPO DE MOVIMIENTO */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
              Tipo de Movimiento
            </label>
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1.5">
              <button
                type="button"
                onClick={() => setType('cargo')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  type === 'cargo'
                    ? 'bg-white text-slate-900 shadow-sm font-bold border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-red-600 shrink-0 font-bold" />
                <span>Cargo / Débito <span className="text-[11px] font-normal text-slate-500 block sm:inline">(Suma)</span></span>
              </button>

              <button
                type="button"
                onClick={() => setType('descuento')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  type === 'descuento'
                    ? 'bg-white text-emerald-700 shadow-sm font-bold border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MinusCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Descuento <span className="text-[11px] font-normal text-slate-500 block sm:inline">(Resta)</span></span>
              </button>
            </div>
          </div>

          {/* 2. CATEGORÍA O ÍTEM FRECUENTE */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Categoría o Ítem Frecuente
              </label>
              <span className="text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer hover:underline">
                Ver catálogo
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.label;
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => handleCategorySelect(cat.label)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 active:scale-95 ${
                      isSelected
                        ? 'bg-[#F6C300] text-slate-950 font-bold shadow-xs border border-amber-400'
                        : 'bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isSelected ? 'text-slate-950' : 'text-slate-500'}`} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. DESCRIPCIÓN & MONTO */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-7">
              <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="concept_input">
                Concepto o Detalle *
              </label>
              <div className="relative rounded-lg border border-slate-300 bg-white focus-within:border-[#F6C300] focus-within:ring-2 focus-within:ring-amber-200 transition-all">
                <input
                  id="concept_input"
                  type="text"
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  placeholder="Ej. Peajes CABA o Reparación óptica"
                  className="w-full h-11 px-3 text-sm font-medium text-slate-900 bg-transparent border-0 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold text-slate-700 mb-1" htmlFor="amount_input">
                Monto en ARS ($) *
              </label>
              <div className="relative rounded-lg border-2 border-slate-900 bg-amber-50/70 focus-within:bg-white focus-within:border-[#F6C300] transition-all flex items-center">
                <span className="pl-3 pr-1 text-slate-900 text-xl font-bold select-none">$</span>
                <input
                  id="amount_input"
                  type="text"
                  value={amountStr}
                  onChange={handleAmountChange}
                  placeholder="0"
                  className="w-full h-11 pr-2 text-xl font-extrabold text-slate-900 bg-transparent border-0 focus:outline-none tracking-tight"
                  required
                />
                <span className="pr-3 text-xs font-bold text-slate-600 select-none">ARS</span>
              </div>
            </div>
          </div>

          {/* 4. MODALIDAD DE COBRO Y CUOTAS PRORRATEADAS */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Split className="w-4 h-4 text-[#F6C300]" />
                Plan de Cobro / Cuotas
              </span>
              <span className="text-[11px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold border border-amber-200">
                {isSplit ? 'Semana #47 a #49' : 'Semana #47'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSplitOption('single')}
                className={`flex items-start text-left gap-2.5 p-2.5 rounded-lg border transition-all ${
                  splitOption === 'single'
                    ? 'border-2 border-[#F6C300] bg-amber-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  splitOption === 'single' ? 'border-[#F6C300] bg-[#F6C300]' : 'border-slate-300'
                }`}>
                  {splitOption === 'single' && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Cobro único integral</p>
                  <p className="text-[11px] text-slate-500">Semana #47 (${cleanNumeric.toLocaleString('es-AR')})</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSplitOption('split')}
                className={`flex items-start text-left gap-2.5 p-2.5 rounded-lg border transition-all ${
                  splitOption === 'split'
                    ? 'border-2 border-[#F6C300] bg-amber-50/60 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                  splitOption === 'split' ? 'border-[#F6C300] bg-[#F6C300]' : 'border-slate-300'
                }`}>
                  {splitOption === 'split' && <div className="w-1.5 h-1.5 bg-slate-950 rounded-full" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-slate-900 leading-tight">3 Cuotas Prorrateadas</p>
                    <span className="text-[9px] bg-[#F6C300] text-slate-950 font-black px-1.5 py-0.5 rounded">Activo</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    1 de 3: <span className="text-slate-900 font-bold">${Math.round(cleanNumeric / 3).toLocaleString('es-AR')}/sem</span>
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* 5. FECHA DE IMPUTACIÓN Y VENCIMIENTO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Fecha de Imputación</label>
              <div className="flex items-center h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{imputationDate}</span>
                </div>
                <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">Sem #47</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Límite de Cancelación / Cierre</label>
              <div className="flex items-center h-10 px-3 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span>{dueDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. ADJUNTAR COMPROBANTE / FOTO DE RESPALDO */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Comprobante o Respaldo Digital</label>
            {hasFile ? (
              <div className="p-2.5 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden border border-slate-200 shrink-0 shadow-xs">
                    <FileImage className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="truncate text-left">
                    <p className="text-xs text-slate-900 truncate font-semibold">{fileName}</p>
                    <p className="text-[11px] text-slate-500">2.4 MB • Subido hace 10 min</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => setPreviewFileModal(true)}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Ver
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasFile(false)}
                    className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Quitar
                  </button>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => {
                  setHasFile(true);
                  setFileName('comprobante_factura_taller.pdf');
                }}
                className="p-4 bg-slate-50 hover:bg-slate-100 cursor-pointer rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-1 text-center transition-all"
              >
                <Plus className="w-5 h-5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-700">Subir foto o documento de respaldo</span>
                <span className="text-[10px] text-slate-500">JPG, PNG o PDF (hasta 10MB)</span>
              </div>
            )}
          </div>

          {/* 7. SWITCH NOTIFICACIÓN AL CHOFER */}
          <div className="flex items-center justify-between p-3 bg-amber-50/60 rounded-xl border border-amber-200">
            <div className="flex items-start gap-2.5 pr-2">
              <BellRing className="w-5 h-5 text-[#F6C300] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-slate-900 font-bold leading-tight">Notificar inmediatamente al chofer</p>
                <p className="text-[11px] text-slate-600">Alerta automática por WhatsApp y Notificación Push.</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={notifyDriver}
                onChange={(e) => setNotifyDriver(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-900" />
            </label>
          </div>

          {/* 8. IMPACTO EN EL TOTAL SEMANAL EN TIEMPO REAL */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Cálculo de Cierre Semanal #47
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xs text-slate-400 line-through font-medium">
                  ${currentTotal.toLocaleString('es-AR')}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="font-bold text-base text-slate-900 tabular-nums">
                  ${Math.max(0, projectedTotal).toLocaleString('es-AR')} ARS
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="inline-flex items-center gap-1 text-xs text-amber-950 bg-[#FFE08E] px-2.5 py-1 rounded-full font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />
                {type === 'cargo' ? '+' : '-'} ${effectiveCharge.toLocaleString('es-AR')} {isSplit ? 'cuota 1/3' : 'total'}
              </span>
            </div>
          </div>
        </form>

        {/* MODAL ACTIONS BAR (STICKY BOTTOM TRAY) */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5 shrink-0">
          <div className="flex items-center justify-between w-full sm:w-auto gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 h-11 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all text-center"
            >
              Cancelar
            </button>
            {initialItem && onDelete && (
              <button
                type="button"
                onClick={() => {
                  onDelete(initialItem.id);
                  onClose();
                }}
                className="w-full sm:w-auto px-3.5 h-11 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar Ítem
              </button>
            )}
          </div>

          {/* Botón Principal DeRentas (#F6C300) */}
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto px-6 h-12 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 text-sm font-bold rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Guardar Ítem en Liquidación</span>
          </button>
        </div>
      </div>

      {/* Quick Attachment Preview Lightbox */}
      {previewFileModal && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-sm text-slate-900">{fileName}</h3>
              <button 
                onClick={() => setPreviewFileModal(false)}
                className="p-1 hover:bg-slate-200 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 flex flex-col items-center justify-center text-center bg-slate-100">
              <div className="w-20 h-20 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                <FileImage className="w-10 h-10" />
              </div>
              <p className="text-sm font-bold text-slate-800">Comprobante de Respaldo Oficial</p>
              <p className="text-xs text-slate-500 mt-1">Registrado ante DeRentas Flota con hash criptográfico SHA-256 verificado.</p>
            </div>
            <div className="p-3 bg-white border-t border-slate-200 text-right">
              <button
                onClick={() => setPreviewFileModal(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
              >
                Cerrar Vista Previa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
