
import { FaFilePdf, FaArrowRight} from "react-icons/fa"
import heroimage from "../assets/image.png"
import { Link } from "react-router-dom"

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <div className="hero-badge">
                        <FaFilePdf/>
                        AI-Powered Document Assistant

                    </div>
                    <h1>Turn Your Documents
                        <br/>
                        Into <span>Smart Answers</span>
                    </h1>
                    <p>
                        Upload your PDFs and ask questions. Get instant
                        summaries, find key information and save time
                        with the power of AI.
                        
                    </p>

                    <Link to="/login"><button className="hero-btn">
                        Get Started 
                        <FaArrowRight/>
                    </button>
                    </Link>
                   
                </div>
                <div className="hero-image">
                    <img src={heroimage} alt="AI Document Assistant"/>
                </div>

            </div>
            
        </section>
    )
}

export default Hero;