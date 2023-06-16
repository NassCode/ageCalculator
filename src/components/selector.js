import { useState, useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function Selector({ getDates, currentDate }) {
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(currentDate.format("MMMM"));
  const [year, setYear] = useState(new Date().getFullYear());

  const [months, setMonths] = useState([
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
  ]);


  let daysOfTheMonth = months.findIndex((m) => m[0] === month);

  const [days, setDays] = useState(months[daysOfTheMonth][1]);

  const currentYear = new Date().getFullYear();

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    isLeapYear(year);
    // change days to the number of days in the selected month
    let monthIndex = months.findIndex((m) => m[0] === event.target.value);

    setDays(months[monthIndex][1]);
    setMonth(event.target.value);
    if (day > months[monthIndex][1]) {
      setDay(months[monthIndex][1])
    }
  };

  const handleYearChange = (event) => {
    isLeapYear(event.target.value);
    let monthIndex = months.findIndex((m) => m[0] === month);
    setDays(months[monthIndex][1]);
    setYear(event.target.value);
  };

  function isLeapYear(year) {
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      let newArr = [...months];
      newArr[1][1] = 29;
      setMonths(newArr);

    } else {
      let newArr = [...months];
      newArr[1][1] = 28;
      setMonths(newArr);

    }
  }

  useEffect(() => {
    // check if leap year
    isLeapYear(currentYear);
    // let days = the number of days in the current month
    // index of the current month in the months array
    let monthIndex = months.findIndex(
      (m) => m[0] === currentDate.format("MMMM")
    );
    // set days to the number of days in the current month
    setDays(months[monthIndex][1]);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Day</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              value={day}
              label="Day"
              onChange={handleDayChange}
            >
              {Array.from(Array(days).keys()).map((i) => {
                return (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              value={month}
              label="Month"
              onChange={handleMonthChange}
            >
              {months.map((m, i) => {
                return (
                  <MenuItem key={i + 1} value={m[0]}>
                    {i + 1} - {m[0]}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 80 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              variant="standard"
              value={year}
              label="Year"
              onChange={handleYearChange}
            >
              {Array.from(Array(104).keys()).map((i) => {
                return (
                  <MenuItem key={i} value={currentYear - i}>
                    {currentYear - i}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button
          disabled={day && month && year ? false : true}
          variant="text"
          onClick={() => getDates([day, month, year])}
        >
          Calculate
        </Button>
      </div>
    </div>
  );
}

export default Selector;
