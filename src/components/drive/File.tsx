import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FileModel } from '../../models/interface.model';

interface FileProps {
  file: FileModel;
}

const File: React.FC<FileProps> = ({ file }) => {
  return (
    <a
      href={file.url}
      target='_blank'
      className='btn btn-outline-dark text-truncate w-100'
      rel='noreferrer'
    >
      <FontAwesomeIcon icon={faFile} className='mr-2' />
      {file.name}
    </a>
  );
};

export default File;
