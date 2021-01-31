import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

interface AddFileButtonProps {
  currentFolder: any;
}

const AddFileButton: React.FC<AddFileButtonProps> = ({ currentFolder }) => {
  const handleUpload = (e: any) => {};

  return (
    <label className='btn btn-outline-success btn-sm m-0 mr-2'>
      <FontAwesomeIcon icon={faFileUpload} />
      <input
        type='file'
        onChange={handleUpload}
        style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
      />
    </label>
  );
};

export default AddFileButton;
