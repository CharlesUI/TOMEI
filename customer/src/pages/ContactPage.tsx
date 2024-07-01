import React, { useState, ChangeEvent, FormEvent } from "react";
import { API_URL } from "../hooks/config";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData)
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("SOMETHING WENT WRONG")
    }

    if (response.ok) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        message: "",
      })
    }
  };

  return (
    <div className="bg-white w-full h-full flex flex-col items-center p-4 rounded-md overflow-y-scroll">
      <div className="font-bold mb-4 text-2xl md:text-4xl lg:text-5xl">CONTACT TOMEI</div>
      <div className="w-full sm:w-4/5 flex flex-col sm:flex-row justify-between max-h-full">
        <div className="w-full sm:w-1/2 p-4">
          <p className="mb-4">
            Contact us. Your voice matters. We value your opinions, concerns,
            and recommendations, and we always desire to hear from you! Should
            you need clarifications before booking our car rentals, let us hear
            them! Shoot us a message, and we’ll do our best to accommodate you.
            If you need a service outside of our scope, let’s talk about it.
            We’ll find the best way possible to meet your needs because you are
            our top priority.
          </p>
          <p>
            <strong>CALL US</strong>
            <br />
            +63 955 309 4543
          </p>
          <p>
            <strong>EMAIL US</strong>
            <br />
            <a href="mailto:tomeirentalcar@gmail.com">
              tomeirentalcar@gmail.com
            </a>
          </p>
          <p>
            <strong>VISIT US</strong>
            <br />
            Dasmarinas, Cavite
          </p>
          <p>
            <strong>OFFICE HOURS</strong>
            <br />
            Monday to Friday: 8AM to 11PM
            <br />
            Saturday and Sunday: 10AM to 6PM
          </p>
          <p>
            <strong>Reservation Booking</strong>
            <br />
            <a href="http://www.TOMEIrentacar.com">www.TOMEIrentacar.com</a>
          </p>
        </div>

        <div className="w-full sm:w-1/2 p-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="tel"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="border p-2 rounded-md resize-none"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
