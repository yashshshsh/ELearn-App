import React, { useRef, useState, useEffect } from 'react'
import Navbar from '../../Navbar'
import StuHome from './StuHome'
import StuInput from './StuInput'
import teacherPic from '../../../Photos/teac.png'
import { useNavigate } from 'react-router-dom'
import StNavbar from '../../StNavbar'

const Stusearch = () => {
  const first_styles = {
    width: '45vw', height: '100vh', marginTop: '5.5rem'
  }
  const second_styles = {
    borderLeft: '5px solid #21A0A0', height: '100vh', width: '54.3vw', position: 'absolute', right: '0rem', marginTop: '5.4rem'
  }

  const ref = useRef(null);
  const closeref = useRef(null);
  const navigate = useNavigate();

  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const openModel = (teacher) => {
    ref.current.click();
    setSelectedTeacher(teacher);
  }

  // useEffect(() => {
  //   console.log('New Selected Teacher', selectedTeacher);
  // }, [selectedTeacher]);

  const handleViewProfile = () => {
    closeref.current.click();
    navigate('/viewProfile', { state: { selectedTeacher } });
  };

  return (
    <div>
      <div className="navbar">
        <StNavbar/>  
      </div>

      <div className="hero_section" style={{ display: 'flex' }}>
        <div className="first" style={first_styles}>
          <StuHome />
        </div>
        <div className="second" style={second_styles}>
          <div className="second_Upper">
            <StuInput openModel={openModel} />
          </div>
        </div>
      </div>

      <div className="bootmodal">
        <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div style={{ marginTop: '5rem' }} className="modal-dialog" role="document">
            <div className="modal-content" style={{ border: '10px solid #21A0A0' }}>
              <div className="modal-header" style={{ backgroundColor: '#21A0A0', color: 'white' }}>
                <h5 style={{ fontWeight: 'bold', fontSize: '2rem', marginLeft: '7rem' }} className="modal-title" id="exampleModalLabel">Teacher's Profile</h5>
              </div>
              <div className="modal-body">
                <div className="navneet" style={{ display: 'flex', backgroundColor: '#D0F4EA', alignItems: 'center' }}>
                  <div className="profile_photo">
                    <img style={{ height: '8rem', width: '8rem', marginLeft: '1rem', borderRadius: '50%' }} src={teacherPic} alt='ProfilePhoto' />
                  </div>
                  <div className="profile_props" style={{ fontWeight: 'bold', marginLeft: '1rem', marginTop: '1rem' }}>
                    <p>Name  : {selectedTeacher?.name}</p>
                    <p>Email : {selectedTeacher?.email}</p>
                    <p>Mobile No. : {selectedTeacher?.mobile_no}</p>
                    <p>Subject : {selectedTeacher?.subject}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer" style={{ borderTop: '2px solid black' }}>
                <button type="button" ref={closeref} className="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" onClick={handleViewProfile} className="btn btn-dark">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stusearch


