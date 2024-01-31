import React from "react";

import ProfileHostCard from "../../../../../components/ProfileHostCard/ProfileHostCard";
import InformationDateContainer from "../../../../../components/InformationDateContainer/InformationDateContainer";

import styles from "./HostInfoSection.module.css";

const HostInfoSection = (
    {
        hostFirstName, hostUsername,
        hostProfilePicture, hostAboutMe,
        hostMemberSince, hostResponseTime,
        chatRoom
    }
) => {
    const getDates = () => {
        return (
            <>
                {/*<p><b>Member since: </b><DateFormatter date={hostMemberSince} showTime={false}/></p>*/}
                {
                    hostResponseTime !== null && (
                        <p><b>Response time: </b>{hostResponseTime}</p>
                    )
                }

                {/*
                TODO: First implement host response rate in the backend
                <p><b>Response rate: </b>{listing.host_response_rate}%</p>
                */}
            </>
        )
    }

    return (
        <div className={`${styles.hostContainer}`}>
            <div>
                <ProfileHostCard
                    hostFirstName={hostFirstName}
                    hostUsername={hostUsername}
                    hostImage={hostProfilePicture}
                    hostMemberSince={hostMemberSince}
                    chatRoom={chatRoom}
                />
            </div>

            <InformationDateContainer
                text={hostAboutMe}
                dates={getDates()}
            />
        </div>
    )
}

export default HostInfoSection;