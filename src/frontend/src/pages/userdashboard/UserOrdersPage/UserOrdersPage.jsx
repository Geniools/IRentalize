import React from 'react';
import {connect} from "react-redux";

import "../Userdashboard.css";

const UserOrdersPage = () => {
    return (
        <>
            <div className="dashboard-right-panel-header">
                <h1>MY ORDERS</h1>
            </div>
        </>
    )
}

export default connect(null, {})(UserOrdersPage);