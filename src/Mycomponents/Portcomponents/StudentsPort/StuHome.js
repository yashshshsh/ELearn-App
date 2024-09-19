import React, { useContext, useState, useEffect, useRef } from 'react'
import studentPic from '../../../Photos/stu.png';
import ProfileStudentContext from '../../Context/Profile/Profilestudent/Profilestudentcontext';

const StuHome = () => {
    const profile_styles = {
        height: '70vh', width: '35vw', border: '6px solid #21A0A0', borderRadius: '10%', position: 'relative',
        marginLeft: '2rem'
    }

    const profile_props_styles = {
        marginTop: '1rem', paddingLeft: '1rem', fontWeight: 'bold', paddingBottom: '1rem',
        paddingTop: '1rem', fontSize: '1.2rem', color: '#212529'
    }

    const inputBars = {
        outline: 'none', marginTop: '1rem', width: '70%', paddingLeft: '0.5rem', border: 'none'
    }

    const context = useContext(ProfileStudentContext);
    const { stcredentials, setStcredentials, getStProfile, updateStudent } = context;
    const ref = useRef(null);
    const closeref = useRef(null);
    const [newCredentials, setnewCredentials] = useState({ newName: '', newEmail: '', newMobile_no: '', newPhoto: null, newEnrollment_no: '' })

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const data = await getStProfile();
                setStcredentials({ name: data.name, email: data.email, mobile_no: data.mobile_no, enrollment_no: data.enrollment_no, id: data._id })
            } catch (error) {
                console.error('Failed to fetch handleFetch', error.message)
            }
        }
        handleFetch();
    }, []);

    const handleChange = (e) => {
        setnewCredentials({ ...newCredentials, [e.target.name]: e.target.value });
    }

    const handleUpdate = () => {
        ref.current.click();
        setnewCredentials({ newName: stcredentials.name, newEmail: stcredentials.email, newMobile_no: stcredentials.mobile_no, newEnrollment_no: stcredentials.enrollment_no })
    }

    const handleStudentUpdate = (e) => {
        e.preventDefault();
        try {
            const handleUpdateFetch = async () => {
                const response = await updateStudent({ name: newCredentials.newName, email: newCredentials.newEmail, mobile_no: newCredentials.newMobile_no, enrollment_no: newCredentials.newEnrollment_no, id: stcredentials.id });
                setStcredentials({ name: response.user.name, email: response.user.email, mobile_no: response.user.mobile_no, enrollment_no: response.user.enrollment_no, id: stcredentials.id })
            }
            handleUpdateFetch();
        } catch (error) {
            console.log('Error in printing form Data', error)
        }
        closeref.current.click();
    }

    return (
        <div>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#StudentProUpdateModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="StudentProUpdateModal" tabIndex="-1" role="dialog" aria-labelledby="StudentProUpdateModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="StudentProUpdateModalLabel">Update Profile</h5>
                        </div>
                        <div className="modal-body" >
                            <form>
                                <div className="form-name">
                                    <label htmlFor='name'>Name : </label>
                                    <input type='text' style={inputBars} className='inputBars' id='newName' name='newName' value={newCredentials.newName} onChange={handleChange} minLength={3} required placeholder='Enter name...' />
                                </div>
                                <div className="form-email">
                                    <label htmlFor='email'>Email : </label>
                                    <input style={inputBars} type='text' className='inputBars' id='newEmail' name='newEmail' value={newCredentials.newEmail} onChange={handleChange} placeholder='Enter email...' />
                                </div>
                                <div className="form-Enrollment_no">
                                    <label htmlFor='enrollment_no'>Enrollment No : </label>
                                    <input style={inputBars} type='text' className='inputBars' id='newEnrollment_no' name='newEnrollment_no' value={newCredentials.newEnrollment_no} onChange={handleChange} placeholder='Enter Enrollment No....' />
                                </div>
                                <div className="form-mobile_no">
                                    <label htmlFor='mobile_no'>Mobile No. : </label>
                                    <input style={inputBars} type='text' className='inputBars' id='newMobile_no' name='newMobile_no' value={newCredentials.newMobile_no} onChange={handleChange} placeholder='Enter mobile_no...' />
                                </div>
                                <div className="form-photo" style={{ marginTop: '1rem' }}>
                                    <label htmlFor='photo'>Upload Photo : </label>
                                    <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', marginTop: '0.5rem' }} onChange={handleChange} id='newPhoto' name='newPhoto' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            <button onClick={handleStudentUpdate} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Profile_heading" style={{ backgroundColor: '#21A0A0', position: 'fixed', color: 'white', marginLeft: '1rem', width: '43vw', height: '3rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.7rem', borderRight: '5px solid white' }}>
                <p>Profile</p>
            </div>

            <div className="home" style={{ height: '91vh', position: 'fixed', left: '2.4rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="profile" style={profile_styles}>
                    <div className="profile_photo" style={{ height: '11rem', backgroundColor: '#D0F4EA', borderRadius: '40%', borderBottom: '2px solid #21A0A0' }}>
                        <div className="img">
                            {<img style={{ height: '9rem', width: '9rem', borderRadius: '50%', margin: '1rem 0 1rem 10rem' }} src={studentPic} alt='ProfilePhoto' />}
                        </div>
                    </div>
                    <div className="profile_props" style={profile_props_styles}>
                        <p>Name  : {stcredentials.name}</p>
                        <p>Email : {stcredentials.email}</p>
                        <p>Mobile No. : {stcredentials.mobile_no}</p>
                        <p>Enrollment No : {stcredentials.enrollment_no}</p>
                        <p>Student_id : {stcredentials.id}</p>
                    </div>
                    <button style={{ position: 'absolute', right: '1.5rem', backgroundColor: '#21A0A0' }} onClick={handleUpdate} type="button" className="btn btn-primary" >Update Profile</button>
                </div>
            </div>
        </div>
    )
}

export default StuHome
