import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Car, 
  DollarSign, 
  Wrench, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Filter, 
  Download, 
  Layers,
  Sparkles,
  PieChart as PieIcon,
  CheckCircle2
} from 'lucide-react';

export interface PerformanceDataPoint {
  label: string;
  utilization: number;
  totalUnits: number;
  activeUnits: number;
  revenue: number;
  collected: number;
  maintenanceCost: number;
  maintFund: number;
}

// Monthly Fleet Trends
const MONTHLY_PERFORMANCE: PerformanceDataPoint[] = [
  { label: 'May', utilization: 86, totalUnits: 55, activeUnits: 47, revenue: 11200000, collected: 10600000, maintenanceCost: 1450000, maintFund: 1800000 },
  { label: 'Jun', utilization: 89, totalUnits: 58, activeUnits: 52, revenue: 12800000, collected: 12200000, maintenanceCost: 1620000, maintFund: 1950000 },
  { label: 'Jul', utilization: 91, totalUnits: 60, activeUnits: 55, revenue: 14500000, collected: 13900000, maintenanceCost: 1890000, maintFund: 2100000 },
  { label: 'Ago', utilization: 90, totalUnits: 62, activeUnits: 56, revenue: 15900000, collected: 15300000, maintenanceCost: 1750000, maintFund: 2250000 },
  { label: 'Sep', utilization: 93, totalUnits: 66, activeUnits: 61, revenue: 17400000, collected: 16800000, maintenanceCost: 1980000, maintFund: 2400000 },
  { label: 'Oct', utilization: 95, totalUnits: 68, activeUnits: 64, revenue: 18950000, collected: 18400000, maintenanceCost: 1820000, maintFund: 2550000 },
];

// Weekly granular data
const WEEKLY_PERFORMANCE: PerformanceDataPoint[] = [
  { label: 'Sem 42', utilization: 91, totalUnits: 66, activeUnits: 60, revenue: 4100000, collected: 3950000, maintenanceCost: 410000, maintFund: 580000 },
  { label: 'Sem 43', utilization: 92, totalUnits: 66, activeUnits: 61, revenue: 4250000, collected: 4120000, maintenanceCost: 480000, maintFund: 590000 },
  { label: 'Sem 44', utilization: 93, totalUnits: 67, activeUnits: 62, revenue: 4400000, collected: 4290000, maintenanceCost: 390000, maintFund: 610000 },
  { label: 'Sem 45', utilization: 94, totalUnits: 68, activeUnits: 64, revenue: 4600000, collected: 4480000, maintenanceCost: 510000, maintFund: 630000 },
  { label: 'Sem 46', utilization: 93, totalUnits: 68, activeUnits: 63, revenue: 4720000, collected: 4600000, maintenanceCost: 440000, maintFund: 640000 },
  { label: 'Sem 47', utilization: 95, totalUnits: 68, activeUnits: 65, revenue: 4950000, collected: 4820000, maintenanceCost: 420000, maintFund: 650000 },
];

// Model profitability and fleet breakdown
const MODEL_BREAKDOWN = [
  { model: 'Chevrolet Onix Plus', count: 28, share: '41%', utilization: '96.4%', avgRevenue: '$140.000/sem', avgMaintenance: '$9.200/sem', status: 'Alta Rentabilidad' },
  { model: 'Fiat Cronos Drive', count: 24, share: '35%', utilization: '95.8%', avgRevenue: '$135.000/sem', avgMaintenance: '$8.400/sem', status: 'Líder Operativo' },
  { model: 'Renault Logan II', count: 10, share: '15%', utilization: '90.0%', avgRevenue: '$120.000/sem', avgMaintenance: '$11.500/sem', status: 'Estable' },
  { model: 'Toyota Etios X', count: 6, share: '9%', utilization: '100%', avgRevenue: '$138.000/sem', avgMaintenance: '$6.800/sem', status: 'Mínimo Taller' },
];

