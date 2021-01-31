import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useFolder } from '../../hooks/useFolder';
import { Navbar, AddFolderButton, Folder, FolderBreadcrumbs } from '../drive';

const Dashboard: React.FC = () => {
  // @ts-ignore
  const { folderId } = useParams();
  // @ts-ignore
  const { folder, childFolders } = useFolder(folderId);

  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <div className='d-flex align-items-center'>
          <FolderBreadcrumbs currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>
        {childFolders.length > 0 && (
          <div className='d-flex flex-wrap'>
            {childFolders.map((childFolder: any) => {
              return (
                <div
                  key={childFolder.id}
                  style={{ maxWidth: '250px' }}
                  className='p-2'
                >
                  <Folder folder={childFolder} />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </Fragment>
  );
};

export default Dashboard;
