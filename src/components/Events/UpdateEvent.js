import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get URL parameters
// import { useNavigate } from 'react-router-dom'; // Uncomment if needed for redirecting

const UpdateEvent = () => {
    const { id: eventId } = useParams(); // Get event ID from URL path
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    // const navigate = useNavigate(); // For redirecting

    useEffect(() => {
        console.log('Attempting to fetch event with ID:', eventId);
        // TODO: Fetch event data from API using eventId
        // Example:
        // fetch(`/api/events/${eventId}`)
        //     .then(response => {
        //         if (!response.ok) {
        //             throw new Error('Network response was not ok');
        //         }
        //         return response.json();
        //     })
        //     .then(data => {
        //         setEventName(data.name);
        //         setEventDate(data.date.split('T')[0]); // Assuming date is ISO string e.g. 2023-01-01T12:00:00Z
        //         setEventLocation(data.location);
        //         setEventDescription(data.description);
        //     })
        //     .catch(error => console.error('Error fetching event details:', error));

        // For now, let's set some dummy data as if fetched
        if (eventId) { // Check if eventId is available
            setEventName(`Event ${eventId} Name (Fetched)`);
            // Ensure date is in 'YYYY-MM-DD' format for the input type="date"
            const dummyDate = new Date();
            dummyDate.setDate(dummyDate.getDate() + parseInt(eventId || "0", 10)); // Vary date for different IDs
            const year = dummyDate.getFullYear();
            const month = (dummyDate.getMonth() + 1).toString().padStart(2, '0');
            const day = dummyDate.getDate().toString().padStart(2, '0');
            setEventDate(`${year}-${month}-${day}`);
            setEventLocation(`Location for Event ${eventId} (Fetched)`);
            setEventDescription(`This is a detailed description for Event ${eventId}. (Fetched)`);
        }
    }, [eventId]); // Re-run effect if eventId changes

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEventData = {
            id: eventId, // Make sure to include the id of the event being updated
            name: eventName,
            date: eventDate,
            location: eventLocation,
            description: eventDescription,
        };
        console.log('Updated event data to submit:', updatedEventData);
        alert(`Event update form submitted for ID: ${eventId}! Check console for data. API call pending.`);
        // TODO: Send updatedEventData to API (e.g., PUT /api/events/:eventId)
        // Example:
        // fetch(`/api/events/${eventId}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(updatedEventData),
        // })
        // .then(response => response.json())
        // .then(data => {
        //     console.log('Event updated successfully:', data);
        //     // navigate('/events'); // Redirect to event list or event detail page
        // })
        // .catch(error => console.error('Error updating event:', error));
    };

    return (
        <div>
            <h2>Update Event (ID: {eventId})</h2>
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
