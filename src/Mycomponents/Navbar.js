import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Lable = styled.h4`
margin: 0;
color: white;
`
const Left = styled.div`
display: flex;
align-items: center;
gap: 5px;

`
const NavBarWrapper = styled.div`
width: 100%;
 display: flex;
 flex-direction: row;
`;
const NavLink = styled(Link)`
  color: #fcfff7;
  text-decoration: none;
  font-weight: bold;
  padding: 0.5rem 1rem;

  &:hover {
    color: #ffffff;
    background-color: #1a7a7a; 
    border-radius: 4px;
    text-decoration: none; 
  }

  &:active {
    transform: scale(0.95);
  }
`;
const Navbar = () => {
    const navbar_styles = {
        // height: '9vh',
        backgroundColor: '#21A0A0',
        // color: '#FCFFF7',
        // fontSize: '1.3rem',
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'space-evenly',
        // borderBottom: '4px solid white',

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

    const handleLogOutModal = () => {
        localStorage.removeItem('authToken');
        navigate('/');
        closeref.current.click();
    }
    return (
        <div>
            <NavBarWrapper className="navbar fixed-top" style={{ ...navbar_styles }}>
                <Left>
                    <div className="nav-heading" >
                        <Lable>LearnHuB</Lable>
                    </div>
                    <div className="nav-props" >
                        <NavLink to='/Tmaterials'>Materials</NavLink>
                        <NavLink to='/Tstudents'>Students</NavLink>
                        <NavLink to='/Tassignments'>Assignments</NavLink>
                        <NavLink to='/Taboutus'>About us</NavLink>
                    </div>
                </Left>
                <button onClick={handleLogOutBtn} style={{ right: '1rem', fontWeight: 'bold', top: '0.9rem' }} type="button" className="btn btn-light">Log Out</button>
            </NavBarWrapper>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#logOutmodel">
                Launch demo modal
            </button>

            <div className="modal fade" id="logOutmodel" tabIndex="-1" role="dialog" aria-labelledby="logOutmodelLabel" aria-hidden="true">
                <div className="modal-dialog " style={{ marginTop: '15rem' }} role="document">
                    <div className="modal-content">
                        <div className="modal-header" style={{ backgroundColor: '#21A0A0', color: '#FCFFF7' }}>
                            <h5 className="modal-title" id="logOutmodelLabel" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Signing Off?</h5>
                        </div>
                        <div className="modal-body">
                            <p style={{ fontWeight: 'bold' }}>Are you sure you want to log out of LearnHub? You'll lose any unsaved progress on your current course.</p>
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

export default Navbar
