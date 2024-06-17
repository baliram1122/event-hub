import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "./Loading";

export default function Hero() {
    return (
        
        <div className="container-fluid">
            <div className="row flex-lg-row-reverse justify-content-center align-items-center col-xxl-10 mx-auto py-3">
                <div class="col-lg-4 col-md-9 ms-lg-5 hero-img-container">
                    <div class="row mx-1">
                        <div class="col-4 col-md-4 col-lg-5 d-flex gap-4 mb-lg-0">
                            <img src="./images/hero_img1.png" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Boat on Calm Water" />
                            <img src="./images/hero_img2.jpg" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Wintry Mountain Landscape" />
                            <img src="./images/event.avif" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Event" />
                        </div>
                    </div>

                    <div class="row mx-4">
                        <div class="col-4 col-md-4 col-lg-5  d-flex gap-4 mb-lg-0">
                            <img src="./images/event1.jpg" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Event 1" />
                            <img src="./images/event2.jpg" class="w-100 shadow-1-strong rounded mb-3" alt="Event 2" />
                            <img src="./images/hero_img.webp" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Event 3" />
                        </div>
                    </div>

                    <div class="row mx-1">
                        <div class="col-4 col-md-4 col-lg-5 d-flex gap-4 mb-lg-0">
                            <img src="./images/hero_img4.jpg" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Event 4" />
                            <img src="./images/hero_img5.jpg" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Event 5" />
                            <img src="./images/hero_img6.jpg" class="w-100 shadow-1-strong rounded imgg mb-3" alt="Event 6" />
                        </div>
                    </div>
                </div>

                <div className="col-lg-5 ps-lg-5 hero-text-container mt-md-5">
                    <div className="lc-block mb-4">
                        <div editable="rich">
                            <h1 className="rfs-30 fw-bold fs-md-3 hero-title">SPARK CENTRAL</h1>
                        </div>
                    </div>
                    <div className="lc-block mb-4">
                        <div editable="">
                            <p className="hero-para">Discover the epicenter of campus excitement. Dive into a world of vibrant events that spark creativity, ignite passions, and create unforgettable memories!</p>
                        </div>
                    </div>
                    <div className="lc-block">
                        {/* <a class="btn btn-primary" href="#event-container" role="button">Let's Go!</a> */}
                        <a href="#event-container" className="butn"><span>Let's Go</span><span class="arrow"><FontAwesomeIcon icon={faArrowRight} /></span></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
