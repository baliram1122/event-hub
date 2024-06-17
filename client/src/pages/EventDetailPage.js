import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Comment from '../components/Comment';
import AllLoader from '../components/AllLoader';

const EventDetailPage = () => {
  const { eventId } = useParams();

  const { data: event, loading, error, reFetch } = useFetch(`/events/${eventId}`);
  const { user } = useContext(AuthContext);
  const { data: fetchedUser } = useFetch(user ? `/users/${user._id}` : null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [relatedEventsLoading, setRelatedEventsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({
    name: '',
    description: '',
    formLink: '',
    tag: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    venue: '', // Added venue field
  });

  useEffect(() => {
    const fetchImage = async () => {
      if (event.image) {
        setImageSrc(`data:image/jpeg;base64,${event.image}`);
      } else {
        setImageSrc(null);
      }
    };

    fetchImage();
  }, [event.image]);

  useEffect(() => {
    if (event.tag) {
      const fetchRelatedEvents = async () => {
        try {
          setRelatedEventsLoading(true);
          const res = await fetch(`/events?tag=${event.tag}`);
          const data = await res.json();

          const filteredEvents = data.filter(
            (relatedEvent) => relatedEvent._id !== event._id && relatedEvent.tag === event.tag
          );
          setRelatedEvents(filteredEvents);
        } catch (error) {
          console.error('Error fetching related events:', error);
        } finally {
          setRelatedEventsLoading(false);
        }
      };

      fetchRelatedEvents();
    }
  }, [event]);


  if (loading) {
    return (
      <AllLoader/>
    );
  }

  if (error) {
    return (
      <h1 className='text-center text-light bg-danger'>Some error occurred. Please refresh or try again later....</h1>
    );
  }

  const toggleEditingMode = () => {
    setIsEditing(!isEditing);
    setUpdatedEvent({});
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUpdatedEvent((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateEvent = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      Object.entries(updatedEvent).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      await axios.put(`/events/${event._id}`, formData);
      toast.success('Event Updated successfully!', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setIsEditing(false);
      window.location.reload();
    } catch (err) {
      toast.error(`Error: ${err.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`/events/${event._id}`);
      toast.success('Event Deleted successfully!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      navigate("/yourevents")
    } catch (err) {
      toast.error(`Error: ${err.response.data.message}`, { position: toast.POSITION.TOP_CENTER });
    }
  };

  const isYourEvent = fetchedUser._id === event.eventIdentifier;


  const convertToBase64 = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith('image/')) {
      var reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result;
        setImage(dataUrl);
        setImageFile(file);
      };

      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };

      reader.readAsDataURL(file);
    } else {
      console.error("Selected file is not an image.");
    }
  };


  return (
    <div className="container resp-width">
      <Navbar isNavbar={true} />
      <h1 className="mb-4 mt-4 resp-width text-light">{event.name}</h1>

      {imageSrc ? (
        <img src={imageSrc} className="d-block resp-width" alt={`Event Image`} />
      ) : (
        <h1>image not found</h1>
      )}

      {isYourEvent && (
        <div className="mt-3">
          {isEditing ? (
            <>
              <div className="mb-3">
                <label htmlFor="eventName" className="form-label">
                  Event Name
                </label>
                <input
                  type="text"
                  className="input"
                  id="name"
                  value={updatedEvent.name || event.name}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='image' className='form-label'>
                  Upload Image <small className='text-danger'>(Image size should be less than 2MB)</small>
                </label>
                <input
                  type='file'
                  className='form-control'
                  id='image1'
                  accept='image/*'
                  onChange={convertToBase64}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white', border: "none" }}
                />
                {image === "" || image === null ? "" : <><small className='text-primary mt-2 mb-2'>Image preview</small><br /><img width={100} height={100} src={image} alt="Event" /></>}
              </div>

              <div className="mb-3">
                <label htmlFor="eventDescription" className="form-label">
                  Event Description
                </label>
                <textarea
                  className="input"
                  id="description"
                  value={updatedEvent.description || event.description}
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='eventDate' className='form-label'>
                  Event Date
                </label>
                <input
                  type='date'
                  className='input'
                  id='eventDate'
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='eventTime' className='form-label'>
                  Event Time
                </label>
                <input
                  type='time'
                  className='input'
                  id='eventTime'
                  onChange={handleChange}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='venue' className='form-label'>
                  Venue
                </label>
                <select
                  className='input'
                  id='venue'
                  value={updatedEvent.venue || event.venue}
                  onChange={handleChange}
                >
                  <option value=''>Select venue</option>
                  <option value='Ashok Vatika'>Ashok Vatika</option>
                  <option value='Lawn Area'>Lawn Area</option>
                  <option value='Quadrangle'>Quadrangle</option>
                  <option value='Canteen Area'>Canteen Area</option>
                  <option value='AV room'>AV room</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="eventFormLink" className="form-label">
                  Event Form Link
                </label>
                <input
                  type="text"
                  className="input"
                  id="formLink"
                  value={updatedEvent.formLink || event.formLink}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eventTag" className="form-label">
                  Event Tag
                </label>
                <input
                  type="text"
                  className="input"
                  id="tag"
                  value={updatedEvent.tag || event.tag}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="eventTag" className="form-label">
                  Event Type
                </label>
                <input
                  type="text"
                  className="input"
                  id="eventType"
                  value={updatedEvent.eventType || event.eventType}
                  onChange={handleChange}
                />
              </div>
              <button className="btn btn-success" onClick={handleUpdateEvent} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </>
          ) : (
            <div className='resp-width'>
              <button className="btn btn-warning mx-2" onClick={toggleEditingMode}>
                Update
              </button>
              <button className="btn btn-danger ml-2" onClick={handleDeleteEvent}>
                Delete Event
              </button>
            </div>
          )}
        </div>
      )}


      <div className="mt-4 resp-width text-light">
        <h4>Event Details:</h4>
        <p>{event.description}</p>
        <p>Date: {event.eventDate}</p>
        <p>Time: {event.eventTime}</p>
        <p>Venue: {event.venue}</p>
        <p>{event.tag}</p>
        {event.formLink && (
          <a href={event.formLink} className="btn btn-primary mb-5" target="_blank" rel="noopener noreferrer">
            Register
          </a>
        )}
      </div>

      {(relatedEventsLoading && relatedEvents.length > 0) ? (
        <p className='text-center mt-5'>Loading related events...</p>
      ) : (
        (relatedEvents.length > 0) && (
          <div className="mt-4 resp-width">
            <h2 className='text-center mt-5 mb-5'>Related Events</h2>
            <div className="row">
              {relatedEvents.map((relatedEvent) => (
                <div key={relatedEvent._id} className="col-md-3">
                  <EventCard event={relatedEvent} />
                </div>
              ))}
            </div>
          </div>
        )
      )}

      <div className='resp-width'>
        <Comment eventId={eventId} />
      </div>

    </div>
  );
};

export default EventDetailPage;
