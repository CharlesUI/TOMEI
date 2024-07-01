import React, { useState, useEffect } from "react";
import { API_URL } from "../hooks/config";

interface RentalData {
  _id: string;
  customerId: string;
  carDetails: {
    carId: string;
    brand: string;
    modelYear: string;
    image: string;
    pricePerHour: string;
    pricePerDay: string;
    passengerCapacity: string;
    unitsAvailable: string;
    captainSeat: string;
  };
  rentalDuration: string;
  paymentOption: string;
  totalPrice: number;
  createdAt: string;
}

const RentalRecordPage: React.FC = () => {
  const [rentals, setRentals] = useState<RentalData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const response = await fetch(`${API_URL}/rental`);
      if (!response.ok) {
        throw new Error("Failed to fetch rental data");
      }
      const data = await response.json();
      setRentals(data);
    } catch (error) {
      console.error("Error fetching rental data:", error);
      // Handle error state as needed
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredRentals = rentals.filter((rental) =>
    rental.carDetails.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white w-full h-full flex flex-col items-center p-4 rounded-md overflow-y-scroll">
      <div className="font-bold mb-4 text-2xl md:text-4xl lg:text-5xl">RENTAL DATA</div>
      <div className="w-full sm:w-4/5">
        <input
          type="text"
          placeholder="Search by Car Brand"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border p-2 rounded-md mb-4"
        />
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Car Brand</th>
              <th className="border p-2">Model Year</th>
              <th className="border p-2">Rental Duration</th>
              <th className="border p-2">Payment Option</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Rent Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredRentals.map((rental) => (
              <tr key={rental._id} className="hover:bg-gray-100">
                <td className="border p-2">{rental.carDetails.brand}</td>
                <td className="border p-2">{rental.carDetails.modelYear}</td>
                <td className="border p-2">{rental.rentalDuration}</td>
                <td className="border p-2">{rental.paymentOption}</td>
                <td className="border p-2">{rental.totalPrice}</td>
                <td className="border p-2">{new Date(rental.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RentalRecordPage;
