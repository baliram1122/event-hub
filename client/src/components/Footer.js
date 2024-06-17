import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import React from 'react'

export default function Footer() {
    return (
        <div className="container-fluid" style={{ padding: '0' }}>
            <footer className="text-center text-lg-start text-white" style={{ backgroundColor: '#1c2331' }}>
                <section className="d-flex justify-content-between p-4" style={{ backgroundColor: 'dodgerblue' }}>
                    <div className="me-5">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <a href="/" className="text-white me-4">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="/" className="text-white me-4">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="/" className="text-white me-4">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="/" className="text-white me-4">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                    </div>
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">EventHub</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    Welcome to Event Hub, your one-stop destination for all events and happenings. Stay tuned for upcoming events.
                                </p>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Information</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href="#!" className="text-white">About Us</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Contact Us</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Terms of Services</a>
                                </p>
                                <p>
                                    <a href="#!" className="text-white">Privacy Policy</a>
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold">Explore</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p>
                                    <a href="/searchpage" className="text-white">Upcoming Events</a>
                                </p>
                                <p>
                                    <a href="/searchpage" className="text-white">Past Events</a>
                                </p>
                                <p>
                                    <a href="/searchpage" className="text-white">Event Categories</a>
                                </p>
                                <p>
                                    <a href="/searchpage" className="text-white">Help</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold">Contact</h6>
                                <hr className="mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }} />
                                <p><i className="fas fa-home mr-3"></i> SIES (NERUL) COLLEGE OF ARTS, SCIENCE AND COMMERCE. Sri Chandrasekarendra Saraswati Vidyapuram, Plot I-C, Sector V, Nerul, Navi Mumbai – 400706. INDIA</p>
                                <p><i className="fas fa-envelope mr-3"></i>ascnsies@sies.edu.in</p>
                                <p><i className="fas fa-phone mr-3"></i>61196409</p>
                                <p><i className="fas fa-print mr-3"></i>61196410</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2024 Copyright:
                    <a className="text-white" href="/">EventHub</a>
                </div>
            </footer>
        </div>
    )
}
