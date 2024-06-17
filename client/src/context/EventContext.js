import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    events: JSON.parse(localStorage.getItem("events")) || [],
    loading: false,
    error: null,
}

export const EventContext = createContext(INITIAL_STATE);

const EventReducer = (state, action) => {
    switch (action.type) {
        case "ADD_EVENT_START":
            return {
                events: [...state.events],
                loading: true,
                error: null,
            };
        case "ADD_EVENT_SUCCESS":
            return {
                events: [...state.events, action.payload],
                loading: false,
                error: null,
            };
        case "ADD_EVENT_FAILURE":
            return {
                events: [...state.events],
                loading: false,
                error: action.payload,
            };
        // Add other cases for updating, deleting events, or handling event-related actions
        default:
            return state;
    }
}

export const EventContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(EventReducer, INITIAL_STATE)

    useEffect(() => {
        // Clear events older than 30 days
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 30); // Adjust the number of days as needed

        const filteredEvents = state.events.filter(event => new Date(event.date) > currentDate);

        localStorage.setItem("events", JSON.stringify(filteredEvents));
    }, [state.events])
    
    return (
        <EventContext.Provider
        value={{
            events: state.events,
            loading: state.loading,
            error: state.error,
            dispatch,
        }}
        >
            {children}
        </EventContext.Provider>
    )
}
