// Car.ts
export interface Car {
  _id: string;
  brand: string;
  pricePerHour: string;
  pricePerDay: string;
  passengerCapacity: string;
  unitsAvailable: string;
  modelYear: string;
  captainSeat: string;
  image: string;
}

// Rental Type
export interface Rental {
  _id: string; // Assuming the ID is a string
  carDetails: Car;
  rentalDuration: string; // Assuming duration is represented as a string
  paymentOption: "creditCard" | "gcash"; // Assuming payment options are limited to credit card and gcash
  totalPrice: number
  createdAt: Date
  // Add more fields as needed
}

