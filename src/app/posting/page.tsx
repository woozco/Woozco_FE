"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  linkOfProblem: string;
  wantLanguage: string;
  body: string;
}

const getWantMento = async () => {
  const response = await axios.get<Post[]>('http://localhost:4000/WantMento');
  return response.data;
};

const getWantMentee = async () => {
  const response = await axios.get<Post[]>('http://localhost:4000/WantMentee');
  return response.data;
};

const Posting: React.FC = () => {
  const [wantMento, setWantMento] = useState<Post[]>([]);
  const [wantMentee, setWantMentee] = useState<Post[]>([]);

  useEffect(() => {
    // 데이터를 가져와서 상태에 설정
    getWantMento().then((data) => setWantMento(data));
    getWantMentee().then((data) => setWantMentee(data));
  }, []);

  return (
    <div>
      <h1>게시판</h1>
      <br></br>
      <h2>Want Mento</h2>
      <ul>
        {wantMento.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Date: {post.date}</p>
            <p>Start Time: {post.startTime}</p>
            <p>End Time: {post.endTime}</p>
            <p>
              Link of Problem: <a href={post.linkOfProblem}>{post.linkOfProblem}</a>
            </p>
            <p>Want Language: {post.wantLanguage}</p>
            <p>Body: {post.body}</p>
          </li>
        ))}
      </ul>
      <br></br>
      <h2>Want Mentee</h2>
      <ul>
        {wantMentee.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Date: {post.date}</p>
            <p>Start Time: {post.startTime}</p>
            <p>End Time: {post.endTime}</p>
            <p>
              Link of Problem: <a href={post.linkOfProblem}>{post.linkOfProblem}</a>
            </p>
            <p>Want Language: {post.wantLanguage}</p>
            <p>Body: {post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posting;
