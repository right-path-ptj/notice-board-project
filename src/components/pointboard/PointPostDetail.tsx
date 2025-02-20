import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Post } from './PointPost';
import '../styles/postdetail.css';

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            const response = await axios.get<Post>(`/api/posts/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error('게시글을 불러오는 데 실패했습니다.', error);
            setPost(null);
        }
    };

    if (!post) {
        return <div className="post-container">게시글을 불러오는 중... 또는 게시글이 없습니다.</div>;
    }

    return (
        <div className="post-container">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-author">작성자: {post.author}</p>
            <p className="post-content">{post.content}</p>
            <div className="post-actions">
                <Link to={`/posts/edit/${post.id}`} className="edit-link">수정</Link>
                <Link to="/" className="back-link">목록으로</Link>
            </div>
        </div>
    );
}

export default PostDetail;
