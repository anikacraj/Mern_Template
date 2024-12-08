import React from "react";
import Footer from "../UserPages/footer";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";

const Home = () => {
  // Slider settings
  const { userId } = useParams();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const featureImages = [
    "https://via.placeholder.com/300x200.png?text=Feature+1",
    "https://via.placeholder.com/300x200.png?text=Feature+2",
    "https://via.placeholder.com/300x200.png?text=Feature+3",
    "https://via.placeholder.com/300x200.png?text=Feature+4",
  ];

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold">Effortless Scheduling with Calendly</h1>
        <p className="mt-4 text-lg md:text-2xl">
          Simplify your meetings and focus on what matters most.
        </p>
        <div className="mt-8">
          <Link to="/signup">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition-transform transform hover:scale-105">
              Get Started Free
            </button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-4 md:px-20 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-8">Why Choose Our Service ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {["Easy Scheduling", "Customizable Links", "Team Collaboration", "Integrations"].map(
            (feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-all"
              >
                <img
                  src={featureImages[index]}
                  alt={feature}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold">{feature}</h3>
                <p className="text-gray-600 mt-2">
                  {feature === "Easy Scheduling"
                    ? "Share a link and eliminate back-and-forth emails."
                    : feature === "Customizable Links"
                    ? "Personalize your scheduling experience."
                    : feature === "Team Collaboration"
                    ? "Manage team availability effortlessly."
                    : "Sync with tools you already use."}
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-12 bg-white">
        <h2 className="text-center text-3xl font-bold mb-6">How We Works</h2>
        <Slider {...sliderSettings}>
  {featureImages.map((image, index) => (
    <div key={index} className="px-4">
      <img
        src={image}
        alt={`Feature ${index + 1}`}
        className="rounded-lg shadow-lg"
      />
    </div>
  ))}
</Slider>

      </div>

      {/* Embedded Calendly Widget */}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;