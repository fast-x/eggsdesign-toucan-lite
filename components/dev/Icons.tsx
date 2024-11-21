import React from 'react';
import type { NextPage } from 'next';
import Calendar from '../../assest/icons/calendar.svg';
import Checkmark from '../../assest/icons/checkmark.svg';
import ChevronRight from '../../assest/icons/chevron_right.svg';
import Circle from '../../assest/icons/circle.svg';
import Close from '../../assest/icons/close.svg';
import Delete from '../../assest/icons/delete.svg';
import DottedSquare from '../../assest/icons/dotted_square.svg';
import Enlarge from '../../assest/icons/enlarge.svg';
import Filter from '../../assest/icons/filter.svg';
import Hamburger from '../../assest/icons/hamburger.svg';
import Heart from '../../assest/icons/heart.svg';
import ImageIcon from '../../assest/icons/image.svg';
import Images from '../../assest/icons/images.svg';
import Paragraph from '../../assest/icons/paragraph.svg';
import Plus from '../../assest/icons/plus.svg';
import PlusCircle from '../../assest/icons/plus_circle.svg';
import Profile from '../../assest/icons/profile.svg';
import ThumbsUp from '../../assest/icons/thumbs_up.svg';
import UploadImage from '../../assest/icons/upload_image.svg';
import Refresh from '../../assest/icons/refresh.svg';
import styled from 'styled-components';
import { colBlack } from '../../styles/variables';

const DevIcons: NextPage = () => {
  return (
    <Wrapper>
      <h2>Icons</h2>
      <div>
        <div>
          <Calendar />
          <span>Calendar</span>
        </div>
        <div>
          <Checkmark />
          <span>Checkmark</span>
        </div>
        <div>
          <ChevronRight />
          <span>Chevron right</span>
        </div>
        <div>
          <Circle />
          <span>Circle</span>
        </div>
        <div>
          <Close />
          <span>Close</span>
        </div>
        <div>
          <Delete />
          <span>Delete</span>
        </div>
        <div>
          <DottedSquare />
          <span>Dotted square</span>
        </div>
        <div>
          <Enlarge />
          <span>Enlarge</span>
        </div>
        <div>
          <Filter />
          <span>Filter</span>
        </div>
        <div>
          <Hamburger />
          <span>Hamburger</span>
        </div>
        <div>
          <Heart />
          <span>Heart</span>
        </div>
        <div>
          <ImageIcon />
        </div>
        <div>
          <Images />
          <span>Images</span>
        </div>
        <div>
          <UploadImage />
          <span>Upload image</span>
        </div>
        <div>
          <Paragraph />
          <span>Paragraph</span>
        </div>
        <div>
          <Plus />
          <span>Plus</span>
        </div>
        <div>
          <PlusCircle />
          <span>Plus circle</span>
        </div>
        <div>
          <Profile />
          <span>Profile</span>
        </div>
        <div>
          <Refresh />
          <span>Refresh</span>
        </div>
        <div>
          <ThumbsUp />
          <span>Thumbs up</span>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 3rem 0;
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 3rem 1rem;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      width: 120px;
    }
    svg {
      width: 20px;
      path {
        fill: ${colBlack};
      }
    }
  }
`;

export default DevIcons;
