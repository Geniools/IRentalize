import React from 'react';
import {connect} from "react-redux";

const UserPostsPage = () => {
    return (
        <>
            <div className="dashboard-right-panel-header">
                <h1>MY POSTS</h1>
            </div>
        </>
    )
}

export default connect(null, {})(UserPostsPage);