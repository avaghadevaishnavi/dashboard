import React, { useState, useEffect } from "react";

function Events() {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  });

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  // Save events to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.date) {
      setEvents((prev) => [...prev, formData]);
      setFormData({ name: "", description: "", date: "" });
    }
  };

  const handleEdit = (index) => {
    const eventToEdit = events[index];
    setFormData(eventToEdit);
    handleDelete(index);
  };

  const handleDelete = (index) => {
    setEvents((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto bg-blue-900 p-6 rounded-lg shadow-md mt-8 w-full">
      <h1 className="text-center text-2xl font-bold text-gray-200 mb-6">EVENT LIST</h1>

      {/* Event Form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <label className="text-gray-300 font-medium">Event Name:</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white w-full"
        />

        <label className="text-gray-300 font-medium">Description:</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows="3"
          className="p-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        ></textarea>

        <label className="text-gray-300 font-medium">Event Date:</label>
        <input 
          type="date"
          id="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="p-2 border text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  w-full"
        />

        <button type="submit" className="bg-blue-500 hover:bg-green-600 text-white p-2 rounded-md w-full">
          Add Event
        </button>
      </form>

      {/* Saved Events Table (Scrollable on Small Screens) */}
      <h2 className="text-xl font-semibold text-gray-200 mt-6">Saved Events</h2>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 border-collapse min-w-[300px]">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left hidden sm:table-cell">Description</th>
              <th className="p-3 text-left">Event Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-b border-gray-300 text-white">
                <td className=" text-white p-3 bg-transparent">{event.name}</td>
                <td className="text-white p-3 bg-transparent hidden sm:table-cell">{event.description}</td>
                <td className="text-white p-3 bg-transparent">{event.date}</td>
                <td className=" text-white p-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Events;
