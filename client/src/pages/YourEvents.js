import React, { useContext } from 'react';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';
import EventCard from '../components/EventCard';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Skeleton from '../components/Skeleton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import AllLoader from '../components/AllLoader';

export default function YourEvents() {
    const { user } = useContext(AuthContext);
    const { data: fetchedUser } = useFetch(user ? `/users/${user._id}` : null);
    const { data: events, loading, error, reFetch } = useFetch('/events');
    const navigate = useNavigate();

    if (error) {
        return <p>Error fetching events: {error.message}</p>;
    }

    const filteredEvents = events.filter(event => fetchedUser._id === event.eventIdentifier);

    filteredEvents.reverse()

    return (
        <>
            <Navbar isNavbar={true} />
            {filteredEvents.length == 0 ?
                <AllLoader/> :
                <div className="container position-relative">
                    <h1 className="text-center mt-5 section-title">My Events</h1>
                    {/* <button onClick={reFetch} title='refresh' style={{ top: "-80px" }} className="btn btn-primary position-absolute">
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button> */}
                    <div className="mt-5 mx-2">

                        {loading ? (
                            <div className="row">
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                                <Skeleton />
                            </div>
                        ) :
                            (<div className="row">
                                {filteredEvents.map((event) => (
                                    <div key={event._id} className="col-md-3 mb-4">
                                        <EventCard event={event} status={true} />
                                    </div>
                                ))}
                            </div>)}
                    </div>
                </div>}
            <Footer />
        </>
    );
}
