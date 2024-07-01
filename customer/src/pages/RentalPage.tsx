import React, { useState, useEffect } from "react";
import { Car } from "../Types/CarTypes";
import { useFetchCar } from "../hooks/useFetchCars";
import { useCustomerContext } from "../hooks/useCustomerContext";
import ConfirmationModal from "../components/ConfirmationModal";
import { API_URL } from "../hooks/config";

const CarRentalPage: React.FC = () => {
  const { state } = useCustomerContext();
  const [cars, setCars] = useState<Car[]>([]);
  const { fetchCar } = useFetchCar();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [rentalDuration, setRentalDuration] = useState<string>("");
  const [paymentOption, setPaymentOption] = useState<string>("");

  useEffect(() => {
    if (state.user?.token) {
      fetchCar(state.user.token, setCars);
    }
  }, [state.user?.token]);

  // Separate cars into two categories based on pricing type
  const carsWithHourlyPrice = cars.filter((car) => car.pricePerHour !== undefined);
  const carsWithDailyPrice = cars.filter((car) => car.pricePerDay !== undefined);

  // Function to handle renting a car
  const handleRentCar = (car: Car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  // Function to confirm rental and process payment
  const handleConfirmRent = async (duration: string, totalPrice: number) => {
    try {
      if (!selectedCar || !state.user?._id || !paymentOption) {
        throw new Error("Missing required data for rental confirmation.");
      }

      const rentalData = {
        customerId: state.user._id,
        carDetails: {
          carId: selectedCar._id,
          brand: selectedCar.brand,
          modelYear: selectedCar.modelYear,
          image: selectedCar.image,
          pricePerHour: selectedCar.pricePerHour,
          pricePerDay: selectedCar.pricePerDay,
          passengerCapacity: selectedCar.passengerCapacity,
          unitsAvailable: selectedCar.unitsAvailable,
          captainSeat: selectedCar.captainSeat,
        },
        rentalDuration: duration,
        paymentOption: paymentOption,
        totalPrice: totalPrice
      };

      const response = await fetch(`${API_URL}/rental`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rentalData),
      });

      if (!response.ok) {
        throw new Error("Failed to confirm rental.");
      }

      console.log("Rental successfully recorded:", await response.json());

      // Close modal after processing
      setShowModal(false);
    } catch (error) {
      // console.error("Error confirming rental:", error.message);
      // Handle error accordingly (e.g., show error message to user)
    }
  };

  return (
    <div className="bg-white w-full p-4 rounded-md">
      <h1 className="text-xl font-bold mb-4">Available Cars for Rent</h1>
      
      {/* Section for cars with price per hour */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-2 py-2 border-b-2 border-[#0d0508]">Cars with Hourly Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {carsWithHourlyPrice.map((car) => (
            <div
              key={car._id}
              className="flex flex-col justify-between border p-4 rounded-md shadow-md"
            >
              <>
                <h3 className="text-lg font-semibold">
                  {car.brand} {car.modelYear}
                </h3>
                <img src={car.image} className="w-full h-auto mb-4 rounded-md" alt={`Image of ${car.brand} ${car.modelYear}`} />
                <p>Price per Hour: {car.pricePerHour}</p>
                <p>Passenger Capacity: {car.passengerCapacity}</p>
                <p>Units Available: {car.unitsAvailable}</p>
                <p>{car.captainSeat ? 'Has Captain Seat' : 'No Captain Seat'}</p>
              </>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2" onClick={() => handleRentCar(car)}>
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section for cars with price per day */}
      <div>
        <h2 className="text-lg font-bold mb-2 py-2 border-b-2 border-[#0d0508]">Cars with Daily Pricing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {carsWithDailyPrice.map((car) => (
            <div
              key={car._id}
              className="flex flex-col justify-between border p-4 rounded-md shadow-md"
            >
              <>
                <h3 className="text-lg font-semibold">
                  {car.brand} {car.modelYear}
                </h3>
                <img src={car.image} className="w-full h-auto mb-4 rounded-md" alt={`Image of ${car.brand} ${car.modelYear}`} />
                <p>Price per Day: {car.pricePerDay}</p>
                <p>Passenger Capacity: {car.passengerCapacity}</p>
                <p>Units Available: {car.unitsAvailable}</p>
                <p>{car.captainSeat ? 'Has Captain Seat' : 'No Captain Seat'}</p>
              </>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2" onClick={() => handleRentCar(car)}>
                Rent Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Render ConfirmationModal component */}
      <ConfirmationModal
        selectedCar={selectedCar}
        showModal={showModal}
        setShowModal={setShowModal}
        onConfirmRent={handleConfirmRent}
        paymentOption={paymentOption}
        setPaymentOption={setPaymentOption}
        rentalDuration={rentalDuration}
        setRentalDuration={setRentalDuration}
      />
    </div>
  );
};

export default CarRentalPage;
