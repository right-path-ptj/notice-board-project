import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';
import HeaderComponent from './components/HeaderComponent';
import Sidebar from './SideBarComponent';
import PointPostForm from './components/pointboard/PointPostForm';
import Login from './components/LoginComponent';
import './App.css';
import { AuthProvider } from './contexts/AuthContext'; // AuthProvider 임포트
import Signup from './components/SignupComponent';

function App() {
    return (
        <AuthProvider> {/* AuthProvider로 Router 및 내부 컨텐츠 전체를 감쌉니다. */}
            <Router>
                <div>
                    {/* 헤더와 사이드바는 모든 페이지에서 유지 */}
                    <HeaderComponent />
                    <Sidebar />

                     {/* 메인 컨텐츠 영역 */}
                     <div className="my-main-content">
                         <Routes>
                             <Route path="/" element={<PostList />} />
                             <Route path="/login" element={<Login />} />
                             <Route path="/posts/new" element={<PostForm />} />
                             <Route path="/posts/:id" element={<PostDetail />} />
                            <Route path="/posts/edit/:id" element={<PostForm />} />
                            <Route path="/signup" element={<Signup />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;