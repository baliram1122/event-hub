import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';

const EventCard = ({ event, status }) => {
  const { user } = useContext(AuthContext);
  const { data: fetchedUser } = useFetch(user ? `/users/${user._id}` : null);

  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {

      if (event.image) {
        setImageSrc(`data:image/jpeg;base64,${event.image}`);
      }
    };

    fetchImage();
  }, [event.image]);


  return (
    <div id='card' className="card mb-3 position-relative text-light bg-dark">
      <Link to={`/event/${event._id}`}>
        {imageSrc ? (
          <div>
            <img src={imageSrc} className='card-img-top' alt={event.name} />
            {status && (
              <div className={`event-status-tag position-absolute top-0 ms-2 mt-2 p-1 text-light ${event.status === 'rejected' ? 'bg-danger' : (event.status === 'pending' ? 'bg-primary' : 'bg-success')}`}>
                {event.status}
              </div>
            )}

          </div>
        ) : (
          <div className="image-placeholder">
            <svg width="255" height="260" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" preserveAspectRatio="none">
              <defs>
                <style type="text/css">
                  {`
                  #holder_18d630116d0 text {
                    fill: rgba(255, 255, 255, 0.75);
                    font-weight: normal;
                    font-family: Helvetica, monospace;
                    font-size: 10pt;
                  }
                `}
                </style>
              </defs>
              <rect width="200" height="200" fill="#777"></rect>
              <g>
                <text x="50" y="105">Loading Image</text>
              </g>
            </svg>
          </div>

        )}
      </Link>
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        <p className="card-text overflow-hidden">{event.description}</p>
        <p className="card-text" style={{fontSize: "14px"}}>Date: {event.eventDate}</p>

        {event.formLink && (
          <a href={event.formLink} className="btn btn-primary btn-sm">
            Register
          </a>
        )}
      </div>
    </div>
  );
};

export default EventCard;
