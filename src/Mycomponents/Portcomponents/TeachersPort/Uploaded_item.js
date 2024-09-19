import React, { useContext, useState, useRef, useEffect } from 'react'
import doc_img from '../../../Photos/docu_img.jpg'
import pdf_img from '../../../Photos/pdf_img.jpg'
import ProfileContext from '../../Context/Profile/ProfileTeacher/ProfileContext'
import Tcontent from '../../Context/Content/TcontentContext'
import ClipLoader from 'react-spinners/ClipLoader';

const Uploaded_item = (props) => {

    const ref = useRef(null);
    const closeref = useRef(null);

    const [showMaterial, setShowMaterial] = useState(false);
    const [newContent, setnewContent] = useState({ title: '', description: '', material: null })
    const [loading, setLoading] = useState(false);

    const context = useContext(ProfileContext);
    const { credentials } = context;
    const contentContext = useContext(Tcontent);
    const { content, updateContent, setcontent, deleteContent, getContent } = contentContext;

    const uploaded_item_styles = {
        height: showMaterial ? '9.5rem' : '5rem', display: 'flex', marginLeft: '0.7rem', alignItems: 'center', fontSize: '1rem', border: '2px solid #21A0A0', width: '51vw', marginTop: '1rem', borderRadius: '10px',
    }

    const inputBars = {
        outline: 'none', marginTop: '1rem', width: '81%', paddingLeft: '0.5rem', border: 'none'
    }

    const handleClick = () => {
        setShowMaterial(!showMaterial);
    }

    const [pdfUrl,setpdfUrl] = useState(null);

    const convertPdf = () =>{
        const uint8Array = new Uint8Array(props.material.material.data.data);
        const blob = new Blob([uint8Array], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setpdfUrl(url);
    }

    useEffect(()=>{
        convertPdf()
    },[props.material.material.data.data])

    const handleOpenPDF = () => {
        window.open(pdfUrl, '_blank')
    };

    const handleDelete = async () => {
        setLoading(true);
        const resDeleteId = await deleteContent(props.material._id);
        const data1 = content.filter((material) => { return material._id != resDeleteId })
        setcontent(data1);
        setLoading(false);
    }

    return (
        <div>
            {loading ? (<div style={{ marginLeft: '13rem', width: '20rem', justifyContent: 'center', marginTop: '4rem', alignItems: 'center', display: 'flex', flexDirection: 'column' }} className="spinner">
                <div className="clipLoader">
                    <ClipLoader color="black" loading={loading} size={30} />
                </div>

                <div style={{ marginRight: '15rem' }} className="loading">
                    <p style={{ fontWeight: 'Bold', width: '15rem', fontSize: '1.2rem', marginLeft: '18.5rem', marginTop: '0.5rem' }}>Deleting the content.....</p>
                </div>
            </div>) : (<div className="uploaded_item" onClick={handleClick} style={uploaded_item_styles}>
                <div className="doc_img">
                    <img style={{ height: '3.7rem', marginLeft: '1rem', borderRadius: '50%' }} src={doc_img} alt='doc_img' />
                </div>
                <div className="doc_text" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
                    <div className="doc_para">
                        <p>{credentials.name} posted a new material : {props.material.title}</p>
                    </div>

                    <div className="wade" style={{ display: 'flex', width: '36rem' }}>
                        <div className={`view_material ${showMaterial ? '' : 'd-none'}`} style={{ width: '100%' }}>
                            <div className="description" >
                                <p>Description : {props.material.description}</p>
                            </div>
                            <div className="a1" style={{ display: 'flex' }}>
                                <div className="view_btn">
                                    <button type="button" onClick={handleOpenPDF} className="btn btn-dark">View Materials</button>
                                </div>

                                <div style={{ marginLeft: '1rem', width: '10rem' }} className="material_doc">
                                    <img src={pdf_img} alt="PDF Icon" style={{ cursor: 'pointer', marginBottom: '0.5rem', height: '3rem' }} />
                                </div>

                                <div className="del_edit" style={{ display: 'flex', gap: '1rem', marginLeft: '15rem' }}>
                                    <div className="delete">
                                        <i onClick={handleDelete} style={{ fontSize: '1.2rem', marginTop: '1.9rem' }} className="fa-solid fa-trash"></i>
                                    </div>

                                    <div className="update">
                                        <i onClick={()=>{props.handleUpdateModalOpen(props.material)}} style={{ fontSize: '1.2rem', marginTop: '1.9rem' }} className="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`del_edit ${showMaterial ? 'd-none' : ''}`} style={{ display: 'flex', gap: '1rem' }}>
                            <div className="delete">
                                <i onClick={handleDelete} style={{ fontSize: '1.2rem' }} className="fa-solid fa-trash"></i>
                            </div>

                            <div className="update">
                                <i onClick={()=>{props.handleUpdateModalOpen(props.material)}} style={{ fontSize: '1.2rem' }} className="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}

        </div>
    )
}

export default Uploaded_item
