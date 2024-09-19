import React from 'react'

const Webname = () => {
    const webName_styles = {
        height: "13vh", width: '100vw', backgroundColor: "#FCFFF7", color: "black", fontSize: '3rem',
        display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold'
    }
    return (
        <div>
            <div className="webName" style={webName_styles}>
                LearnHuB
            </div>
        </div>
    )
}

export default Webname;
