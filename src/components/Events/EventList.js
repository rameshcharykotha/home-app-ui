import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Uncomment if needed later for navigation
import { getAllEvents, deleteEvent } from '../../services/EventService';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const data = await getAllEvents();
            setEvents(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setEvents([]); // Clear events on error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);
            // Refresh list by filtering out the deleted event
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        } catch (err) {
            // If deletion fails, it's good to inform the user or log the error
            setError(err.message);
            // Optionally, refetch all events to ensure consistency if optimistic update is problematic
            // fetchEvents();
        }
    };

    if (loading) return <p>Loading events...</p>;
    // Display a more specific error message if events could not be fetched
    if (error && events.length === 0) return <p>Error fetching events: {error}</p>;


    return (
        <div>
            <h2>Events</h2>
            <Link to="/create-event" style={{ marginBottom: '20px', display: 'inline-block', padding: '10px 15px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
                Add New Event
            </Link>

            {/* Display error message if an operation (like delete) fails but events were previously loaded */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {events.length === 0 && !loading ? ( // Adjusted condition to show "No events found" only when not loading
                <p>No events found.</p>
            ) : (
                <ul>
                    {events.map(event => (
                        <li key={event.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                            <h3>{event.name}</h3>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            {/* TODO: Add more event details here */}
                            
                            <Link to={`/update-event/${event.id}`} style={{ marginRight: '5px', padding: '5px 10px', backgroundColor: '#ffc107', color: 'black', textDecoration: 'none', borderRadius: '3px' }}>
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(event.id)}
                                style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;
