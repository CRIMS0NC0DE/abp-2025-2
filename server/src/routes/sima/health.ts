import {Router, Request, Response} from 'express';

const router = Router();

// GET
router.get('/health', (req: Request, res: Response) => {
    res.status(200).json({mensagem: 'GET funcionando!'});
});

export default router;