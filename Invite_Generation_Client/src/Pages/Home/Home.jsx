import { Link } from "react-router-dom";
import collegeImage from "../../assets/college_logo.png";
import "./Home.css"; // Import CSS
import Footer from "../Footer/Footer";

function Home() {
  return (
    <>
      <div className="home-container">
        {/* Header */}
        <header className="home-header">
          <img src={collegeImage} alt="College Logo" className="college-logo" />
        </header>

        {/* Hero Section */}
        <div className="hero-section">
          <h1 className="hero-title" style={{fontSize:'100px', color:"#00008A"}}>INVITEWIZ</h1>
          <Link to="/design-invitation">
            <button className="invite-button" style={{backgroundColor:'rgb(220,53,69)', padding:'20px'}}>Design Invitation →</button>
          </Link>
        </div>

        {/* Scroll to Top */}
        <button className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ↑
        </button>
        
      </div>
      <Footer/>
    </>
  );
}

export default Home;
