import React, { createContext, useState, useEffect, Dispatch, SetStateAction } from 'react';

// Context 타입 정의
export interface AuthContextProps {
  isLoggedIn: boolean;
  login: (token: string) => void; // login 함수: string 타입 token 인수를 받음, void 반환
  logout: () => void; // logout 함수: 인수 없음, void 반환
  token: string | null; // token 상태: string 또는 null 타입
}

// Context 생성 (타입 적용)
const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  token: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { // AuthProvider 컴포넌트 타입 정의
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // isLoggedIn 상태: boolean 타입 명시
  const [token, setToken] = useState<string | null>(null); // token 상태: string 또는 null 타입 명시

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  const loginHandler = (token: string) => { // loginHandler 함수: string 타입 token 인수를 받음
    setIsLoggedIn(true);
    setToken(token);
    localStorage.setItem('jwtToken', token);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken(null);
    localStorage.removeItem('jwtToken');
  };

  const contextValue: AuthContextProps = { // contextValue 타입 명시
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    token: token,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;