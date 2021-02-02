import { useReducer, useEffect } from 'react';
import { database } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
interface ReducerState {
  folderId?: string | null;
  folder?:
    | {
        id: string | null;
        name: string;
        path: [] | never[];
      }
    | null
    | undefined;
  childFolders?: string[];
  childFiles?: string[];
}

const ACTIONS = {
  SELECT_FOLDER: 'SELECT_FOLDER',
  UPDATE_FOLDER: 'UPDATE_FOLDER',
  SET_CHILD_FOLDERS: 'SET_CHILD_FOLDERS',
  SET_CHILD_FILES: 'SET_CHILD_FILES',
};

export const ROOT_FOLDER = {
  name: 'Root',
  id: null,
  path: [],
};

const reducer = (
  state: ReducerState,
  { type, payload }: { type: string; payload: ReducerState }
) => {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
};

export const useFolder = (folderId = null, folder = null) => {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  // @ts-ignore
  const { currentUser } = useAuth();

  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
  }, [folderId, folder]);

  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    database.folders
      // @ts-ignore
      .doc(folderId)
      .get()
      .then((doc) => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: database.formatDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return database.folders
      .where('parentId', '==', folderId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currentUser]);

  useEffect(() => {
    return database.files
      .where('folderId', '==', folderId)
      .where('userId', '==', currentUser.uid)
      .orderBy('createdAt')
      .onSnapshot((snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        });
      });
  }, [folderId, currentUser]);

  return state;
};
