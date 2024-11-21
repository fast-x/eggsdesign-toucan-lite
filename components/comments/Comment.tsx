import React, { useContext, useState } from 'react';
import { Comment as IComment, Ref, User } from '../../types';
import { getDateDiff } from '../../scripts/helpers';
import styled from 'styled-components';
import Avatar from '../Avatar';
import { tokens } from '../../styles/variables';
import AuthContext from '../../contexts/AuthContext';
import { Trash } from '@phosphor-icons/react';
import Button from '../clickables/Button';
import { ButtonColor, ButtonSize, ButtonVariant } from '../../@types';
import LoadingSpinnerRing from '../info/LoadingSpinnerRing';

type CommentType = IComment & {
  onDelete: () => void;
};

const Comment = ({ text, author, createdAt, onDelete }: CommentType) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dateNow = new Date();
  const dateDiff = Math.abs(getDateDiff(dateNow.toISOString(), createdAt));
  const { user } = useContext(AuthContext);

  const renderDaysText = () => {
    if (dateDiff === 0) {
      return 'Today';
    }
    return `${dateDiff} day${dateDiff > 1 ? 's' : ''} ago`;
  };

  return (
    <Wrapper>
      <AvaWrapper>
        <Avatar className="avatar" size={40} image={(author as Ref<User>).image} />
      </AvaWrapper>
      <TextWrapper>
        <AuthorName>
          {(author as Ref<User>).firstName} {(author as Ref<User>).lastName}
        </AuthorName>
        <CommentText>{text}</CommentText>
        <DaysAgo>{renderDaysText()}</DaysAgo>
      </TextWrapper>
      {user && (author as Ref<User>)._id && user._id === (author as Ref<User>)._id && (
        <Button
          icon
          onClick={() => {
            setIsDeleting(true);
            onDelete();
          }}
          className="delete-btn"
          color={ButtonColor.INDIGO}
          variant={ButtonVariant.SECONDARY}
          title="Delete this comment"
          size={ButtonSize.SMALL}>
          {!isDeleting ? <Trash size={16} weight="bold" /> : <LoadingSpinnerRing />}
        </Button>
      )}
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.li`
  margin: 0 0 1.5rem 0;
  display: flex;
  padding: 0;
  position: relative;
  .delete-btn {
    border: none;
    margin-left: auto;
    color: ${tokens.colors.indigo['900'].value};
    position: absolute;
    right: 0;
  }
`;

const AvaWrapper = styled.div`
  width: 48px;
  margin-right: 1rem;
`;

const TextWrapper = styled.div`
  p {
    margin: 0 0 0.15rem 0;
  }
`;

const AuthorName = styled.p`
  font-size: 0.875rem;
  color: ${tokens.colors.indigo['800'].value};
`;

const CommentText = styled.p`
  font-size: 1rem;
  max-width: 275px;
  font-weight: 400;
  color: ${tokens.colors.indigo['900'].value};
`;

const DaysAgo = styled.p`
  font-size: 0.875rem;
  color: #767676;
`;
