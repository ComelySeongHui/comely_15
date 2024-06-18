/**
 * 로그인 페이지
 * 아이디 찾기, 비밀번호 변경 시간되면 만들기
 * 로그인을 해야 마이페이지 접근 가능하게 설정
 * 관리자 계정으로 로그인하면 관리자 페이지 접근 가능하게 설정
 */

import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';
import logo1 from "../img/Logo1.png";
import logo2 from "../img/Logo2.png";
import { useAuth } from './auth/AuthContext';

function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const navigate = useNavigate();
    const { setAuthToken, setUserRole } = useAuth();

    const submitForm = async (data) => {
      console.log(data);
      const { id, password }  = data;

      try {
        const response = await axios.post('http://localhost:8080/login', {
          id,
          password
        });
        const { token, role } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        setAuthToken(token);
        setUserRole(role);
        role === "ADMIN" ? navigate('/admin') : navigate('/mypage');
      }
      catch(error) {
        alert(error.response.data);
      }  
    }
    
    return (
    <div>      
      <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div className="text-center mb-4">
          <img src={logo1} alt="BalGoorm Logo" style={{ width: '300px' }} />
          <h1 className="mt-2" style={{ color: '#3498db' }}>BalGoorm</h1>
        </div>
        
        <Form onSubmit={handleSubmit(submitForm)} className="w-100" style={{ maxWidth: '300px' }}>
          <Form.Group controlId="id">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="text" placeholder="id 입력" 
            {...register("id", {required: "아이디를 입력해주세요"})} />
          </Form.Group>
          {errors.id && <div style={{color: "red", marginTop: "10px"}}>{errors.id.message}</div>}
          <br />
          
          <Form.Group controlId="password">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 입력" {...register("password", {required: "비밀번호를 입력하세요"})}/>
          </Form.Group>
          {errors.password && <div style={{color: "red", marginTop: "10px"}}>{errors.password.message}</div>}

          <Button variant="primary" type="submit" className="w-100 mt-4">
            로그인
          </Button>
        </Form>
        
        <div className="mt-3">
          <p>회원이 아니신가요? <a href="signup">회원가입</a></p>
          <p>아이디를 까먹으셨나요? <a href="find">아이디 찾기</a></p>
          <p>비밀번호를 까먹으셨나요? <a href="edit">비밀번호 변경</a></p>
        </div>    
      </Container>
    </div>
  );
}

export default Login;