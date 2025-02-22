import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Pages/Home/Home";
import EventForm from './Pages/EventForm/EventForm'

function App() {
  const [count, setCount] = useState(0)

    return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-invitation" element={<EventForm />} />
      </Routes>
    </Router>
  );
}

export default App
