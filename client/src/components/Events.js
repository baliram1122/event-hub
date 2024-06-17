import React from 'react';
import EventCard from './EventCard';
import useFetch from '../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Skeleton from './Skeleton';

const Events = ({ options }) => {
  const { data: events, loading, error, reFetch, nextPage, prevPage } = useFetch('/events');

  if (error) {
    return <p>Error fetching events: {error.message}</p>;
  }

  let displayedEvents = events;

  if (options && options.allEvents === false && options.eventLimit) {
    displayedEvents = events.slice(0, options.eventLimit);
  }

  displayedEvents = displayedEvents.filter(event => event.status === 'approved').reverse();

  return (
    <div className="container" id='event-container'>
      <div className="section-margin mx-2 position-relative">
        <h1 className="text-center mb-5 section-title">Events</h1>
        
        {loading ? (
          <div className="row">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : (
          <div className="row">
            {displayedEvents.map((event, index) => (
              <div key={event._id} className="col-md-3 mb-4">
                <div data-aos="fade-up" data-aos-delay={`${index * 50}`}><EventCard  event={event} /></div>
              </div>
            ))}
          </div>
        )}

        <button onClick={reFetch} title='refresh' className="btn btn-primary mt-1 position-absolute top-0">
          <FontAwesomeIcon icon={faRotateRight} />
        </button>

        {options && options.allBtn && (
          <Link to="/searchpage">
            <button className="btn btn-primary d-block mx-auto">Show All Events</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Events;
