export interface ReserveParkingDto {
  startTime: string;
  endTime: string;
  totalPrice: number;
  totalDuration: string;
  parkingId: string;
  parkingSpaceId: string;
  cardNumber: number;
  cardholderName: string;
  cvv: string;
  expiry: string;
  postCode: string;
  registrationNumber: string;
}
