import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar"

export default function Calendar() {
  const { data: events, loading, error, reFetch, nextPage, prevPage } = useFetch('/events', 10);

  const dayCellContent = (arg) => {
    const currentDate = arg.date.toISOString().split('T')[0];

    return (
      <div className="event-day-content">
        <div className='mx-3'>{arg.dayNumberText}</div>
        {events.map((event, index) => (
          event.eventDate === currentDate && (
            <Link to={`/event/${event._id}`} key={index}>
              <div key={index} className='mt-2 mx-3' style={{ color: "orangered", fontSize: "14px", fontWeight: "bold", textDecorationColor: "black" }}>
                <span>{event.name}</span><br />
                <span>{event.eventTime}</span>
              </div>
            </Link>
          )
        ))}
      </div>
    );
  };


  return (
    <>
      <Navbar isNavbar={true} />
      <div className='mt-4 mx-2'>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '',
          }}
          eventContent={(eventInfo) => (
            <div>
              <p>{eventInfo.time}</p>
              <p>{eventInfo.title}</p>
            </div>
          )}
          dayCellContent={dayCellContent}
        />
      </div>
    </>
  );
}