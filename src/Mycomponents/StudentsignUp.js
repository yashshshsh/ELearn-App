import React, { useState } from 'react'
import Webname from './Webname'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const StudentsignUp = () => {
    const hero_styles = {
        height: '87vh', backgroundColor: '#21A0A0',
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    }
    const form_section_styles = {
        height: '75vh', width: '40vw', backgroundColor: '#FCFFF7'
    }
    const formElementStyles = {
        marginTop: '1rem', paddingLeft: '1rem', fontWeight: 'Bold', borderBottom: '2px solid #21A0A0', paddingBottom: '1rem'
    }
    const inputBars = {
        marginRight: '1rem', width: '95%', display: 'block', outline: 'none', border: 'none'
    }

    const [credentials,setCredentials] = useState({name:'',email:'',password:'',mobile_no:'',photo:null});

    const handleChange = (e) =>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const navigate = useNavigate();

    const handleSubmitClick = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4512/api/authStudent/createuser', credentials);
            if(response.data.success){
                localStorage.setItem('token',response.data.authToken);
            }
            if (response.status >= 200 && response.status < 300) {
                console.log('User created Successfully');
                navigate('/Stmaterials')
            } else {
                console.log('Error in creating user')
            }
        } catch (error) {
            console.log('Failed to fetch:', error);
        }
    }

    const handleGoBackClick = () =>{
        navigate('/studentLogin');
    }

    return (
        <div>
            <Webname />
            <div className="hero" style={hero_styles}>
                <div className="form-section" style={form_section_styles}>
                    <form>
                        <h3 style={{textAlign:'center',fontWeight:'bold',padding:'1rem 0 1rem 0'}}>Student-SignUp</h3>
                        <div className="form-name" style={formElementStyles}>
                            <label htmlFor='name'>Name</label>
                            <input type='text' style={inputBars} className='inputBars' id='name' name='name' onChange={handleChange} minLength={3} required placeholder='Enter name...' />
                        </div>
                        <div className="form-email" style={formElementStyles}>
                            <label htmlFor='email'>Email</label>
                            <input style={inputBars} type='text' className='inputBars' id='email' name='email'onChange={handleChange} placeholder='Enter email...' />
                        </div>
                        <div className="form-password" style={formElementStyles}>
                            <label htmlFor='password'>Password</label>
                            <input style={inputBars} type='text' className='inputBars' id='password' name='password'onChange={handleChange} placeholder='Enter password...' />
                        </div>
                        <div className="form-mobile_no" style={formElementStyles}>
                            <label htmlFor='mobile_no'>Mobile No.</label>
                            <input style={inputBars} type='text' className='inputBars' id='mobile_no' name='mobile_no'onChange={handleChange} placeholder='Enter mobile_no...' />
                        </div>
                        <div className="form-photo" style={formElementStyles}>
                            <label htmlFor='photo'>Upload Photo</label>
                            <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', }} onChange={handleChange} id='photo' name='photo' />
                        </div>
                        <div className="submit-btn">
                            <button disabled={!credentials.name || !credentials.email|| !credentials.password || !credentials.mobile_no || !credentials.photo} type="submit" onClick={handleSubmitClick} class="btn btn-primary" style={{ marginTop: '1rem', marginLeft: '1rem' }}>Submit</button>
                            <button type="submit" onClick={handleGoBackClick} class="btn btn-dark" style={{ marginTop: '1rem', marginLeft: '1rem' }}>GoBack</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StudentsignUp
