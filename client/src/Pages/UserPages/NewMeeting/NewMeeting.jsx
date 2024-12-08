import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment-timezone"; // Make sure moment-timezone is imported

function NewMeeting() {
  const [day, setDay] = useState("");
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

  const timeOptions = Array.from({ length: 30 }, (_, i) => {
    const hours = 10 + Math.floor(i / 2);
    const minutes = i % 2 === 0 ? "00" : "30";
    const ampm = hours < 12 ? "am" : "pm";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes}${ampm}`;
  });

  useEffect(() => {
    const fetchTimeZones = async () => {
      try {
        const response = await fetch("https://worldtimeapi.org/api/timezone");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTimeZones(data);

        const initialTimes = {};
        data.forEach((zone) => {
          initialTimes[zone] = "";
        });
        setCurrentTimes(initialTimes);
      } catch (error) {
        console.error("Error fetching time zones:", error);
        setFetchError(true);
      }
    };
    fetchTimeZones();
  }, []);

  useEffect(() => {
    const updateTimes = () => {
      const updatedTimes = {};
      const now = new Date();
      timeZones.forEach((zone) => {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: zone,
          timeStyle: "short",
          hourCycle: "h23",
        });
        updatedTimes[zone] = formatter.format(now);
      });
      setCurrentTimes(updatedTimes);
    };

    if (timeZones.length > 0) {
      updateTimes();
      const interval = setInterval(updateTimes, 1000);
      return () => clearInterval(interval);
    }
  }, [timeZones]);

  const handleAddSchedule = (day) => {
    if (availability[day].length < 4) {
      setAvailability({
        ...availability,
        [day]: [...availability[day], { from: "10:00am", to: "10:30am" }],
      });
    }
  };

  const handleRemoveSchedule = (day, index) => {
    setAvailability({
      ...availability,
      [day]: availability[day].filter((_, idx) => idx !== index),
    });
  };

  const handleChangeSchedule = (day, index, field, value) => {
    const updatedSchedules = availability[day].map((schedule, idx) => {
      if (idx === index) {
        if (field === "from") {
          const fromIndex = timeOptions.indexOf(value);
          const toTime =
            fromIndex < timeOptions.length - 1
              ? timeOptions[fromIndex + 1]
              : timeOptions[timeOptions.length - 1];
          return { from: value, to: toTime };
        }
        return { ...schedule, [field]: value };
      }
      return schedule;
    });
    setAvailability({
      ...availability,
      [day]: updatedSchedules,
    });
  };

  const handleToggleDay = (day) => {
    setAvailability({
      ...availability,
      [day]:
        availability[day].length === 0
          ? [{ from: "10:00am", to: "10:30am" }]
          : [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTimeZone || !Object.keys(availability).length) {
      alert("Please complete all fields.");
      return;
    }

    const convertToUTC = (timeStr, timeZone) => {
      const [time, period] = timeStr.match(/(\d+):(\d+)(am|pm)/).slice(1);
      let hours = parseInt(time);
      const minutes = parseInt(period === "pm" && hours !== 12 ? 0 : minutes);

      hours =
        period === "pm" && hours !== 12
          ? hours + 12
          : period === "am" && hours === 12
          ? 0
          : hours;

      const dateInSelectedZone = moment.tz(`2023-01-01 ${hours}:${minutes}`, timeZone);
      const utcTime = dateInSelectedZone.utc();

      return utcTime.format("HH:mm");
    };

    const utcSchedules = availability[day].map((schedule) => ({
      from: convertToUTC(schedule.from, selectedTimeZone),
      to: convertToUTC(schedule.to, selectedTimeZone),
    }));

    const dataToSend = {
      day,
      schedules: utcSchedules,
      timeZone: selectedTimeZone,
    };

    try {
      // Wait for time zone fetch before posting
      if (timeZones.length === 0) {
        alert("Please wait for the time zones to load.");
        return;
      }

      setTimeout(async () => {
        const response = await axios.post("http://localhost:2008/newMeeting", dataToSend);
        if (response.status === 201) {
          alert("Meeting schedule saved successfully!");
        } else {
          alert(response.data.error || "Failed to save meeting schedule.");
        }
      }, 1000); // Adding delay to simulate waiting for fetch completion

    } catch (error) {
      console.error("Error saving meeting schedule:", error);
      alert(error.response?.data?.error || "An error occurred while saving the meeting schedule.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4">Set Your Meeting Schedule</h1>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {Object.keys(availability).map((day, idx) => (
            <div key={idx} className="mb-6">
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availability[day].length > 0}
                    onChange={() => handleToggleDay(day)}
                    className="w-5 h-5 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="capitalize font-medium">{day}</span>
                </label>
                <button
                  onClick={() => handleAddSchedule(day)}
                  className="text-blue-600 text-sm flex items-center hover:underline"
                  disabled={availability[day].length >= 4 || availability[day].length === 0}
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
              {availability[day].map((schedule, index) => (
                <div key={index} className="flex items-center mt-2 space-x-2">
                  <select
                    value={schedule.from}
                    onChange={(e) => handleChangeSchedule(day, index, "from", e.target.value)}
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
                    onChange={(e) => handleChangeSchedule(day, index, "to", e.target.value)}
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
                    onClick={() => handleRemoveSchedule(day, index)}
                    className="text-red-600 text-sm flex items-center hover:underline"
                    disabled={availability[day].length === 1}
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
          ))}
        </div>
        <div className="mt-6">
          <label className="text-sm text-gray-500">Time zone</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
          >
            {timeZones.length > 0 ? (
              timeZones.map((zone, index) => (
                <option key={index} value={zone}>
                  {zone} ({currentTimes[zone] || "Loading..."})
                </option>
              ))
            ) : fetchError ? (
              <option value="">Failed to load time zones</option>
            ) : (
              <option value="">Loading...</option>
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
