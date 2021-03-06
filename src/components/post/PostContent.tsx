import React, { useState } from 'react';
import { Post } from '../../lib/api/post';
import dompurify from 'dompurify';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { AiOutlineSmile, AiFillSmile, AiOutlineLink } from 'react-icons/ai';

interface PostContentProps {
  post: Post;
}

function PostContent({ post }: PostContentProps) {
  const { postImg, postContent, likes } = post;
  const [like, setLike] = useState<boolean>(false);
  const [likeNumber, setLikeNumber] = useState<number>(likes);
  const sanitizer = dompurify.sanitize;
  const onClickLike = () => {
    setLike(true);
    setLikeNumber(Number(likeNumber) + 1);
    if (like) {
      setLike(false);
      setLikeNumber(likes);
    }
  };

  return (
    <Wrapper>
      <ThumbnailImg src={postImg} />
      <Content dangerouslySetInnerHTML={{ __html: sanitizer(postContent) }} />
      <PostInfo>
        <Likes onClick={onClickLike}>
          {like ? <AiFillSmile /> : <AiOutlineSmile />}{' '}
          <span>{likeNumber}</span>
        </Likes>
        <AiOutlineLink />
      </PostInfo>
      <hr style={{ margin: '1.5rem 0' }} />
    </Wrapper>
  );
}

export default PostContent;

const Wrapper = styled.div`
  margin-top: 3rem;
`;
const ThumbnailImg = styled.img`
  width: 100%;
  height: inherit;
  object-fit: contain;
`;
const Content = styled.div`
  margin-top: 2rem;
  line-height: 1.5rem;
  font-size: ${theme.fontSizes.default};
`;
const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  font-size: 1.5rem;
  font-weight: lighter;
  color: ${theme.palette.gray7};
`;
const Likes = styled.div`
  display: flex;
  align-items: center;
  span {
    margin-left: 0.25rem;
    font-size: ${theme.fontSizes.default};
    font-weight: normal;
  }
`;
