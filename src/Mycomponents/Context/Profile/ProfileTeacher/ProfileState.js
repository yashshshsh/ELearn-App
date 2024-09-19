import React, { useState } from 'react';
import ProfileContext from './ProfileContext';
import axios from 'axios';

const ProfileState = (props) => {
    const host = "http://localhost:4512";
    // console.log('ProfileState Authtoken',localStorage.getItem('token'));
    const [credentials, setCredentials] = useState({ name: '', email: '', mobile_no: '', photo: '', subject: '', id: '' });
    const getProfile = async() =>{
        try{
            const url = `${host}/api/authTeacher/getUser`;
            const response = await fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'authToken': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            return data;
        } catch(error){
            console.log('Error in fetching the profile',error.message)
        }     
    }

    const updateTeacher = async(newData) =>{
        try{
            const value = newData.get('id')
            const url = `${host}/api/authTeacher/updateUser/${value}`;
            // console.log('new Data in profileState',newData);
            const headers = {
                'Content-Type' : 'multipart/form-data',
                'authToken' : localStorage.getItem('token'),
            }
            const response  = await axios.put(url,newData,{headers})
            if(response.status >= 200 && response.status < 300){
                return response.data.user;
            } else {
                console.log('error in updating teacher profile')
            }
        } catch(error){
            console.log('Failed to fetch',error.message)
        }
    }
  return (
    <ProfileContext.Provider value={{credentials,setCredentials,getProfile,updateTeacher}}>
        {props.children}
    </ProfileContext.Provider>
  )
}

export default ProfileState;
