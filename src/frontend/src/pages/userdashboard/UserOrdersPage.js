import React from 'react';
import {connect} from "react-redux";

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