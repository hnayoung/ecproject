import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const ImageUpload = ({ onImageUpload }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
      setError('jpg 및 png 파일만 지원됩니다.');
      return;
    }

    setError('');
    const reader = new FileReader();

    reader.onload = () => {
      setUploadedImage(reader.result);
      setHasUploaded(true);

      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      setSuccess(false);

      axios.post('https://wxxnxx.pythonanywhere.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      })
      .then((response) => {
        const imageUrl = URL.createObjectURL(response.data);
        setConvertedImage(imageUrl);
        onImageUpload(imageUrl);

        localStorage.setItem('uploadedImages', JSON.stringify([imageUrl]));
        setLoading(false);
        setSuccess(true);
      })
      .catch((error) => {
        console.error('이미지 업로드 중 오류:', error);
        setError('IMAGE ERROR!');
        setLoading(false);
        setSuccess(false);
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
    setSuccess(false);
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const errorBackground = 'https://github.com/hnayoung/img_data/blob/main/%EC%8B%A4%ED%8C%A8%EC%95%A0.png?raw=true';
  const successBackground = '';
  const loadingBackground = 'https://github.com/hnayoung/img_data/blob/main/%EC%9D%B4%EB%AF%B8%EC%A7%80%EB%93%9C%EB%A1%9C%EC%9E%89%EC%A4%91.png?raw=true';
  
  const backgroundImage = loading
    ? `url(${loadingBackground})`
    : error
    ? `url(${errorBackground})`
    : success
    ? `url(${successBackground})`
    : 'none';

  return (
    <div style={{
       position: 'relative', 
       textAlign: 'center',
       transition: 'transform 0.3s ease-in-out', // 애니메이션 효과 추가
       transform: isDragActive ? 'scale(1.03)' : 'scale(1)', // 드래그 시 확대 비율 조정
    
        }}>

      {/* 텍스트 추가 부분 */}
      <div 
        style={{ 
          position: 'absolute',
          top: '0',
          left: '0', // 왼쪽 정렬
          backgroundColor: '#F9C770', 
          padding: '6px 12px', 
          fontWeight: 'bold',
          zIndex: '1',
          borderRadius: '8px 8px 0 0',
          color: '#3F4B54',
          fontSize: '13.8px', // 글씨 크기 줄임
          transform: isDragActive ? 'scale(1.03)' : 'scale(1)', // 드래그 시 텍스트도 확대
          transition: 'transform 0.3s ease-in-out', // 애니메이션 효과 추가
        }}
      >
        손그림을 디지털이미지로 변환
      </div>

      <div 
        {...getRootProps()} 
        style={{ 
          position: 'relative', 
          border: '2px solid #FFF4E2', 
          borderRadius: '15px',  
          padding: '50px',
          height: '420px',
          marginTop: '0',
          maxWidth: '800px', 
          margin: 'auto',
          backgroundColor: '#FFFEF9', 
          backgroundImage: backgroundImage,
          backgroundSize: '30%',
          backgroundPosition: 'center 40%',
          backgroundRepeat: 'no-repeat',
          opacity: '1',
          borderTop: '35px solid #F9C770',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', // 애니메이션 적용
          transform: isDragActive ? 'scale(1.03)' : 'scale(1)', // 드래그 시 확대
          boxShadow: isDragActive ? '0px 0px 15px rgba(0, 0, 0, 0.2)' : 'none', // 드래그 시 그림자 효과
        }}
      >
        <input {...getInputProps()} />
        {!hasUploaded && !loading && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Row className="align-items-center" style={{ justifyContent: 'center', marginBottom: '10px' }}>
              <img 
                src="https://github.com/hnayoung/img_data/blob/main/%EC%82%AC%EC%A7%84%ED%94%8C%EB%9F%AC%EC%8A%A4.png?raw=true" 
                alt="image"
                style={{ width: '100px', height: '100px', marginRight: '-13px', objectFit: 'contain' }} 
              />
              <Col xs="auto">
                <p style={{ marginBottom: '0', color: '#8C806B', fontWeight: 200}}>이미지를 드래그하거나 파일을 업로드하세요.</p>
                <p style={{ marginBottom: '0', color: '#B0A592', fontWeight: 200, fontSize: '0.8rem', textIndent: '-168px' }}>
                  지원 확장자: jpg, jpeg, png 
                </p>
              </Col>
            </Row>
            <hr style={{ width: '60%', marginLeft: '150px', border: '1px solid #767676' }} />
          </div>
        )}

        {loading && <LoadingSpinner />}

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && uploadedImage && !error && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: '45%' }}>
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  style={{ 
                    width: '100%', 
                    borderRadius: '8px',
                    objectFit: 'contain',
                    maxHeight: '250px' 
                  }} 
                />
              </div>

              {convertedImage && (
                <div style={{ width: '45%' }}>
                  <img 
                    src={convertedImage} 
                    alt="Converted" 
                    style={{ 
                      width: '100%', 
                      borderRadius: '8px',
                      objectFit: 'contain',
                      maxHeight: '250px' 
                    }} 
                  />
                </div>
              )}
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <Button
                onClick={handleReset}
                style={{
                  backgroundColor: '#C4BCAF',
                  borderColor: '#C4BCAF',
                  marginRight: '20px',
                }}
              >
                다시하기
              </Button>
              <Button 
                onClick={handleDownload}
                style={{
                  backgroundColor: '#5F5442',
                  borderColor: '#5F5442',
                }}
              >
                이미지 저장하기
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div style={{ marginTop: '180px', display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={handleReset}
              style={{
                backgroundColor: '#C4BCAF',
                borderColor: '#C4BCAF',
              }}
            >
              다시하기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
