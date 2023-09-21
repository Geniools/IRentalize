import React from "react";

const BackgroundImage = ({src, children}) => {
    return (
        <div className="background-image-container" style={{backgroundImage: `url(${src})`}}>
            {children}
        </div>
    );
}

export default BackgroundImage;