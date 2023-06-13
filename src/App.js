import "./App.css";
import Body from "./components/body";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import GitHubIcon from "@mui/icons-material/GitHub";

function App() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            padding: "30px 15px 20px 20px",
            fontFamily: "monospace",
            fontWeight: "bold",
            fontSize: "17px",
            maxWidth: "500px",
          }}
        >
          Age Calculator is a simple and easy-to-use app that helps you
          calculate your age. It is based on the most common age system where
          age increases on a person’s birthday. With this app, you can quickly
          determine your total age and calculate the date for any past event.”
        </p>
        <h3 style={{ fontFamily: "monospace", fontSize: "25px" }}>
          Pick a Date <span className="flickering">👇</span>
        </h3>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Body />
        </LocalizationProvider>
      </div>

      <div
        style={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        <a
          href="https://www.github.com/NassCode"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon
            color="disabled"
            style={{ fontSize: "40px", padding: "10px" }}
          />
        </a>
      </div>
    </div>
  );
}

export default App;
