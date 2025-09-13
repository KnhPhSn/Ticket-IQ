export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'ASSIGNED' | 'DONE';
  createdBy: string | { _id: string; name: string; email: string };
  assignedTo: string | { _id: string; name: string; email: string } | null;
  priority?: string;
  deadline?: string; // ISO date string
  helpfulNotes?: string;
  relatedSkills?: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface CreateTicketResponse {
  message: string;
  ticket: Ticket;
}
