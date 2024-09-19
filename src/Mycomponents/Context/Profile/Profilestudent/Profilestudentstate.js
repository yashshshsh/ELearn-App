import React, { useState } from 'react'
import Profilestudentcontext from './Profilestudentcontext';
import axios from 'axios';

const Profilestudentstate = (props) => {
  const host = "http://localhost:4512";
  const [stcredentials, setStcredentials] = useState({ name: '', email: '', enrollment_no: '', mobile_no: '', id: '' })

  const getStProfile = async () => {
    try {
      const url = `${host}/api/authStudent/getStudent`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const results = await response.json();
      return results;
    } catch (error) {
      console.error('Failed to fetch getStudent api...', error.message)
    }
  }

  const updateStudent = async (objectData) => {
    try{
      const id = objectData.id;
      const url = `${host}/api/authStudent/updateStudent/${id}`;
      const response = await fetch(url,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
        body: JSON.stringify(objectData)
      });
      const data = await response.json();
      return data;
    } catch(error){
      console.log('Error in fetching updateStudent',error)
    }
  };
  return (
    <div>
      <Profilestudentcontext.Provider value={{ stcredentials, setStcredentials, getStProfile, updateStudent }}>
        {props.children}
      </Profilestudentcontext.Provider>
    </div>
  )
}

export default Profilestudentstate
