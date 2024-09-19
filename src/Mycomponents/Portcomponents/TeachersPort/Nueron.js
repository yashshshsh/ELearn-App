import React, { useContext, useEffect, useState, useRef, useMemo } from 'react'
import Uploaded_item from './Uploaded_item';
import Tcontent from '../../Context/Content/TcontentContext';
import profilepic from '../../../Photos/teac.png'
import ClipLoader from 'react-spinners/ClipLoader';

const Nueron = (props) => {

    const material1 = useContext(Tcontent);
    const { content, setcontent, getContent, addContent } = material1;
    const [loading, setLoading] = useState(false);

    const memoizedUploadedItems = useMemo(() => {
        const safeContent = Array.isArray(content) ? content : [];
        return safeContent.slice().reverse().map((material) => {
            return <Uploaded_item handleUpdateModalOpen={props.handleUpdateModalOpen} key={material._id} material={material} />
        })
    }, [content]);

    const handleGetcontent = async () => {
        try {
            setLoading(true)
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

    return (
        <div>
            <div className="upper" style={{ backgroundColor: '#21A0A0', marginTop: '5.5rem', color: 'white', width: '53vw', height: '3rem', textAlign: 'center', fontWeight: 'bold', fontSize: '1.7rem', borderRight: '5px solid white' }}>
                <p>Uploaded Content</p>
            </div>
            <div className="announce" style={{ height: '4rem', border: '2px solid #21A0A0', display: 'flex', alignItems: 'center', marginTop: '1rem', borderRadius: '10px', width: '52.6vw' }}>
                <div className="announce_img">
                    {<img style={{ height: '3rem', border: '1px solid black', marginLeft: '1.5rem', borderRadius: '50%' }} src={profilepic} alt='Profile Photo' />}
                </div>

                <div className="announce_text" style={{ marginTop: '1rem', marginLeft: '0.8rem', height: '3rem', width: '45vw' }}>
                    <input style={{ border: 'none', outline: 'none', width: '46vw' }} type='text' id='text' name='text' placeholder='Announce something to your class...' />
                </div>
            </div>

            <div className="add-new" style={{ marginTop: '1rem' }}>
                <button onClick={() => { props.handleAddnewModal() }} type="button" className="btn btn-dark">Add new</button>
            </div>

            <div className="major" style={{overflow:'hidden',marginTop:'0.5rem',position:'fixed',right:'0.5rem',width:'53vw',marginLeft:'1rem'}}>
                {loading?(<div style={{ marginLeft: '13rem', width: '20rem', justifyContent: 'center', marginTop: '4rem', alignItems: 'center', display: 'flex', flexDirection: 'column' }} className="spinner">
                    <div className="clipLoader">
                        <ClipLoader color="black" loading={loading} size={30} />
                    </div>

                    <div style={{ marginRight: '15rem' }} className="loading">
                        <p style={{ fontWeight: 'Bold', width: '15rem', fontSize: '1.2rem', marginLeft: '18.5rem', marginTop: '0.5rem' }}>Content on its way.....</p>
                    </div>
                </div>):(<div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 19rem)' }} className="uploaded_content">
                    {memoizedUploadedItems}
                </div>)}
            </div>
        </div>
    )
}

export default Nueron
