import mongoose, { InferSchemaType, Schema, model } from 'mongoose';

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    status: {
      type: String,
      enum: ['TODO', 'IN_PROGRESS', 'ASSIGNED', 'DONE'],
      default: 'TODO',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide a user'],
    },
    assignedTo: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    priority: String,
    deadline: Date,
    helpfulNotes: String,
    relatedSkills: [String],
  },
  { timestamps: true }
);

export type TicketType = InferSchemaType<typeof ticketSchema>;
const Ticket = model<TicketType>('Ticket', ticketSchema);
export default Ticket;