export const PerformanceDashboardScreen: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'mensual' | 'semanal'>('mensual');
  const [activeMetricView, setActiveMetricView] = useState<'utilization' | 'revenue' | 'maintenance'>('revenue');

  const chartData: PerformanceDataPoint[] = timeRange === 'mensual' ? MONTHLY_PERFORMANCE : WEEKLY_PERFORMANCE;

  const formatCurrencyARS = (value: number) => {
    return `$${(value / 1000000).toFixed(1)}M`;
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Periodo,Ocupacion,Facturacion,Cobrado,CostoTaller,FondoMantenimiento\n" +
      chartData.map(e => `${e.label},${e.utilization}%,${e.revenue},${e.collected},${e.maintenanceCost},${e.maintFund}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `derentas_rendimiento_${timeRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-24 sm:pb-20">
      
      {/* 1. TOP HEADER & TIME FILTER */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-950 text-[#F6C300] flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Tablero de Rendimiento
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Métricas de utilización de flota, crecimiento de ingresos y costos de mantenimiento.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="p-1 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-1">
            <button
              onClick={() => setTimeRange('mensual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === 'mensual'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Últimos 6 Meses
            </button>
            <button
              onClick={() => setTimeRange('semanal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === 'semanal'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Últimas 6 Semanas
            </button>
          </div>

          <button
            onClick={handleExportCSV}
            className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl shadow-xs text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all"
            title="Exportar reporte CSV"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* 2. THREE PRIMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* KPI 1: Utilización de Flota */}
        <div 
          onClick={() => setActiveMetricView('utilization')}
          className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer shadow-xs ${
            activeMetricView === 'utilization'
              ? 'border-2 border-[#F6C300] bg-amber-50/20 shadow-sm'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Tasa de Utilización
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">94.2%</span>
              <span className="text-xs text-slate-500 font-semibold">(64 / 68 autos)</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+3.8% vs período anterior</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            4 autos en service programado
          </p>
        </div>

        {/* KPI 2: Facturación y Cobranza */}
        <div 
          onClick={() => setActiveMetricView('revenue')}
          className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer shadow-xs ${
            activeMetricView === 'revenue'
              ? 'border-2 border-[#F6C300] bg-amber-50/20 shadow-sm'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Ingresos Totales (ARS)
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">$18.95M</span>
              <span className="text-xs text-slate-500 font-semibold">ARS</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12.4% crecimiento intermensual</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            97.1% de cobrabilidad en término
          </p>
        </div>

        {/* KPI 3: Costos de Mantenimiento */}
        <div 
          onClick={() => setActiveMetricView('maintenance')}
          className={`p-4 bg-white rounded-2xl border transition-all cursor-pointer shadow-xs ${
            activeMetricView === 'maintenance'
              ? 'border-2 border-[#F6C300] bg-amber-50/20 shadow-sm'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Gasto Taller & Mantenimiento
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-slate-950 tabular-nums">$1.82M</span>
              <span className="text-xs text-slate-500 font-semibold">ARS</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-bold mt-1">
              <ArrowDownRight className="w-3.5 h-3.5" />
              <span>-8.5% menor gasto vs fondo previsto</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
            Superávit en fondo preventivo: +$730.000 ARS
          </p>
        </div>
      </div>

      {/* 3. MAIN INTERACTIVE RECHARTS GRAPH */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
        
        {/* Chart View selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-base text-slate-900">
              {activeMetricView === 'revenue' 
                ? 'Evolución de Ingresos y Cobranzas'
                : activeMetricView === 'utilization'
                ? 'Tendencia de Utilización de Flota (%)'
                : 'Control de Costos de Taller vs Fondo Preventivo'}
            </h3>
            <p className="text-xs text-slate-500">
              {activeMetricView === 'revenue'
                ? 'Comparativa entre facturación liquidada y pagos acreditados en tiempo real'
                : activeMetricView === 'utilization'
                ? 'Porcentaje de vehículos activos en calle respecto a la capacidad operativa'
                : 'Seguimiento de reparaciones, neumáticos y services preventivos de 50k'}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveMetricView('revenue')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMetricView === 'revenue' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ingresos
            </button>
            <button
              onClick={() => setActiveMetricView('utilization')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMetricView === 'utilization' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Utilización
            </button>
            <button
              onClick={() => setActiveMetricView('maintenance')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeMetricView === 'maintenance' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mantenimiento
            </button>
          </div>
        </div>

        {/* Dynamic Recharts Rendering */}
        <div className="h-72 sm:h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetricView === 'revenue' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickFormatter={formatCurrencyARS}
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <Tooltip 
                  formatter={(val: any) => [`$${Number(val).toLocaleString('es-AR')} ARS`]}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.75rem', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' 
                  }}
                  itemStyle={{ color: '#F6C300' }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
                />
                <Bar 
                  dataKey="revenue" 
                  name="Facturado Bruto" 
                  fill="#0F172A" 
                  radius={[6, 6, 0, 0]} 
                />
                <Bar 
                  dataKey="collected" 
                  name="Cobranza Acreditada" 
                  fill="#F6C300" 
                  radius={[6, 6, 0, 0]} 
                />
              </BarChart>
            ) : activeMetricView === 'utilization' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="utilizationGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F6C300" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F6C300" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <YAxis 
                  domain={[80, 100]} 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickFormatter={(v) => `${v}%`}
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <Tooltip 
                  formatter={(val: any) => [`${val}% de la flota activa`]}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.75rem', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '12px' 
                  }}
                  itemStyle={{ color: '#F6C300' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="utilization" 
                  name="% Ocupación" 
                  stroke="#D97706" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#utilizationGrad)" 
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis 
                  dataKey="label" 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={11} 
                  tickFormatter={formatCurrencyARS}
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <Tooltip 
                  formatter={(val: any) => [`$${Number(val).toLocaleString('es-AR')} ARS`]}
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '0.75rem', 
                    border: 'none', 
                    color: '#fff', 
                    fontSize: '12px' 
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="maintFund" 
                  name="Fondo Mantenimiento Recaudado" 
                  stroke="#10B981" 
                  strokeWidth={2.5} 
                  strokeDasharray="4 4"
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="maintenanceCost" 
                  name="Costo Real de Taller / Services" 
                  stroke="#EF4444" 
                  strokeWidth={3} 
                  dot={{ r: 4 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Dynamic Insight Banner */}
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Diagnóstico Operativo:</strong> La flota alcanzó un récord de <strong>95% de utilización</strong> con costos de taller 8.5% por debajo del fondo recaudado gracias a los services a tiempo de 50.000 km.
            </span>
          </div>
          <span className="font-bold text-[11px] bg-white text-slate-900 px-2 py-0.5 rounded border border-amber-300 shrink-0 hidden sm:inline">
            Eficiencia A+
          </span>
        </div>
      </div>

      {/* 4. PERFORMANCE BREAKDOWN BY VEHICLE MODEL */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div>
            <h3 className="font-black text-sm sm:text-base text-slate-900">
              Rendimiento & Utilización por Modelo de Unidad
            </h3>
            <p className="text-xs text-slate-500">
              Comparación de ocupación y costos operativos promedio por semana
            </p>
          </div>
          <span className="text-[11px] bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-full border border-slate-200 hidden sm:inline">
            4 Modelos en Operación
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="py-2.5 px-2">Modelo</th>
                <th className="py-2.5 px-2">Unidades</th>
                <th className="py-2.5 px-2">Ocupación</th>
                <th className="py-2.5 px-2">Ingreso Medio</th>
                <th className="py-2.5 px-2">Costo Taller</th>
                <th className="py-2.5 px-2 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MODEL_BREAKDOWN.map((m) => (
                <tr key={m.model} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-2 font-bold text-slate-900 flex items-center gap-2">
                    <Car className="w-4 h-4 text-slate-500" />
                    <span>{m.model}</span>
                  </td>
                  <td className="py-3 px-2 font-medium text-slate-600">
                    {m.count} autos <span className="text-[10px] text-slate-400">({m.share})</span>
                  </td>
                  <td className="py-3 px-2 font-bold text-emerald-700">
                    {m.utilization}
                  </td>
                  <td className="py-3 px-2 font-mono font-bold text-slate-900">
                    {m.avgRevenue}
                  </td>
                  <td className="py-3 px-2 font-mono text-slate-600">
                    {m.avgMaintenance}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
