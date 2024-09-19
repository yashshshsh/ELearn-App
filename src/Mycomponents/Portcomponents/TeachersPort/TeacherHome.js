import React, { useRef, useState, useContext, useEffect } from 'react'
import Navbar from '../../Navbar'
import Home from './Home'
import Nueron from './Nueron'
import Tcontent from '../../Context/Content/TcontentContext'
import { title } from 'process'

const TeacherHome = () => {
    const first_styles = {
        width: '45vw', height: '100vh', borderRight: '5px solid #21A0A0', marginTop: '5.5rem'
    }
    const inputBars = {
        outline: 'none', marginTop: '1rem', width: '81%', paddingLeft: '0.5rem', border: 'none'
    }
    const second_styles = {
        borderRight: '2px solid black', height: '100vh', width: '53.3vw', position: 'fixed', right: '0rem'
    }
    
    const addRef = useRef(null);
    const closeaddref = useRef(null);
    const updateRef = useRef(null);
    const closeUpdateRef = useRef(null);
    const [newContent, setnewContent] = useState({ title: '', description: '', material: null })
    const material1 = useContext(Tcontent);
    const { content,updateContent ,setcontent, getContent, addContent } = material1;
    const [loading, setLoading] = useState(false);
    const [currContent, setCurrContent] = useState({});
    const [newUpContent, setNewUpContent] = useState({ title: '', description: '', material: null });

    const handleAddnewModal = () => {
        addRef.current.click();
    }

    const handleUpdateModalOpen = (content) => {
        updateRef.current.click();
        // console.log('Content', content)
        setCurrContent(content);
    }

    useEffect(() => {
        if (currContent) {
            // console.log('CurrContent', currContent);
            setNewUpContent({ title: currContent.title || '', description: currContent.description || '', material: null ,id:currContent._id});
        }
    }, [currContent]);

    useEffect(() => {
        // console.log('NewUpContent', newUpContent);
    }, [newUpContent]);

    const handleChange = (e) => {
        if (e.target.name === 'material') {
            const file = e.target.files[0];
            setnewContent({ ...newContent, material: file });
        } else {
            setnewContent({ ...newContent, [e.target.name]: e.target.value });
        }
    }

    const handleUpdateChange = (e) => {
        if (e.target.name === 'material') {
            const file = e.target.files[0];
            setNewUpContent({...newUpContent,material : file})
        } else {
            setNewUpContent({...newUpContent,[e.target.name]:e.target.value})
        }
    }

    const handleUpdateContent = async(e) => {
        e.preventDefault();
        try{
            const updatedContent = async() =>{
                const formData = new FormData();
                formData.append('title',newUpContent.title);
                formData.append('description',newUpContent.description);
                formData.append('material',newUpContent.material);
                formData.append('id',newUpContent.id);
                const newUContent = await updateContent(formData);
                // console.log('NewuContent',newUContent);
                setCurrContent(newUContent);
                // console.log('newUContent',newUContent)
            }
            updatedContent();
        } catch(error){
            console.error('Error in fetching updated Content...',error);
        }
        closeUpdateRef.current.click();
    }

    const handleadded = async (e) => {
        e.preventDefault();
        try {
            const addedContent = async () => {
                const formData = new FormData();
                formData.append('title', newContent.title);
                formData.append('description', newContent.description)
                formData.append('material', newContent.material)
                // const formDataArray = Array.from(formData);
                setLoading(true);
                const resnewcontent = await addContent(formData);
                setcontent(prevContent => [...prevContent, resnewcontent]);
                setLoading(false);
            }
            addedContent();
        } catch (error) {
            console.log('Error in adding notes..,error')
        }
        closeaddref.current.click();
    }

    return (
        <div>
            <div className="modalUpdate">
                <button ref={updateRef} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#updateContent">
                    Launch demo modal
                </button>

                <div className="modal fade" id="updateContent" tabIndex="-1" role="dialog" aria-labelledby="updateContentLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="updateContentLabel">Update Content</h5>
                            </div>
                            <div className="modal-body" >
                                <form>
                                    <div className="form-title">
                                        <label htmlFor='title'>Title : </label>
                                        <input type='text' style={inputBars} className='inputBars' id='title' value={newUpContent.title} name='title' onChange={handleUpdateChange} minLength={3} required placeholder='Enter title...' />
                                    </div>
                                    <div className="form-description">
                                        <label htmlFor='description'>Description : </label>
                                        <input style={inputBars} type='text' className='inputBars' id='description' value={newUpContent.description} name='description' onChange={handleUpdateChange} placeholder='Enter description...' />
                                    </div>

                                    <div className="form-material" style={{ marginTop: '1rem' }}>
                                        <label htmlFor='material'>Material : </label>
                                        <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', marginTop: '0.5rem' }} id='material' onChange={handleUpdateChange} required name='material' />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeUpdateRef} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={handleUpdateContent} type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modalAddnew">
                <button ref={addRef} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#announceModal">
                    Launch demo modal
                </button>

                <div className="modal fade" id="announceModal" tabIndex="-1" aria-labelledby="announceModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="announceModalLabel">Add new</h1>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-title">
                                        <label htmlFor='title'>Title : </label>
                                        <input type='text' style={inputBars} className='inputBars' id='title' name='title' onChange={handleChange} minLength={3} required placeholder='Enter title...' />
                                    </div>
                                    <div className="form-description">
                                        <label htmlFor='description'>Description : </label>
                                        <input style={inputBars} type='text' className='inputBars' id='description' name='description' onChange={handleChange} placeholder='Enter description...' />
                                    </div>
                                    <div className="form-material" style={{ marginTop: '1rem' }}>
                                        <label htmlFor='material'>Material : </label>
                                        <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', marginTop: '0.5rem' }} id='material' onChange={handleChange} required name='material' />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button ref={closeaddref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={handleadded} type="button" disabled={!newContent.title || !newContent.description || !newContent.material} className="btn btn-primary">Add note</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar">
                <Navbar />
            </div>
            <div className="hero" style={{ display: 'flex' }}>
                <div className="first" style={first_styles}>
                    <Home />
                </div>

                <div className="second" style={second_styles}>
                    <Nueron handleUpdateContent={handleUpdateContent} handleAddnewModal={handleAddnewModal} handleUpdateModalOpen={handleUpdateModalOpen} />
                </div>
            </div>
        </div>
    )
}

export default TeacherHome
