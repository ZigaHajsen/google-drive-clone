export interface FolderModel {
  id: string | null;
  name: string;
  path: [] | never[];
}

export interface FileModel {
  id: string;
  folderId: string;
  name: string;
  url: string;
  userId: string;
}
