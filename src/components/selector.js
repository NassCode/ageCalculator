import { useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function Selector({ getDates, reset, status }) {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  
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
              {Array.from(Array(31).keys()).map((i) => {
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
        {status && (
          <Button variant="text" onClick={reset}>
            Calculate new date
          </Button>
        )}
        {!status && (
          <Button
            disabled={day && month && year ? false : true}
            variant="text"
            onClick={() => getDates([day, month, year])}
          >
            Calculate
          </Button>
        )}
      </div>
    </div>
  );
}

export default Selector;
