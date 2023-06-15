import { useState } from "react";
import Selector from "./selector";

const dayjs = require("dayjs");

function Body() {
  const currentDate = dayjs(new Date());
  const [newAge, setNewAge] = useState("");
  const [outOfRange, setOutOfRange] = useState(false);
  const [leapYear, setLeapYear] = useState(false);
  const [birthday, setBirthday] = useState("");

  let diffInDay = 0;

  let months = [
    ["January", 31],
    ["February", 28],
    ["March", 31],
    ["April", 30],
    ["May", 31],
    ["June", 30],
    ["July", 31],
    ["August", 31],
    ["September", 30],
    ["October", 31],
    ["November", 30],
    ["December", 31],
  ];

  function getDatesFromSelector(dates) {
    let datesArray = [...dates];

    isLeapYear(dates[2]);

    isNotInMonthRange(dates[0], dates[1]);

    getDayName(currentDate.$d.toString().slice(0, 3));

    let inputToDate = dayjs(
      `${datesArray[0]}-${datesArray[1]}-${datesArray[2]}`
    );

    diffInDay = currentDate.diff(inputToDate.$d, "days");

    function getAgeInMonthsAndDays(days) {
      const years = Math.floor(days / 365.25);
      const months = Math.floor((days % 365.25) / 30.44);
      const remainingDays = Math.floor((days % 365.25) % 30.44);

      if (years === 0 && months === 0) {
        return `${remainingDays} ${remainingDays === 1 ? "day" : "days"}`;
      } else if (years === 0 && remainingDays === 0) {
        return `${months} ${months === 1 ? "month" : "months"}`;
      } else if (months === 0 && remainingDays === 0) {
        return `${years} ${years === 1 ? "year" : "years"}`;
      } else if (years === 0) {
        return `${months} ${
          months === 1 ? "month" : "months"
        } and ${remainingDays} ${remainingDays === 1 ? "day" : "days"}`;
      } else if (months === 0) {
        return `${years} ${
          years === 1 ? "year" : "years"
        } and ${remainingDays} ${remainingDays === 1 ? "day" : "days"}`;
      } else if (remainingDays === 0) {
        return `${years} ${years === 1 ? "year" : "years"} and ${months} ${
          months === 1 ? "month" : "months"
        }`;
      } else {
        return `${years} ${years === 1 ? "year" : "years"}, ${months} ${
          months === 1 ? "month" : "months"
        } and ${remainingDays} ${remainingDays === 1 ? "day" : "days"}`;
      }
    }

    function getDayName(dayAppriviation) {
      let days = {
        Mon: "Monday",
        Tue: "Tuesday",
        Wed: "Wednesday",
        Thu: "Thursday",
        Fri: "Friday",
        Sat: "Saturday",
        Sun: "Sunday",
      };
      let abbr = dayAppriviation;
      setBirthday(days[abbr]);
    }

    function isLeapYear(year) {
      if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
        months[1][1] = 29;
        setLeapYear(true);
      } else {
        months[1][1] = 28;
        setLeapYear(false);
      }
    }

    function isNotInMonthRange(inputDay, inputMonth) {
      const monthIndex = months.findIndex((month) => month[0] === inputMonth);
      const daysInMonth = months[monthIndex][1];
      if (inputDay > daysInMonth) {
        datesArray[0] = daysInMonth;
        setOutOfRange(true);
      } else {
        setOutOfRange(false);
      }
    }

    setNewAge(getAgeInMonthsAndDays(diffInDay + 1));
  }

  function resetFields() {
    setNewAge("");
    setOutOfRange(false);
    setLeapYear(false);
    setBirthday("");
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <Selector
          getDates={getDatesFromSelector}
          reset={resetFields}
          status={newAge ? true : false}
        />
      </div>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "16px",
            margin: "40px 0px 12px",
          }}
        >
          {outOfRange && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div>
                <span>Selected month shouldn't be that long 🤓</span>
              </div>
              <div>
                <span>We brought it down for you 😇</span>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: "bolder",
            fontSize: "18px",
            margin: "8px 12px",
          }}
          className={newAge ? "text" : ""}
        >
          {newAge && <span>Age: {newAge}</span>}
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "16px",
            margin: "8px 12px",
          }}
        >
          {leapYear && <span>It looks like it was a leap year 🤔</span>}
        </div>

        <div
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "16px",
            margin: "8px 12px",
          }}
        >
          {birthday && <span>You were born on a {birthday}</span>}
        </div>
      </div>
    </div>
  );
}

export default Body;
