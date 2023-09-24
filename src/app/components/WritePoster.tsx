"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  linkOfProblem: string;
  wantLanguage: string;
  body: string;
}

function WritePoster() {
  const initialFormData: FormData = {
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    linkOfProblem: '',
    wantLanguage: '',
    body: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // 여기에서 formData를 어딘가로 보내거나 처리할 수 있습니다.
    console.log('Form Data:', formData);
    // 초기화
    setFormData(initialFormData);
  };

  return (
    <div>
      <h1>글 작성 폼</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="title">제목:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor="date">날짜:</label>
            <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor="startTime">시작:</label>
            <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor="endTime">끝:</label>
            <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor="linkOfProblem">문제 링크:</label>
            <input type="url" id="linkOfProblem" name="linkOfProblem" value={formData.linkOfProblem} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor="wantLanguage">언어:</label>
            <input type="text" id="wantLanguage" name="wantLanguage" value={formData.wantLanguage} onChange={handleChange} />
        </div>

        <div>
          <button type="submit">글 작성</button>
        </div>
        
      </form>
    </div>
  );
}

export default WritePoster;
