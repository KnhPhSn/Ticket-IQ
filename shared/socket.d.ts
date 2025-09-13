export interface ServerToClientEvents {
  'analyzing-ticket': () => void;
  'assigning-moderator': () => void;
  'ticket-assigned': (ticketId: string) => void;
  'ticket-assigned-to-you': (ticketId: string) => void;
  'user-online': (userId: string) => void;
  'user-offline': (userId: string) => void;
}

export interface ClientToServerEvents {}

export interface SocketData {
  userId: string;
  name: string;
  email: string;
  role: string;
}
