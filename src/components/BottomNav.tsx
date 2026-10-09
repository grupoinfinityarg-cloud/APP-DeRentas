import React from 'react';
import { TabType } from '../types/fleet';
import { 
  Home, 
  MapPin, 
  MessageSquare, 
  FileText, 
  Wallet 
} from 'lucide-react';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadMessagesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  unreadMessagesCount = 3,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg md:hidden">
      <div className="max-w-md mx-auto grid grid-cols-5 h-16 items-center px-1">
        
        {/* Tab 1: Inicio / Dashboard */}
        <button
          onClick={() => onTabChange('inicio')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'inicio' ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 ${activeTab === 'inicio' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'inicio' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F6C300] rounded-full" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-1 font-medium">Inicio</span>
        </button>

        {/* Tab 2: GPS Telemetría */}
        <button
          onClick={() => onTabChange('gps')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'gps' ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <MapPin className={`w-5 h-5 ${activeTab === 'gps' ? 'stroke-[2.5]' : 'stroke-2 text-blue-600'}`} />
            {activeTab === 'gps' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F6C300] rounded-full" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-1 font-medium">GPS</span>
        </button>

        {/* Tab 3: Liquidación Semanal */}
        <button
          onClick={() => onTabChange('liquidacion')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'liquidacion' ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <Wallet className={`w-5 h-5 ${activeTab === 'liquidacion' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'liquidacion' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F6C300] rounded-full" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-1 font-medium">Cobros</span>
        </button>

        {/* Tab 4: Documentos */}
        <button
          onClick={() => onTabChange('documentos')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'documentos' ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <FileText className={`w-5 h-5 ${activeTab === 'documentos' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {activeTab === 'documentos' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F6C300] rounded-full" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-1 font-medium">Cédula</span>
        </button>

        {/* Tab 5: Mensajes */}
        <button
          onClick={() => onTabChange('mensajes')}
          className={`flex flex-col items-center justify-center h-full transition-colors active:scale-95 ${
            activeTab === 'mensajes' ? 'text-slate-950 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <MessageSquare className={`w-5 h-5 ${activeTab === 'mensajes' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#F6C300] text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {unreadMessagesCount}
              </span>
            )}
            {activeTab === 'mensajes' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#F6C300] rounded-full" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-1 font-medium">Chat</span>
        </button>

      </div>
    </nav>
  );
};
