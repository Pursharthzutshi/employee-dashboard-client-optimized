import './App.css';
import LeftSidebar from './components/LeftSidebarComponent/LeftSidebar';
import { Link, Route, Routes } from 'react-router-dom';
import Login from './components/RegisterComponent/LoginComponent/LoginUsers';
import EmployeesTaskManager from './components/Dashboard/EmployeesTaskManagerComponent/EmployeesTaskManager';
import Home from './components/Dashboard/HomeComponent/Home';
import ShowAllEmployees from './components/Dashboard/ShowAllEmployeesComponent/ShowAllEmployees';
import SignUp from './components/RegisterComponent/SignUpComponent/ChangeSignUpFormButtons';
import SignupUsers from './components/RegisterComponent/SignUpComponent/SignupUsers';
import SignupAdmin from './components/RegisterComponent/SignUpComponent/SignUpAdmin';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './ReduxHooks';
import LoginUsers from './components/RegisterComponent/LoginComponent/LoginUsers';
import LoginAdmin from './components/RegisterComponent/LoginComponent/LoginAdmin';
import AssignedEmployeesTask from './components/Dashboard/UserComponents/AssignedEmployeesTask';
import { setChangeComponent } from './ReduxSlicers/ChangeComponentsState';
import EmployeesHome from './components/Dashboard/UserComponents/EmployeesHome';
import { setLogOutStatus } from './ReduxSlicers/LocalStorageSlicer';


function App() {

  // const [sho, setShowSignUpCategory] = useState(true);


  const changeSignUpForm = useAppSelector((state) => state.ChangeSignUpFormSlicer.changeSignUpForm)
  const changeLoginForm = useAppSelector((state) => state.ChangeSignUpFormSlicer.changeLoginForm)

  const ChangeComponentsState = useAppSelector((state) => state.ChangeComponentsState.changeComponent);


  const logOutStatus = useAppSelector((state) => state.LocalStorageSlicer.logOutStatus)

  const Dispatch = useAppDispatch();

  // const [showLogOutStatus,setShowLogoutStatus] = useState(false);


  const [showLoggedInType, setShowLoggedInType] = useState<Boolean>(false);

  useEffect(() => {
    const adminLoggedInSavedUid = localStorage.getItem("adminLoggedInSavedUid")
    if (adminLoggedInSavedUid) {
      setShowLoggedInType(true)
    }else{
      setShowLoggedInType(false)

    }
    // const employeeLoggedInSavedUid = localStorage.getItem("loggedInSavedUid")

    // if (employeeLoggedInSavedUid) {
    //   setShowLoggedInType(false)
    // }
    console.log(adminLoggedInSavedUid)
    
  },[])
  return (
    <div className="App">

      {/* <button onClick={() => Dispatch(setChangeComponent(true))}>change</button> */}

      <LeftSidebar />
      <Routes>
        <Route path="/" element=
          {
            showLoggedInType ? <Home /> : <EmployeesHome />
          }
        />
        <Route path="/employeesTaskManagmentPage" element={

          showLoggedInType ? <EmployeesTaskManager /> : <AssignedEmployeesTask />
        }
        />

        <Route path="/showAllEmployeesData" element={<ShowAllEmployees />} />

        {/* //Login Sign up */}
        <Route path="/login" element={
          changeLoginForm ? <LoginUsers /> : <LoginAdmin />}
        />

        <Route path="/signup" element={
          changeSignUpForm ? <SignupUsers /> : <SignupAdmin />
        } />

      </Routes>

      <Link to="/login">Login</Link>
      <br></br>
      <Link to="/signup">signup</Link>

    </div>
  );
}

export default App;
