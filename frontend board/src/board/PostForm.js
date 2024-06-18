import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import './PostForm.css';

const PostForm = ({ onSave, board, posts }) => {
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', author: '', password: '', order: posts.length + 1 });
  const editorRef = useRef(null);

  useEffect(() => {
    if (posts && posts.length > 0) {
      const lastPost = posts[posts.length - 1];
      setPost({ ...post, order: lastPost.order + 1 });
    }
  }, [posts]);

  const handleChange = e => {
    const { name, value } = e.target;
    setPost(prevPost => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const codeContent = editorRef.current ? editorRef.current.getValue() : '';
    onSave(board, { ...post, codeContent });
    navigate(`/discussion`);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <label>
        제목:
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        내용:
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          required
        />
      </label>
      {/* <label>
        코드:
        <div className="editor-container">
          <Editor
            height="100px"
            language="javascript"
            theme="vs-dark"
            defaultValue="// 코드를 입력하세요"
            onMount={handleEditorDidMount}
            options={{
              padding: {
                top: 10,
              },
            }}
          />
        </div>
      </label> */}
      <label>
        작성자:
        <input
          type="text"
          name="author"
          value={post.author}
          onChange={handleChange}
          required
          pattern="[A-Za-z]{1,19}|[가-힣]{1,4}"
          title="영어 1~19자 또는 한글 1~4자 입력 가능합니다."
        />
      </label>
      <label>
        비밀번호:
        <input
          type="password"
          name="password"
          value={post.password}
          onChange={handleChange}
          required
          pattern="\d{4}"
          title="숫자 4자만 입력 가능합니다."
        />
      </label>
      <input
        type="hidden"
        name="order"
        value={post.order}
        onChange={handleChange}
      />
      <button type="submit">저장</button>
    </form>
  );
};

export default PostForm;
