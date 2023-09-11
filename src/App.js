import { useEffect, useState } from "react";
import "./App.css";
import Laptop from "./pages/laptop";
import Phone from "./pages/mobile";
import MNotes from "./components/Notes/notesMobile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "./useContext";
import UseContext from "./useContext";

function App() {
  // State to track the screen size
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const { selected, setSelected } = UseContext();

  // Set the selected group from local storage on initial render
  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
    // eslint-disable-next-line
  }, [selected]);

  // Function to check and update the screen size
  const checkScreenSize = () => {
    setScreenSize(window.innerWidth);
  };

  // Event listener to check screen size when the window is resized
  window.addEventListener("resize", checkScreenSize);

  return (
    <Provider>
      <div className="App">
        {screenSize > 500 ? ( // Render Laptop component if screen size is greater than 500px
          <Laptop />
        ) : (
          // Render mobile components if screen size is 500px or less
          <Router>
            <Routes>
              <Route path="/" element={<Phone />} />
              <Route path="/notes" element={<MNotes />} />
            </Routes>
          </Router>
        )}
      </div>
    </Provider>
  );
}

export default App;
