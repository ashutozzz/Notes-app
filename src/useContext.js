import { useContext } from "react";
import { createContext, useState } from "react";

// Create a context to share state between components
const setContext = createContext({
  notes: [],
  setNotes: () => {},
  selected: "",
  setSelected: () => {},
});

// Provider component to wrap the entire app and share state
const Provider = ({ children }) => {
  const [selected, setSelected] = useState(""); // State to track the selected group
  const [notes, setNotes] = useState([]); // State to store notes for the selected group

  // Create an object containing values to share with components
  const valueToShare = {
    notes,
    setNotes,
    selected,
    setSelected,
  };

  return (
    <setContext.Provider value={valueToShare}>
      {children}
    </setContext.Provider>
  );
};

// Custom hook to easily access the shared state
const UseContext = () => {
  return useContext(setContext);
}

export { Provider }; // Export the provider component
export default UseContext; // Export the custom hook for using shared state
