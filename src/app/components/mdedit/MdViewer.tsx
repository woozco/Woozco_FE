// MarkdownViewer.tsx
import React from 'react';
import MDEditor from '@uiw/react-md-editor';

const MarkdownViewer = ({ markdown }: { markdown: string }) => {
  return (
    <div className="markdownDiv" data-color-mode="light" style={{ padding: 15 }}>
      <MDEditor.Markdown
        style={{ padding: 10, backgroundColor: '#f6f8fa' }}
        source={markdown}
      />
    </div>
  );
};

export default MarkdownViewer;
