import './App.css';
import LeftSidebar from './components/LeftSidebarComponent/LeftSidebar';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/RegisterComponent/LoginComponent/Login';
import Signup from './components/RegisterComponent/SignUpComponent/Signup';
import EmployeesTaskManager from './components/Dashboard/EmployeesTaskManagerComponent/EmployeesTaskManager';
import Home from './components/Dashboard/HomeComponent/Home';
import ShowAllEmployees from './components/ShowAllEmployeesComponent/ShowAllEmployees';


function App() {
  return (
    <div className="App">

        <LeftSidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeesTaskManagmentPage" element={<EmployeesTaskManager />} />

        <Route path="/showAllEmployeesData" element={<ShowAllEmployees/>} />

        {/* //Login Sign up */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      </Routes>

      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/signup">signup</Link>

    </div>
  );
}

export default App;
