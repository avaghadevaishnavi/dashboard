import { useState } from "react";
import React from "react";

const Study = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCurrentMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[currentDate.getMonth()];
  };

  const getDaysInMonth = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const renderCalendar = () => {
    const days = getDaysInMonth();
    const weeks = [];

    while (days.length) {
      weeks.push(days.splice(0, 7));
    }

    return weeks.map((week, index) => (
      <div key={index} className="grid grid-cols-7 gap-1">
        {week.map((day, idx) => (
          <div
            key={idx}
            className={`p-2 text-center ${
              day ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            {day ? (
              <button className="w-full h-full text-xs font-semibold">
                {day}
              </button>
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        ))}
      </div>
    ));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const goToPrevMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  return (
    <div className="mt-8 px-4">
      {/* Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mx-auto max-w-4xl">
        <div className="bg-blue-500 text-white p-4 md:p-6 rounded-lg text-center">
          <h3 className="text-md md:text-lg font-semibold">Student</h3>
          <p>Some info here</p>
        </div>
        <div className="bg-green-500 text-white p-4 md:p-6 rounded-lg text-center">
          <h3 className="text-md md:text-lg font-semibold">Holiday</h3>
          <p>Some info here</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 md:p-6 rounded-lg text-center">
          <h3 className="text-md md:text-lg font-semibold">Event</h3>
          <p>Some info here</p>
        </div>
        <div className="bg-red-500 text-white p-4 md:p-6 rounded-lg text-center">
          <h3 className="text-md md:text-lg font-semibold">Examination</h3>
          <p>Some info here</p>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={goToPrevMonth}
          className="px-3 md:px-4 py-2 bg-gray-500 text-white rounded-l"
        >
          Prev
        </button>
        <h2 className="text-xl md:text-2xl font-bold mx-2 md:mx-4 text-black">
          {getCurrentMonth()} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={goToNextMonth}
          className="px-3 md:px-4 py-2 bg-gray-500 text-white rounded-r"
        >
          Next
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="text-black w-full max-w-xl mx-auto">{renderCalendar()}</div>
    </div>
  );
};

export default Study;
