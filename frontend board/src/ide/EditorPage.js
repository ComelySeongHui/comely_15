import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from 'react-bootstrap';
import Modal from '../components/Modal';
import './EditorPage.css';
import axios from 'axios';

function TestEditorPage() {
  const editorRef = useRef(null);
  const [output, setOutput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [problem, setProblem] = useState({ name: '', content: '', detail: '' });

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        const data = response.data;
        const fakeProblem = {
          name: 'Sample Problem',
          content: `Title: ${data.title}\n\n${data.body}`,
          detail: 'This is a sample problem fetched from JSONPlaceholder.'
        };
        setProblem(fakeProblem);
      })
      .catch(error => {
        console.error('Error fetching problem data:', error);
      });
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function runCode() {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        setOutput(result);
        setModalMessage(result === 15 ? '정답' : '오답');
        setIsModalOpen(true);
      } catch (error) {
        setOutput(error.toString());
        setModalMessage('오답');
        setIsModalOpen(true);
      }
    }
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="editor-page">
      <div className="problem-container">
        <div className="problem-name">
          문제 : {problem.name}
        </div>
        <div className="problem-content">
          {problem.content.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className="problem-detail">
          {problem.detail.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>

      <div className="editor-container">
        <div className="editor-box">
          <Editor
            width="100%"
            height="100%"
            language="javascript"
            theme="vs-dark"
            defaultValue={`// 기본 사용법 작성
//~~~~~~~~
// 예제: 두 숫자의 합을 계산하여 반환하는 함수
function add(a, b) {
  return a + b;
}

add(5, 10);`}
            onMount={handleEditorDidMount}
            options={{
              padding: {
                top: 10
              }
            }}
          />
        </div>
        <div className="run-btn">
          <Button variant="outline-dark" onClick={runCode}>답안제출</Button>
        </div>
        <div className="output-container">
          <div className="output-title">Output:</div>
          <pre>{output}</pre>
        </div>
        {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
      </div>

    </div>
  );
}

export default TestEditorPage;
