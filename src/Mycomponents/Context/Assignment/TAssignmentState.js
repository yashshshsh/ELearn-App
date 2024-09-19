import React, { useState } from "react";
import TAssignment from "./TAssignmentContext";
import axios from "axios";

const TAssignmentState = (props) => {
    const assinitial = [];
    const [ass, setAss] = useState(assinitial);
    const host = "http://localhost:4512";

    const getAss = async () => {
        try {
            const url = `${host}/api/assignment/getAss`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('token')
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error in fetching assignments', error);
            setAss([]);
        }
    }

    const addAss = async(newAss) => {
        try {
            const url = `${host}/api/assignment/addAss`;
            const headers = {
                'Content-Type': 'multipart/form-data',
                'authToken': localStorage.getItem('token')
            }
            const response = await axios.post(url,newAss,{headers});
            if(response.status >= 200 && response.status <=300){
                return response.data.savedAss;
            } else {
                console.log('Error in adding assignment');
            }
        } catch(error){ 
            console.log('Error in fetching url',error)
        }
    }

    const deleteass = async(id) =>{
        try{
            const url = `${host}/api/assignment/deleteAss/${id}`;
            const response = await fetch(url,{
                method : 'DELETE',
                headers:{
                    'Content-Type':'application/json',
                    'authToken': localStorage.getItem('token')
                },
            });
            const data = await response.json();
            return (data.deleted_ass);  
        } catch(error){
            console.log('Error in fetching delete assignment url',error);
        }
    }
return (
    <TAssignment.Provider value={{ ass, setAss, getAss , addAss, deleteass}}>
        {props.children}
    </TAssignment.Provider>
)
}

export default TAssignmentState;
