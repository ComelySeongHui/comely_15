/**
 * 내 정보 페이지
 * 비밀번호 변경 
 * 로그아웃 버튼 클릭시 로그아웃
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Nav, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo2 from "../img/Logo2.png";
import logo1 from '../img/Logo1.png';
import './MyPage.css';
import { useAuth } from './auth/AuthContext';
import Delete from './Delete';

function MyPage() {
  const [userInfo, setUserInfo] = useState({id:'', nickname:'', email:'', password:''});
  const navigate = useNavigate();
  const {user, logout} = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/logout');
      localStorage.removeItem('token');
      navigate('/login')
    } catch (error) {
      console.error('로그아웃 실패', error); 
    }
  }

  useEffect(() => {
    // 사용자 정보를 가져옴
    const fetchUserInfo = async () => {
      // try {
      //   const response = await axios.get('http://localhost:8080/users');
      //   setUserInfo({
      //     id: response.data.id,
      //     nickname: response.data.nickname,
      //     email: response.data.email,
      //     password: response.data.password
      //   });
      // }
      // catch(error) {
      //   alert(error.response.data);
      // }
      
      // 테스트용 유저정보
      setUserInfo({
        id: 'lee99',
        nickname: 'lhg99',
        email: 'lee991229@naver.com',
        password: '123123'
      })
    };

    fetchUserInfo();
  }, []);
  
  return (
  <div>
    
    <div className='d-flex'>
    
      <Container className='flex-grow-1'>
        <div className="text-center mb-4 mt-4">
          <img src={logo1} alt="BalGoorm Logo" style={{ width: '300px' }} />
          <h1 className="mt-2" style={{ color: '#3498db' }}>BalGoorm</h1>
        </div>

        <Row className='justify-content-center'>
          <Col md={6} className='main-content'>
            <h1 className='text-center fw-bold'>내 정보</h1>
            <hr></hr>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>아이디</Form.Label>
                <Col sm={5}>
                  <Form.Control type="text" value={userInfo.id} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>비밀번호</Form.Label>
                <Col sm={5}>
                  <Form.Control type="password" value="********" readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>닉네임</Form.Label>
                <Col sm={5}>
                  <Form.Control type="text" value={userInfo.nickname} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>이메일</Form.Label>
                <Col sm={5}>
                  <Form.Control type="text" value={userInfo.email} readOnly />
                </Col>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
      {user && <Delete userId={user.id}/>}
    </div>
  </div>
  );
}

export default MyPage;