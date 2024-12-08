import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  isSameDay,
  isSameMonth,
  isBefore,
  addDays,
} from "date-fns";

const GuestMeeting = () => {
  const today = new Date(); // Today's date
  const currentYear = today.getFullYear();
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(currentYear, 11, 1)); // Start from December

  // Example times available for all dates
  const timesAvailable = ["12:00am", "12:30am", "1:00am", "2:00am", "2:30am", "3:00am"];

  // Function to render the calendar header
  const renderCalendarHeader = () => {
    return (
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className={`text-gray-600 hover:text-black ${
            format(currentMonth, "MMMM yyyy") === "December 2024" ? "invisible" : "" // Prevent going before December
          }`}
        >
          &lt;
        </button>
        <h2 className="font-semibold text-lg">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="text-gray-600 hover:text-black"
        >
          &gt;
        </button>
      </div>
    );
  };

  // Function to render calendar cells
  const renderCalendarCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfMonth(monthStart);
    const endCalendarDate = addDays(endDate, 6 - endDate.getDay());

    const rows = [];
    let days = [];
    let date = startDate;

    while (date <= endCalendarDate) {
      for (let i = 0; i < 7; i++) {
        const day = new Date(date);
        const isBeforeToday = isBefore(day, today) && isSameMonth(day, currentMonth);

        days.push(
          <button
            key={day}
            className={`p-2 w-10 h-10 rounded-full ${
              isBeforeToday
                ? "text-black cursor-pointer" // Past dates are grayed out but clickable
                : isSameDay(day, selectedDate)
                ? "bg-blue-500 text-white"
                : "text-gray-900 hover:bg-blue-100"
            }`}
            onClick={() => {
              if (!isBeforeToday) {
                setSelectedDate(day); // Only allow selection of future dates
              }
            }}
          >
            {day.getDate()}
          </button>
        );
        date = addDays(date, 1);
      }
      rows.push(
        <div key={date} className="grid grid-cols-7 gap-2">
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Left Panel */}
      <div className="w-1/4 bg-white shadow-lg p-6 rounded-lg">
        <h1 className="text-xl font-bold">30 Minute Meeting</h1>
        <p className="text-gray-500">Duration: 30 min</p>
      </div>

      {/* Middle Panel */}
      <div className="w-1/2 bg-white shadow-lg p-6 rounded-lg mx-4">
        <h2 className="font-semibold text-lg mb-4">Select a Date & Time</h2>
        {/* Calendar */}
        <div>
          {renderCalendarHeader()}
          <div className="grid grid-cols-7 gap-2 mt-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>
          <div className="mt-2">{renderCalendarCells()}</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/4 bg-white shadow-lg p-6 rounded-lg">
        {selectedDate ? (
          <div>
            <h3 className="font-semibold mb-2">Selected Date</h3>
            <p className="text-lg">{format(selectedDate, "EEEE, MMMM d")}</p>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Times Available</h4>
              <div className="flex flex-col gap-2">
                {timesAvailable.map((time) => (
                  <button
                    key={time}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a date to see available times.</p>
        )}
      </div>
    </div>
  );
};

export default GuestMeeting;