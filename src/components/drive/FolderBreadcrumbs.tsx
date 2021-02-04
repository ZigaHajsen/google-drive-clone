import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { FolderModel } from '../../models/interface.model';

interface FolderBreadcrumbsProps {
  currentFolder: FolderModel | null | undefined;
}

const FolderBreadcrumbs: React.FC<FolderBreadcrumbsProps> = ({
  currentFolder,
}) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];

  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <Breadcrumb
      className='flex-grow-1'
      listProps={{ className: 'bg-white pl-0 m-0' }}
    >
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : '/',
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className='text-truncate d-inline-block'
          style={{ maxWidth: '150px' }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className='text-truncate d-inline-block'
          active
          style={{ maxWidth: '200px' }}
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default FolderBreadcrumbs;
