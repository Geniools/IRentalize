const NotFoundPage = () => {
    // TODO: Add more styling to this page
    return (
        <div className="page-container">

            <div className="flex-horizontally-center">
                <div style={{width: "30%"}}>
                    <img src="/static/assets/sorry_not_sorry.jpg" alt="Sorry Not Sorry"/>
                </div>
            </div>

            <div className="flex-horizontally-center">
                <h1>
                    404 Not Found :(
                </h1>
            </div>

            <br/>
        </div>
    )
}

export default NotFoundPage