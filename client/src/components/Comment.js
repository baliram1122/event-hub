import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import moment from 'moment';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const Comment = (eventId) => {
  const [newComment, setNewComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track the comment being replied to
  const { user } = useContext(AuthContext);
  const { data: event, loading, error, reFetch } = useFetch(`/events/${eventId.eventId}`);


  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (user == null)
      toast.error(`Please login first`, { position: toast.POSITION.TOP_CENTER });
    try {
      await axios.post(`/events/comments/${event._id}`, { content: newComment, userId: user._id, userName: user.username });
      setNewComment("");
      reFetch();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/events/comments/${event._id}/${commentId}`);
      toast.success('Comment Deleted successfully!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      reFetch();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const startEditComment = (commentId, content) => {
    setEditedCommentId(commentId);
    setEditedCommentContent(content);
  };

  const cancelEditComment = () => {
    setEditedCommentId(null);
    setEditedCommentContent("");
  };

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(`/events/comments/${event._id}/${commentId}`, { content: editedCommentContent });
      toast.success('Comment Edited successfully!', { position: toast.POSITION.TOP_CENTER, autoClose: 1500 });
      cancelEditComment();
      reFetch();
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleAddReply = async () => {
    try {
      await axios.post(`/events/comments/${event._id}`, { content: replyText, userId: user._id, userName: user.username, pId: replyingTo });
      setReplyText("");
      setReplyingTo(null);
      reFetch();
    } catch (err) {
      console.error("Error adding reply:", err);
    }
  };

  const formatRelativeTime = (dateString) => {
    const formattedRelativeTime = moment(dateString).fromNow();
    return formattedRelativeTime;
  };

  const renderComment = (comment) => (
    <div key={comment._id} className="card mt-3 comment-card" style={{backgroundColor: "rgba(255,255,255,0.07)", color: "white"}}>
      <div className="card-body">
        {editedCommentId === comment._id ? (
          <>
            <textarea
              className="form-control mb-2"
              rows="2"
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
            ></textarea>
            <button
              className="btn btn-success btn-sm mx-1"
              onClick={() => handleUpdateComment(comment._id)}
            >
              Save
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => cancelEditComment()}
            >
              Cancel
            </button>
          </>
        ) : (
          <div>
            <div className="d-flex align-items-center mb-2">
              <img src="/images/pfp.jpeg" className="pfp" alt="Profile" />
              <div className="d-flex flex-column">
                <span className="fw-bold">{comment.userName}</span>
                <small style={{color: "grey", fontSize: "12px"}}>
                  {formatRelativeTime(comment.createdAt)}
                </small>
              </div>
            </div>

            <p className="card-text mx-5">{comment.content}</p>

            <div className="d-flex justify-content-between">
              <div onClick={() => handleReply(comment._id)} className='reply-btn'>Reply</div>
              {comment.userId === user._id && (
                <div>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => startEditComment(comment._id, comment.content)}
                  >
                    Edit
                  </button>
                </div>)}
            </div>

            {comment.replies && comment.replies.length > 0 && (
              <div className="replies-container mt-3">
                {comment.replies.map((reply) => renderComment(reply))}
              </div>
            )}

            {replyingTo === comment._id && (
              <div className="mt-3">
                <textarea
                  className="form-control mb-2"
                  rows="2"
                  value={replyText}
                  style={{backgroundColor: "rgba(255,255,255,0.07)", color: "white"}}
                  onChange={(e) => setReplyText(e.target.value)}
                ></textarea>
                <button
                  className="btn btn-success btn-sm mx-1"
                  onClick={handleAddReply}
                >
                  Reply
                </button>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={cancelReply}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );


  const renderComments = () => {
    if (event.comments && event.comments.length > 0) {
      return event.comments.slice().reverse().map((comment) => renderComment(comment));
    } else {
      return <h2 className="mt-3 mb-3 text-light"><FontAwesomeIcon icon={faComment} style={{fontSize: "40px"}} /> Be the first one to comment!</h2>;
    }
  };

  return (
    <div className="mt-5 w-75 comment-container">
      <h2 className="mb-3">Comments</h2>
      <div className="mb-3">
        <textarea
          className="comment-box"
          rows="3"
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleCommentChange}
        ></textarea>
      </div>
      <button className="btn btn-primary" style={{fontSize: "14px"}} onClick={handleAddComment}>
        Add Comment
      </button>

      {renderComments()}
    
    </div>
  );
};

export default Comment;
