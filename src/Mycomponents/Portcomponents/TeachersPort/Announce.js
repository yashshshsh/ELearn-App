import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
import ProfileContext from '../../Context/Profile/ProfileTeacher/ProfileContext'
import Uploaded_item from './Uploaded_item';
import Tcontent from '../../Context/Content/TcontentContext';
import profilepic from '../../../Photos/teac.png'
import ClipLoader from 'react-spinners/ClipLoader';

const Announce = () => {

    const inputBars = {
        outline: 'none', marginTop: '1rem', width: '81%', paddingLeft: '0.5rem', border: 'none'
    }

    const context = useContext(ProfileContext);
    const { credentials } = context;
    const [photoUrl, setphotoUrl] = useState('');

    let [loading, setLoading] = useState(true);

    const addref = useRef(null);
    const closeaddref = useRef(null);

    const material1 = useContext(Tcontent);
    const { content, setcontent, getContent, addContent } = material1;

    useEffect(() => {
        if (credentials.photo && credentials.photo.data) {
            const bufferData = new Uint8Array(credentials.photo.data.data)
            const blob = new Blob([bufferData], { type: 'image/jpeg' });
            const reader = new FileReader();
            reader.onload = () => {
                setphotoUrl(reader.result);
            }
            reader.readAsDataURL(blob);
        }
    }, [credentials])

    const handleGetcontent = async () => {
        try {
            const resgetcontent = await getContent();
            setcontent(resgetcontent);
            setLoading(false);
        } catch (error) {
            console.log('Error in fetching content', error);
        }
    }

    useEffect(() => {
        handleGetcontent();
    }, [])

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

    const handleChange = (e) => {
        if (e.target.name === 'material') {
            const file = e.target.files[0];
            setnewContent({ ...newContent, material: file });
        } else {
            setnewContent({ ...newContent, [e.target.name]: e.target.value });
        }
    }

    const handleAddnew = () => {
        addref.current.click();
    }

    const memoizedUploadedItems = useMemo(() => {
        const safeContent = Array.isArray(content) ? content : [];
        return safeContent.slice().reverse().map((material) => {
            return <Uploaded_item key={material._id} material={material} />
        })
    }, [content]);

    return (
        <div>
            <div className="modal fade" id="announceModal" tabIndex="-1" aria-labelledby="announceModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="announceModalLabel">Add new</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                                    <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', marginTop: '0.5rem' }} onChange={handleChange} id='material' required name='material' />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeaddref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={!newContent.title || !newContent.description || !newContent.material} onClick={handleadded} className="btn btn-primary">Add note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="upper" style={{ backgroundColor: '#21A0A0', marginTop: '5.5rem', color: 'white', width: '53vw', height: '3rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.7rem', borderRight: '5px solid white' }}>
                <p>Uploaded Content</p>
            </div>
            <div className="announce" style={{ height: '4rem', border: '2px solid #21A0A0', display: 'flex', alignItems: 'center', marginTop: '1rem', borderRadius: '10px', width: '52.6vw' }}>
                <div className="announce_img">
                    {photoUrl && <img style={{ height: '3rem', border: '1px solid black', marginLeft: '1.5rem', borderRadius: '50%' }} src={profilepic} alt='Profile Photo' />}
                </div>

                <div className="announce_text" style={{ marginTop: '1rem', marginLeft: '0.8rem', height: '3rem', width: '45vw' }}>
                    <input style={{ border: 'none', outline: 'none', width: '46vw' }} type='text' id='text' name='text' placeholder='Announce something to your class...' />
                </div>
            </div>

            <div className="add-new" style={{ marginTop: '1rem' }}>
                <button onClick={handleAddnew} type="button" className="btn btn-dark">Add new</button>
            </div>

            <button ref={addref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#announceModal">
                Launch demo modal
            </button>

            {loading ? (
                <div style={{ overflow: 'hidden', marginLeft: '13rem', width: '20rem', justifyContent: 'center', marginTop: '4rem', alignItems: 'center', display: 'flex', flexDirection: 'column' }} className="spinner">
                    <div className="spinner" style={{backgroundColor:'pink',height:'17vh'}}>
                        <div className="clipLoader">
                            <ClipLoader color="black" loading={loading} size={30} />
                        </div>

                        <div style={{ marginRight: '15rem' }} className="loading">
                            <p style={{ fontWeight: 'Bold', width: '15rem', fontSize: '1.2rem', marginLeft: '18.5rem', marginTop: '0.5rem' }}>Content on its way.....</p>
                        </div>
                    </div>
                </div>
            ) : (<div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 10rem)' }} className="uploaded_content">
                {memoizedUploadedItems}
            </div>)}

        </div>
    )
}

export default Announce

