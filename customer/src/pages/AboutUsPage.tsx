import { GiTargetArrows } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";

const AboutUsPage = () => {
  return (
    <div className="bg-white text-black w-full h-screen flex items-center justify-center relative overflow-y-scroll">
      <div className="sm:w-4/5 flex flex-col w-full text-left justify-start p-4 max-h-full">
        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold w-full text-center mt-10 mb-20">
          TOMEI Car Rental
        </h2>

        <p className="mb-4">
          <strong>TOMEI Cars</strong> is the connoisseur of family car rentals
          in the Philippines. Based in Cavite, our fleet consists of distinct
          sleek cars including Ford, Mitsubishi, Nissan, Honda, Toyota, all
          chosen for their reputation, comfort, and status.
        </p>

        <p className="mb-4">
          For years, we have consistently exceeded the expectations of our
          clients, earning a reputation for excellence in the industry. Our team
          of professionals is dedicated to providing quality and safe cars that
          ensure an enjoyable and stress-free experience.
        </p>

        <p className="mb-4">
          Don’t settle for anything less than the best – choose TOMEI Cars for
          your next chauffeured car service and experience the difference for
          yourself. Contact us today to book your reservation and start your
          journey in style.
        </p>

        <p className="mb-8">
          Experience the best car rental services in the Philippines. We also
          organize high-end corporate shuttle services with daily reports and a
          passenger app.
        </p>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">About TOMEI</h3>

          <p className="mb-4">
            TOMEI Rent-A-Car Services was a family business initially registered
            as a single proprietorship in 2024. It transformed into TOMEI
            Transport Services, Inc. in 2016 due to the rapidly growing demands
            of our clients and the increasing competitiveness in the industry.
            We partnered with investors to secure more resources needed to
            maintain the quality transport service we have been providing
            individual and corporate clients for the past decade.
          </p>

          <p className="mb-4">
            We, at TOMEI, always innovate and adopt best practices in the car
            rental business to better serve our esteemed customers. We value
            your time and satisfaction. Our job is to ensure that daily commute
            is the least of your concerns. TOMEI makes available to you a fleet
            of top-notch vehicles without having to worry about procurement,
            maintenance, and insurance costs. All you have to do is sit back,
            relax and enjoy the ride.
          </p>

          <p className="mb-4">
            At TOMEI, everyone can always expect to get great value leasing
            packages that come with reliable service. This has been our way of
            business through the years, making us a leader in the car rental
            industry. We strive to be on top and prove that wherever it is, we
            know how to get you there safely.
          </p>
        </div>
        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-4">Daily Rental Price List</h3>

          <ul className="list-disc list-inside">
            <li>Airport Transfer/One Way Transfer - ₱5,000.00</li>
            <li>
              Cavite Rental - ₱3,000.00 (Maximum 1 week, full itinerary within
              Cavite only)
            </li>
            <li>
              Outside Cavite Rental - ₱7,000.00 (Maximum 1 week, rate for
              outside Cavite trips varies depending on itinerary and
              destination)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-5">
          <div className="p-2 flex flex-col border-2 border-[#0d0508] rounded-md justify-start items-center">
            <h3 className="w-full text-left flex gap-2 text-2xl font-bold mb-4">
              <GiTargetArrows />
              Mission
            </h3>
            <p className="mb-4">
              Provide every client an exquisite rent-a-car experience so they
              could appreciate the trip as much as the destination.
            </p>
          </div>

          <div className="p-2 flex flex-col border-2 border-[#0d0508] rounded-md justify-start items-center">
            <h3 className="w-full text-left flex gap-2 text-2xl font-bold mb-4">
              <FaEye />
              Vision
            </h3>
            <p className="mb-4">
              We take pride in our business due to one thing: Services. Second
              to none service is all that we will provide to every TOMEI
              customer. We aim to be a transportation company that builds strong
              partnerships with our clients via a platform of genuine care.
            </p>
          </div>

          <div className="p-2 flex flex-col border-2 border-[#0d0508] rounded-md justify-start">
            <h3 className="w-full text-left flex gap-2 text-2xl font-bold mb-4">
              <FaHandshake />
              Commitments
            </h3>
            <ul className="list-disc list-inside">
              <li>Business Conduct</li>
              <li>Environmental Responsibility</li>
              <li>Social Responsibility</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
