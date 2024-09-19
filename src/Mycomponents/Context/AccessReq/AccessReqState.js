import React, { useState } from 'react'
import AccReq from './AccessReqcontext'

const AccessReqState = (props) => {
  const host = "http://localhost:4512";
  const [status, setStatus] = useState('');
  const [reqData, setReqData] = useState([]);

  const createAccessReq = async (selectedTeacher) => {
    try {
      const url = 'http://localhost:4512/api/accessReq/addaccess_req'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify({ teacherId: selectedTeacher?._id })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('error', error)
      console.log('Failed to fetch create access request api', error);
    }
  }

  const cancelAccessReq = async (selectedTeacher) => {
    try {
      const url = 'http://localhost:4512/api/accessReq/cancel_accessReq';
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify({ teacherId: selectedTeacher?._id })
      })
      const data = await response.json();
      return data
    } catch (error) {
      console.error('error', error);
      console.log('Failed to cancel Access req')
    }
  }

  const getAccessReq = async (selectedTeacher) => {
    try {
      const url = `http://localhost:4512/api/accessReq/fetchReq/${selectedTeacher?._id}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('error',error);
    }
  }

  const TgetAllAccessReq = async () => {
    try {
      const url = 'http://localhost:4512/api/accessReq/fetchAllreq';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in fetching getAllReq api...', error);
    }
  }

  const AcceptReqState = async(id) =>{
    try{
      const url = `http://localhost:4512/api/accessReq/approve_accessReq/${id}`;
      const response = await fetch(url,{
        method:'PUT',
        headers:{
          'Content-Type' : 'application/json',
          'authToken': localStorage.getItem('token'),
        }
      })
      const d1 = await response.json();
      return d1;
    } catch(error){
      console.error('error',error);
      console.log('Error in updating request...');
    }
  }

  const DeleteAcessReq = async(id) =>{
    try{
      const url = `http://localhost:4512/api/accessReq/delete_accessReq/${id}`;
      const response = await fetch(url,{
        method:'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          'authToken': localStorage.getItem('token')
        }
      })
      const data = await response.json();
      return data;
    } catch(error){
      console.error('error',error);
    }
  }
  
  const requiredStuAllReq = async() =>{
    try{
      const url = 'http://localhost:4512/api/accessReq/fetchAllStureq';
      const response = await fetch(url,{
        method:'GET',
        headers : {
          'Content-Type' : 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      return data.accessRequests;
    } catch(error){
      console.error('Error in fetching requiredStuAllReq...',error)
    }
  }

  return (
    <div>
      <AccReq.Provider value={{ status,requiredStuAllReq,reqData, setReqData,DeleteAcessReq,AcceptReqState,getAccessReq, TgetAllAccessReq, setStatus, createAccessReq, cancelAccessReq }}>
        {props.children}
      </AccReq.Provider>
    </div>
  )
}

export default AccessReqState
