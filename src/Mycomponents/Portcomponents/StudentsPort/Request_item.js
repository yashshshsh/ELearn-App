import React, { useContext, useState } from 'react'
import AccReq from '../../Context/AccessReq/AccessReqcontext';

const Request_item = (props) => {
    const { req, reqData, setReqData } = props;
    const [showMaterial, setShowMaterial] = useState(false);

    const context = useContext(AccReq);
    const { status,setStatus,AcceptReqState , DeleteAcessReq } = context;

    const bingo_style = {
        height: showMaterial ? '12rem' : '4rem', paddingTop: '1rem', marginTop: '1rem', paddingLeft: '1rem', fontSize: '1rem', fontWeight: 'bold', display: 'flex', border: '2px solid #21A0A0', width: '29rem', borderRadius: '10px'
    }

    const handleShow = async () => {
        setShowMaterial(!showMaterial);
    }

    const handleAcceptReq = async (e) => {
        e.stopPropagation();
        // console.log('Accept button is clicked...')
        const data = await AcceptReqState(req._id);
        setStatus(data.status);
        const newReqData = reqData.filter((reqitem) =>{
            return reqitem._id != req._id;
        })
        setReqData(newReqData);
    }

    const handleRejectReq = async(e) =>{
        e.stopPropagation();
        const d1 = await DeleteAcessReq(req._id);
        const newReqData = reqData.filter((reqitem) =>{
            return reqitem._id != req._id;
        })
        setReqData(newReqData);
    }
    return (
        <div>
            <div className="bingo" onClick={handleShow} style={bingo_style}>
                <div className="double">
                    <div className="lottery">
                        <p style={{ color: showMaterial ? '#21A0A0' : '', fontSize: showMaterial ? '1.2rem' : '1rem' }}>{req.Student_name} wants to access your material</p>
                    </div>
                    <div className={`diamond ${showMaterial ? '' : 'd-none'}`}>
                        <p>Name : {req.Student_name}</p>
                        <p>Student Id : {req.student}</p>
                        <div className="btns">
                            <button onClick={handleRejectReq} type="button" style={{ marginRight: '1rem' }} className="btn btn-danger">Reject</button>
                            <button onClick={handleAcceptReq} type="button" className="btn btn-success">Accept</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Request_item
