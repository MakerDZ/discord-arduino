import { Router } from 'https://deno.land/x/oak/mod.ts'
import { welcome, testEndpoint, getLightCount, getAllLights , getLight , createLight , updateLight , deleteLight } from '../controllers/controlLight.ts';
import apiAuth from '../middlewares/apiAuth.ts';

const router = new Router();

router.get('/', welcome);
router.get('/api/v1', apiAuth, testEndpoint);
router.get('/api/v1/lightcount', apiAuth , getLightCount)
router.get('/api/v1/lights', apiAuth, getAllLights);
router.get('/api/v1/getlight/:id', apiAuth, getLight);
router.post('/api/v1/createlight', apiAuth, createLight);
router.put('/api/v1/updatelight/:id', apiAuth, updateLight);
router.delete('/api/v1/deletelight', apiAuth, deleteLight);

export default router;