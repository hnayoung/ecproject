import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Navbarr = () => {
  return (
    <div>
      <div
        style={{
          position: 'absolute',
          left: '23vw', // 화면 너비의 23%로 설정 (조정 가능)
          top: '10vh', // 화면 높이의 10%로 설정
          backgroundImage: 'url(https://github.com/hnayoung/img_data/blob/main/%EB%A1%9C%EA%B3%A0.png?raw=true)', // url()로 감싸기
          width: '20vw', // 화면 너비의 20%
          height: '8vh', // 화면 높이의 8%
          backgroundSize: 'cover', // 배경 이미지가 요소에 맞춰 조정되도록
          backgroundPosition: 'right', // 배경 이미지를 오른쪽으로 설정
        }}>
        <Link to="/" style={{ display: 'block', width: '100%', height: '100%' }}></Link>
      </div>
      <div 
        style={{
          position: 'absolute',
          left: '48vw', // 화면 너비의 48%에 위치 (조정 가능)
          top: '12vh',  // 화면 높이의 12%에 위치
          display: 'flex', // Flexbox를 사용하여 버튼을 나란히 배치
          alignItems: 'center', // 수직 정렬을 중앙으로
        }}>
        <Link to="/record">
          <Button variant="light">이전 기록</Button>
        </Link>
        <p style={{
          margin: '0 10px', // 버튼과의 간격을 주기 위해 마진 추가
          color: '#AA9A81',
        }}>
          |
        </p>
        <Link to="/report">
          <Button variant="danger">오류 신고</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbarr;
