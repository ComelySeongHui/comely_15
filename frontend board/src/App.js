import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainPage from './main/Mainpage';
import EditorPage from './ide/EditorPage';
import TestEditorPage from './ide/TestEditorPage';
import Navbar from './components/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './user/Login.js';
import Signup from './user/Signup.js';
import { AuthProvider } from './user/auth/AuthContext.js';
import ProtectedRoute from './user/auth/ProtectedRoute.js';
import MyPage from './user/MyPage.js';
import Admin from './user/admin/Admin.js';
import Delete from './user/Delete.js';
import Board from './board/Board.js';
import PostForm from './board/PostForm.js';

const initialPosts = {
  discussion: [
    {
      id: 1,
      title: '첫 번째 게시글',
      content: '이것은 첫 번째 게시글의 내용입니다.',
      author: '작성자1',
      order: 1,
      password: 'password1'
    },
    {
      id: 2,
      title: '두 번째 게시글',
      content: '이것은 두 번째 게시글의 내용입니다.',
      author: '작성자2',
      order: 2,
      password: 'password2'
    },
    // 더 많은 게시글 추가 가능
  ]
};

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const currentBoard = 'discussion';

  const handleDeletePost = (board, postId) => {
    setPosts(prevPosts => ({
      ...prevPosts,
      [board]: prevPosts[board].filter(post => post.id !== postId)
    }));
  };

  const handleSavePost = (board, newPost) => {
    setPosts(prevPosts => ({
      ...prevPosts,
      [board]: [...prevPosts[board], newPost]
    }));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <div className="main">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/delete" element={<Delete />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/editor" element={<EditorPage />} />
                <Route path="/editortest" element={<TestEditorPage />} />
                <Route path="/discussion" element={
                  <Board
                    posts={posts}
                    currentBoard={currentBoard}
                    onDelete={handleDeletePost}
                  />
                } />
                <Route path="/new" element={
                  <PostForm
                    onSave={handleSavePost}
                    board={currentBoard}
                    posts={posts[currentBoard]}
                  />
                } />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
