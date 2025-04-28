import { Elysia } from 'elysia';
import { FolderController } from '../../controllers/folder.controller';

const Routes = new Elysia({ prefix: '/v1/folders' })
  .post('/', FolderController.createFolder)
  .put('/', FolderController.updateFolderName)
  .delete('/:id', FolderController.deleteFolder)
  .get('/parents', FolderController.getAllParentFolders)
  .get('/childs/:parentId', FolderController.getSubFolders)

export default Routes;