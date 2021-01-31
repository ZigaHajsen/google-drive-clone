import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

interface FolderBreadcrumbsProps {
  currentFolder: any;
}

const FolderBreadcrumbs: React.FC<FolderBreadcrumbsProps> = ({
  currentFolder,
}) => {
  return (
    <Breadcrumb
      className='flex-grow-1'
      listProps={{ className: 'bg-white pl-0 m-0' }}
    >
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
