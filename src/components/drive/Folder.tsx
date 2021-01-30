import React from 'react';

interface FolderProps {
  folder: any;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  return <div>{folder.name}</div>;
};

export default Folder;
