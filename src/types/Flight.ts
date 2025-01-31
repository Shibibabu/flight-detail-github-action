export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  status: "On Time" | "Delayed" | "Boarding" | "Departed";
}
