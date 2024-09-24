import logo from './logo.svg';
import './App.css';
import Navbarr from './component/Navbarr';
import { Container } from 'react-bootstrap';
import Advertisement from './component/Advertisement';
import {Col,Row,component} from 'react-bootstrap';
import ImageUpload from './component/ImageUpload';
import 'bootstrap/dist/css/bootstrap.min.css';



/* 
1. 사이트 이름, 이전 기록, 오류신고하기 버튼 있는 navbar 만들기
2. 광고배너 컴포넌트
3. 파일 업로드 컴포넌트
4. 로딩 
5. 파일 업로드 컴포넌트 ; 왼쪽 - 회로 손그림 오른쪽 - 디지털 회로도 
6. 다시하기 버튼- 파일 업로드 창(초기화), 이미지로 저장하기 버튼- 디지털 회로도 저장 
*/ 

function App() {
  return (
    <div>
      <Container>
        <Navbarr />
        <Advertisement/>
        <ImageUpload/>
      </Container>
    </div>
  );
}

export default App;
