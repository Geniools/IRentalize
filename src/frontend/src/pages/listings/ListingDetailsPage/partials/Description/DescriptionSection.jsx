import React from "react";

import DateFormatter from "../../../../../components/DateFormatter/DateFormatter";
import InformationDateContainer from "../../../../../components/./InformationDateContainer/InformationDateContainer";

const DescriptionSection = ({description, createdAt, updatedAt}) => {
    const getDates = () => {
        return (
            <>
                <p><b>Posted on: </b><DateFormatter date={createdAt} showTime={false}/></p>
                <p><b>Updated on: </b><DateFormatter date={updatedAt} showTime={false}/></p>
            </>
        )
    }

    return (
        <InformationDateContainer
            text={description}
            dates={getDates()}
        />
    )
}

export default DescriptionSection;