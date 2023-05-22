import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import People from './Pages/People'
import Community from "./Pages/Community";

const browserHistory = createBrowserHistory();

function App() {
  return (
    <div>
        <BrowserRouter browserHistory = {browserHistory}>
          <Routes>
            <Route path='/' element={<People /> } />
            <Route path='/community' element={<Community /> } />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
