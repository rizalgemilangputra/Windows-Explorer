import { Elysia } from 'elysia';
import { FileController } from '../../controllers/file.controller';

const Routes = new Elysia({ prefix: '/v1/files' })
    .post('/', FileController.storeFile)
    .get('/:folderId', FileController.getFilesByFolderId)

export default Routes;