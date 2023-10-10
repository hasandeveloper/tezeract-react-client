import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/tickets/Create";
import Update from "./components/tickets/Update";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/tickets/create" element={<Create/>}/>
            <Route path="/tickets/update" element={<Update/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<h1>Not found</h1>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App;