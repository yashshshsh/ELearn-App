import React,{useState,useEffect} from 'react'
import doc_img from '../../../Photos/docu_img.jpg'
import pdf_img from '../../../Photos/pdf_img.jpg'

const AssContent_item = (props) => {
  const { material} = props;
  const [showMaterial, setShowMaterial] = useState(false);
  const [url, setUrl] = useState(null);
  const uploaded_item_styles = {
    height: showMaterial ? '9.5rem' : '5rem', display: 'flex', marginLeft: '0.7rem', alignItems: 'center', fontSize: '1rem', border: '2px solid #21A0A0', width: '65vw', marginTop: '1rem', borderRadius: '10px',
  }
  const handleClick = () => {
    setShowMaterial(!showMaterial);
  }

  const convertPdf = () => {
    const uint8Array = new Uint8Array(material.material.data.data);
    const blob = new Blob([uint8Array], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(blob);
    setUrl(pdfUrl);
  }

  useEffect(() => {
    convertPdf();
  }, [])

  const handleOpenPDF = () => {
    window.open(url, '_blank')
  };
  return (
    <div>
      <div className="uploaded_item" onClick={handleClick} style={uploaded_item_styles}>
        <div className="doc_img">
          <img style={{ height: '3.7rem', marginLeft: '1rem', borderRadius: '50%' }} src={doc_img} alt='doc_img' />
        </div>
        <div className="doc_text" style={{ fontWeight: 'bold', marginLeft: '1rem' }}>
          <div className="doc_para">
            <p>{material.Teacher_name} posted a new assignment : {material.title}</p>
          </div>

          <div className="wade" style={{ display: 'flex', width: '36rem' }}>
            <div className={`view_material ${showMaterial ? '' : 'd-none'}`} style={{ width: '100%' }}>
              <div className="description" >
                <p>Description : {material.description}</p>
              </div>
              <div className="a1" style={{ display: 'flex' }}>
                <div className="view_btn">
                  <button type="button" onClick={handleOpenPDF} className="btn btn-dark">View Materials</button>
                </div>
                <div style={{ marginLeft: '1rem', width: '10rem' }} className="material_doc">
                  <img src={pdf_img} alt="PDF Icon" style={{ cursor: 'pointer', marginBottom: '0.5rem', height: '3rem' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssContent_item
