import "./Calendar.css";

import React, { useState } from "react";

function Calendar() {
  const currentDate = new Date(); // Date object
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth()); // 0 - 11
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const yearMonths = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];

  function CalendarCell({ key, isCurrentDay, day }) {
    return (
      <td key={key} className={isCurrentDay ? "today" : ""}>
        {day}
      </td>
    );
  }

  function TBody() {
    let rows = [];
    let row = [];

    const daysInMonth = new Date( // 31
      selectedYear,
      selectedMonth+ 1,
      0
    ).getDate();

    const firstWeekday =
      new Date(selectedYear, selectedMonth, 1).getDay() - 1;

    let key = 0;
    while (row.length < firstWeekday) {
      row.push(<CalendarCell key={"empty " + key++}></CalendarCell>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      if (
        i === currentDate.getDate() &&
        selectedMonth === currentDate.getMonth()
      ) {
        row.push(
          <CalendarCell key={i} isCurrentDay={true} day={i}></CalendarCell>
        );
      } else {
        row.push(<CalendarCell key={i} day={i}></CalendarCell>);
      }

      if (row.length % 7 === 0) {
        rows.push(<tr key={"tr" + i}>{row}</tr>);
        row = [];
      }
    }
    if (row.length > 0) {
      rows.push(<tr key={"tr" + daysInMonth}>{row}</tr>);

      let key = daysInMonth;
      while (row.length % 7 !== 0) {
        row.push(<CalendarCell key={"empty " + key++}></CalendarCell>);
      }
    }

    return <tbody>{rows}</tbody>;
  }

  function handlerChangeMonth(change) {
    if (change === 0) {
      setSelectedYear(currentDate.getFullYear());
      return setSelectedMonth(currentDate.getMonth());
    } else if (change === 1) {
      setSelectedYear(
        selectedMonth === 11 ? selectedYear + 1 : currentDate.getFullYear()
      );
      return setSelectedMonth(selectedMonth !== 11 ? selectedMonth + 1 : 0);
    } else if (change === -1) {
      setSelectedYear(
        selectedMonth === 0 ? selectedYear - 1 : currentDate.getFullYear()
      );
      return setSelectedMonth(selectedMonth !== 0 ? selectedMonth - 1 : 11);
    }
  }

  return (
    <div className="calendar">
      <h2>{yearMonths[selectedMonth] + " " + selectedYear}</h2>
      <div className="changeMonthButtons">
        <button onClick={() => handlerChangeMonth(-1)}>Попередній</button>
        <button onClick={() => handlerChangeMonth(0)}>Теперішній</button>
        <button onClick={() => handlerChangeMonth(1)}>Наступний</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Нд</th>
          </tr>
        </thead>
        <TBody month={selectedMonth} year={selectedYear}></TBody>
      </table>
    </div>
  );
}

export default Calendar;
