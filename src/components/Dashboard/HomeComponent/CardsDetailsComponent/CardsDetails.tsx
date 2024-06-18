import React from "react";
import "../CardsDetailsComponent/CardsDetails.css"
import { FaAccusoft } from "react-icons/fa";

function CardsDetails() {
    return (
        <div>

            <div className="card-details-container">

                <div className="card-details-div">
                    <FaAccusoft className="cards-icons"/>

                    <div>
                    <p>Total Employees</p>
                    <h4>20</h4>
                    </div>
                </div>

                <div className="card-details-div">
                    <FaAccusoft className="cards-icons"/>

                    <div>
                    <p>Total Departments</p>
                    <h4>20</h4>
                    </div>
                </div>

                <div className="card-details-div">
                    <FaAccusoft className="cards-icons"/>

                    <div>
                    <p>Total Tasks</p>
                    <h4>20</h4>
                    </div>
                </div>

                <div className="card-details-div">
                    <FaAccusoft className="cards-icons"/>

                    <div>
                    <p>Total Employees</p>
                    <h4>20</h4>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardsDetails;