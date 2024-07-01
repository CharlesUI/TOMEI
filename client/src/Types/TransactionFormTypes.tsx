// types.ts

export type ServiceType = {
    service: string;
    price: number;
  };
  
  export type TransactionFormType = {
    customerName: string;
    petName: string;
    services: ServiceType[];
    serviceDate: string; // Date input (formatted as string)
    serviceTime: string; // Time input (formatted as string)
    amount: number;
    paymentDate: string; // Date input (formatted as string)
    paymentTime: string; // Time input (formatted as string)
    cashier: string 
  };
  