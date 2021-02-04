import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidV4 } from 'uuid';
import { ProgressBar, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { storage, database } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { FolderModel } from '../../models/interface.model';

interface AddFileButtonProps {
  currentFolder: FolderModel | null | undefined;
}

const AddFileButton: React.FC<AddFileButtonProps> = ({ currentFolder }) => {
  const [uploadingFiles, setUploadingFiles] = useState<any>([]);
  // @ts-ignore
  const { currentUser } = useAuth();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    if (currentFolder === null || file === null) return;

    const id = uuidV4();

    setUploadingFiles((prevUploadingFiles: any) => [
      ...prevUploadingFiles,
      {
        id,
        name: file.name,
        progress: 0,
        error: false,
      },
    ]);

    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder!.path.join('/')}/${currentFolder!.name}/${
            file.name
          }`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUploadingFiles((prevUploadingFiles: any) => {
          return prevUploadingFiles.map((uploadFile: any) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress };
            }

            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles: any) => {
          return prevUploadingFiles.map((uploadFile: any) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true };
            }
            return uploadFile;
          });
        });
      },
      () => {
        setUploadingFiles((prevUploadingFiles: any) => {
          return prevUploadingFiles.filter((uploadFile: any) => {
            return uploadFile.id !== id;
          });
        });

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where('name', '==', file.name)
            .where('userId', '==', currentUser.uid)
            .where('folderId', '==', currentFolder!.id)
            .get()
            .then((existingFiles: any) => {
              const existingFile = existingFiles.docs[0];

              if (existingFile) {
                existingFile.ref.update({ url });
              } else {
                database.files.add({
                  url,
                  name: file.name,
                  createdAt: database.getCurrentTimeStamp(),
                  folderId: currentFolder!.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  };

  return (
    <Fragment>
      <label className='btn btn-outline-success btn-sm m-0 mr-2'>
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type='file'
          onChange={handleUpload}
          style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              maxWidth: ' 250px',
            }}
          >
            {uploadingFiles.map((file: any) => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles((prevUploadingFiles: any) => {
                    return prevUploadingFiles.filter((uploadFile: any) => {
                      return uploadFile.id !== file.id;
                    });
                  });
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className='text-truncate w-100 d-block'
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    variant={file.error ? 'danger' : 'primary'}
                    animated={!file.error}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? 'Error'
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </Fragment>
  );
};

export default AddFileButton;
