import React from 'react'
import doc_img from '../../../Photos/docu_img.jpg'

const Notification_item = (props) => {
  const { notification } = props;
  const uploaded_item_styles = {
    height: '4rem', display: 'flex', marginLeft: '0.7rem', alignItems: 'center', fontSize: '1rem', border: '2px solid #21A0A0', width: '51vw', marginTop: '1rem', borderRadius: '10px',
  }

  const renderMessage = () => {
    switch (notification.typeOf) {
      case 'newAssignment':
        return <p style={{ fontWeight: 'bold', marginTop: '0.5rem',marginLeft:'1rem'}}>{notification.recipientName} posted a new assignment titled "{notification.title}".</p>;
      case 'newContent':
        return <p style={{ fontWeight: 'bold', marginTop: '0.5rem',marginLeft:'1rem'}}>{notification.recipientName} posted a new content titled "{notification.title}".</p>;
      case 'accessRequest_approved':
        return <p style={{ fontWeight: 'bold', marginTop: '0.5rem',marginLeft:'1rem'}}>{notification.recipientName} allowed you to access his content.</p>;
    }
  }
  return (
    <div>
      <div className="uploaded_notification" style={uploaded_item_styles}>
        <div className="doc_img">
          <img style={{ height: '3.7rem', marginLeft: '1rem', borderRadius: '50%' }} src={doc_img} alt='doc_img' />
        </div>
        <div className="text">
          {renderMessage()}
        </div>
      </div>
    </div>
  )
}

export default Notification_item
