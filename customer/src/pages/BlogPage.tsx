import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { API_URL } from "../hooks/config";

interface CommentData {
  name: string;
  email: string;
  comment: string;
}

const BlogPage: React.FC = () => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [formData, setFormData] = useState<CommentData>({
    name: "",
    email: "",
    comment: "",
  });

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_URL}/comment`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData: CommentData[] = await response.json();
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle error
      }
    };

    fetchComments();
  }, []); // Empty dependency array ensures this runs once on component mount

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment: CommentData = await response.json();
      setComments([...comments, newComment]);
      setFormData({
        name: "",
        email: "",
        comment: "",
      });
    } catch (error) {
      console.error('Error posting comment:', error);
      // Handle error
    }
  };

  return (
    <div className="bg-white w-full flex flex-col items-center p-4 rounded-md">
      <div className="sm:w-4/5 flex flex-col w-full text-left justify-start p-4 max-h-full">
        <div className="text-lg font-bold mb-4">Blog Page</div>

        {/* Blog Post 1 */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Renting a Car: Benefits and Considerations
          </h2>
          <p>
            Renting a car can be more beneficial than driving your own. You may
            never know when you will be needing a vehicle for an unexpected
            situation. There will come a time that you will be on trips, family
            vacations, or to have an extra to use when your own car is under
            repair. Some apparent reason to rent a car is really something to
            consider. Find out more about this by tuning in to our blogs!
          </p>
        </div>

        {/* Blog Post 2 */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Rainy Season Travel Tips for Vehicles in the Philippines
          </h2>
          <p>
            Before you drive, always check the weather forecast. Knowing what to
            expect can help you plan better and avoid flooded areas. Choose
            routes with good drainage and safe parking spots to protect your
            vehicle from heavy rain.
            <br />
            <br />
            Taking care of your vehicle is very important, especially in the
            rain. Make sure your tires are in good condition and have the right
            air pressure for wet roads. Check your windshield wipers and replace
            them if needed to see clearly. Also, make sure all lights are
            working so you can see and be seen in the rain.
            <br />
            <br />
            When driving in the rain, safety is the most important thing. Slow
            down and keep a safe distance from other cars to avoid accidents. Be
            gentle with your steering, braking, and accelerating to stay in
            control on slippery roads. Turn on your headlights to improve
            visibility and help other drivers see you.
            <br />
            <br />
            Flooded roads can be dangerous. If you see standing water on the
            road, find another route. If you must drive through water, go slowly
            and steadily to avoid creating waves that can flood your engine or
            cause you to lose control. Avoid driving through deep water whenever
            possible.
            <br />
            <br />
            Check your vehicle's fluids regularly. Make sure the oil, coolant,
            brake fluid, and windshield washer fluid are at the right levels.
            Top them off as needed to keep your vehicle running smoothly, even
            in wet conditions.
            <br />
            <br />
            Pack an emergency kit with items like a flashlight, first-aid kit,
            portable charger, and extra clothing. These items can be beneficial
            if you run into unexpected problems or delays.
            <br />
            <br />
            Stay informed about road conditions and travel advisories. Listen to
            local news and traffic reports to know about any road closures or
            dangerous conditions. Knowing what's happening can help you make
            better decisions and stay safe.
            <br />
            <br />
            Whether you are driving a regular car or an electric one or renting
            a car, following these simple tips can help you have a safer and
            better journey during the rainy season in the Philippines. TOMEI
            Transport for your car rental needs.
          </p>
        </div>

        {/* Blog Post 3 */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Why You Need a Trusted Car Rental Service: Meet TOMEI RENTAL CAR
          </h2>
          <p>
            When it comes to getting from point A to point B, having a reliable
            mode of transportation is essential. Let's explore why it's so
            important to have access to vehicles that are safe, well-maintained,
            and trustworthy.
            <br />
            <br />
            <strong>Stay Safe on the Road:</strong> Anis Transport makes sure
            their cars are in top shape, so you can feel safe when you're
            driving. They check everything regularly to make sure the cars are
            safe for you to use.
            <br />
            <br />
            <strong>No Worries, Just Peace of Mind:</strong> You don't have to
            worry about your car breaking down. They make sure their cars work
            well, so you can relax and enjoy your trip without any stress.
            <br />
            <br />
            <strong>Friendly and Reliable Service:</strong> Drivers and customer
            service are nice and trustworthy. They're there to help you out and
            make sure you have a good experience renting from them.
            <br />
            <br />
            <strong>Easy and Flexible:</strong> They have lots of options to
            choose from, and you can rent for as long as you need. It's all
            about making things convenient for you.
            <br />
            <br />
            <strong>Get Your Money's Worth:</strong> You can get a good deal for
            your money. They offer fair prices and great service, so you know
            you're getting your money's worth.
            <br />
            <br />
            In short, having a trusted car rental service like TOMEI is
            essential for safe and stress-free travel. With their commitment to
            safety, friendly service, and flexibility, TOMEI Transport is the
            perfect choice for all your transportation needs.
          </p>
        </div>

        {/* Blog Post 4 */}
        <div className="w-full mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Enjoy Summer Adventures with TOMEI
          </h2>
          <p>
            Why choose Tomei car rental for your company's summer outings?
            <br />
            <br />
            <strong>Easy Planning:</strong> We take care of all the details,
            from choosing the right vehicle to coordinating pickup and drop-off
            locations, so you can focus on having fun with your team.
            <br />
            <br />
            <strong>Comfortable Travel:</strong> Our spacious cars and SUVs
            ensure everyone travels in comfort and style, with air conditioning
            and modern amenities for an enjoyable journey.
            <br />
            <br />
            <strong>Safety First:</strong> Our vehicles undergo regular
            maintenance checks to ensure reliability, giving you peace of mind
            as you embark on your summer adventure.
            <br />
            <br />
            <strong>Flexible Options:</strong> Whether you're heading to the
            beach, embarking on an outdoor adventure, or planning a
            team-building retreat, we can customize your transportation to fit
            your needs.
            <br />
            <br />
            <strong>Affordable Pricing:</strong> We offer competitive rates to
            suit different budgets, ensuring you get the best value without
            compromising on quality.
            <br />
            <br />
            This summer, let TOMEI car rental be your partner in creating
            memorable team-building experiences for your company. Contact us
            today to learn more and start planning your summer getaway. Let's
            make this summer one to remember with TOMEI car rental!
          </p>
        </div>

        {/* Blog posts omitted for brevity */}

        {/* Comment Form */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-md"
              required
            />
            <textarea
              name="comment"
              placeholder="Your Comment"
              value={formData.comment}
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

        {/* Display Comments */}
        <div className="w-full mt-8">
          <h3 className="text-lg font-semibold mb-4">
            Comments ({comments.length})
          </h3>
          {comments.length === 0 && (
            <p>No comments yet. Be the first to comment!</p>
          )}
          {comments.map((comment, index) => (
            <div key={index} className="border-b pb-4 mb-4">
              <p className="font-semibold">{comment.name}</p>
              <p className="text-gray-600">{comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
