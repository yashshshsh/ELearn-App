import React,{useState} from 'react'
import notificationContext from './NotificationContext';

const NotificationState = (props) => {
    const [notificationsAll,setNotificationsAll] = useState([]);

    const getAllNofications = async() =>{
        try{
            const url = 'http://localhost:4512/api/notifications/getAllNotifications';
            const response = await fetch(url,{
                method:'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'authToken': localStorage.getItem('token')
                }
            })
            const data = await response.json();
            return data.notificationsRequired;
        } catch(error){
            console.log('Error in making getAllNotications',error);
        }
    }

  return (
    <div>
      <notificationContext.Provider value={{notificationsAll,getAllNofications,setNotificationsAll} }>
        {props.children}
      </notificationContext.Provider>
    </div>
  )
}

export default NotificationState
