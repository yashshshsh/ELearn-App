import React from 'react'
import student_icon from '../Photos/stu.png';
import teacher_icon from '../Photos/teac.png';
import Webname from './Webname';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const hero_styles = {
        height: '87vh', backgroundColor: '#21A0A0',
        display: 'flex', justifyContent: 'center', alignItems: 'center',flexDirection:'column'
    }
    const student_style = {
        height: '10rem', width: 'auto', backgroundColor: "#21A0A0"
    }
    const teacher_style = {
        height: '10rem', width: 'auto', backgroundColor: "#21A0A0", marginBottom: '4rem'
    }

    const navigate = useNavigate();
    const handleStudentClick = () =>{
        navigate('/studentLogin');
    }
    const handleTeacherClick = () =>{
        navigate('/teacherLogin');
    }
    return (
        <div>
            <Webname/>
            <div className="hero" style={hero_styles}>
                <div className="hero-1" style={{display:'flex',gap:'2rem'}}>
                    <div className="student" style={student_style}>
                        <img src={student_icon} alt='Student_dashboard' onClick={handleStudentClick} className='image-hover' style={{ height: '9rem', width: '13rem', borderRadius: '40%' }} />
                    </div>
                    <div className="teacher" style={teacher_style}>
                        <img src={teacher_icon} alt='Teacher_dashboard' onClick={handleTeacherClick} className='image-hover' style={{ height: '9rem', width: '13rem', borderRadius: '40%' }} />
                    </div>
                </div>
                <div className="hero-2" style={{display:'flex',color:'white',fontSize:'1.5rem',fontWeight:'bold',gap:'8rem'}}>
                    <div className="first">
                        <span>STUDENT</span>
                    </div>
                    <div className="second">
                        <span>TEACHER</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

