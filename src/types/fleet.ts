export type UserRole = 'chofer' | 'admin';

export type TabType = 'inicio' | 'mensajes' | 'liquidacion' | 'documentos' | 'perfil';

export interface BillingItem {
  id: string;
  type: 'cargo' | 'descuento';
  category: string;
  concept: string;
  amount: number;
  installments: number; // 1 = unico, 3 = cuotas
  currentInstallment?: number;
  imputationDate: string;
  dueDate: string;
  attachmentName?: string;
  attachmentSize?: string;
  notifyDriver: boolean;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  method: string;
  reference: string;
  amount: number;
  date: string;
  status: 'Acreditado' | 'En revisión' | 'Rechazado';
}

export interface Vehicle {
  plate: string;
  model: string;
  year: number;
  engine: string;
  chassis: string;
  motorNumber: string;
  fuelType: string;
  odometer: number;
  nextServiceKm: number;
  insuranceCompany: string;
  insurancePolicy: string;
  insuranceExpiry: string;
  insuranceStatus: string;
  vtvExpiry: string;
  vtvCertNumber: string;
  vtvStation: string;
  gncExpiry: string;
  gncCylinderNumber: string;
  gncWorkshop: string;
  assignedDriverId: string;
  photoUrl: string;
  lat: number;
  lng: number;
  speed: number;
  battery: number;
  network: string;
  status: 'activo' | 'alerta' | 'fuera_zona' | 'taller';
  lastPing: string;
  currentAddress: string;
}

export interface Driver {
  id: string;
  name: string;
  dni: string;
  phone: string;
  email: string;
  rating: number;
  tripsCount: number;
  role: string;
  shift: string;
  avatarUrl: string;
  vehiclePlate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'driver' | 'admin' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  imageUrl?: string;
  type?: 'alerta' | 'general' | 'cobro' | 'sistema';
  read: boolean;
}

export interface Conversation {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  carModel: string;
  plate: string;
  tag: 'URGENTE' | 'COBRO' | 'GENERAL' | 'TALLER';
  tagColor: string;
  lastMessage: string;
  lastSender: 'Chofer' | 'Vos';
  lastTime: string;
  unreadCount: number;
  online: boolean;
  messages: ChatMessage[];
}
