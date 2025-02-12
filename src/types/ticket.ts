export type TicketStatus = "reserved" | "confirmed" | "cancelled";

export interface Ticket {
  id: string;
  tripId: string;
  passengerName: string;
  passengerDocument: string;
  passengerPhone: string;
  seatNumber?: string;
  price: number;
  status: TicketStatus;
  boardingPoint: string;
  landingPoint: string;
  reservationDate: Date;
}
