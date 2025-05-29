import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Uncomment if needed for redirecting after creation

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    // const navigate = useNavigate(); // For redirecting

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = {
            name: eventName,
            date: eventDate,
            location: eventLocation,
            description: eventDescription,
        };
        console.log('Event data to submit:', eventData);
        alert('Event creation form submitted! Check console for data. API call pending.');
        // TODO: Send eventData to API
        // Example:
        // fetch('/api/events', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(eventData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Event created:', data);
        //     // navigate('/events'); // Redirect to event list
        // })
        // .catch(error => console.error('Error creating event:', error));

        // Clear form (optional)
        setEventName('');
        setEventDate('');
        setEventLocation('');
        setEventDescription('');
    };

    return (
        <div>
            <h2>Create New Event</h2>
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
