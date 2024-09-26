import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [error, setError] = useState('');

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Validate file type
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      setError('jpg 및 png 파일만 지원됩니다.');
      return;
    }

    setError(''); // Reset error message
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
      setHasUploaded(true);

      const formData = new FormData();
      formData.append('file', file);

      setLoading(true); 

      axios.post('https://wxxnxx.pythonanywhere.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob' // 서버에서 이미지를 바이너리로 받아옴
      })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data); // 바이너리 데이터를 URL로 변환
        setConvertedImage(imageUrl); // 변환된 이미지 URL 설정
        setLoading(false);
      })
      .catch((error) => {
        console.error('이미지 업로드 중 오류:', error);
        setError('이미지 업로드 중 오류가 발생했습니다.');
        setLoading(false);
      });
      
      
    };

    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setConvertedImage(null);
    setLoading(false);
    setHasUploaded(false);
    setError('');
  };

  const handleDownload = () => {
    if (convertedImage) {
      const link = document.createElement('a');
      link.href = convertedImage;
      link.download = 'converted_image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div 
        style={{ 
          border: '2px dashed #ccc', 
          borderRadius: '15px',  
          padding: '20px',
          height: '300px',
          marginTop: '0',
          maxWidth: '800px', 
          margin: 'auto' 
        }}
      >
        {!hasUploaded && (
          <div {...getRootProps()} style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <input {...getInputProps()} />
            <Row className="align-items-center" style={{ justifyContent: 'center' }}>
              <Col xs="auto">
                <p style={{ marginBottom: '0', fontSize: '2rem', color: 'gray', fontWeight: 'bold'}}>무료 이미지 변환</p>
                <p></p>
                <p></p>
                <p style={{ marginBottom: '0' }}>이미지를 드래그하거나 클릭하여 업로드하세요.</p>
                <p style={{ marginBottom: '0', fontSize: '0.8rem', color: 'gray' }}>
                  jpg, png 파일만 지원 가능합니다.
                </p>
              </Col>
            </Row>
          </div>
        )}

        {loading && (
          <div>
            <p>이미지를 처리 중입니다...</p>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {uploadedImage && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <div style={{ width: '45%', textAlign: 'left' }}>
              <p>업로드한 이미지</p>
              <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', borderRadius: '8px' }} />
            </div>
            {convertedImage && (
              <div style={{ width: '45%', textAlign: 'left' }}>
                <p>변환된 이미지</p>
                <img src={convertedImage} alt="Converted" style={{ width: '100%', borderRadius: '8px' }} />
                <div style={{ marginTop: '10px' }}>
                  <Button variant="secondary" onClick={handleReset} style={{ marginRight: '10px' }}>
                    다시하기
                  </Button>
                  <Button variant="primary" onClick={handleDownload}>
                    이미지 저장하기
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
