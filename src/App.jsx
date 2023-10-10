import { BrowserRouter, Routes, Route } from "react-router-dom";
import addTicket from "./Components/addTicket";
import updateTicket from "./Components/updateTicket";
import Home from "./Components/Home";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/add_ticket" element={addTicket}/>
            <Route path="/update_ticket" element={updateTicket}/>
            <Route path="/home" element={Home}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;