import React, { useState } from 'react';
import useFetch from './UserPages/useFetch';

function Hostdashboard() {
  // Retrieve userId from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.userId; // Safely access userId

  if (!userId) {
    return (
      <div className="text-center py-4 text-red-500">
        Error: User not authenticated. Please log in.
      </div>
    );
  }

  const { data, isLoading, error } = useFetch(`http://localhost:2008/${userId}/newMeeting`);

  if (isLoading) return <div className="text-center py-4 text-blue-500">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

  const handleEdit = (meetingId) => {
    console.log('Edit meeting with ID:', meetingId);
    // Implement edit functionality here (e.g., redirect to edit form or open modal)
  };

  const handleDelete = (meetingId) => {
    console.log('Delete meeting with ID:', meetingId);
    // Implement delete functionality here (e.g., make API call to delete the meeting)
  };

  return (
    <div className="container mx-auto p-4">
      {data.length > 0 ? (
        data.map(meeting => {
          const scheduleData = meeting.weeklySchedule || { [meeting.day]: meeting.schedules };

          return (
            <div key={meeting._id} className="bg-white shadow-md rounded-lg p-6 mb-4 relative">
              {/* Triple dot button for options */}
              <div className="absolute top-2 right-2 group">
                <button className="text-gray-600 hover:text-gray-900">
                  <span className="text-xl">...</span>
                </button>
                {/* Menu appears on hover */}
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md opacity-0 group-hover:opacity-100 group-hover:block hidden transition-opacity">
                  <ul className="text-sm text-gray-700">
                    <li onClick={() => handleEdit(meeting._id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Edit
                    </li>
                    <li onClick={() => handleDelete(meeting._id)} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Delete
                    </li>
                  </ul>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">Meeting Schedule</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Time Zone:</span> {meeting.timeZone}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-semibold">Page URL:</span>{' '}
                <a
                  href={meeting.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {meeting.pageUrl}
                </a>
              </p>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Weekly Schedule:</h3>
              <div className="space-y-2">
                {Object.entries(scheduleData).map(([day, slots]) => {
                  if (!slots || slots.length === 0) return null;

                  return (
                    <div key={day} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                      <h4 className="text-md font-semibold capitalize text-gray-600 mb-1">{day}:</h4>
                      {slots.map((slot, index) => (
                        <p key={index} className="text-gray-600">
                          From: <span className="font-semibold">{slot.from}</span> - To:{' '}
                          <span className="font-semibold">{slot.to}</span>
                        </p>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-gray-500 text-sm">
                Created At: {new Date(meeting.createdAt).toLocaleString()}
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-400">No Data Available</div>
      )}
    </div>
  );
}

export default Hostdashboard;
