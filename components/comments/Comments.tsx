import React, { useState } from 'react';
import { Comment as CommentType, User } from '../../types';
import Comment from './Comment';
import TextArea from '../formElements/TextArea';
import axios from 'axios';
import Avatar from '../Avatar';
import styled from 'styled-components';
import { screenWidthLarge, tokens } from '../../styles/variables';
import LoadingSpinnerRing from '../info/LoadingSpinnerRing';
import Button from '../clickables/Button';
import { ButtonSize } from '../../@types';

type Props = {
  postId: string;
  initialList: CommentType[];
  user: User;
};

const Comments = ({ postId, initialList, user }: Props) => {
  const [inputHasFocus, setInputHasFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [list, setList] = useState<CommentType[]>(initialList);

  function handleInputBlur(event: React.FocusEvent<HTMLTextAreaElement>) {
    if (
      event.relatedTarget &&
      event.relatedTarget.tagName === 'BUTTON' &&
      (event.relatedTarget as HTMLButtonElement).type &&
      (event.relatedTarget as HTMLButtonElement).type === 'submit'
    ) {
      handleSubmit();
    }
    setInputHasFocus(false);
  }
  async function handleSubmit(e?: React.FormEvent) {
    if (e) {
      e.preventDefault();
    }
    setIsLoading(true);
    const commentText = JSON.parse(JSON.stringify(inputValue));
    const data = {
      userId: user._id,
      commentText: commentText,
    };
    setInputValue('');
    await axios
      .post(`/api/posts/${postId}`, data)
      .then((res) => {
        if (res && res.data && res.data.comment) {
          const commentCopy = JSON.parse(JSON.stringify(res.data.comment));
          commentCopy.author = user;
          const listCopy = JSON.parse(JSON.stringify(list));
          listCopy.push(commentCopy);
          setList(listCopy);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function handleDelete(key: string) {
    await axios
      .delete(`/api/posts/${postId}/comments/${key}`)
      .then((res) => {
        console.log(res);
        if (res && res.data) {
          const commentsCopy = JSON.parse(JSON.stringify(list));
          const deletedCommentIndex = commentsCopy.findIndex((item: CommentType) => item._key === key);
          console.log(deletedCommentIndex);
          if (deletedCommentIndex >= 0) {
            commentsCopy.splice(deletedCommentIndex, 1);
          }
          setList(commentsCopy);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section>
      <SectionTitle>Comments</SectionTitle>
      <Form method="POST" action={`/api/posts/${postId}`} onSubmit={handleSubmit}>
        {!isLoading ? <Avatar className="avatar" size={40} image={user.image} /> : <LoadingSpinnerRing />}
        <CommentInput
          placeholder={isLoading ? 'Posting comment - please wait' : 'Share your thoughts ...'}
          hideLabel
          label="Comment text"
          value={inputValue}
          rows={inputHasFocus ? 5 : 1}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setInputHasFocus(true)}
          onBlur={handleInputBlur}
        />
        {inputValue.length > 0 && (
          <Button type="submit" size={ButtonSize.SMALL}>
            Publish
          </Button>
        )}
      </Form>
      <CommentsList inputExpanded={inputHasFocus}>
        {list
          .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
          .map((item, index) => (
            <Comment key={`commentKey_${index}`} {...item} onDelete={() => handleDelete(String(item._key))} />
          ))}
      </CommentsList>
    </section>
  );
};

export default Comments;

const Form = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin: 1rem 0;
  padding: 0.75rem 1rem 1.25rem 0;
  position: relative;

  input {
    margin-bottom: 0;
  }

  button {
    position: absolute;
    bottom: 1.75rem;
    right: 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${tokens.colors.indigo['600'].value};
  margin-top: 1.5rem;
`;

const CommentsList = styled.ul<{ inputExpanded: boolean }>`
  list-style-type: none;
  padding: 0;
`;

const CommentInput = styled(TextArea)`
  margin: 0;
`;
