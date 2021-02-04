import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FolderModel } from '../../models/interface.model';

interface FolderProps {
  folder: FolderModel | null | undefined;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  return (
    <Button
      to={{ pathname: `/folder/${folder!.id}`, state: { folder } }}
      variant='outline-dark'
      className='text.truncate w-100'
      as={Link}
    >
      <FontAwesomeIcon icon={faFolder} className='mr-2' />
      {folder!.name}
    </Button>
  );
};

export default Folder;
