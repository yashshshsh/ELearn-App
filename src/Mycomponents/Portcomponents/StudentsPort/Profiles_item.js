import React, { useContext } from 'react'
import studentPic from '../../../Photos/stu.png'
import AccReq from '../../Context/AccessReq/AccessReqcontext';

const Profiles_item = (props) => {
    const { profs,handleModalOpen } = props;
    
    const context = useContext(AccReq);
    const {DeleteAcessReq} = context;
    
    return (
        <div style={{ marginTop: '2rem' }} className='col-md-3'>
            <div className="card" style={{ width: '15rem',display:'flex',flexDirection:'column',alignItems:'center', height: 'auto', width: 'auto', border: '2px solid #21A0A0', borderRadius: '1.5rem' }}>
                <div className="stuimg">
                    <img style={{ height: '6.5rem', width: '6.5rem', borderRadius: '50%',marginTop:'1rem' }} className="card-img-top" src={studentPic} alt="Card image cap" />
                </div>
                <div style={{fontWeight:'bold'}} className="card-body">
                    <p style={{fontSize:'1.5rem',color:'#21A0A0'}} className="card-title">Details</p>
                    <p className="card-text">Name : {profs.Student_name}</p>
                    <p className="card-text">Student Id : {profs.student}</p>
                    <button onClick={()=>handleModalOpen(profs)}type="button" className="btn btn-dark">Remove</button>
                </div>
            </div>
        </div>
    )
}

export default Profiles_item;
