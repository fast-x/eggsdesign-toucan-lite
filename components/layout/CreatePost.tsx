import axios from 'axios';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { lighten } from 'polished';
import React, { CSSProperties, lazy, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
// import { ImageSquare, Plus, Trash } from '@phosphor-icons/react';
const ImageSquare = lazy(() =>
  import('@phosphor-icons/react').then((module) => ({
    default: module.ImageSquare,
  })),
);
const Plus = lazy(() =>
  import('@phosphor-icons/react').then((module) => ({
    default: module.Plus,
  })),
);
const Trash = lazy(() =>
  import('@phosphor-icons/react').then((module) => ({
    default: module.Trash,
  })),
);

import {
  DragDropContext,
  Draggable,
  DraggingStyle,
  DropResult,
  Droppable,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { ButtonColor, ButtonSize, ButtonVariant } from '../../@types';
import UploadImagesGrahic from '../../assest/visuals/UploadImagesGraphic';
import { ModalContext } from '../../contexts/ModalContext';
import { hiddenOnMobile } from '../../styles/styles';
import { colBlack, colMint, inputBorderRadius, screenWidthSmall, tokens } from '../../styles/variables';
import { TagByUser, User } from '../../types';
import Button from '../clickables/Button';
import ImageCarouselNav from '../clickables/ImageCarouselNav';
import ReactSelect from '../formElements/ReactSelect';
import TextArea from '../formElements/TextArea';
import TextInput from '../formElements/TextInput';
import ToucanLoader from '../info/ToucanLoader';
import ModalWrapper from './ModalWrapper';

type Props = {
  user: User;
  allTags?: TagByUser[];
  className?: string;
};
type FileWithPreview = {
  preview: string;
  name: string;
};
type FileWithPathAndPreview = FileWithPath & FileWithPreview;

// For React dropzone docs https://react-dropzone.js.org/#section-basic-example

const CreatePost: React.FC<Props> = ({ user, allTags, className }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string>('');
  const [previews, setPreviews] = useState<FileWithPathAndPreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [carouselActiveIndex, setCarouselActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const onMount = useCallback(() => {
    if (document && document.defaultView) {
      setWindowWidth(document.defaultView.innerWidth);
    }
    return () => previews.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [previews]);

  useEffect(() => {
    onMount();
  }, [onMount]);

  const removeFile = (file: FileWithPathAndPreview) => () => {
    const newPreviews = [...previews];
    newPreviews.splice(newPreviews.indexOf(file), 1);
    setPreviews(newPreviews);
  };

  const { toggleModal, open: modalIsOpen } = useContext(ModalContext);

  const { getRootProps, getInputProps, isFocused, isDragActive, isDragAccept, isDragReject, isFileDialogActive } =
    useDropzone({
      maxFiles: 8,
      onDrop: (acceptedFiles) => {
        setPreviews(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          ),
        );
        if (!modalIsOpen) {
          toggleModal();
        }
      },
    });
  const router = useRouter();

  function resetFormContent() {
    setTitle('');
    setDescription('');
    setTags('');
    setPreviews([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    if (!previews?.length || previews.length === 0) return;
    const formData: File[] = previews.map((preview) => preview as unknown as File);
    const postData = {
      title,
      description,
      tags,
      authorId: user._id,
      formData,
    };

    await axios
      .post(`/api/users/${user._id}/posts`, postData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        resetFormContent();
        toggleModal();
        setIsLoading(false);
        router.push('/');
        // TODO Hvordan kan jeg laste forsiden på nytt, og fremdeles vite at jeg nettopp har postet en post? Jeg vil at den posten skal bounce litt eller noe, men seff bare om den nettopp er lastet opp
      });
  }

  function reorder(list: FileWithPathAndPreview[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const items = reorder(previews, result.source.index, result.destination.index);
    setPreviews(items);
  }

  const onModalOpenStateChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen && (title.length > 0 || previews.length > 0)) {
        resetFormContent();
      }
    },
    [title, previews],
  );

  useEffect(() => {
    onModalOpenStateChange(modalIsOpen);
  }, [modalIsOpen, onModalOpenStateChange]);

  // Modal
  const renderUploadOptions = () => {
    return (
      <UploadOptionsWrapper>
        <DropzoneArea {...getRootProps({ isFocused })} className={dropzoneClassNames}>
          <UploadOptionsInnerWrapper>
            <input {...getInputProps()} />
            <UploadImagesGrahic />
            <p>Drop images here or</p>
            <Button color={ButtonColor.DARKBLUE} variant={ButtonVariant.SECONDARY}>
              <>Browse files</>
            </Button>
          </UploadOptionsInnerWrapper>
        </DropzoneArea>
      </UploadOptionsWrapper>
    );
  };

  const options = allTags?.map(function (row) {
    return { _id: row._id, value: row.slug, label: row.value };
  });

  const handleSelectTags = (mixedTags: { _id?: string | undefined; value: string; label: string }[]) => {
    const simpleTagsArray: React.SetStateAction<string[]> = [];
    mixedTags.map(function (item) {
      simpleTagsArray.push(item.label);
    });
    setTags(simpleTagsArray.toString());
  };

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: DraggingStyle | NotDraggingStyle | undefined,
    index: number,
  ) => {
    return {
      userSelect: 'none' as 'none',
      // change background colour if dragging
      background: isDragging ? 'lightgreen' : 'transparent',

      // styles we need to apply on draggables
      ...draggableStyle,
      left: isDragging ? `${(windowWidth - 1200) / 2 + index * 125}px` : 'auto',
      top: 'auto',
    };
  };

  const renderThumbs = () => {
    if (previews.length === 0) {
      return renderUploadOptions();
    }
    return (
      <>
        <PreviewImage>
          {carouselActiveIndex === 0 && (
            <CoverImageLabel>
              <ImageSquare size={16} weight="bold" />
              <>Cover image</>
            </CoverImageLabel>
          )}
          <Image
            src={previews[carouselActiveIndex].preview}
            alt={previews[carouselActiveIndex].name}
            objectFit="contain"
            layout="fill"
          />
        </PreviewImage>
        {previews.length > 0 && (
          <>
            <CustomImageCarouselNav
              className="preview-carousel"
              images={previews}
              imageIndex={carouselActiveIndex}
              setImageIndex={setCarouselActiveIndex}
              backgroundColor="#fff"
            />
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                  <div className="thumbs" ref={provided.innerRef} {...provided.droppableProps}>
                    {previews.map((item, index) => (
                      <Draggable key={item.preview} draggableId={`draggable_${item.path}`} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style, index)}
                            className="thumbnail">
                            <div className="image">
                              <Image src={item.preview} alt={item.name} objectFit="contain" layout="fill" />
                            </div>
                            <Button
                              icon
                              onClick={removeFile(item)}
                              className="remove-image"
                              title="Remove this image"
                              size={ButtonSize.SMALL}>
                              <Trash size={8} weight="bold" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </>
    );
  };
  const wrapperClassNames = classNames({
    [`is-file-dialog-active`]: isFileDialogActive,
    [`${className}`]: className,
  });

  // Might not need all these classes, but then we have them
  const dropzoneClassNames = classNames(
    {
      [`is-focused`]: isFocused,
      [`is-drag-accept`]: isDragAccept,
      [`is-drag-active`]: isDragActive,
      [`is-drag-reject`]: isDragReject,
      [`is-file-dialog-active`]: isFileDialogActive,
    },
    'dropzone-area',
  );

  const [showDropzone, setShowDropzone] = useState(false);
  const dropzoneRef = useRef(null);

  useEffect(() => {
    function handleWindowDragOver(event: { preventDefault: () => void }) {
      event.preventDefault();
      setShowDropzone(true);
    }

    function handleWindowDrop(event: { preventDefault: () => void }) {
      event.preventDefault();
      setShowDropzone(false);
    }

    function handleWindowLeave(event: { preventDefault: () => void }) {
      event.preventDefault();
      setShowDropzone(false);
    }

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('dragleave', handleWindowLeave);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('dragleave', handleWindowLeave);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  const dropzoneStyle: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(242, 243, 250, 0.9)',
    border: '4px solid',
    borderColor: tokens.colors.indigo[500].value,
    zIndex: 9999,
    transition: 'background .2s, border .2s',
  };

  return (
    <Wrapper className={wrapperClassNames}>
      <div className="header-actions">
        {showDropzone && (
          <DropzoneArea
            {...getRootProps({ isFocused })}
            className={dropzoneClassNames}
            ref={dropzoneRef}
            style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p>Drop files here</p>
          </DropzoneArea>
        )}
        <Button onClick={() => toggleModal()} className="trigger-form action-button">
          <>
            <Plus size={16} weight="bold" color={tokens.colors.white.value} />
            Create post
          </>
        </Button>
      </div>
      {user && (
        <ModalWrapper>
          <ModalContent>
            {isLoading ? (
              <ToucanLoader loadingText="Publishing post..." />
            ) : (
              <>
                <ModalTitle>Create new post</ModalTitle>
                <ModalInnerWrapper>
                  <ImagesWrapper>{previews.length > 0 ? renderThumbs() : renderUploadOptions()}</ImagesWrapper>
                  <FormWrapper>
                    <Form method="POST" action={`/api/posts/${user._id}`} onSubmit={handleSubmit}>
                      <div className="input-fields">
                        <TextInput
                          label="Title"
                          id="title"
                          required
                          placeholder="Give your post a title..."
                          value={title}
                          name="title"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextArea
                          label="Description"
                          placeholder="Write a short description of your post..."
                          id="description"
                          name="description"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          rows={7}
                        />
                        <ReactSelect
                          id="tags"
                          label="Tags"
                          options={options}
                          onChange={handleSelectTags}
                          placeholder="Add your tags here"
                        />
                      </div>

                      <Button
                        type="submit"
                        color={ButtonColor.INDIGO}
                        className="submit-post"
                        disabled={title.length < 5}>
                        Share post
                      </Button>
                    </Form>
                  </FormWrapper>
                </ModalInnerWrapper>
              </>
            )}
          </ModalContent>
        </ModalWrapper>
      )}
    </Wrapper>
  );
};

const ModalContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ModalInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
  width: 100%;
  min-height: calc(100vh - 15rem);
  max-width: 1200px;
  margin: 0 auto;
  @media (min-width: ${screenWidthSmall}) {
    flex-direction: unset;
    justify-content: space-between;
    min-height: 630px;
  }
`;

const ModalTitle = styled.h2`
  position: absolute;
  top: 1rem;
  left: 1rem;
`;

const UploadOptionsWrapper = styled.div`
  text-align: center;
  border: 1px dashed ${tokens.colors.indigo['500'].value};
  border-radius: 12px;
`;

const UploadOptionsInnerWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 600px;
`;

const CustomImageCarouselNav = styled(ImageCarouselNav)`
  border-radius: 0 0 8px 8px;
  position: relative;

  button {
    cursor: pointer;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: auto;

  @media (min-width: ${screenWidthSmall}) {
    width: calc(65% - 1rem);
  }

  .speech-bubble-in-modal {
    justify-content: center;
    gap: 2rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    font-weight: 600;
    color: ${colBlack};
  }

  .thumbs {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 1rem 0 0 0;

    h4 {
      height: 2rem;
      font-weight: 600;
    }
    .thumbnail {
      display: flex;
      align-items: center;
      width: 100px;

      .image {
        position: relative;
        width: 60px;
        height: 60px;
        border: 1px solid ${tokens.colors.indigo['300'].value};
        border-radius: ${inputBorderRadius};
        background-color: ${tokens.colors.indigo['100'].value};

        img {
          border-radius: ${inputBorderRadius};
        }
      }
    }
    @media (min-width: ${screenWidthSmall}) {
      height: calc(90px + 7rem);
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      gap: 2rem;
      flex-wrap: nowrap;

      .thumbnail {
        position: relative;
        width: auto;

        .image {
          width: 90px;
          height: 90px;
        }
        button {
          position: absolute;
          top: -0.5rem;
          right: -1.5rem;
        }
      }
    }
  }
`;

const FormWrapper = styled.div`
  flex: 1 1 auto;
`;

const PreviewImage = styled.div`
  position: relative;
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border: 1px solid ${tokens.colors.indigo['100'].value};
  background-color: ${tokens.colors.indigo['100'].value};
  border-radius: ${inputBorderRadius};
  img {
    display: block;
    width: 100%;
  }
  @media (min-width: ${screenWidthSmall}) {
    width: 100%;
    height: 27.55rem;
    max-height: calc(100% - 3.5rem);
  }
`;

const CoverImageLabel = styled.h4`
  position: absolute;
  top: 1em;
  left: 1em;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  line-height: 1;
  border-radius: 4px;
  background-color: #fff;
  z-index: 2;
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.4rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  .trigger-form {
    @media (max-width: 767px) {
      display: none;
    }
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .dropzone-area {
    ${hiddenOnMobile};
  }
`;

// TODO ta ut form i eget component
const Form = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
  .input-fields {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    input {
      width: 100%;
    }
  }
  label {
    input {
      display: block;
      padding: 0.5rem;
    }
  }
  .submit-post {
    align-self: flex-end;
    width: auto;
  }
`;

const DropzoneArea = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  &.is-drag-active {
    .speech-bubble,
    .speech-bubble-in-modal {
      background: ${lighten(0.1, colMint)};
      color: ${colBlack};
      &:after {
        border-color: transparent ${lighten(0.1, colMint)} transparent transparent;
      }
    }
  }
`;

export default CreatePost;
