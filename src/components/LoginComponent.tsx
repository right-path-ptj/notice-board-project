import React, { useState, useContext, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import '../styles/LoginComponent.css';
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [email, setEmail] = useState<string>(''); // email 상태: string 타입 명시
  const [password, setPassword] = useState<string>(''); // password 상태: string 타입 명시
  const { login } = useContext(AuthContext); // AuthContext에서 login 함수 가져오기
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => { // e: ChangeEvent<HTMLInputElement> 타입 명시
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => { // e: ChangeEvent<HTMLInputElement> 타입 명시
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // e: FormEvent<HTMLFormElement> 타입 명시
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password,
      });

      const token = response.data.token as string; // token 타입 명시 (string으로 가정)
      login(token);

      console.log('로그인 성공!', response.data);
      alert('로그인 성공!');
      navigate('/'); // 로그인 성공 후 메인 페이지("/") 로 리디렉션

    } catch (error: any) { // error 타입 명시 (any 또는 AxiosError 타입 사용 가능)
      console.error('로그인 실패', error);
      alert('로그인 실패: 이메일 또는 비밀번호를 확인해주세요.');
      // TODO: 로그인 실패 에러 메시지 표시
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      <div className="signup-link">
        계정이 없으신가요? <a href="/signup">회원가입</a>
      </div>
    </div>
  );
}

export default LoginComponent;