import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
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

    // Show the uploaded image immediately
    reader.onload = () => {
      setUploadedImage(reader.result); // Set the uploaded image data
      setHasUploaded(true); // Mark that an image has been uploaded

      const formData = new FormData();
      formData.append('file', file);

      // Set loading state while waiting for the backend response
      setLoading(true); 

      // Uncomment this when the backend is ready
      /*
      axios.post('https://your-backend-api.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setConvertedImage(response.data.convertedImageUrl); // Set the converted image URL
        setLoading(false); // Stop loading after the image is processed
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        setError('이미지 업로드 중 오류가 발생했습니다.'); // Set error message
        setLoading(false); // Stop loading even if there's an error
      });
      */

      // Mock response for testing
      setTimeout(() => {
        setConvertedImage(reader.result); // Use the uploaded image as the converted image for testing
        setLoading(false);
      }, 1000); // Simulate a network delay
    };

    reader.readAsDataURL(file); // Read the file as a Data URL
  };

  const handleReset = () => {
    // Reset all states
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
      link.download = 'converted_image.png'; // Download as PNG or change the extension as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <div style={{ backgroundColor: '#87CEEB', padding: '10px', textAlign: 'left', marginBottom: '0', maxWidth: '800px', margin: 'auto' }}>
        <h5 style={{ margin: '0', fontSize: '1rem', paddingLeft: '10px' }}>
          손그림을 디지털 이미지로 변환
        </h5>
      </div>
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
                <FontAwesomeIcon icon={faImage} size="3x" style={{ marginBottom: '10px' }} />
              </Col>
              <Col xs="auto" style={{ textAlign: 'left' }}>
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
            {/* Optional: Add a spinner or loading animation here */}
          </div>
        )}

        {/* Error Message */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Always display the uploaded image if it exists */}
        {uploadedImage && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            {/* Uploaded Image */}
            <div style={{ width: '45%', textAlign: 'left' }}>
              <p>업로드한 이미지</p>
              <img src={uploadedImage} alt="Uploaded" style={{ width: '100%', borderRadius: '8px' }} />
            </div>
            {/* Converted Image (if available) */}
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
