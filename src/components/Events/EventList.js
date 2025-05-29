import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'; // Uncomment if needed later for navigation

const EventList = () => {
    const [events, setEvents] = useState([]);
    // const [loading, setLoading] = useState(true); // Optional: for loading state
    // const [error, setError] = useState(null); // Optional: for error handling

    useEffect(() => {
        // TODO: Fetch events from API
        // Example:
        // fetch('/api/events')
        //     .then(response => response.json())
        //     .then(data => {
        //         setEvents(data);
        //         setLoading(false);
        //     })
        //     .catch(err => {
        //         setError(err.message);
        //         setLoading(false);
        //     });
        console.log("EventList useEffect triggered - API call placeholder");
        // For now, let's set some dummy data to demonstrate the list
        setEvents([
            { id: 1, name: 'Community Meetup', date: '2024-08-15', location: 'Online' },
            { id: 2, name: 'Tech Conference', date: '2024-09-20', location: 'Convention Center' },
        ]);
    }, []);

    // if (loading) return <p>Loading events...</p>;
    // if (error) return <p>Error fetching events: {error}</p>;

    return (
        <div>
            <h2>Events</h2>
            {/* <Link to="/create-event">Add New Event</Link> */} {/* Placeholder for navigation button */}
            <button onClick={() => alert('Navigate to Create Event page')}>Add New Event</button> {/* Simple button for now */}

            {events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <ul>
                    {/* TODO: Map through events to display them */}
                    {events.map(event => (
                        <li key={event.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px', paddingBottom: '10px' }}>
                            <h3>{event.name}</h3>
                            <p><strong>Date:</strong> {event.date}</p>
                            <p><strong>Location:</strong> {event.location}</p>
                            {/* TODO: Add more event details here */}
                            
                            {/* Placeholder for action buttons */}
                            <button style={{ marginRight: '5px' }} onClick={() => alert(`Edit event ${event.id}`)}>Edit</button>
                            <button onClick={() => alert(`Delete event ${event.id}`)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EventList;
