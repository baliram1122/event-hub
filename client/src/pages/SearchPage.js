import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import Events from '../components/Events';
import useFetch from '../hooks/useFetch';
import EventCard from '../components/EventCard';
import Footer from "../components/Footer";
import AllLoader from '../components/AllLoader';


export default function SearchPage() {
    const { data: events, loading, error, reFetch, nextPage, prevPage } = useFetch('/events');
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const searchInputRef = useRef(null);

    useEffect(() => {
        console.log("Ref:", searchInputRef.current);
        searchInputRef.current.focus();
    }, []);


    if (loading) {
        return <AllLoader/>
    };
    if (error) return <div>Error in loading events, please refresh....</div>;

    let displayedEvents = events.filter(event => event.status === 'approved').reverse();

    if (searchQuery) {
        displayedEvents = displayedEvents.filter(event => event.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (activeTab !== 'all') {
        displayedEvents = displayedEvents.filter(event => event.tag === activeTab);
    }

    const handleSearchChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
        if (value) {
            const matchingEvents = events.filter(event => event.name.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(matchingEvents);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion.name);
        setSuggestions([]);
    };

    const handleTabClick = (category) => {
        setActiveTab(category);
    };

    return (
        <div>
            <div className='position-relative'>
                <Navbar />
                <form className="d-flex input-group position-absolute top-0 mt-3 search-pg-bar z-3" style={{ right: '400px' }}>
                    <input type="search" className="form-control search-elem" placeholder="Search events" aria-label="Search" value={searchQuery} ref={searchInputRef} onChange={handleSearchChange} />
                    {suggestions.length > 0 && (
                        <ul className="list-group position-absolute top-0 z-5 suggetions" style={{ marginTop: "60px" }}>
                            {suggestions.map(event => (
                                <li className="list-group-item suggested-item" style={{ width: "250px", cursor: "pointer" }} key={event._id} onClick={() => handleSuggestionClick(event)}>{event.name}</li>
                            ))}
                        </ul>
                    )}
                </form>
            </div>
            <div className="container">
                {displayedEvents.length > 0 && <ul className="nav nav-tabs mt-4">
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} onClick={() => handleTabClick('all')}>All</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'sports' ? 'active' : ''}`} onClick={() => handleTabClick('#sports')}>Sports</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'cultural' ? 'active' : ''}`} onClick={() => handleTabClick('#cultural')}>Cultural</button>
                    </li>
                    <li className="nav-item">
                        <button className={`nav-link ${activeTab === 'fest' ? 'active' : ''}`} onClick={() => handleTabClick('#fest')}>Fest</button>
                    </li>
                </ul>}
                <div className="section-margin d-flex justify-content-center mx-2 position-relative">
                    {displayedEvents.length === 0 ? (
                        <div style={{marginTop: "-70px", marginBottom: "20px"}} className='text-center'>                 
                            <img className='searchpg-error-img' src="./images/ghost-white.gif" />
                            <h1>No Event Found</h1>
                            <p>It seems there are no events available at the moment.</p>
                        </div>
                    ) : (
                        <div className="row">
                            {displayedEvents.map((event, index) => (
                                <div key={event._id} className="col-md-3 mb-4">
                                   <div data-aos="fade-up" data-aos-delay={`${index * 50}`}><EventCard event={event} /></div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}
