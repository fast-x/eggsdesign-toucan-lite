import styled from 'styled-components';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import SpeechBubble from './SpeechBubble';
import ToucanLogo from '../assest/visuals/ToucanLogo';

type Props = {
  className?: string;
};

const DropTest: React.FC<Props> = ({ className }: Props) => {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
  } = useDropzone({
    maxFiles: 2,
  });

  const acceptedFileItems = acceptedFiles.map((file) => <li key={file.name}>{file.name}</li>);

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.name}>
        {file.name}
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    );
  });

  const dropzoneClassNames = classNames({
    [`is-focused`]: isFocused,
    [`is-drag-accept`]: isDragAccept,
    [`is-drag-active`]: isDragActive,
    [`is-drag-reject`]: isDragReject,
    [`is-file-dialog-active`]: isFileDialogActive,
  });

  return (
    <div className={className}>
      <DropzoneArea {...getRootProps({ isFocused })} className={dropzoneClassNames}>
        <ToucanLogo />
        <SpeechBubble className="speech-bubble">
          <>
            <input {...getInputProps()} />
            <p>Drag and drop your stuff here!</p>
          </>
        </SpeechBubble>
      </DropzoneArea>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </div>
  );
};

const DropzoneArea = styled.div`
  display: flex;
  gap: 1rem;

  > svg {
    width: 48px;
  }
  .speech-bubble {
    max-width: 280px;
  }
  &.is-focused {
  }
  &.is-drag-active {
    border-color: dodgerblue;
  }
  &.is-drag-reject {
    border-color: crimson;
  }
`;

export default DropTest;
