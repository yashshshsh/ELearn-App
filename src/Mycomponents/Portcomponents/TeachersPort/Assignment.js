import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../../Navbar';
import TAssignment from '../../Context/Assignment/TAssignmentContext';
import Item_Assignment from './Item_Assignment';
import ClipLoader from 'react-spinners/ClipLoader';

const Assignment = () => {
    const hero_styles = {
        height: '98vh', marginTop: '3.8rem'
    };

    const inputBars = {
        outline: 'none', marginTop: '1rem', width: '81%', paddingLeft: '0.5rem', border: 'none'
    }

    const [newAss, setNewAss] = useState({ title: '', description: '', material: null });
    const [loading, setLoading] = useState(false);

    const ref = useRef(null);
    const closeref = useRef(null);
    const batman = useContext(TAssignment);
    const { ass, getAss, setAss, addAss } = batman;

    const handleChange = (e) => {
        if (e.target.name === 'material') {
            const file = e.target.files[0];
            setNewAss({ ...newAss, [e.target.name]: file })
        } else {
            setNewAss({ ...newAss, [e.target.name]: e.target.value })
        }
    }

    const handleGetAss = async () => {
        try {
            setLoading(true);
            const baty = await getAss();
            setAss(baty.ass);
            setLoading(false);
        } catch (error) {
            console.log('error in fetching assignment', error.message);
        }
    }

    useEffect(() => {
        handleGetAss();
    }, [])

    const handleadded = async (e) => {
        e.preventDefault();
        try {
            const addedAss11 = async () => {
                const formData = new FormData();
                formData.append('title', newAss.title);
                formData.append('description', newAss.description);
                formData.append('material', newAss.material);
                setLoading(true);
                const addAssres = await addAss(formData);
                setAss(prevAss => [...prevAss, addAssres]);
                setLoading(false);
            }
            addedAss11();
        } catch (error) {
            console.log('Error in adding new assignments....')
        }
        closeref.current.click();
    }

    const handleAddAss = () => {
        ref.current.click();
    }

    const memoizedUploadedAss = useMemo(() => {
        const safeAssignment = Array.isArray(ass) ? ass : [];
        return (
            <div className="row">
                {safeAssignment.slice().reverse().map((ass_item) => (
                    <Item_Assignment key={ass_item._id} loading={loading} setLoading={setLoading} ass_item={ass_item} />
                ))}
            </div>
        );
    }, [ass]);

    return (
        <div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="hero container" style={hero_styles}>
                <div className="heading" style={{ height: '8vh', display: 'flex', alignItems: 'center', justifyContent: 'center  ' }}>
                    <p style={{ fontSize: '2rem', color: '#21A0A0', fontWeight: 'bold', textDecoration: 'underline' }}>Assignment</p>
                </div>

                <div className="add_new_ass">
                    <button style={{ height: '3rem' }} onClick={handleAddAss} type="button" className="btn btn-dark"><p style={{ fontWeight: 'bold', paddingTop: '0.3rem' }}>Add new Assignment</p></button>
                </div>

                <div className="add_ass_modal">
                    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#Assignementmodal">
                        Launch demo modal
                    </button>

                    <div className="modal fade" id="Assignementmodal" tabIndex="-1" aria-labelledby="AssignementmodalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 style={{ fontSize: '2rem' }} className="modal-title fs-5" id="AssignementmodalLabel">Add new assignment</h1>
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
                                            <input type='file' style={{ display: 'block', backgroundColor: '#21A0A0', color: 'white', marginTop: '0.5rem' }} onChange={handleChange} id='material' name='material' />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" disabled={!newAss.title || !newAss.description || !newAss.material} onClick={handleadded} className="btn btn-primary">Add assignment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {loading ? (<div className="spinner" style={{ height: '8rem', marginTop: '7rem' }}>
                    <div className="clipLoader" style={{ height: '3rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ClipLoader color="black" loading={loading} size={43} />
                    </div>

                    <div className="spin_text" style={{ fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        <p>Hold on!! your assignments are on the way</p>
                    </div>
                </div>) : (<div className="assignments" style={{ height: '85vh', marginTop: '3rem' }}>
                    {memoizedUploadedAss}
                </div>)}

            </div>

        </div>
    )
}

export default Assignment
