import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Navbar from './Navbar'
import AccReq from './Context/AccessReq/AccessReqcontext';
import Request_item from './Portcomponents/StudentsPort/Request_item';
import noReq from '../Photos/No request.jpeg'
import Profiles_item from './Portcomponents/StudentsPort/Profiles_item';
import NoStudentFound from '../Photos/swaggy dog.jpeg'

const StudentsPort = () => {

  const ref = useRef(null);
  const closeremoveref = useRef(null);
  const removeref = useRef(null);

  const context = useContext(AccReq);
  const { TgetAllAccessReq, DeleteAcessReq, reqData, setReqData } = context;

  const [stuReqData, setStuReqData] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');

  const handleAccessReqbtn = async () => {
    ref.current.click();
    const data = await TgetAllAccessReq();
    // console.log('data', data?.accessRequests);
    setReqData(data?.accessRequests || []);
  }

  useEffect(() => {
    const handleFeed = async () => {
      const feedBack = await TgetAllAccessReq();
      setStuReqData(feedBack?.accessRequests || []);
    }
    handleFeed();
  }, [reqData])

  // useEffect(() => {
  //   console.log('stuReqData', stuReqData);
  // }, [stuReqData]);

  const memoizedRequests = useMemo(() => {
    const safeReq = Array.isArray(reqData) ? reqData : [];
    const pendingReq = safeReq.filter((req) => { return req.status === 'pending' });
    return (
      <div>
        {pendingReq.length > 0 ? (
          pendingReq.slice().reverse().map((req) => (
            <Request_item reqData={reqData} setReqData={setReqData} key={req._id} req={req} />
          ))
        ) : (
          <div className="noReqImg">
            <div className="regImg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '2rem' }}>
              <img style={{ height: '8rem', width: '8rem' }} src={NoStudentFound} alt="No requests"></img>
              <p style={{ fontSize: '1.7rem', marginTop: '1rem', fontWeight: 'bold' }}>No request found</p>
            </div>
          </div>
        )}
      </div>
    )
  }, [reqData])

  const handleModalOpen = (CurrProfs) => {
    removeref.current.click();
    setSelectedProfile(CurrProfs);
  }

  const memoizedSTDProfile = useMemo(() => {
    const profiles = Array.isArray(stuReqData) ? stuReqData : [];
    const approvedReq = profiles.filter((profs) => {return profs.status === 'approved'})
    return (
      <div>
        {approvedReq.length > 0 ? (<div className="row">
          {profiles.slice().reverse().map((profs) => {
            if (profs.status === 'approved') {
              return <Profiles_item handleModalOpen={handleModalOpen} key={profs._id} profs={profs} stuReqData={stuReqData} reqData={reqData} />
            }
          })}
        </div>) : (<div className="vivo">
          <div className="noStuFound" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '2rem' }}>
            <img src={NoStudentFound}></img>
            <p style={{ fontSize: '1.7rem', marginTop: '1rem', fontWeight: 'bold' }}>Oops!! No Student Found</p>
          </div>
        </div>)}
      </div>
    )
  }, [stuReqData]);

  const handlelays = async () => {
    try {
      const lays = await DeleteAcessReq(selectedProfile._id);
      console.log('lays', lays);
    } catch (error) {
      console.error('Error in removing profile from students port')
    }
    closeremoveref.current.click();

    const newProfiles = stuReqData.filter((profile) => { return selectedProfile._id != profile._id });
    setStuReqData(newProfiles);
  }

  return (
    <div>

      <button style={{ marginTop: '5rem' }} ref={removeref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#RemoveStudentmodel">
        Launch demo modal
      </button>

      <div className="modal fade" id="RemoveStudentmodel" tabIndex="-1" role="dialog" aria-labelledby="RemoveStudentmodelLabel" aria-hidden="true">
        <div className="modal-dialog " style={{ marginTop: '15rem' }} role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#21A0A0', color: '#FCFFF7' }}>
              <h5 className="modal-title" id="RemoveStudentmodelLabel" style={{ fontWeight: 'bold', fontSize: '2rem' }}>Confirmation</h5>
            </div>
            <div className="modal-body">
              <p style={{ fontWeight: 'bold' }}>Are you sure you want to remove this student {selectedProfile.Student_name} from accessing your material</p>
            </div>
            <div className="modal-footer">
              <button ref={closeremoveref} type="button" className="btn btn-dark" data-dismiss="modal">Cancel</button>
              <button onClick={handlelays} type="button" className="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>
      </div>

      <button style={{ marginTop: '4rem' }} ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#StudentwithAccessModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="StudentwithAccessModal" tabIndex="-1" role="dialog" aria-labelledby="StudentwithAccessModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ marginTop: '8rem', width: '40rem' }} role="document">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#21A0A0', color: '#FCFFF7' }}>
              <h5 className="modal-title" id="StudentwithAccessModalLabel">Access Requests</h5>
            </div>
            <div className="modal-body">
              {reqData.length === 0 ? (<div className="noReqImg">
                <div className="regImg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: '2rem' }}>
                  <img style={{ height: '8rem', width: '8rem' }} src={noReq}></img>
                  <p style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>No request found</p>
                </div>
              </div>) : (<div className="Requests">
                {memoizedRequests}
              </div>)}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      <div className="navbar">
        <Navbar />
      </div>

      <div className="hero container" style={{ marginTop: '4rem' }}>
        <div className="heading" style={{ height: '8vh', display: 'flex', alignItems: 'center', justifyContent: 'center  ' }}>
          <p style={{ fontSize: '2rem', color: '#21A0A0', fontWeight: 'bold', textDecoration: 'underline' }}>Student Access Overview</p>
        </div>

        <div className="accessReq" style={{ marginTop: '2rem' }}>
          <div className="btn_accessReq">
            <button onClick={handleAccessReqbtn} type="button" className="btn btn-dark">Access Request</button>
          </div>
        </div>

        <div className="profiles">
          {memoizedSTDProfile}
        </div>
      </div>

    </div>
  )
}

export default StudentsPort

{/* </div>
      <div className="row">
        {profiles.slice().reverse().map((profs) => {
          if (profs.status === 'approved') {
            return <Profiles_item handleModalOpen={handleModalOpen} key={profs._id} profs={profs} stuReqData={stuReqData} reqData={reqData} />
          }
        })}
      </div> */}