import "../EmployeeOfTheMonthComponent/EmployeeOfTheMonth.css"
import image from "../../../../RegisterComponent/images/add-user.png"

function EmployeeOfTheMonth() {

    return (
        <div className="employee-of-the-month-component">
            <div className="employee-of-the-month-div">
                <h3>Employee Of The Month</h3>
                <img className="image" src={image}/>
                <h4>John Doe</h4>
                <p>Department : UI/UX Designer</p>
            </div>
        </div>
    )
}

export default EmployeeOfTheMonth;

