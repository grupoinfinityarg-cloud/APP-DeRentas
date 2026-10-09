import React, { useState } from 'react';
import { MaintenanceRecord, MaintenanceStatus, ServiceCategory } from '../types/fleet';
import { FLEET_VEHICLES } from '../data/mockData';
import { 
  Wrench, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Car, 
  Calendar, 
  Gauge, 
  DollarSign, 
  Building2, 
  FileText, 
  Check, 
  X, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Disc,
  CircleDot
} from 'lucide-react';

interface MaintenanceLogScreenProps {
  records: MaintenanceRecord[];
  onAddRecord: (record: MaintenanceRecord) => void;
  onUpdateRecord: (record: MaintenanceRecord) => void;
  onDeleteRecord: (id: string) => void;
  onOpenQuickControl?: () => void;
}

export const MaintenanceLogScreen: React.FC<MaintenanceLogScreenProps> = ({
  records,
  onAddRecord,
  onUpdateRecord,
  onDeleteRecord,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | MaintenanceStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ServiceCategory>('all');
  
  // Modal state for Add/Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MaintenanceRecord | null>(null);

  // Form state
  const [formData, setFormData] = useState<{
    vehiclePlate: string;
    vehicleModel: string;
    driverName: string;
    category: ServiceCategory;
    serviceTitle: string;
    description: string;
    date: string;
    odometerKm: number;
    nextDueKm: number;
    nextDueDate: string;
    costARS: number;
    workshop: string;
    mechanic: string;
    status: MaintenanceStatus;
    invoiceNumber: string;
    notes: string;
  }>({
    vehiclePlate: 'AF 492 KZ',
    vehicleModel: 'Chevrolet Onix Plus 2023',
    driverName: 'Marcos Gómez',
    category: 'oil',
    serviceTitle: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    odometerKm: 48500,
    nextDueKm: 58500,
    nextDueDate: '2025-02-15',
    costARS: 85000,
    workshop: 'Taller Central Warnes',
    mechanic: 'Javier Peralta',
    status: 'up_to_date',
    invoiceNumber: 'FAC-B-00892',
    notes: '',
  });

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setFormData({
      vehiclePlate: 'AF 492 KZ',
      vehicleModel: 'Chevrolet Onix Plus 2023',
      driverName: 'Marcos Gómez',
      category: 'oil',
      serviceTitle: 'Cambio de Aceite Sintético y Filtros',
      description: 'Aceite 5W-30 sintético y cambio de filtro de aire/aceite.',
      date: new Date().toISOString().split('T')[0],
      odometerKm: 48500,
      nextDueKm: 58500,
      nextDueDate: '2025-02-15',
      costARS: 85000,
      workshop: 'Taller Central Warnes',
      mechanic: 'Javier Peralta',
      status: 'up_to_date',
      invoiceNumber: `FAC-${Math.floor(1000 + Math.random() * 9000)}`,
      notes: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (rec: MaintenanceRecord) => {
    setEditingRecord(rec);
    setFormData({
      vehiclePlate: rec.vehiclePlate,
      vehicleModel: rec.vehicleModel,
      driverName: rec.driverName || '',
      category: rec.category,
      serviceTitle: rec.serviceTitle,
      description: rec.description,
      date: rec.date,
      odometerKm: rec.odometerKm,
      nextDueKm: rec.nextDueKm,
      nextDueDate: rec.nextDueDate,
      costARS: rec.costARS,
      workshop: rec.workshop,
      mechanic: rec.mechanic,
      status: rec.status,
      invoiceNumber: rec.invoiceNumber || '',
      notes: rec.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRecord) {
      onUpdateRecord({
        ...editingRecord,
        ...formData,
      });
    } else {
      const newRec: MaintenanceRecord = {
        id: `maint-${Date.now()}`,
        ...formData,
      };
      onAddRecord(newRec);
    }
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleQuickMarkUpToDate = (rec: MaintenanceRecord) => {
    onUpdateRecord({
      ...rec,
      status: 'up_to_date',
      nextDueKm: rec.odometerKm + 10000,
      nextDueDate: '2025-06-01',
      notes: `${rec.notes ? rec.notes + ' • ' : ''}Actualizado al día por administración el ${new Date().toLocaleDateString('es-AR')}`,
    });
  };

  // Filtered records
  const filteredRecords = records.filter((rec) => {
    const matchesSearch = 
      rec.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.serviceTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.workshop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rec.driverName && rec.driverName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || rec.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // KPI calculations
  const totalCount = records.length;
  const overdueCount = records.filter(r => r.status === 'overdue').length;
  const dueSoonCount = records.filter(r => r.status === 'due_soon').length;
  const upToDateCount = records.filter(r => r.status === 'up_to_date').length;
  const totalCost = records.reduce((acc, r) => acc + r.costARS, 0);

  const getCategoryLabel = (cat: ServiceCategory) => {
    switch (cat) {
      case 'oil': return 'Aceite & Filtros';
      case 'brakes': return 'Frenos & Discos';
      case 'tires': return 'Neumáticos';
      case 'gnc': return 'Oblea GNC';
      case 'vtv': return 'VTV / RTO';
      default: return 'General';
    }
  };

  const getCategoryIcon = (cat: ServiceCategory) => {
    switch (cat) {
      case 'oil': return <Wrench className="w-4 h-4 text-amber-600" />;
      case 'brakes': return <Disc className="w-4 h-4 text-red-600" />;
      case 'tires': return <CircleDot className="w-4 h-4 text-blue-600" />;
      case 'gnc': return <Sparkles className="w-4 h-4 text-emerald-600" />;
      case 'vtv': return <ShieldCheck className="w-4 h-4 text-purple-600" />;
      default: return <Wrench className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-24 sm:pb-20">
      
      {/* 1. TOP HEADER */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-slate-950 text-[#F6C300] flex items-center justify-center font-bold shadow-xs">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Control de Flota & Talleres
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Historial de Mantenimiento
              </h1>
            </div>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Seguimiento de cambios de aceite, pastillas de frenos, rotación de neumáticos, oblea GNC y VTV con alertas automáticas.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#F6C300]" />
          <span>Nuevo Registro</span>
        </button>
      </div>

      {/* 2. SUMMARY KPI TILES CON STATUS INDICATORS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        {/* KPI 1: Overdue (Vencidos) */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'overdue' ? 'all' : 'overdue')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'overdue'
              ? 'bg-red-50 border-red-300 shadow-sm ring-2 ring-red-400'
              : 'bg-white border-slate-200 hover:border-red-200 hover:bg-red-50/30'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-red-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              Overdue
            </span>
            <div className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-red-950 tabular-nums">
              {overdueCount}
            </span>
            <span className="text-xs text-red-700 font-semibold ml-1.5">servicios</span>
          </div>
          <p className="text-[11px] text-red-700 font-medium">
            Vencidos o km excedidos
          </p>
        </div>

        {/* KPI 2: Due Soon (Próximos a Vencer) */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'due_soon' ? 'all' : 'due_soon')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'due_soon'
              ? 'bg-amber-50 border-amber-300 shadow-sm ring-2 ring-amber-400'
              : 'bg-white border-slate-200 hover:border-amber-200 hover:bg-amber-50/30'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Due Soon
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-950 tabular-nums">
              {dueSoonCount}
            </span>
            <span className="text-xs text-amber-800 font-semibold ml-1.5">próximos</span>
          </div>
          <p className="text-[11px] text-amber-700 font-medium">
            En menos de 1.500 km
          </p>
        </div>

        {/* KPI 3: Up to Date (Al Día) */}
        <div 
          onClick={() => setStatusFilter(statusFilter === 'up_to_date' ? 'all' : 'up_to_date')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'up_to_date'
              ? 'bg-emerald-50 border-emerald-300 shadow-sm ring-2 ring-emerald-400'
              : 'bg-white border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/30'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Up to Date
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950 tabular-nums">
              {upToDateCount}
            </span>
            <span className="text-xs text-emerald-700 font-semibold ml-1.5">al día</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">
            Vigentes y homologados
          </p>
        </div>

        {/* KPI 4: Inversión en Taller */}
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Gasto Acumulado
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">
              ${(totalCost / 1000).toFixed(0)}k
            </span>
            <span className="text-xs text-slate-500 font-semibold ml-1">ARS</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            {totalCount} mantenimientos en base
          </p>
        </div>

      </div>

      {/* 3. FILTERS & SEARCH */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por patente (ej: AF 492), chofer, modelo o servicio..."
              className="w-full h-10 pl-10 pr-4 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#F6C300] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status buttons filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-slate-950 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({records.length})
            </button>
            <button
              onClick={() => setStatusFilter('overdue')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === 'overdue'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              Overdue ({overdueCount})
            </button>
            <button
              onClick={() => setStatusFilter('due_soon')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === 'due_soon'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Due Soon ({dueSoonCount})
            </button>
            <button
              onClick={() => setStatusFilter('up_to_date')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                statusFilter === 'up_to_date'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Up to Date ({upToDateCount})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
            Rubro:
          </span>
          {(['all', 'oil', 'brakes', 'tires', 'gnc', 'vtv'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-[#F6C300] text-slate-950 font-black'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todos los Rubros' : getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* 4. LIST OF MAINTENANCE RECORDS */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-2">
            <Wrench className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No se encontraron registros de mantenimiento con los filtros seleccionados.</p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setCategoryFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-blue-600 hover:underline font-bold"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          filteredRecords.map((rec) => {
            const isOverdue = rec.status === 'overdue';
            const isDueSoon = rec.status === 'due_soon';
            const isUpToDate = rec.status === 'up_to_date';

            return (
              <div
                key={rec.id}
                className={`p-4 sm:p-5 rounded-2xl sm:rounded-3xl border transition-all shadow-xs flex flex-col justify-between gap-3 ${
                  isOverdue
                    ? 'bg-red-50/40 border-red-200 hover:border-red-300'
                    : isDueSoon
                    ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Row 1: Header with vehicle info, category, and status indicator */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                      isOverdue 
                        ? 'bg-red-100 border-red-200 text-red-700' 
                        : isDueSoon
                        ? 'bg-amber-100 border-amber-200 text-amber-800'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                    }`}>
                      {getCategoryIcon(rec.category)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono bg-slate-100 text-slate-950 font-black px-2 py-0.5 rounded text-xs border border-slate-200">
                          {rec.vehiclePlate}
                        </span>
                        <span className="font-bold text-xs text-slate-700">
                          {rec.vehicleModel}
                        </span>
                        {rec.driverName && (
                          <span className="text-[11px] text-slate-500 font-medium">
                            • Chofer: <strong className="text-slate-800">{rec.driverName}</strong>
                          </span>
                        )}
                      </div>

                      <h3 className="font-black text-sm sm:text-base text-slate-900 mt-0.5">
                        {rec.serviceTitle}
                      </h3>
                    </div>
                  </div>

                  {/* Status Indicator Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {isOverdue && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white flex items-center gap-1.5 shadow-xs animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>OVERDUE • VENCIDO</span>
                      </span>
                    )}
                    {isDueSoon && (
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-[#F6C300] text-slate-950 flex items-center gap-1.5 border border-amber-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>DUE SOON • PRÓXIMO</span>
                      </span>
                    )}
                    {isUpToDate && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1.5 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>UP TO DATE • AL DÍA</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description & Technical notes */}
                <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-slate-100">
                  {rec.description}
                  {rec.notes && (
                    <span className="block mt-1 text-slate-700 font-medium">
                      📌 <em>{rec.notes}</em>
                    </span>
                  )}
                </p>

                {/* Technical data grid: km, workshop, cost, due */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Kilometraje</span>
                    <span className="font-mono font-bold text-slate-900">
                      {rec.odometerKm.toLocaleString('es-AR')} km
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Próx: <strong className="text-slate-800">{rec.nextDueKm.toLocaleString('es-AR')} km</strong>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Taller & Mecánico</span>
                    <span className="font-bold text-slate-800 truncate block">{rec.workshop}</span>
                    <span className="text-[10px] text-slate-500 truncate block">{rec.mechanic}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Fecha & Factura</span>
                    <span className="font-semibold text-slate-800">{rec.date}</span>
                    <span className="text-[10px] font-mono text-slate-500 block">{rec.invoiceNumber}</span>
                  </div>

                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Costo en Taller</span>
                    <span className="font-mono font-black text-slate-900 text-sm">
                      ${rec.costARS.toLocaleString('es-AR')}
                    </span>
                    <span className="text-[10px] text-slate-500 block">ARS</span>
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Próximo vencimiento: <strong className="text-slate-800">{rec.nextDueDate}</strong></span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {rec.status !== 'up_to_date' && (
                      <button
                        onClick={() => handleQuickMarkUpToDate(rec)}
                        className="px-2.5 py-1 text-xs font-bold text-emerald-800 hover:bg-emerald-100 rounded-lg flex items-center gap-1 border border-emerald-300 transition-colors"
                        title="Marcar como realizado / al día"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Poner Al Día</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenEdit(rec)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Editar registro"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`¿Eliminar el registro "${rec.serviceTitle}" del móvil ${rec.vehiclePlate}?`)) {
                          onDeleteRecord(rec.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar registro"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* 5. MODAL AGREGAR / EDITAR MANTENIMIENTO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-slate-950 text-[#F6C300] flex items-center justify-center">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    {editingRecord ? 'Editar Servicio de Mantenimiento' : 'Nuevo Registro de Taller'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ingresá los datos técnicos, kilometraje y costos del vehículo
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSaveModal} className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 text-xs">
              
              {/* Vehicle Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Vehículo de la Flota</label>
                <select
                  value={formData.vehiclePlate}
                  onChange={(e) => {
                    const selected = FLEET_VEHICLES.find(f => f.plate === e.target.value);
                    setFormData({
                      ...formData,
                      vehiclePlate: e.target.value,
                      vehicleModel: selected ? selected.model : formData.vehicleModel,
                      driverName: selected ? selected.driver : formData.driverName,
                    });
                  }}
                  className="w-full h-10 px-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                >
                  {FLEET_VEHICLES.map((f) => (
                    <option key={f.plate} value={f.plate}>
                      {f.plate} — {f.model} ({f.driver})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rubro & Status selector */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Rubro del Servicio</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory })}
                    className="w-full h-10 px-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  >
                    <option value="oil">Aceite & Filtros</option>
                    <option value="brakes">Frenos & Discos</option>
                    <option value="tires">Neumáticos & Alineación</option>
                    <option value="gnc">Oblea & Cilindro GNC</option>
                    <option value="vtv">VTV / RTO Inspección</option>
                    <option value="general">Mecánica General</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estado del Servicio</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as MaintenanceStatus })}
                    className="w-full h-10 px-3 font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  >
                    <option value="up_to_date">Up to Date (Al Día)</option>
                    <option value="due_soon">Due Soon (Próximo)</option>
                    <option value="overdue">Overdue (Vencido)</option>
                  </select>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título del Mantenimiento</label>
                <input
                  type="text"
                  required
                  value={formData.serviceTitle}
                  onChange={(e) => setFormData({ ...formData, serviceTitle: e.target.value })}
                  placeholder="Ej: Cambio de Aceite Sintético 5W-30 y Filtros"
                  className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción de las tareas realizadas</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detalle de repuestos, lubricantes y revisiones efectuadas..."
                  className="w-full p-2.5 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                />
              </div>

              {/* Odometer, Cost & Dates */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Km al Service</label>
                  <input
                    type="number"
                    value={formData.odometerKm}
                    onChange={(e) => setFormData({ ...formData, odometerKm: Number(e.target.value) })}
                    className="w-full h-10 px-3 font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Próximo Service (Km)</label>
                  <input
                    type="number"
                    value={formData.nextDueKm}
                    onChange={(e) => setFormData({ ...formData, nextDueKm: Number(e.target.value) })}
                    className="w-full h-10 px-3 font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha Realizado</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha Próximo Vencimiento</label>
                  <input
                    type="date"
                    value={formData.nextDueDate}
                    onChange={(e) => setFormData({ ...formData, nextDueDate: e.target.value })}
                    className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Costo Total ($ ARS)</label>
                  <input
                    type="number"
                    value={formData.costARS}
                    onChange={(e) => setFormData({ ...formData, costARS: Number(e.target.value) })}
                    className="w-full h-10 px-3 font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nro de Factura / Recibo</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
                    placeholder="FAC-B-00892"
                    className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>
              </div>

              {/* Workshop & Mechanic */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Taller Oficial / Proveedor</label>
                  <input
                    type="text"
                    value={formData.workshop}
                    onChange={(e) => setFormData({ ...formData, workshop: e.target.value })}
                    placeholder="Taller Central Warnes"
                    className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mecánico Responsable</label>
                  <input
                    type="text"
                    value={formData.mechanic}
                    onChange={(e) => setFormData({ ...formData, mechanic: e.target.value })}
                    placeholder="Javier Peralta"
                    className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Observaciones</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Próximo service incluye bujías y correa..."
                  className="w-full h-10 px-3 font-medium bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#F6C300]"
                />
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-black bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 rounded-xl shadow-xs active:scale-95 transition-all"
                >
                  {editingRecord ? 'Guardar Cambios' : 'Registrar Mantenimiento'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
