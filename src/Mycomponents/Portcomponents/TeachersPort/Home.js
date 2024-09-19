import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
import ProfileContext from '../../Context/Profile/ProfileTeacher/ProfileContext'
import profilepic from '../../../Photos/teac.png';

const Home = () => {
    const profile_styles = {
        height: '70vh', width: '35vw', border: '6px solid #21A0A0', borderRadius: '10%', position: 'relative',
        marginLeft: '2rem'
    }

    const profile_props_styles = {
        marginTop: '1rem', paddingLeft: '1rem', fontWeight: 'bold', paddingBottom: '1rem',
        paddingTop: '1rem', fontSize: '1.2rem', color: '#212529'
    }

    const inputBars = {
        outline: 'none', marginTop: '1rem', width: '80%', paddingLeft: '0.5rem', border: 'none'
    }

    const [photoUrl, setphotoUrl] = useState('');
    const [newCredentials, setnewCredentials] = useState({ newName: '', newEmail: '', newMobile_no: '', newPhoto: null, newSubject: '' })

    const context = useContext(ProfileContext);
    const { credentials, setCredentials, getProfile, updateTeacher } = context;
    const ref = useRef(null);
    const closeref = useRef(null);

    useEffect(() => {
        const handleFetch = async () => {
            try {
                const response = await getProfile();
                // console.log(response);
                setCredentials({ name: response.name, email: response.email, mobile_no: response.mobile_no, photo: response.photo, subject: response.subject, id: response._id })
            } catch (error) {
                console.log('Error in fetching profile', error)
            }
        }
        handleFetch();
    }, [])

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        try {
            const handleUpdateFetch = async () => {
                const formData = new FormData();
                formData.append('newName', newCredentials.newName);
                formData.append('newEmail', newCredentials.newEmail);
                formData.append('newMobile_no', newCredentials.newMobile_no);
                formData.append('newSubject', newCredentials.newSubject);
                formData.append('newPhoto', newCredentials.newPhoto);
                formData.append('id', credentials.id);
                const resupdate = await updateTeacher(formData)
                // console.log('resupdate', resupdate.photo.data.data);
                setCredentials({ name: resupdate.name, email: resupdate.email, mobile_no: resupdate.mobile_no, photo: resupdate.photo.data.data, subject: resupdate.subject, id: resupdate._id })
            }
            handleUpdateFetch();
        } catch (error) {
            console.log('Error in updatig profile...')
        }
        closeref.current.click();
    }

    const handleUpdate = () => {
        ref.current.click();
        setnewCredentials({ newName: credentials.name, newEmail: credentials.email, newMobile_no: credentials.mobile_no, newSubject: credentials.mobile_no, })
    }

    const handleChange = (e) => {
        if (e.target.name === 'newPhoto') {
            setnewCredentials({ ...newCredentials, newPhoto: e.target.files[0] });
        } else {
            setnewCredentials({ ...newCredentials, [e.target.name]: e.target.value });
        }
    }

    useEffect(() => {
        //Convert buffer data to Base64 and set as photoUrl
        if (credentials.photo) {
            const bufferData = new Uint8Array(credentials.photo); //Unsigned 8bit array
            const blob = new Blob([bufferData], { type: 'image/jpeg' }); // blob object to represent image data
            const reader = new FileReader();
            reader.onload = () => {
                setphotoUrl(reader.result);
            }
            reader.readAsDataURL(blob);
        }
    }, [credentials.photo])

    return (
        <div>
            <div>
                <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Profile</h5>
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
                                    <div className="form-subject">
                                        <label htmlFor='subject'>Subject : </label>
                                        <input style={inputBars} type='text' className='inputBars' id='newSubject' name='newSubject' value={newCredentials.newSubject} onChange={handleChange} placeholder='Enter Subject...' />
                                    </div>
                                    <div className="form-mobile_no">
                                        <label htmlFor='mobile_no'>Mobile No. : </label>
                                        <input style={inputBars} type='text' className='inputBars' id='newMobile_no' name='newMobile_no' value={newCredentials.newMobile_no} onChange={handleChange} placeholder='Enter mobile_no...' />
                                    </div>
                                    {/* <div className="form-photo" style={{ marginTop: '1rem' }}>
                                        <label htmlFor='photo'>Upload Photo : </label>
                                        <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', marginTop: '0.5rem' }} onChange={handleChange} id='newPhoto' name='newPhoto' />
                                    </div> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeref} type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateSubmit}>Save changes</button>
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
                                {photoUrl && <img style={{ height: '9rem', width: '9rem', borderRadius: '50%', margin: '1rem 0 1rem 10rem' }} src={profilepic} alt='ProfilePhoto' />}
                            </div>
                        </div>
                        <div className="profile_props" style={profile_props_styles}>
                            <p>Name  : {credentials.name}</p>
                            <p>Email : {credentials.email}</p>
                            <p>Mobile No. : {credentials.mobile_no}</p>
                            <p>Subject : {credentials.subject}</p>
                            <p>Teacher_id : {credentials.id}</p>
                        </div>
                        <button style={{ position: 'absolute', right: '1.5rem', backgroundColor:'#21A0A0'}} type="button" className="btn btn-primary" onClick={handleUpdate}>Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
