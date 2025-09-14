import React, { useContext, useEffect, useMemo, useState } from 'react'
import teacherPic from '../../../Photos/teac.png'
import Navbar from '../../Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'
import View_Material from './View_Material'
import noAccessimg from '../../../Photos/accessReq.jpeg'
import AccReq from '../../Context/AccessReq/AccessReqcontext'
import { useRef } from 'react'
import StNavbar from '../../StNavbar'

const ViewProfile = () => {

    const location = useLocation();
    const { selectedTeacher } = location.state;

    const profile_styles = {
        height: '70vh', width: '35vw', border: '6px solid #21A0A0', borderRadius: '10%', position: 'relative',
        marginLeft: '2rem'
    }

    const first_styles = {
        width: '45vw',
        // height: '100vh',
        marginTop: '5.5rem'
    }
    const profile_props_styles = {
        marginTop: '1rem', paddingLeft: '1rem', fontWeight: 'bold', paddingBottom: '1rem',
        paddingTop: '1rem', fontSize: '1.2rem', color: '#212529'
    }

    const getSTcontent = async () => {
        try {
            const host = "http://localhost:4512";
            const url = `${host}/api/Scontent/fetchTMaterials/${selectedTeacher.name}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZWFjaGVyIjp7ImlkIjoiNjYzZTYxZmY4ODMzNDQzMTM3ZGFlOGZjIn0sImlhdCI6MTcxNTYxMTU0N30.X0rJWC1zbE-M1zFPxMvqAUbTD7IrtRiau2eggVcN7YQ'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error in fetching ass of selected Teacher', error);
        }
    }

    const [sTcontent, setSTcontent] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(AccReq);
    const { status, reqData, getAccessReq, setStatus, createAccessReq, cancelAccessReq } = context
    const navigate = useNavigate();

    useEffect(() => {
        const handleFetch = async () => {
            try {
                setLoading(true);
                const yogi = await getSTcontent();
                setSTcontent(yogi.material);
                // setLoading(false);
            } catch (error) {
                console.log('Error in useEffect', error);
            }
        }
        handleFetch();
    }, []);

    // useEffect(() => {
    //     console.log('Inside useEffect', sTcontent);
    // }, [sTcontent]);

    const memoizedSTItems = useMemo(() => {
        const STcontent = Array.isArray(sTcontent) ? sTcontent : [];
        return (STcontent.slice().reverse().map((material) => {
            return <View_Material key={material._id} selectedTeacher={selectedTeacher} material={material} />
        }))
    }, [sTcontent])

    const [colorSReq, setcolorSReq] = useState('');
    const [sReqtext, setsReqtext] = useState('')
    const [gpy, setGpy] = useState('');
    const ref = useRef(null);
    const closeref = useRef(null);

    useEffect(() => {
        const handleGoogi = async () => {
            const dell = await getAccessReq(selectedTeacher);
            if (dell && dell.required_req && dell.required_req.length > 0) {
                setStatus(dell.required_req[0].status);
            } else {
                setStatus('');
            }
        }
        handleGoogi();
    }, [])

    useEffect(() => {
        if (status === "pending") {
            setcolorSReq('warning');
            setsReqtext('Pending');
            setGpy('Request Sent');
            // console.log('Status', status)
        } else {
            setcolorSReq('dark');
            setsReqtext('Send Request');
            setGpy('Send an access request to have an access to the content')
            // console.log('Status',status);
        }
    }, [status]);

    // {console.log('SelectedTeacher outside',selectedTeacher)}

    const handleAccessReq = async () => {
        if (status === "pending") {
            ref.current.click();
        } else {
            // console.log('SelectedTeacher Inside handleAccessreq',selectedTeacher)
            const data = await createAccessReq(selectedTeacher);
            // console.log('data', data);
            setStatus(data.accessRequest.status)
        }
    }

    const handleCancelReq = async () => {
        try {
            const data = await cancelAccessReq(selectedTeacher);
            setStatus('');
            // console.log('Deleted_data',data);
            closeref.current.click();
        } catch (error) {
            console.log('Error in fetching handleCancelReq', error);
        }
    }

    const handleGoBack = () => {
        navigate('/Stmaterials')
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#cancelReqmodel">
                Launch demo modal
            </button>

            <div className="modal fade" id="cancelReqmodel" tabIndex="-1" role="dialog" aria-labelledby="cancelReqmodelLabel" aria-hidden="true">
                <div className="modal-dialog " style={{ marginTop: '15rem' }} role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: '#21A0A0', color: '#FCFFF7' }}>
                            <h5 className="modal-title" id="cancelReqmodelLabel" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Cancel Request?</h5>
                        </div>
                        <div className="modal-body">
                            <p style={{ fontWeight: 'bold' }}>Are you sure you want to cancel access request??</p>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            <button onClick={handleCancelReq} type="button" className="btn btn-danger">Cancel Request</button>
                        </div>
                    </div>
                </div>
            </div>

            <StNavbar />
            <div className="Hero" style={{ display: 'flex' }}>
                <div className="first" style={first_styles}>
                    <div className="Profile_heading" style={{ backgroundColor: '#21A0A0', position: 'fixed', color: 'white', marginLeft: '1rem', width: '43vw', height: '3rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.7rem', borderRight: '5px solid white' }}>
                        <p>Teachers Details</p>
                    </div>

                    <div className="home" style={{ height: '91vh', position: 'fixed', left: '2.4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div className="profile" style={profile_styles}>
                            <div className="profile_photo" style={{ height: '11rem', backgroundColor: '#D0F4EA', borderRadius: '40%', borderBottom: '2px solid #21A0A0' }}>
                                <div className="img">
                                    {<img style={{ height: '9rem', width: '9rem', borderRadius: '50%', margin: '1rem 0 1rem 10rem' }} src={teacherPic} alt='ProfilePhoto' />}
                                </div>
                            </div>
                            <div className="profile_props" style={profile_props_styles}>
                                <p>Name  : {selectedTeacher?.name}</p>
                                <p>Email : {selectedTeacher?.email}</p>
                                <p>Mobile No. : {selectedTeacher?.mobile_no}</p>
                                <p>Subject : {selectedTeacher?.subject}</p>
                                <p>Teacher_id : {selectedTeacher?._id}</p>
                            </div>
                            <button onClick={handleGoBack} style={{ position: 'absolute', right: '1.5rem' }} type="button" className="btn btn-dark" >Go Back to Home</button>
                        </div>
                    </div>
                </div>

                <div className="second" style={{
                    borderLeft: '4px solid #21A0A0', overflow: 'hidden',
                    height: '100vh',
                    width: '55%', position: 'fixed', top: '0.5rem', right: '0'
                }}>
                    <div className="second_heading" style={{ height: '3rem', fontSize: '1.7rem', color: 'white', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '0.5rem', marginLeft: '0.5rem', marginTop: '5rem', backgroundColor: '#21A0A0' }}>
                        <p style={{ marginTop: '0.7rem' }}>Materials</p>
                    </div>

                    {status === 'approved' ? (loading ? (
                        <div style={{ marginLeft: '13rem', backgroundColor: '#D0F4EA', height: '17vh', width: '20rem', justifyContent: 'center', marginTop: '14rem', alignItems: 'center', display: 'flex', flexDirection: 'column' }} className="spinner">
                            <div className="clipLoader">
                                <ClipLoader color="black" loading={loading} size={30} />
                            </div>

                            <div style={{ marginRight: '15rem' }} className="loading">
                                <p style={{ fontWeight: 'Bold', width: '15rem', fontSize: '1.3rem', marginLeft: '18.5rem', marginTop: '0.5rem' }}>Content on its way.....</p>
                            </div>
                        </div>) : (<div className="getting_content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 10rem)', marginTop: '1rem' }}>
                            {memoizedSTItems}
                        </div>)) : (<div className="accessReq" style={{ padding: '1rem', marginTop: '8rem', height: '35vh', width: '35vw', marginLeft: '10rem', paddingTop: '1.5rem', backgroundColor: '#D0F4EA' }}>
                            <div className="noAccessimg" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img style={{ height: '8rem', width: '8rem' }} src={noAccessimg}></img>
                            </div>
                            <div className="text" style={{ display: 'flex', fontSize: '1.5rem', fontWeight: 'bold', justifyContent: 'center' }}>
                                <p>Content Access Denied</p>
                            </div>
                            <div className="btn_access" style={{ display: 'flex', gap: '1rem', height: '2.5rem', fontSize: '1.1rem', fontWeight: 'bold', justifyContent: 'center' }}>
                                <p style={{ marginTop: '0.3rem' }}>{gpy}</p>
                                <button onClick={handleAccessReq} type="button" className={`btn btn-${colorSReq}`}>{sReqtext}</button>
                            </div>
                        </div>)}

                    {/* <div className="accessReq" style={{ marginTop: '8rem' }}>
                        <div className="noAccessimg" style={{ display: 'flex', justifyContent: 'center' }}>
                            <img style={{ height: '8rem', width: '8rem' }} src={noAccessimg}></img>
                        </div>
                        <div className="text" style={{ display: 'flex', fontSize: '1.5rem', fontWeight: 'bold', justifyContent: 'center' }}>
                            <p>Content Access Denied</p>
                        </div>
                        <div className="btn_access" style={{ display: 'flex', gap: '1rem', height: '2.5rem', fontSize: '1.1rem', fontWeight: 'bold', justifyContent: 'center' }}>
                            <p style={{ marginTop: '0.3rem' }}>{gpy}</p>
                            <button onClick={handleAccessReq} type="button" className={`btn btn-${colorSReq}`}>{sReqtext}</button>
                        </div>
                    </div> */}

                    {/* {loading ? (
                        <div style={{ marginLeft: '13rem', width: '20rem', justifyContent: 'center', marginTop: '4rem', alignItems: 'center', display: 'flex', flexDirection: 'column' }} className="spinner">
                            <div className="clipLoader">
                                <ClipLoader color="black" loading={loading} size={30} />
                            </div>

                            <div style={{ marginRight: '15rem' }} className="loading">
                                <p style={{ fontWeight: 'Bold', width: '15rem', fontSize: '1.2rem', marginLeft: '18.5rem', marginTop: '0.5rem' }}>Content on its way.....</p>
                            </div>
                        </div>) : (<div className="getting_content" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 10rem)', marginTop: '1rem' }}>
                            {memoizedSTItems}
                        </div>)} */}
                </div>
            </div>

        </div>
    )
}

export default ViewProfile
