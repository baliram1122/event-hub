import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { EventContext } from '../context/EventContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../hooks/useFetch';
import { AuthContext } from '../context/AuthContext';

export default function AddEvent() {
    const { user } = useContext(AuthContext);
    const { data: fetchedUser } = useFetch(user ? `/users/${user._id}` : null);
    const { loading, error, dispatch } = useContext(EventContext);
    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [useImageLink, setUseImageLink] = useState(false);
    const navigate = useNavigate();
    const { data: events, loading1, error1, reFetch, nextPage, prevPage } = useFetch('/events', 10);

    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        images: [],
        formLink: '',
        tag: '',
        eventType: '',
        eventIdentifier: fetchedUser ? fetchedUser._id : '',
        eventDate: '',
        eventTime: '',
        venue: '', // Changed from location to venue
    });

    const isMatch = events.some(event => {
        return event.eventDate === eventData.eventDate && event.eventTime === eventData.eventTime;
    });

    useEffect(() => {
        setEventData(prev => ({
            ...prev,
            eventIdentifier: fetchedUser ? fetchedUser._id : '',
        }));
    }, [fetchedUser]);

    const handleChange = e => {
        const { id, value } = e.target;

        setEventData(prev => ({ ...prev, [id]: value }));
    };

    const handleAddEvent = async () => {
        dispatch({ type: 'ADD_EVENT_START' });

        try {
            const formData = new FormData();

            formData.append('image', imageFile);
            formData.append('name', eventData.name);
            formData.append('description', eventData.description);
            formData.append('images', eventData.images);
            formData.append('formLink', eventData.formLink);
            formData.append('tag', eventData.tag);
            formData.append('eventType', eventData.eventType);
            formData.append('eventIdentifier', eventData.eventIdentifier);
            formData.append('eventDate', eventData.eventDate);
            formData.append('eventTime', eventData.eventTime);
            formData.append('venue', eventData.venue); // Changed field name

            const res = await axios.post('/events', formData);
            dispatch({ type: 'ADD_EVENT_SUCCESS', payload: res.data });
            navigate('/yourevents');
            toast.success('Event added successfully!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
        } catch (err) {
            dispatch({ type: 'ADD_EVENT_FAILURE', payload: err.response.data });
            toast.error(`Error: ${err.response.data.message}`, { position: toast.POSITION.TOP_CENTER });
        }
    };

    const convertToBase64 = e => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            var reader = new FileReader();

            reader.onload = () => {
                const dataUrl = reader.result;

                // Set the image data directly without using atob
                setImage(dataUrl);
                setImageFile(file);
            };

            reader.readAsDataURL(file);
        } else {
            console.error("Selected file is not an image.");
        }
    };

    return (
        <div className='add-event vh-80 d-flex align-items-center justify-content-center'>
            <div id="addEvent-container" className='container shadow-lg p-4 rounded mt-5 mb-5'>
                <h1 className='text-center mb-4 '>Add Event Details</h1>
                <form>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>
                            Upload Image <small className='text-danger'>(Image size should be less than 5MB)</small>
                        </label>
                        <input
                            type='file'
                            className='form-control'
                            id='image1'
                            accept='image/*'
                            onChange={convertToBase64}
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}
                        />
                        {image === "" || image === null ? "" :
                            <><small className='text-danger mt-2 mb-3'>Image preview</small><br /><img width={100} height={100} src={image} alt="Event" /></>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='name' className='form-label'>
                            Event Name
                        </label>
                        <input
                            type='text'
                            className='input'
                            id='name'
                            placeholder='Enter event name'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='description' className='form-label'>
                            Event Description
                        </label>
                        <textarea
                            className='input'
                            id='description'
                            placeholder='Enter event description'
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    {isMatch && <small className='text-danger fw-bold'>This date and time is already taken.</small>}
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
                            className='input text-light'
                            id='eventTime'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='venue' className='form-label'>
                            Event Venue
                        </label>
                        <select
                            className='input'
                            id='venue'
                            onChange={handleChange}
                        >
                            <option value=''>Select venue</option>
                            <option value='Ashok Vatika'>Ashok Vatika</option>
                            <option value='Lawn Area'>Lawn Area</option>
                            <option value='Quadrangle'>Quadrangle</option>
                            <option value='Canteen Area'>Canteen Area</option>
                        </select>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='formLink' className='form-label'>
                            Google Form Link
                        </label>
                        <input
                            type='text'
                            className='input'
                            id='formLink'
                            placeholder='Enter event form link'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='tag' className='form-label'>
                            Event Tag
                        </label>
                        <input
                            type='text'
                            className='input'
                            id='tag'
                            placeholder='Enter event tag'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='eventType' className='form-label'>
                            Event Type
                        </label>
                        <input
                            type='text'
                            className='input'
                            id='eventType'
                            placeholder='Enter event type'
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        disabled={loading || isMatch}
                        type='button'
                        onClick={handleAddEvent}
                        className='btn btn-primary px-5 py-2 mt-3'
                    >
                        {loading ? 'Adding Event...' : 'Add Event'}
                    </button>
                </form>
                {error && <span className='text-danger mt-2'>{error.message}</span>}
            </div>
        </div>
    );
}
