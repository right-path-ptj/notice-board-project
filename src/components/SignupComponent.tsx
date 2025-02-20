import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios'; // axios import
import '../styles/SignupComponent.css';
import { useNavigate } from 'react-router-dom'; // useNavigate import

function SignupComponent() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // 에러 메시지 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 추가


  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // handleSubmit 함수를 async 함수로 변경
    e.preventDefault();
    setErrorMessage(''); // 에러 메시지 초기화

    // **(1) 클라이언트 측 유효성 검사 (간단한 예시 - 필요에 따라 더 상세하게 구현)**
    if (!email || !password || !passwordConfirm) {
      setErrorMessage('이메일, 비밀번호, 비밀번호 확인은 필수 입력 항목입니다.');
      return; // 유효성 검사 실패 시 함수 종료
    }
    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return; // 유효성 검사 실패 시 함수 종료
    }

    try {
      // **(2) 백엔드 회원가입 API 호출 (axios 사용)**
      const response = await axios.post('/api/auth/signup', { // 백엔드 API 엔드포인트 URL
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        username: username,
      });

      // **(3) API 요청 성공 (2xx 응답)**
      console.log('회원가입 성공!', response.data);
      alert('회원가입 성공! 로그인 페이지로 이동합니다.');
      // TODO: 회원가입 성공 후 처리 (예: 로그인 페이지로 리디렉션, 자동 로그인 등)
      navigate('/login'); // 회원가입 성공 후 로그인 페이지("/") 로 리디렉션

    } catch (error: any) { // try-catch 블록으로 감싸서 에러 처리
      // **(4) API 요청 실패 (4xx 또는 5xx 응답)**
      console.error('회원가입 실패', error);
      if (error.response) {
        // 서버 응답이 있는 경우 (HTTP 에러 응답)
        if (error.response.data && error.response.data.message) {
          setErrorMessage(error.response.data.message); // 서버 에러 메시지 표시
        } else {
          setErrorMessage('회원가입에 실패했습니다. 서버 오류가 발생했습니다.'); // 일반적인 오류 메시지
        }
        // TODO: 에러 응답 상세 정보 활용 (예: 유효성 검사 에러 필드별 표시) - error.response.data.errors 활용
      } else if (error.request) {
        // 요청은 완료되었지만 응답이 없는 경우 (네트워크 에러 등)
        setErrorMessage('회원가입 요청에 실패했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        // 요청 생성 중 에러 발생
        setErrorMessage('회원가입 요청 중 오류가 발생했습니다.');
      }
    }
  };


  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 표시 영역 추가 */}
      <form onSubmit={handleSubmit} className="signup-form">
        {/* ... input 필드 (이전 코드와 동일) ... */}
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
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
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          <input
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>
        <div className="input-group">
          <label htmlFor="username">사용자 이름 (선택)</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="사용자 이름을 입력하세요 (선택 사항)"
          />
        </div>
        <button type="submit" className="signup-button">회원가입</button>
      </form>
      <div className="login-link">
        이미 계정이 있으신가요? <a href="/login">로그인</a>
      </div>
    </div>
  );
}

export default SignupComponent;