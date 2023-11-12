import React, {useState} from "react";
import {connect} from "react-redux";

import {deleteUserProfilePicture, updateUserProfilePicture} from "../../../actions/user";

import ImageUploadPreview from "../../../components/ImageUploadPreview/ImageUploadPreview";
import HeadTitle from "../../../components/HeadTitle/HeadTitle";
import Loader from "../../../components/Loader/Loader";
import PopupConfirmation from "../../../components/PopupConfirmation/PopupConfirmation";

const UserChangeProfilePicture = ({user, updateUserProfilePicture, deleteUserProfilePicture}) => {
    if (!user) {
        return <Loader/>;
    }

    const [imageSrc, setImageSrc] = useState(user.profile.profile_picture);
    const [imageFile, setImageFile] = useState(null);

    const [toDelete, setToDelete] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        const reader = new FileReader();

        reader.onloadend = () => {
            setImageSrc(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onUpdateClick = (event) => {
        event.preventDefault();
        updateUserProfilePicture(imageFile);
    }

    const onDeleteClick = (event) => {
        event.preventDefault();
        deleteUserProfilePicture();
        // Close the popup
        setToDelete(false);
        // Reset the image
        setImageSrc(null);
    }

    return (
        <>
            <HeadTitle title="Change Profile Picture"/>

            <form onSubmit="">
                <label htmlFor="image">Upload a 1:1 size image in <b>.png, .jpg or jpeg</b> format:</label>
                <input type="file" id={"image"} onChange={handleImageChange} accept="image/png, image/jpg, image/jpeg"/>
            </form>

            <ImageUploadPreview hostUsername={user.username} hostFirstName={user.first_name} currentImage={imageSrc}/>

            <button onClick={onUpdateClick} disabled={imageFile === null}>Update profile picture</button>

            {
                user.profile.profile_picture && (
                    <button className={"delete"} onClick={() => setToDelete(true)}>Delete profile picture</button>
                )
            }
            {
                toDelete && (
                    <PopupConfirmation
                        title="Delete profile picture"
                        message="Are you sure you want to delete your profile picture?"
                        onConfirm={onDeleteClick}
                        onCancel={() => setToDelete(false)}
                    />
                )
            }
        </>
    )
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

export default connect(mapStateToProps, {updateUserProfilePicture, deleteUserProfilePicture})(UserChangeProfilePicture);