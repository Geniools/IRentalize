import React from 'react';
import {connect} from "react-redux";

const UserRecentlyViewedPage = () => {
    return (
        <>
            <div className="dashboard-right-panel-header">
                <h1>RECENTLY VIEWED</h1>
            </div>
        </>
    )
}

export default connect(null, {})(UserRecentlyViewedPage);