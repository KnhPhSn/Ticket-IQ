export const formatTicketStatus = (status: string): string => {
  switch (status) {
    case 'TODO':
      return 'To Do';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'ASSIGNED':
      return 'Assigned';
    case 'DONE':
      return 'Done';
    default:
      return status;
  }
};
