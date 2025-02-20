import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { PostInput } from './Post'; // PostInput 타입 정의를 가정
import '../styles/postform.css'

interface PostFormProps {
    postId?: string; // postId prop은 선택적으로 받을 수 있도록 정의
}

function PostForm({ postId }: PostFormProps) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e: React.FormEvent) => { // e 파라미터 타입을 React.FormEvent로 명시
        e.preventDefault();

        const postData: PostInput = { // postData를 PostInput 타입으로 명시
            title,
            content,
            author,
        };

        try {
            if (postId) {
                await axios.put(`/api/posts/${postId}`, postData);
            } else {
                await axios.post('/api/posts', postData);
            }
            navigate('/');
        } catch (error) {
            console.error('게시글 저장에 실패했습니다.', error);
        }
    };

    return (
        <div>
            <h2>{postId ? '게시글 수정' : '새 게시글 작성'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="content">내용:</label>
                    <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="author">작성자:</label>
                    <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
                <button type="submit">저장</button>
            </form>
        </div>
    );
}

export default PostForm;