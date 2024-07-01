
const HomePage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
        <source src="https://videos.pexels.com/video-files/856148/856148-hd_1920_1080_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-center text-xl md:text-3xl lg:text-5xl font-bold">DRIVE THE EXPERIENCE, RENT THE JOURNEY</h2>
      </div>
      <div className="sm:w-4/5 flex flex-col w-full text-left justify-start p-4">
        <div>
          HOME CONTENT
        </div>
      </div>
    </div>
  );
};

export default HomePage;
