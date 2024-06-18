import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import PostForm from './PostForm';
import './Board.css';

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

const Board = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(initialPosts);
  const currentBoard = 'discussion';
  const [visiblePost, setVisiblePost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

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

  const boardPosts = posts[currentBoard].sort((a, b) => b.order - a.order);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = boardPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleEdit = (post) => {
    const password = prompt("게시글을 수정하려면 비밀번호를 입력하세요:");
    if (password === post.password) {
      navigate(`/edit/${post.id}`);
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  const handleDelete = (postId) => {
    const post = posts[currentBoard].find(post => post.id === postId);
    const password = prompt("게시글을 삭제하려면 비밀번호를 입력하세요:");
    if (password === post.password) {
      handleDeletePost(currentBoard, postId);
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
  };

  const toggleContentVisibility = (postId) => {
    if (visiblePost === postId) {
      setVisiblePost(null);
    } else {
      setVisiblePost(postId);
    }
  };

  const obfuscateAuthor = (author) => {
    return author.charAt(0) + '*'.repeat(author.length - 1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="board-container">
      <h2 className="board-title">토론 게시판</h2>
      <ul className="post-list">
        {currentPosts.length > 0 ? (
          currentPosts.map(post => (
            <li key={post.id} className="post-item">
              <strong onClick={() => toggleContentVisibility(post.id)}>{post.order}. {post.title}</strong>
              {visiblePost === post.id && <p className="content">{post.content}</p>}
              <div className="post-actions">
                <span className="author">{obfuscateAuthor(post.author)}</span>
                <button onClick={() => handleEdit(post)} className="button">수정</button>
                <button onClick={() => handleDelete(post.id)} className="button">삭제</button>
              </div>
            </li>
          ))
        ) : (
          <li>게시글이 없습니다.</li>
        )}
      </ul>
      <footer className="footer">
        <div className="pagination">
          {[...Array(Math.ceil(boardPosts.length / postsPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={`page-button ${currentPage === number + 1 ? 'active' : ''}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
        <button onClick={() => navigate('/new')} className="new-post-button">새 글 작성</button>
      </footer>
      <Routes>
        <Route path="/new" element={<PostForm onSave={handleSavePost} board={currentBoard} posts={posts[currentBoard]} />} />
      </Routes>
    </div>
  );
};

export default Board;
