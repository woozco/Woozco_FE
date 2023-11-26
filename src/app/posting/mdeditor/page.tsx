// Upload.tsx
"use client";
import React, { useState } from 'react';
import { NextPage } from 'next';
import MdEditor from '@/app/components/mdedit/MdEditor';
import MarkdownViewer from '@/app/components/mdedit/MdViewer';

const Upload: NextPage = () => {
  const [markdown, setMarkdown] = useState('');

  const handleEditorChange = (content: string | undefined | any) => {
    setMarkdown(content);
  };

  const handleSave = () => {
    console.log(markdown); // 현재 마크다운 상태를 콘솔에 출력
    localStorage.setItem('markdown', markdown || ''); // 로컬 스토리지에 저장
  };

  return (
    <>
      <MdEditor value={markdown} onMarkdownChange={handleEditorChange} />
      <button onClick={handleSave}>저장</button>
      <MarkdownViewer markdown={markdown} /> {/* 마크다운 뷰어에 마크다운 전달 */}
    </>
  );
};

export default Upload;
