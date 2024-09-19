import React,{useState} from 'react'
import Webname from './Webname'
import { useNavigate } from 'react-router-dom'

const Teacherlogin = () => {
    const hero_styles = {
        height: '87vh', backgroundColor: '#21A0A0',
        display: 'flex', justifyContent: 'center', alignItems: 'center'
    }
    const form_section_styles = {
        height: '45vh', width: '40vw', backgroundColor: '#FCFFF7'
    }
    const formElementStyles = {
        marginTop: '1rem', paddingLeft: '1rem', fontWeight: 'Bold', borderBottom: '2px solid #21A0A0', paddingBottom: '1rem'
    }
    const inputBars = {
        marginRight: '1rem', width: '95%', display: 'block', outline: 'none', border: 'none'
    }
    const [credentials, setCredentials] = useState({email: '', password: ''});
    
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate();

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        try{
            const {email,password} = credentials;
            const url = "http://localhost:4512/api/authStudent/loginStudent";
            const response = await fetch(url,{
                'method':"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({email,password})
            })
            const json = await response.json();
            if(json.success){
                localStorage.setItem('token',json.authToken);
                // console.log('authToken',json.authToken)
                // console.log('Logged in succesfully...');
                navigate('/Stmaterials');
            } else {
                console.log('Login Failed')
            }
        } catch(error){
            console.log('Failed to fetch:', error);
        }       
    }

    const handleGoBackClick = () => {
        navigate('/');
    }

    const handleNewUserClick = () =>{
        navigate('/studentsignup')
    }

    return (
        <div>
            <Webname />
            <div className="hero" style={hero_styles}>
                <div className="form-section" style={form_section_styles}>
                    <form>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold', padding: '1rem 0 1rem 0' }}>Student-Login</h3>
                        <div className="form-email" style={formElementStyles}>
                            <label htmlFor='email'>Email</label>
                            <input style={inputBars} type='text' className='inputBars' id='email' name='email' onChange={handleChange} placeholder='Enter email...' />
                        </div>
                        <div className="form-password" style={formElementStyles}>
                            <label htmlFor='password'>Password</label>
                            <input style={inputBars} type='text' className='inputBars' id='password' name='password' onChange={handleChange} placeholder='Enter password...' />
                        </div>
                        <div className="submit-btn">
                            <button disabled={!credentials.email || !credentials.password} type="submit" onClick={handleSubmitClick} class="btn btn-primary" style={{ marginTop: '2rem', marginLeft: '1rem' }}>Submit</button>
                            <button type="submit" onClick={handleGoBackClick} class="btn btn-dark" style={{ marginTop: '2rem', marginLeft: '1rem' }}>GoBack</button>
                            <button type="submit" onClick={handleNewUserClick} class="btn btn-success" style={{ marginTop: '2rem', marginLeft: '1rem' }}>New User?</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Teacherlogin
