import { useEffect, useState } from 'react'
import Webname from './Webname'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeachersignUp = () => {
    const hero_styles = {
        height: '87vh', backgroundColor: '#21A0A0',
        display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
    }
    const form_section_styles = {
        height: '78vh', width: '40vw', backgroundColor: '#FCFFF7'
    }
    const formElementStyles = {
        marginTop: '1rem', paddingLeft: '1rem', fontWeight: 'Bold', borderBottom: '2px solid #21A0A0', paddingBottom: '1rem'
    }
    const inputBars = {
        marginRight: '1rem', width: '95%', display: 'block', outline: 'none', border: 'none'
    }

    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', mobile_no: '', photo: null });

    const handleChange = (e) => {
        if (e.target.name === 'newPhoto') {
            setCredentials({ ...credentials, newPhoto: e.target.files[0] });
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    }

    // useEffect(()=>{
    //     console.log('Credentials Changed',credentials);
    // },[credentials]);

    const navigate = useNavigate();

    const handleSubmitClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('name', credentials.name);
        formData.append('email', credentials.email);
        formData.append('mobile_no', credentials.mobile_no);
        formData.append('password', credentials.password);
        formData.append('subject', credentials.subject);
        formData.append('photo', credentials.photo);

        try {
            // const headers = {
            //     'Content-Type': 'multipart/form-data', Axios automatically set content type to multipart/form-Data so there is no need to manually set it
            // }
            const response = await axios.post('http://localhost:4512/api/authTeacher/createuser', formData);
            if (response.data.success) {
                localStorage.setItem('token', response.data.authToken);
                // console.log('AuthToken',response.data.authToken);
                // console.log('TeacherSignUp', response.data);
            }
            if ( response.status >= 200 && response.status < 300) {
                console.log('User created Successfully');
                navigate('/Tmaterials')
            } else {
                console.log('Error in creating user')
            }
        } catch (error) {
            console.log('Failed to fetch:', error);
        }
    }

    const handleGoBackClick = () => {
        navigate('/teacherLogin');
    }

    return (
        <div>
            <Webname />
            <div className="hero" style={hero_styles}>
                <div className="form-section" style={form_section_styles}>
                    <form>
                        <h3 style={{ textAlign: 'center', fontWeight: 'bold', padding: '1rem 0 1rem 0' }}>Teacher-SignUp</h3>
                        <div className="form-name" style={formElementStyles}>
                            <label htmlFor='name'>Name</label>
                            <input type='text' style={inputBars} className='inputBars' id='name' name='name' onChange={handleChange} minLength={3} required placeholder='Enter name...' />
                        </div>
                        <div className="form-email" style={formElementStyles}>
                            <label htmlFor='email'>Email</label>
                            <input style={inputBars} type='text' className='inputBars' id='email' name='email' onChange={handleChange} placeholder='Enter email...' />
                        </div>
                        <div className="form-password" style={formElementStyles}>
                            <label htmlFor='password'>Password</label>
                            <input style={inputBars} type='text' className='inputBars' id='password' name='password' onChange={handleChange} placeholder='Enter password...' />
                        </div>
                        <div className="form-mobile_no" style={formElementStyles}>
                            <label htmlFor='mobile_no'>Mobile No.</label>
                            <input style={inputBars} type='text' className='inputBars' id='mobile_no' name='mobile_no' onChange={handleChange} placeholder='Enter mobile_no...' />
                        </div>
                        <div className="form-photo" style={formElementStyles}>
                            <label htmlFor='photo'>Upload Photo</label>
                            <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', }} onChange={handleChange} id='photo' name='photo' />
                        </div>
                        <div className="submit-btn">
                            <button disabled={!credentials.name || !credentials.email || !credentials.password || !credentials.mobile_no || !credentials.photo} type="submit" onClick={handleSubmitClick} className="btn btn-primary" style={{ marginTop: '1rem', marginLeft: '1rem' }}>Submit</button>
                            <button type="submit" onClick={handleGoBackClick} className="btn btn-dark" style={{ marginTop: '1rem', marginLeft: '1rem' }}>GoBack</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TeachersignUp
