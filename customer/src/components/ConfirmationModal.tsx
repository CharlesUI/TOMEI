import React from "react";
import { Car } from "../Types/CarTypes";

interface ConfirmationModalProps {
  selectedCar: Car | null;
  showModal: boolean;
  paymentOption: string;
  setPaymentOption: React.Dispatch<React.SetStateAction<string>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  rentalDuration: string;
  setRentalDuration: React.Dispatch<React.SetStateAction<string>>;
  onConfirmRent: (duration: string, totalPrice: number) => void; // Updated to accept duration input
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  selectedCar,
  showModal,
  paymentOption,
  setPaymentOption,
  rentalDuration,
  setRentalDuration,
  setShowModal,
  onConfirmRent,
}) => {
  // Function to calculate total price
  const calculateTotalPrice = () => {
    if (!selectedCar || !rentalDuration) return 0;

    const durationValue = parseFloat(rentalDuration);
    let totalPrice = 0;

    if (selectedCar.pricePerHour) {
      const pricePerHour = parseFloat(
        selectedCar.pricePerHour.replace(/[^\d.-]/g, "")
      );
      totalPrice = pricePerHour * durationValue;
    } else if (selectedCar.pricePerDay) {
      const pricePerDay = parseFloat(
        selectedCar.pricePerDay.replace(/[^\d.-]/g, "")
      );
      totalPrice = pricePerDay * durationValue;
    }

    return totalPrice;
  };

  // Handle rent confirmation
  const handleConfirmRent = () => {
    const totalPrice = calculateTotalPrice();
    onConfirmRent(rentalDuration, totalPrice);
  };

  // Render payment form based on selected option
  const renderPaymentForm = () => {
    switch (paymentOption) {
      case "credit_card":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Enter Credit Card Information
            </h3>
            <input
              type="text"
              placeholder="Card Number"
              className="border rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Name on Card"
              className="border rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="CVV"
              className="border rounded-md p-2 mb-4 w-full"
            />
          </div>
        );
      case "gcash":
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Enter GCash Information
            </h3>
            <input
              type="text"
              placeholder="GCash Number"
              className="border rounded-md p-2 mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded-md p-2 mb-4 w-full"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showModal && (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div
            className="bg-white p-8 rounded-md shadow-lg max-w-lg w-full"
            style={{ maxHeight: "650px", overflowY: "auto" }}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Rental</h2>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">
                {selectedCar?.brand} {selectedCar?.modelYear}
              </h3>
              <img
                src={selectedCar?.image}
                className="w-full h-auto mb-4 rounded-md"
                alt={`Image of ${selectedCar?.brand} ${selectedCar?.modelYear}`}
                style={{ maxHeight: "300px" }}
              />
              <p>
                Price per {selectedCar?.pricePerHour ? "Hour" : "Day"}:{" "}
                {selectedCar?.pricePerHour || selectedCar?.pricePerDay}
              </p>
              <p>Passenger Capacity: {selectedCar?.passengerCapacity}</p>
              <p>Units Available: {selectedCar?.unitsAvailable}</p>
              <p>
                {selectedCar?.captainSeat
                  ? "Has Captain Seat"
                  : "No Captain Seat"}
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                Rental Duration ({selectedCar?.pricePerHour ? "Hours" : "Days"}
                ):
              </label>
              <input
                type="text"
                placeholder={`Enter number of ${
                  selectedCar?.pricePerHour ? "hours" : "days"
                }`}
                className="border rounded-md p-2 w-full"
                value={rentalDuration}
                onChange={(e) => setRentalDuration(e.target.value)}
              />
            </div>
            <p>Select Payment Option:</p>
            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="border rounded-md p-2 mb-4 w-full"
            >
              <option value="">Select Payment Option</option>
              <option value="credit_card">Credit Card</option>
              <option value="gcash">GCash</option>
            </select>
            {/* Render payment form based on selected option */}
            {renderPaymentForm()}
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
                onClick={handleConfirmRent}
              >
                Rent Now
              </button>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmationModal;
