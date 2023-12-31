import React from "react";

import styles from "./AddComment.module.scss";
import { useTranslation } from 'react-i18next';
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { useState } from "react";

import { createComment } from "../../redux/slices/commentSlice";
import { useParams } from "react-router-dom";

export const Index = () => {
 const dispatch = useDispatch();
 const params = useParams();
 const [ comment, setComment ] = useState('');

 const { t } = useTranslation();
 const handleSubmit = () => {

  try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
  } catch (err) {
      console.log(err)
  }
}
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src=""
        />
        <div className={styles.form} onSubmit={e => e.preventDefault()}>
          <TextField
            label={t('add_comment.write_comm')}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <Button 
          type="submit" 
          onClick={handleSubmit} 
          variant="contained"
          >
          {t('add_comment.send')}
          </Button>
        </div>
      </div>
    </>
  );
};
