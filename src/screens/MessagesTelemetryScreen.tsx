import React, { useState } from 'react';
import { Conversation, ChatMessage } from '../types/fleet';
import { 
  CloudRain, 
  Clock, 
  Wrench, 
  Radio, 
  Search, 
  Phone, 
  MapPin, 
  FileText, 
  Paperclip, 
  Camera, 
  Send, 
  CheckCheck, 
  Lock, 
  AlertTriangle,
  Car,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface MessagesTelemetryScreenProps {
  conversations: Conversation[];
  onOpenBroadcastModal: () => void;
  onSelectVehicleLocation: (plate: string) => void;
  onOpenDriverDocuments: () => void;
}

export const MessagesTelemetryScreen: React.FC<MessagesTelemetryScreenProps> = ({
  conversations,
  onOpenBroadcastModal,
  onSelectVehicleLocation,
  onOpenDriverDocuments,
}) => {
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [filter, setFilter] = useState<'todos' | 'pendientes' | 'cobranzas' | 'taller'>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [urgencyLevel, setUrgencyLevel] = useState<'alta' | 'general' | 'cobro'>('alta');
  const [chatList, setChatList] = useState<Conversation[]>(conversations);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeConversation = chatList.find((c) => c.id === activeConvId) || chatList[0];

  const filteredConversations = chatList.filter((conv) => {
    const matchesSearch =
      conv.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.carModel.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'pendientes') return conv.tag === 'URGENTE' || conv.unreadCount > 0;
    if (filter === 'cobranzas') return conv.tag === 'COBRO';
    if (filter === 'taller') return conv.tag === 'TALLER';
    return true;
  });

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'admin',
      senderName: 'Mesa de Operaciones DeRentas',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' AM',
      type: urgencyLevel === 'alta' ? 'alerta' : urgencyLevel === 'cobro' ? 'cobro' : 'general',
      read: true,
    };

    setChatList((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: `Vos: "${text.trim().slice(0, 35)}..."`,
            lastSender: 'Vos',
            lastTime: 'Ahora',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setInputText('');

    // Simulate driver reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'driver',
        senderName: activeConversation.driverName,
        text: 'Copiado administración. Ya me estacioné a un costado con balizas. Aguardo las indicaciones técnicas.',
        timestamp: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) + ' AM',
        read: true,
      };

      setChatList((prev) =>
        prev.map((c) => {
          if (c.id === activeConvId) {
            return {
              ...c,
              lastMessage: `Chofer: "Copiado administración. Ya me est..."`,
              lastSender: 'Chofer',
              lastTime: 'Ahora',
              messages: [...c.messages, replyMsg],
            };
          }
          return c;
        })
      );
    }, 1800);
  };

  return (
    <div className="space-y-4 pb-20">
      
      {/* Title & Hub Banner (Matches Image 3) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Centro de Mensajería & Telemetría
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Gestión de alertas en tiempo real, difusión masiva a la flota y soporte individualizado.
          </p>
        </div>

        {/* Fleet KPI Badges */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-slate-900 leading-tight">64 Vehículos</p>
              <p className="text-[11px] text-slate-500 font-medium">en Calle</p>
            </div>
          </div>

          <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-black text-amber-950 leading-tight">3 Avisos</p>
              <p className="text-[11px] text-amber-800 font-medium">Pendientes</p>
            </div>
          </div>
        </div>
      </div>

      {/* DIFUSIÓN RÁPIDA A TODA LA FLOTA (Matches Image 3) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Radio className="w-4 h-4 text-amber-600" />
            Difusión Rápida a Toda la Flota
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Plantillas operativas oficiales</span>
        </div>

        <div className="space-y-1.5">
          {/* Quick template 1 */}
          <button
            type="button"
            onClick={() => onOpenBroadcastModal()}
            className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3 text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
              <CloudRain className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">Aviso Tormenta / Granizo</p>
              <p className="text-[11px] text-slate-500 truncate">Resguardo inmediato bajo techo y precaución.</p>
            </div>
          </button>

          {/* Quick template 2 */}
          <button
            type="button"
            onClick={() => onOpenBroadcastModal()}
            className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3 text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">Recordatorio de Cuota</p>
              <p className="text-[11px] text-slate-500 truncate">Vencimiento semanal de liquidación hoy 20hs.</p>
            </div>
          </button>

          {/* Quick template 3 */}
          <button
            type="button"
            onClick={() => onOpenBroadcastModal()}
            className="w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3 text-left transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
              <Wrench className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-slate-900 truncate">Mantenimiento Preventivo</p>
              <p className="text-[11px] text-slate-500 truncate">Revisión obligatoria de frenos y aceite...</p>
            </div>
          </button>

          {/* Yellow Banner: Nueva Difusión Masiva */}
          <button
            type="button"
            onClick={onOpenBroadcastModal}
            className="w-full p-3 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-bold rounded-xl shadow-xs flex items-center gap-3 text-left transition-all active:scale-95"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-950 text-[#F6C300] flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wide">Nueva Difusión Masiva</p>
              <p className="text-[11px] text-slate-900 font-medium">Redactar comunicado con selector de urgencia.</p>
            </div>
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTERS (Matches Image 3) */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar chofer, auto o patente (ej: AF 492)"
            className="w-full h-11 pl-10 pr-3 bg-white rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#F6C300]"
          />
        </div>

        {/* Filter chips */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setFilter('todos')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              filter === 'todos' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todos (34)
          </button>
          <button
            onClick={() => setFilter('pendientes')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              filter === 'pendientes' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Pendientes (4)
          </button>
          <button
            onClick={() => setFilter('cobranzas')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              filter === 'cobranzas' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Cobranzas (2)
          </button>
          <button
            onClick={() => setFilter('taller')}
            className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
              filter === 'taller' ? 'bg-[#F6C300] text-slate-950 shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            En Taller
          </button>
        </div>
      </div>

      {/* CONVERSATION LIST (Horizontal or Accordion Selection) */}
      <div className="space-y-2">
        {filteredConversations.map((conv) => {
          const isSelected = conv.id === activeConvId;
          return (
            <div
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className={`p-3 bg-white rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? 'border-2 border-slate-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={conv.driverAvatar}
                    alt={conv.driverName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs sm:text-sm text-slate-900">{conv.driverName}</span>
                    <span className={`text-[10px] font-black px-1.5 py-0.2 rounded uppercase ${
                      conv.tag === 'URGENTE' ? 'bg-red-500 text-white' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {conv.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                    <Car className="w-3 h-3 text-slate-400" />
                    <span>{conv.carModel}</span>
                    <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1 rounded">{conv.plate}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                    <strong className="text-red-700">{conv.lastSender === 'Chofer' ? 'Chofer: ' : 'Vos: '}</strong>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-slate-400 block">{conv.lastTime}</span>
                {conv.unreadCount > 0 && (
                  <span className="inline-block mt-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ACTIVE CHAT WORKSPACE (Detailed window matching Image 3) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConversation.driverAvatar}
                  alt={activeConversation.driverName}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full absolute bottom-0 right-0" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">{activeConversation.driverName}</h3>
                  <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    Prioridad Alta
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                  <span>{activeConversation.carModel} 1.2 LT</span>
                  <span className="font-mono bg-slate-200 text-slate-900 font-bold px-1.5 rounded text-[11px]">
                    {activeConversation.plate}
                  </span>
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    GPS En línea
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Call, Location, Docs) */}
            <div className="flex items-center gap-1.5">
              <a
                href="tel:+5491145892310"
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700"
                title="Llamar chofer"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => onSelectVehicleLocation(activeConversation.plate)}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700"
                title="Ver ubicación en mapa"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
              </button>
              <button
                type="button"
                onClick={onOpenDriverDocuments}
                className="w-9 h-9 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-700"
                title="Ver documentación legal"
              >
                <FileText className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Odometer & Service Tracker (Featured in Image 3) */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80 text-slate-700">
            <div>
              <span className="text-slate-400 text-[11px]">Odómetro actual:</span>
              <span className="font-bold text-slate-900 ml-1">48.210 km</span>
            </div>
            <div>
              <span className="text-slate-400 text-[11px]">Próximo servicio:</span>
              <span className="font-bold bg-slate-950 text-white px-2 py-0.5 rounded ml-1 text-[11px]">
                50.000 km
              </span>
            </div>
            <button
              type="button"
              onClick={onOpenDriverDocuments}
              className="text-amber-800 font-bold hover:underline text-[11px]"
            >
              Ver Historial Mecánico
            </button>
          </div>
        </div>

        {/* Message Feed Canvas */}
        <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto bg-slate-50">
          <div className="text-center">
            <span className="text-[11px] bg-slate-200 text-slate-600 px-3 py-1 rounded-full font-semibold">
              Hoy, 24 de Mayo
            </span>
          </div>

          {activeConversation.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-xs space-y-2 ${
                  msg.sender === 'admin'
                    ? 'bg-slate-900 text-white rounded-br-xs'
                    : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                }`}
              >
                <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>

                {/* Attached Check Engine Photo (Featured in Image 3!) */}
                {msg.imageUrl && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-black aspect-16/9 mt-2">
                    <img
                      src={msg.imageUrl}
                      alt="Alerta de tablero testigo motor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className={`flex items-center justify-end gap-1 text-[10px] pt-1 ${
                  msg.sender === 'admin' ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'driver' && <span>• Chofer</span>}
                  {msg.sender === 'admin' && <CheckCheck className="w-3.5 h-3.5 text-amber-400" />}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-500 pl-2">
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-150" />
              <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce delay-300" />
              <span className="text-[11px]">Marcos Gómez está escribiendo...</span>
            </div>
          )}
        </div>

        {/* Quick replies & Level Selector (Matches Image 3) */}
        <div className="p-3 bg-white border-t border-slate-200 space-y-2.5">
          {/* Quick replies */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-slate-400 font-semibold shrink-0">Respuestas rápidas:</span>
            <button
              type="button"
              onClick={() => handleSendMessage('Por favor envíanos la ubicación GPS exacta para enviar asistencia.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg whitespace-nowrap text-xs font-semibold active:scale-95"
            >
              "Envíanos ubicación GPS exacta"
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('Detené la marcha inmediatamente en lugar seguro y apagá el motor.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg whitespace-nowrap text-xs font-semibold active:scale-95"
            >
              "Detené la marcha"
            </button>
            <button
              type="button"
              onClick={() => handleSendMessage('Grúa y mecánico de flota en camino. Tiempo estimado: 25 minutos.')}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg whitespace-nowrap text-xs font-semibold active:scale-95"
            >
              "Grúa en camino"
            </button>
          </div>

          {/* Level radio selector */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-500 font-semibold text-[11px]">Nivel:</span>
              <button
                type="button"
                onClick={() => setUrgencyLevel('alta')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                  urgencyLevel === 'alta'
                    ? 'bg-red-50 text-red-700 border-red-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Auxilio
              </button>
              <button
                type="button"
                onClick={() => setUrgencyLevel('general')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                  urgencyLevel === 'general'
                    ? 'bg-slate-200 text-slate-900 border-slate-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                General
              </button>
              <button
                type="button"
                onClick={() => setUrgencyLevel('cobro')}
                className={`px-2 py-1 rounded-md text-[11px] font-bold border transition-all flex items-center gap-1 ${
                  urgencyLevel === 'cobro'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Cobro
              </button>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
              <Lock className="w-3 h-3" />
              <span>Canal Cifrado</span>
            </div>
          </div>

          {/* Input text field & Send Alerta button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex-1 relative flex items-center rounded-xl border border-slate-300 bg-white focus-within:border-[#F6C300] px-2.5 sm:px-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Escribir indicación técnica...`}
                className="w-full h-10 sm:h-11 text-xs bg-transparent border-0 focus:outline-none placeholder:text-slate-400"
              />
              <div className="flex items-center gap-1 text-slate-400">
                <button type="button" className="hover:text-slate-700 p-1 hidden sm:block">
                  <Paperclip className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="hover:text-slate-700 p-1">
                  <Camera className="w-3.5 h-3.5" />
                </button>
                <button 
                  type="button" 
                  onClick={() => onSelectVehicleLocation(activeConversation.plate)}
                  className="hover:text-slate-700 p-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleSendMessage()}
              className="h-10 sm:h-11 px-3 sm:px-4 bg-[#F6C300] hover:bg-[#DFB000] text-slate-950 font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 active:scale-95 transition-all shrink-0"
            >
              <span className="hidden sm:inline">Enviar</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
