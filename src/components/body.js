//import DatePicker from "./datePicker"
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

const dayjs = require("dayjs");

function Body() {
  const currentDate = dayjs(new Date());
  const [age, setAge] = useState("");
  let selectedDate;
  let diffInDaysMonthYear = 0;

  function calculateAge(e) {
    selectedDate = dayjs(e);

    diffInDaysMonthYear = currentDate.diff(selectedDate, "days");
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

    setAge(getAgeInMonthsAndDays(diffInDaysMonthYear));
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div>
        <DatePicker
          maxDate={dayjs(new Date()).subtract(1, "day")}
          onAccept={(e) => calculateAge(e.$d)}
        />
      </div>

      <div
        style={{
          fontFamily: "monospace",
          fontWeight: "bold",
          fontSize: "16px",
          margin: "40px 12px",
        }}
      >
        {age && <span>Age: {age}</span>}
      </div>
    </div>
  );
}

export default Body;
