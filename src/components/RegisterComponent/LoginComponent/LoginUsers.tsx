import "./LoginUsers.css"
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";
import { setAdminStatus, setLoggedInSavedUid, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";

const checkUserLoggedInAuthQuery = gql`
mutation userLogin($userLoginParameters: createLoginInput!){
  createUserLogin(userLoginParameters: $userLoginParameters) {
  uid
  success
  message
  token
  }
}
`

function LoginUsers() {

    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const Dispatch = useAppDispatch()
    // const [] = useState("");
    // const [] = useState()
    const navigate = useNavigate()

    const [checkUserLoggedInAuth] = useMutation(checkUserLoggedInAuthQuery, {
        onCompleted: (data) => {

            if (data.createUserLogin.success === true) {
                console.log(data)
                navigate("/home")
                Dispatch(setAdminStatus(false));
                Dispatch(setShowLogOutButtonElements(true));
                Dispatch(setLoggedInSavedUid(data.createUserLogin.uid));
            } else {
                Dispatch(setShowLogOutButtonElements(false));
            }
        },
    });



    const loginForm = (e: any) => {
        e.preventDefault()
    }
    //   }

    return (
        <div>

            <ChangeLogInFormButtons />

            <form onSubmit={loginForm} className="login-form">
                <h3>User Login In Form</h3>

                <input type="text" placeholder="EmailId" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
                <button onClick={() => {
                    {
                        checkUserLoggedInAuth({
                            variables: {
                                userLoginParameters: {

                                    emailId: userLoggedinEmailId,
                                    password: userLoggedInEmailPassword
                                }
                            }
                        })
                    }
                }}>Login</button>
            </form>
        </div>
    )
}

export default LoginUsers;