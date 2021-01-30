import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { useFolder } from '../../hooks/useFolder';
import { Navbar, AddFolderButton, Folder } from '../drive';

const Dashboard: React.FC = () => {
  // @ts-ignore
  const { folder, childFolders } = useFolder('N4D2J17KE0JBTp2LFycD');
  console.log(childFolders);

  return (
    <Fragment>
      <Navbar />
      <Container fluid>
        <AddFolderButton currentFolder={folder} />
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
