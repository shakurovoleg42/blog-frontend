import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import axios from '../axios.js';
import { useTranslation } from 'react-i18next';
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const FullPost = () => {
  const { t } = useTranslation();
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
        console.warn(err); // 'Ошибка при получении статьи' ниже алерт t('full_post.error')
        toast.info(t('full_post.error'), {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          })
      });// eslint-disable-next-line
  }, [id]);

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
        commentsCount={0}
        tags={data.tags}
        isFullPost
      >
      <ReactMarkdown children={data.text} />
      <ToastContainer/>
      </Post>
      <CommentsBlock
        items={[
          
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
