import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
// import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = ({ searchValue }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';


  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    // eslint-disable-next-line
  }, []);
 
  return (
    <>
      <Tabs style={{ marginBottom: 15, color: '#23a6d5' }} value={0} aria-label="basic tabs example">
          <Tab label={t('home.label_new')} />
          {/* <Tab label={t('home.label_popular')}/> */}
      </Tabs>
      <Grid container spacing={4}>
      <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL || 'http://localhost:4444'}${obj.imageUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                likesCount={obj.likesCount}
                viewsCount={obj.viewsCount}
                commentsCount={0}
                tags={obj.tags} // eslint-disable-next-line
                isEditable={userData ?._id === obj.user._id}
              />
            ),
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
