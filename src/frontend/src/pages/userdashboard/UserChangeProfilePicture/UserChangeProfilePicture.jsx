import React from "react";

import ImageUploadPreview from "../../../components/ImageUploadPreview/ImageUploadPreview";
import HeadTitle from "../../../components/HeadTitle/HeadTitle";
import {connect} from "react-redux";
import Loader from "../../../components/Loader/Loader";

const UserChangeProfilePicture = ({user}) => {
    if (!user) {
        return <Loader/>
    }

    return (
        <>
            <HeadTitle title="Change Profile Picture"/>

            <ImageUploadPreview hostUsername={user.username} hostFirstName={user.first_name} currentImage={user.profile.profile_image}/>

            <button>Update profile picture</button>
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {})(UserChangeProfilePicture);