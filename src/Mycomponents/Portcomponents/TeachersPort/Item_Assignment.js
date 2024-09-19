import React, { useEffect, useState , useContext } from 'react'
import assPhoto from '../../../Photos/docu_img.jpg';
import TAssignment from '../../Context/Assignment/TAssignmentContext';

const Item_Assignment = (props) => {

    const [pdfData, setpdfData] = useState(null);
    const [shouldOpenPdf, setshouldOpenPdf] = useState(false);
    const batman = useContext(TAssignment);
    const { ass, deleteass , setAss} = batman;

    useEffect(() => {
        const receivedData = props.ass_item.material.data.data;
        setpdfData(receivedData);
    }, [props])

    useEffect(() => {
        if (pdfData && shouldOpenPdf) {
            const uint8Array = new Uint8Array(pdfData);
            const pdfBlob = new Blob([uint8Array], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            // console.log('PdfUrl', pdfUrl);
            window.open(pdfUrl, '_blank');
            URL.revokeObjectURL(pdfUrl);
            setshouldOpenPdf(false)
        }
    }, [pdfData, shouldOpenPdf]);

    // console.log(props.ass_item);

    const handleviewPdf = () => {
        setshouldOpenPdf(true);
    };

    const handleDelete = async() =>{
        try{
            const deleass = async() =>{
                props.setLoading(true);
                const deleres = await deleteass(props.ass_item._id);
                const data1 = await ass.filter((assignment) => {return assignment._id != deleres._id});
                setAss(data1);
                props.setLoading(false);
            }
            deleass();
        } catch(error){
            console.log('Error in deleting the assignment',error)
        }
    }

    return (
        <div className='col-md-3 my-3' >
            <div className="card Item_Assignment" style={{ width: '15rem',height:'auto', border: '2px solid #21A0A0', borderRadius: '1.5rem' }}>
                <div className="ass-img" style={{ marginLeft: '5.5rem', marginTop: '1rem' }}>
                    <img style={{ height: '4rem', width: '4rem', borderRadius: '50%', border: '2px solid black' }} src={assPhoto} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.ass_item.title}</h5>
                    <p style={{ fontWeight: 'bold' }} className="card-text">Description : {props.ass_item.description}</p>
                    <button disabled={!pdfData} onClick={handleviewPdf} className="btn btn-dark">View material</button>
                </div>
                <div className="func_btns" style={{display:'flex',marginLeft:'1rem',marginBottom:'0.5rem',gap:'1rem'}}>
                    <div className="delete" style={{position:'absolute',right:'1rem',bottom:'1rem'}}>
                        <i onClick={handleDelete} style={{ fontSize: '1.2rem' }} className="fa-solid fa-trash"></i>
                    </div>
                    <div className="update">
                        {/* <i style={{ fontSize: '1.2rem' }} className="fa-solid fa-pen-to-square"></i> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item_Assignment


// eslint-disable-next-line no-undef