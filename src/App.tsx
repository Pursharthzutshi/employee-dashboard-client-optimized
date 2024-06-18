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
import { setAdminStatus, setLogOutStatus } from './ReduxSlicers/LocalStorageSlicer';


function App() {


  const changeLoginForm = useAppSelector((state) => state.ChangeSignUpFormSlicer.changeLoginForm)

  const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

  const logOutButton = useAppSelector((state) => state.LocalStorageSlicer.showLogOutButtonElements)

  useEffect(() => {
    console.log('adminStatus from localStorage:', localStorage.getItem('adminStatus'));
  }, [adminStatus])

  return (
    <div className="App">

      {/* <button onClick={() => Dispatch(setChangeComponent(true))}>change</button> */}

      {
        logOutButton ? <LeftSidebar /> : null
      }

      <Routes>
        <Route path="/home" element=
          {
            adminStatus ? <Home /> : <EmployeesHome />
          }
        />
        <Route path="/employeesTaskManagmentPage" element={

          adminStatus ? <EmployeesTaskManager /> : <AssignedEmployeesTask />
        }
        />

        <Route path="/showAllEmployeesData" element={<ShowAllEmployees />} />

        <Route path="/" element={
          changeLoginForm ? <LoginUsers /> : <LoginAdmin />}
        />

        <Route path="/createEmployeeNewAccount" element={<SignupUsers />} />

        <Route path="/signUpAdmin" element={<SignupAdmin />} />

      </Routes>



    </div>
  );
}

export default App;
