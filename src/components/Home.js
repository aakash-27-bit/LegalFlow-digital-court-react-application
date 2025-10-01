import "./Home.styles.css";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import JourneySection from "./sections/JourneySection";
import InventorySection from "./sections/InventorySection";
import UpdatesSection from "./sections/UpdatesSection";
import FeaturesSection from "./sections/FeaturesSection";
import StatsSection from "./sections/StatsSection";
import StepsSection from "./sections/StepsSection";
import FinalCTASection from "./sections/FinalCTASection";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-section hero-section-wrapper">
          <HeroSection />
        </div>

        <div className="home-section inventory-section-wrapper">
          <InventorySection />
        </div>

        <div className="home-section journey-section-wrapper">
          <JourneySection />
        </div>

        <div className="home-section updates-section-wrapper">
          <UpdatesSection />
        </div>
        <div className="home-section features-section-wrapper">
          <FeaturesSection />
        </div>
        <div className="home-section stats-section-wrapper">
          <StatsSection />
        </div>
        <div className="home-section steps-section-wrapper">
          <StepsSection />
        </div>
        <div className="home-section final-cta-section-wrapper mb-24 ">
          <FinalCTASection />
        </div>
      </div>
    </>
  );
};

export default Home;
