import React, { useEffect, useState, useContext, useMemo } from 'react'
import studentPic from '../../../Photos/stu.png';
import NoDataFound from '../../../Photos/Gemini_Generated_Image_6myj6z6myj6z6myj.jpeg'
import Notification_item from './Notification_item';
import notificationContext from '../../Context/Notifications/NotificationContext';

const StuInput = (props) => {
    const search_style = {
        width: '89%', height: '2.4rem', outline: 'none', paddingLeft: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem'
    }

    const [searchQuery, setSearchQuery] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacherFound, setTeacherFound] = useState(true);
    const context = useContext(notificationContext);
    const { notificationsAll, getAllNofications, setNotificationsAll } = context;

    useEffect(() => {
        setTeacherFound(true);
    }, [searchQuery]);

    useEffect(() => {
        const handleNotify = async () => {
            const data = await getAllNofications();
            setNotificationsAll(data);
            // console.log('data', data);
        }
        handleNotify();
    }, [])

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        try {
            if (!query.trim()) {
                setTeachers([]);
                return;
            }
            const url = `http://localhost:4512/api/Scontent/searchTeachers/${query}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50Ijp7ImlkIjoiNjYzZjA2NjM3ODcxMGEyYmVjMWIyMjc0In0sImlhdCI6MTcxNTQwNjQzNn0.U5AStN5JrRAHBX0BTKWY5kpQLZ4tk_yRQtn27ChEZIw'
                }
            });
            const foundTeachers = await response.json();
            setTeachers(foundTeachers.slice(0, 5));
            setTeacherFound(foundTeachers.length > 0);
        } catch (error) {
            console.log('Error in searching teachers api..', error)
        }
    }

    const list_style = {
        height: '3rem', border: '2px solid #21A0A0', backgroundColor: '#D0F4EA', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center',
        paddingLeft: '2rem', borderRadius: '15px', width: '35.4rem'
    }

    const memoizedNotification = useMemo(() => {
        const safeNotification = Array.isArray(notificationsAll) ? notificationsAll : [];
        return safeNotification.slice(0,10).map((notification) => {
            return <Notification_item key={notification._id} notification={notification} />
        })
    }, [notificationsAll])

    return (
        <div>
            <div className="teacher_search" style={{ width: '52%', height: '3rem', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', right: '1rem', top: '6.5rem' }}>
                <img style={{ height: '5rem', width: '5rem' }} src={studentPic} alt='Image'></img>
                <div className="bisleri" style={{ width: '88%', display: 'flex', gap: '8px', Top: '3rem', border: '3px solid #21A0A0', borderRadius: '25px', justifyContent: 'center', alignItems: 'center' }}>
                    <input style={search_style} type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search for teachers.....'></input>
                    <i style={{ fontSize: '1.4rem', color: '#21A0A0', cursor: 'pointer' }} className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div style={{ marginTop: '1rem', width: '45.4%', position: 'fixed', top: '8.4rem' }}>
                <div className="vivo" style={{ marginLeft: '5.2rem' }}>
                    {teacherFound ? (<ul className="list" style={{ height: 'auto', listStyle: 'none' }}>
                        {teachers.length > 0 && teachers.map((teacher) => {
                            return (
                                <div onClick={() => { props.openModel(teacher) }} key={teacher._id} className="list">
                                    <li style={list_style}>{teacher.name}</li>
                                </div>
                            );
                        })}
                    </ul>) : (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '1rem' }}>
                        <img style={{ height: '5rem', width: '5rem' }} src={NoDataFound} alt="No teachers found" />
                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>No teachers found</p>
                    </div>)}
                </div>
                <div className="Notifications" style={{ width: '60rem', marginTop: '2rem' }}>
                    <div className="notification_heading" style={{ height: '3rem', fontWeight: 'bold', color: '#21A0A0', borderBottom: '4px solid #21A0A0', fontSize: '2rem' }}>
                        <p style={{ paddingLeft: '1rem' }}>Notifications</p>
                    </div>
                </div>

                <div className="hero" style={{ height: '73vh', width: '60rem',overflow: 'hidden' }}>
                    <div className="memo_notifications" style={{ height: 'auto', overflowY: 'auto', maxHeight: 'calc(100vh - 10rem)' }}>
                        {memoizedNotification}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StuInput

{/* < div className = "modal-body" >
<div className="profile_photo">
<img style={{ height: '8rem', width: '8rem', borderRadius: '50%', margin: '1rem 0 1rem 10rem' }} src={teacherPic} alt='ProfilePhoto' />
</div>
<div className="profile_props">
<p>Name  : {props.teacher?.name}</p>
<p>Email : {props.teacher?.email}</p>
<p>Mobile No. : {props.teacher?.mobile_no}</p>
<p>Subject : {props.teacher?.subject}</p>
<p>Teacher_id : {props.teacher?._id}</p>
</div>
</ > */}