import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const StNavbar = () => {
    const StNavbar_styles = {
        height: '9vh', backgroundColor: '#21A0A0', color: '#FCFFF7', fontSize: '1.3rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', borderBottom: '4px solid white',

    }
    const nav_props_styles = {
        marginLeft: '1rem', color: '#FCFFF7', textDecoration: 'none'
    }

    const ref = useRef(null);
    const closeref = useRef(null);
    const navigate = useNavigate();

    const handleLogOutBtn = () => {
        ref.current.click();
    }

    const handleLogOutModal = () =>{
        localStorage.removeItem('authToken'); 
        navigate('/');
        closeref.current.click();
    }
    return (
        <div>
            <div className="StNavbar fixed-top" style={{ ...StNavbar_styles }}>
                <div className="nav-heading" style={{ fontWeight: 'bold', fontSize: '2.3rem',marginTop:'0.5rem'}}>
                    <p>LearnHuB</p>
                </div>
                <div className="nav-props" style={{ paddingBottom: '1rem', width: '85%',marginTop:'0.6rem' }}>
                    <Link style={nav_props_styles} to='/Stmaterials'>Home</Link>
                    <Link style={nav_props_styles} to='/Stassignments'>Assignments</Link>
                    <Link style={nav_props_styles} to='/Staboutus'>About us</Link>
                    <button onClick={handleLogOutBtn} style={{ position: 'absolute', right: '1rem', fontWeight: 'bold', top: '0.9rem' }} type="button" className="btn btn-light">Log Out</button>
                </div>
            </div>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#logOutmodel">
                Launch demo modal
            </button>

            <div className="modal fade" id="logOutmodel" tabIndex="-1" role="dialog" aria-labelledby="logOutmodelLabel" aria-hidden="true">
                <div className="modal-dialog " style={{marginTop:'15rem'}} role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{backgroundColor:'#21A0A0', color:'#FCFFF7'}}>
                            <h5 className="modal-title" id="logOutmodelLabel" style={{fontWeight:'bold',fontSize:'2rem'}}>Signing Off?</h5>
                        </div>
                        <div className="modal-body">
                            <p style={{fontWeight:'bold'}}>Are you sure you want to log out of LearnHub? You'll lose any unsaved progress on your current course.</p>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            <button onClick={handleLogOutModal} type="button" className="btn btn-danger">Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StNavbar
