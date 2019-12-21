import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  const onTextChange = event => setText(event.target.value);

  const onSubmit = event => {
    event.preventDefault();
    addComment(postId, { text });
    setText('');
  };

  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Leave a Comment</h3>
      </div>
      <form className='form my-1' onSubmit={onSubmit}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Write your comment'
          value={text}
          onChange={onTextChange}
          required
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
