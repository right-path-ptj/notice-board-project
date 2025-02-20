import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Post } from './PointPost';
import '../styles/noticestyle.css'

function PostList() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get<Post[]>('/api/posts');
            console.log("API 응답 데이터:", response.data); // 응답 데이터 콘솔에 출력

            if (Array.isArray(response.data)) { // 응답 데이터가 배열인지 명확하게 확인
                setPosts(response.data);
            } else {
                console.error("API 응답이 배열이 아닙니다:", response.data);
                setPosts([]); // 배열이 아닌 경우 빈 배열로 설정하여 map 오류 방지
                alert("게시글 목록을 불러오는 데 실패했습니다. (API 응답 오류)");
            }

        } catch (error) {
            console.error('게시글 목록을 불러오는 데 실패했습니다.', error);
            console.error("오류 상세 내용:", error); // 오류 객체 전체를 콘솔에 출력하여 자세한 정보 확인
            setPosts([]); // 오류 발생 시 빈 배열로 설정하여 map 오류 방지
            alert("게시글 목록을 불러오는 데 실패했습니다. (네트워크 오류)");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`/api/posts/${id}`);
            fetchPosts();
        } catch (error) {
            console.error('게시글 삭제에 실패했습니다.', error);
        }
    };

    return (
        <div className='main-body'>
            <h2 className='title'>자유 게시판</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/posts/${post.id}`} className="post-link">{post.title}</Link>
                        <button onClick={() => handleDelete(post.id)}>삭제</button>
                    </li>
                ))}
            </ul>
            <Link to="/posts/new" className="new-post-link">새 게시글 작성</Link>

        </div>
    );
}

export default PostList;