import React, { useState } from 'react';
import Tcontent from './TcontentContext';
import axios from 'axios';

const TcontentState = (props) => {
  const host = "http://localhost:4512";
  const contentinitial = [];
  const [content, setcontent] = useState(contentinitial);

  const getContent = async () => {
    try {
      const url = `${host}/api/Tcontent/getMaterial`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      return data.material;
    } catch (error) {
      console.log('Error in fetching notes', error);
      setcontent([]);
    }
  }

  const addContent = async (formData) => {
    try {
      const url = `${host}/api/Tcontent/addMaterial`;
      const headers = {
        'Content-Type': 'multipart/form-data',
        'authToken': localStorage.getItem('token')
      }
      const response = await axios.post(url, formData, { headers });
      if (response.status >= 200 && response.status <= 300) {
        // console.log("added new content",response.data.savedContent);
        return response.data.savedContent;
      } else {
        console.log('Error in adding content');
      }
    } catch (error) {
      console.log('Failed to fetch', error)
    }
  }

  const deleteContent = async (id) => {
    try {
      const url = `${host}/api/Tcontent/deleteMaterial/${id}`;
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        },
      });
      const data = await response.json();
      return data.Deleted_content._id;
    } catch (error) {
      console.log('Failed to fetch', error);
    }
  }

  const updateContent = async (newData) => {
    const value = newData.get('id');
    try {
      console.log('value', value);
      const url = `${host}/api/Tcontent/updateMaterial/${value}`;
      const headers = {
        'Content-Type': 'multipart/form-data',
        'authToken': localStorage.getItem('token')
      }
      const response = await axios.put(url, newData, { headers });
      if (response.status >= 200 && response.status < 300) {
        const updatedContent = response.data.updated_content;
        setcontent(prevContent => prevContent.map(item =>
          item._id === value ? updatedContent : item
        ));
        return updatedContent;
      } else {
        console.log('error in updating content...')
      }
    } catch (error) {
      console.log('Error in fetching api...')
    }
  }

  const getAssAndContentST = async (id) => {
    try {
      const url = `http://localhost:4512/api/Scontent/getAllContentST/${id}`;
      console.log('URL', url)
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      return data.requiredContent;
    } catch (error) {
      console.error('Error in fetching getAssAndContent api..', error);
    }
  }

  const getAssAndContent = async () => {
    try {
      const url = `http://localhost:4512/api/Scontent/getAllContent`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('token')
        }
      });
      const data = await response.json();
      return data.reqMaterial;
    } catch (error) {
      console.error('Error in fetching getAssAndContent api..', error);
    }
  }

  return (
    <Tcontent.Provider value={{ content, getAssAndContent, getAssAndContentST, setcontent, updateContent, getContent, addContent, deleteContent }}>
      {props.children}
    </Tcontent.Provider>
  )
}

export default TcontentState
