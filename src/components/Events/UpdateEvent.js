import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // To get URL parameters and for redirecting
import { getEventById, updateEvent } from '../../services/EventService';

const UpdateEvent = () => {
    const { id: eventId } = useParams(); // Get event ID from URL path
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // For redirecting

    useEffect(() => {
        if (!eventId) {
            setLoading(false);
            setError("Event ID is missing.");
            return;
        }

        const fetchEventDetails = async () => {
            setLoading(true);
            try {
                const data = await getEventById(eventId);
                setEventName(data.name);
                // Assuming data.date is in ISO format 'YYYY-MM-DDTHH:mm:ssZ' or 'YYYY-MM-DD'
                // The input type="date" expects 'YYYY-MM-DD'
                setEventDate(data.date ? data.date.split('T')[0] : '');
                setEventLocation(data.location || '');
                setEventDescription(data.description || '');
                setError(null);
            } catch (err) {
                console.error('Error fetching event details:', err);
                setError(err.message || `Failed to fetch event details for ID ${eventId}.`);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventId]); // Re-run effect if eventId changes

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Clear previous errors
        const updatedEventData = {
            // id: eventId, // Not needed in the body if it's in the URL for PUT
            name: eventName,
            date: eventDate,
            location: eventLocation,
            description: eventDescription,
        };

        try {
            await updateEvent(eventId, updatedEventData);
            navigate('/events'); // Redirect to event list
        } catch (err) {
            console.error('Error updating event:', err);
            setError(err.message || `Failed to update event ID ${eventId}. Please try again.`);
            // Keep alert for error, or use a more sophisticated error display
            alert(`Error: ${err.message || `Failed to update event ID ${eventId}.`}`);
        }
    };

    if (loading) return <p>Loading event details...</p>;
    if (error && !eventName) return <p>Error: {error}</p>; // Show error prominently if event data couldn't be loaded

    return (
        <div>
            <h2>Update Event (ID: {eventId})</h2>
            {error && <p style={{ color: 'red' }}>Error during update: {error}</p>}
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
                <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default UpdateEvent;
