import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Post = ({ postContent }) => {
    return <Fragment>{postContent}</Fragment>
};

Post.propTypes = {
    postContent: PropTypes.string,
};

export default Post;
