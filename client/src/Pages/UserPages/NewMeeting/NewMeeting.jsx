import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone";

function NewMeeting() {
  const [day, setDay] = useState('');
  const [availability, setAvailability] = useState({
    monday: [{ from: "10:00am", to: "10:30am" }],
    tuesday: [{ from: "10:00am", to: "10:30am" }],
    wednesday: [{ from: "10:00am", to: "10:30am" }],
    thursday: [{ from: "10:00am", to: "10:30am" }],
    friday: [{ from: "10:00am", to: "10:30am" }],
    saturday: [{ from: "10:00am", to: "10:30am" }],
    sunday: [{ from: "10:00am", to: "10:30am" }],
  });

  const [timeZones, setTimeZones] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("UTC");
  const [currentTimes, setCurrentTimes] = useState({});
  const [fetchError, setFetchError] = useState(false);
  const [userId, setUserId] = useState('');

  const timeOptions = Array.from({ length: 30 }, (_, i) => {
    const hours = 10 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const ampm = hours < 12 ? "am" : "pm";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes}${ampm}`;
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.userId) {
      setUserId(user.userId);
    }

    const fetchTimeZones = async () => {
      try {
        const allTimeZones = moment.tz.names();
        const sortedTimeZones = allTimeZones.sort();
        setTimeZones(sortedTimeZones);

        const initialTimes = {};
        sortedTimeZones.forEach((zone) => {
          try {
            const time = moment().tz(zone).format('hh:mm A');
            initialTimes[zone] = time;
          } catch (error) {
            initialTimes[zone] = 'Invalid timezone';
          }
        });
        setCurrentTimes(initialTimes);

        const userTimeZone = moment.tz.guess();
        if (sortedTimeZones.includes(userTimeZone)) {
          setSelectedTimeZone(userTimeZone);
        }
      } catch (error) {
        setFetchError(true);
      }
    };
    fetchTimeZones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const filteredSchedule = {};
      Object.entries(availability).forEach(([day, schedules]) => {
        if (schedules && schedules.length > 0) {
          filteredSchedule[day] = schedules;
        }
      });

      if (Object.keys(filteredSchedule).length === 0) {
        alert("Please add at least one schedule for any day.");
        return;
      }

      if (!userId) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const meetingData = {
        userId,
        weeklySchedule: filteredSchedule,
        timeZone: selectedTimeZone,
      };

      console.log('UserId:', userId);
      console.log('Meeting Data:', meetingData);

      const response = await axios.post(
        `http://localhost:2008/${userId}/newMeeting`,
        meetingData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert(`Meeting schedule created successfully! Your meeting URL is: ${response.data.pageUrl}`);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      const errorMessage = error.response?.data?.error || "Failed to create meeting schedule";
      alert(errorMessage);
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Set Your Meeting Schedule</h1>
      <form onSubmit={handleSubmit}>
        {/* Display userId in a readonly input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">User ID</label>
          <input
            type="text"
            value={userId || ''}
            readOnly
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        <div className="space-y-4">
          {Object.keys(availability).map((dayName, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availability[dayName].length > 0}
                    onChange={() => handleToggleDay(dayName)}
                    className="w-5 h-5 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="capitalize font-medium">{dayName}</span>
                </label>
                <button
                  type="button"
                  onClick={() => handleAddSchedule(dayName)}
                  className="text-blue-600 text-sm flex items-center hover:underline"
                  disabled={availability[dayName].length >= 4 || availability[dayName].length === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Time
                </button>
              </div>
              {availability[dayName].length > 0 && (
                <div className="mt-2">
                  {availability[dayName].map((schedule, index) => (
                    <div key={index} className="flex items-center mt-2 space-x-2">
                      <select
                        value={schedule.from}
                        onChange={(e) => handleChangeSchedule(dayName, index, "from", e.target.value)}
                        className="border border-gray-300 rounded p-1 text-gray-700 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">From</option>
                        {timeOptions.slice(0, -1).map((time, idx) => (
                          <option key={idx} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <span>to</span>
                      <select
                        value={schedule.to}
                        onChange={(e) => handleChangeSchedule(dayName, index, "to", e.target.value)}
                        className="border border-gray-300 rounded p-1 text-gray-700 focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">To</option>
                        {timeOptions.map((time, idx) => (
                          <option key={idx} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => handleRemoveSchedule(dayName, index)}
                        className="text-red-600 text-sm flex items-center hover:underline"
                        disabled={availability[dayName].length === 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <label className="text-sm text-gray-500">Time zone</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            disabled={timeZones.length === 0}
          >
            {timeZones.length > 0 ? (
              timeZones.map((zone, index) => {
                const offset = moment.tz(zone).format('Z');
                return (
                  <option key={index} value={zone}>
                    {`${zone} (GMT${offset}) ${currentTimes[zone] ? `- ${currentTimes[zone]}` : ''}`}
                  </option>
                );
              })
            ) : fetchError ? (
              <option value="">Failed to load time zones. Please refresh the page.</option>
            ) : (
              <option value="">Loading time zones...</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default NewMeeting;
