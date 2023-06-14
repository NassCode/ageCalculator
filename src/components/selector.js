import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';



function Selector({ getDates }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

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

  // array of leap years between 1920 and 2023
  const leapYears = [
    1920, 1924, 1928, 1932, 1936, 1940, 1944, 1948, 1952, 1956, 1960, 1964,
    1968, 1972, 1976, 1980, 1984, 1988, 1992, 1996, 2000, 2004, 2008, 2012,
    2016, 2020, 2024,
  ];

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{ display: "flex", flexDirection: "row", gap: '20px' }}>
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
              {Array.from(Array(31).keys()).map((i) => {
                return <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>;
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
                  <MenuItem key={i + 1} value={m}>
                    {i + 1} - {m}
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
                return <MenuItem key={i} value={2023 - i}>{2023 - i}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
        <Button variant="text" disabled={day && month && year ? false : true} onClick={() => getDates([day, month, year])}>Calculate</Button>
        </div>
    </div>
  );
}

export default Selector;
