import { Router } from 'https://deno.land/x/oak/mod.ts'
import { welcome, getAllLights , getLight , createLight , updateLight , deleteLight } from '../controllers/controlLight.ts';

const router = new Router();

router.get('/', welcome);
router.get('/lights', getAllLights);
router.get('/lights/:id', getLight);
router.post('light', createLight);
router.put('/lights/:id', updateLight);
router.delete('/lights/:id', deleteLight);

export default router;