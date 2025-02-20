import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Post } from './Post'; // Post 타입 정의 (가정)
import '../styles/postdetail.css';

// 댓글 타입 정의 (예시) - backend에서 내려오는 데이터 구조에 맞춰 수정 필요
interface Comment {
    id: number;
    postId: number;
    author: string;
    content: string;
    createdAt: string; // 또는 Date 타입
}

function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]); // 댓글 목록 상태 추가
    const [newCommentContent, setNewCommentContent] = useState<string>(''); // 새 댓글 내용 상태 추가

    useEffect(() => {
        fetchPost();
        fetchComments(); // 게시글과 함께 댓글 목록 불러오기
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

    const fetchComments = async () => {
        try {
            const response = await axios.get<Comment[]>(`/api/posts/${id}/comments`); // 댓글 목록 조회 API 호출
            setComments(response.data);
        } catch (error) {
            console.error('댓글을 불러오는 데 실패했습니다.', error);
            setComments([]); // 댓글 불러오기 실패 시 빈 배열로 초기화
        }
    };

    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // 기본 폼 제출 동작 방지

        if (!newCommentContent.trim()) { // 댓글 내용이 비어있는지 확인
            alert('댓글 내용을 입력해주세요.');
            return;
        }

        try {
            // 댓글 작성 API 호출 (POST 요청)
            await axios.post(`/api/posts/${id}/comments`, { content: newCommentContent });
            setNewCommentContent(''); // 입력 필드 초기화
            fetchComments(); // 댓글 목록 다시 불러오기 (갱신)
        } catch (error) {
            console.error('댓글 작성에 실패했습니다.', error);
            alert('댓글 작성에 실패했습니다.');
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewCommentContent(event.target.value);
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

            {/* 댓글 섹션 추가 */}
            <div className="comment-section">
                <h3>댓글</h3>

                {/* 댓글 목록 */}
                <ul className="comment-list">
                    {comments.map(comment => (
                        <li key={comment.id} className="comment-item">
                            <div className="comment-author">{comment.author}</div>
                            <div className="comment-content">{comment.content}</div>
                            <div className="comment-date">{comment.createdAt}</div> {/* 댓글 작성 시간 표시 (선택 사항) */}
                        </li>
                    ))}
                    {comments.length === 0 && <li className="no-comments">아직 댓글이 없습니다.</li>}
                </ul>

                {/* 댓글 입력 폼 */}
                <form onSubmit={handleCommentSubmit} className="comment-form">
                    <textarea
                        id="newCommentContent"
                        className="comment-textarea"
                        placeholder="댓글을 작성해주세요."
                        value={newCommentContent}
                        onChange={handleInputChange}
                    />
                    <button type="submit" className="comment-submit-button">댓글 작성</button>
                </form>
            </div>
        </div>
    );
}

export default PostDetail;