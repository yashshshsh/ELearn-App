import React, { useState, useEffect, useMemo, useContext } from 'react'
import Navbar from '../../Navbar'
import NoDataFound from '../../../Photos/Gemini_Generated_Image_6myj6z6myj6z6myj.jpeg'
import AccReq from '../../Context/AccessReq/AccessReqcontext'
import Tcontent from '../../Context/Content/TcontentContext'
import AssContent_item from './AssContent_item'
import swaggyDoggy from '../../../Photos/swaggy dog.jpeg'
import ClipLoader from 'react-spinners/ClipLoader';
import StNavbar from '../../StNavbar'

const Stassignment = () => {
    const first_style = {
        height: '100vh', width: '27vw', borderRight: '4px solid #21A0A0',
        position: 'fixed', left: '0', marginTop: '3.5rem'
    }

    const search_style = {
        width: '78%', height: '2rem', marginLeft: '1rem', outline: 'none', paddingLeft: '0.5rem', border: 'none', fontWeight: 'bold', fontSize: '1rem'
    }
    const list_style = {
        height: '3rem', border: '2px solid #21A0A0', backgroundColor: '#D0F4EA', color: 'black', fontWeight: 'bold', display: 'flex', alignItems: 'center',
        borderRadius: '15px', width: '17.4rem', paddingLeft: '1.5rem'
    }

    const dopa_style = {
        width: '17rem', marginTop: '1rem', textAlign: 'center', fontSize: '1.1rem', height: '2.5rem',
        fontWeight: 'bold', borderRadius: '1.2rem', border: '2px solid #21A0A0', color: '#21A0A0', backgroundColor: '#D0F4EA'
    }

    const context = useContext(AccReq)
    const { requiredStuAllReq } = context;

    const bingo = useContext(Tcontent);
    const { getAssAndContentST, getAssAndContent } = bingo;

    const [searchQuery, setSearchQuery] = useState('');
    const [teachers, setTeachers] = useState([]);
    const [teacherFound, setTeacherFound] = useState(true);
    const [allstuReq, setallstuReq] = useState([]);
    const [allContent, setAllContent] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery === '') {
            const handle = async () => {
                setLoading(true)
                const data = await getAssAndContent();
                setAllContent(data);
                setLoading(false);
            }
            handle();   
        }
    }, [searchQuery]);

    useEffect(() => {
        const handleOneplus = async () => {
            const req = await requiredStuAllReq();
            setallstuReq(req);
        }
        handleOneplus();
    }, [])

    useEffect(() => {
        setTeacherFound(true);
    }, [searchQuery]);

    useEffect(() => {
        const handleBeing = async () => {
            setLoading(true);
            const data = await getAssAndContent();
            setLoading(false);
        }
        handleBeing();
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

    useEffect(() => {
        // console.log('AllContent', allContent);
    }, [allContent]);

    useEffect(() => {
        const handleBoat = async () => {
            setLoading(true);
            const data = await getAssAndContent();
            setAllContent(data);
            setLoading(false);
        }
        handleBoat();
    }, [])

    const handleletmeClick = async (teacher) => {
        // console.log('Teacher id inside let me...', teacher.teacher)
        setLoading(true);
        const data = await getAssAndContentST(teacher.teacher);
        // console.log('data', data);
        setAllContent(data);
        setLoading(false);
    }

    const memoizedAvailableT = useMemo(() => {
        const safeTeacher = Array.isArray(allstuReq) ? allstuReq : [];
        return safeTeacher.slice().reverse().map((teacher) => {
            if (teacher.status === 'approved')
                return <div onClick={() => handleletmeClick(teacher)} key={teacher._id} className="div" >
                    {/* {console.log('Teacher',teacher)} */}
                    <div className="letme" style={dopa_style}>
                        <p>{teacher.Teacher_name}</p>
                    </div>
                </div>
        })
    })

    const handlegetback = () => {
        // console.log('Something is clicked');
        const handleBoat = async () => {
            setLoading(true);
            const data = await getAssAndContent();
            setAllContent(data);
            setLoading(false);
        }
        handleBoat();
    }

    const memoizedContent = useMemo(() => {
        const safeContent = Array.isArray(allContent) ? allContent : [];

        if (safeContent.length === 0) {
            return (
                <div className="noContentimg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '6rem' }}>
                    <div className="swaggyImg">
                        <img src={swaggyDoggy} alt="No content available" />
                    </div>
                    <div className="para">
                        <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1rem' }}>Oops!! No available content</p>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    {safeContent.slice().reverse().map((material) => (
                        <AssContent_item key={material._id} material={material} />
                    ))}
                </div>
            );
        }
    }, [allContent]);

    const handleListClick = (teacher) => {
        // console.log('Teacher inside handleListClick', teacher)
        const handleData = async () => {
            setLoading(true);
            const data = await getAssAndContentST(teacher._id);
            setAllContent(data);
            setLoading(false);
        }
        handleData();
    }

    return (
        <div>
            <div className="navbar">
                <StNavbar/>
            </div>

            <div className="hero" style={{ display: 'flex' }}>
                <div className="first" style={first_style}>
                    <div className="fupper">
                        <div className="SeachT" style={{ height: '3.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="bisleri" style={{ width: '88%', display: 'flex', gap: '8px', Top: '3rem', border: '3px solid #21A0A0', borderRadius: '25px', justifyContent: 'center', alignItems: 'center' }}>
                                <input style={search_style} type='text' value={searchQuery} onChange={handleSearchChange} placeholder='Search for teachers.....'></input>
                                <i style={{ fontSize: '1.4rem', color: '#21A0A0', cursor: 'pointer' }} className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div className="vivo">
                            {teacherFound ? (<ul className="list" style={{ height: 'auto', listStyle: 'none' }}>
                                {teachers.length > 0 && teachers.map((teacher) => {
                                    return (
                                        <div onClick={() => { handleListClick(teacher) }} key={teacher._id} className="list">
                                            <li style={list_style}>{teacher.name}</li>
                                        </div>
                                    );
                                })}
                            </ul>) : (<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '1rem' }}>
                                <img style={{ height: '5rem', width: '5rem' }} src={NoDataFound} alt="No teachers found" />
                                <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>No teachers found</p>
                            </div>)}
                        </div>
                    </div>

                    <div className="flower">
                        <div className="flower_head" style={{ height: '3.5rem', borderBottom: '4px solid #21A0A0', color: '#21A0A0', fontWeight: 'bold', fontSize: '2rem' }}>
                            <p style={{ paddingLeft: '1rem' }}>Available Teachers</p>
                        </div>

                        <div className="availableTList" style={{ height: 'auto', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div onClick={handlegetback} className="getback">
                                <p style={{ ...dopa_style, cursor: 'pointer', marginTop: '1.5rem' }}>All available assignments</p>
                            </div>
                            <div className="memoDiv" style={{ overflowY: 'auto', width: '18rem', maxHeight: 'calc(100vh - 10rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {memoizedAvailableT}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="second" style={{ height: '100vh', position: 'fixed', right: '0', width: '72.5vw', marginTop: '3.3rem' }}>
                    <div className="heading" style={{ height: '4rem', color: '#21A0A0', fontWeight: 'bold', fontSize: '2.7rem', textAlign: 'center' }}>
                        <p>Assignments</p>
                    </div>

                    <div className="second_hero" style={{ overflow: 'hidden', height: 'auto' }}>
                        {loading?(<div className="spinner" style={{ height: '8rem', marginTop: '7rem' }}>
                    <div className="clipLoader" style={{ height: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ClipLoader color="black" loading={loading} size={43} />
                    </div>

                    <div className="spin_text" style={{ fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        <p>Hold on!! your assignments are on the way</p>
                    </div>
                </div>):(<div className="hero_assignmentsandcontents" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 10rem)' }}>
                             {memoizedContent}
                         </div>)}
                         
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Stassignment
