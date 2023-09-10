import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import axios from '../axios.js';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const {id} = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading}/>;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL || 'http://localhost:4444'}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        comments={[
          {
            user: {
              fullName: "test",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "test1",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "test",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
