import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Uncomment if needed for redirecting after creation
import { createEvent } from '../../services/EventService';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [error, setError] = useState(null); // For displaying API errors
    const navigate = useNavigate(); // For redirecting

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        const eventData = {
            name: eventName,
            date: eventDate,
            location: eventLocation,
            description: eventDescription,
        };

        try {
            const newEvent = await createEvent(eventData);
            console.log('Event created:', newEvent);
            // Clear form
            setEventName('');
            setEventDate('');
            setEventLocation('');
            setEventDescription('');
            navigate('/events'); // Redirect to event list
        } catch (err) {
            console.error('Error creating event:', err);
            setError(err.message || 'Failed to create event. Please try again.');
            // Keep alert for error, or use a more sophisticated error display
            alert(`Error: ${err.message || 'Failed to create event.'}`);
        }
    };

    return (
        <div>
            <h2>Create New Event</h2>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                <div>
                    <label htmlFor="eventName" style={{ display: 'block', marginBottom: '5px' }}>Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <label htmlFor="eventDate" style={{ display: 'block', marginBottom: '5px' }}>Event Date:</label>
                    <input
                        type="date"
                        id="eventDate"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <label htmlFor="eventLocation" style={{ display: 'block', marginBottom: '5px' }}>Event Location:</label>
                    <input
                        type="text"
                        id="eventLocation"
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <div>
                    <label htmlFor="eventDescription" style={{ display: 'block', marginBottom: '5px' }}>Event Description:</label>
                    <textarea
                        id="eventDescription"
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        rows="4"
                        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
