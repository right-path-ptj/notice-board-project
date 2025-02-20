// src/types/Post.ts

export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string; // 또는 Date 객체
    updatedAt: string; // 또는 Date 객체
}

export interface PostInput { // 게시글 생성/수정 시 입력 데이터 타입
    title: string;
    content: string;
    author: string;
}