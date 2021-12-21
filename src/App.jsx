import Navbar from "./components/shared/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/pages/Login";


function App() {
  return (
    <div>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/login" component={<Login/>} />
                <Route path="*" component={<div><h1>Yay</h1></div>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
