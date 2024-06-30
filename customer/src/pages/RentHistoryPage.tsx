import React, { useEffect, useState } from 'react';
import { useCustomerContext } from '../hooks/useCustomerContext';
import { Rental } from '../Types/CarTypes';
import { useFetchRentHistory } from '../hooks/useFetchRentHistory';

const RentHistoryPage = () => {
  const [rentalHistory, setRentalHistory] = useState<Rental[]>([]);
  const { state } = useCustomerContext();
  const { fetchRentHistory } = useFetchRentHistory();

  useEffect(() => {
    if (state.user) {
      fetchRentHistory(state.user._id, state.user.token, setRentalHistory);
    }
  }, []);

  return (
    <div className="bg-white w-full flex flex-col grow sm:flex-row p-4 rounded-md relative">
      <div className="sm:w-4/5 flex flex-col w-full text-left justify-start p-4">
        <h1 className="text-xl font-bold mb-4">My Rents</h1>
        {rentalHistory.length === 0 ? (
          <p>No rental history available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {rentalHistory.map((rental) => (
              <div
                key={rental._id}
                className="flex flex-col justify-between border p-4 rounded-md shadow-md"
              >
                <h3 className="text-lg font-semibold">
                  {rental.carDetails.brand} {rental.carDetails.modelYear}
                </h3>
                <img
                  src={rental.carDetails.image}
                  className="w-full h-auto mb-4 rounded-md"
                  alt={`Rented Car - ${rental.carDetails.brand} ${rental.carDetails.modelYear}`}
                />
                <p>Rent Duration: {rental.carDetails.pricePerHour ? `${rental.rentalDuration} hours` : `${rental.rentalDuration} day`}</p>
                <p>Total: ₱{rental.totalPrice}</p>
                <p>Payment Option: {rental.paymentOption}</p>
                <p>Date of Rental: {new Date(rental.createdAt).toLocaleDateString()}</p>
                {/* Displaying rental date */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RentHistoryPage;
