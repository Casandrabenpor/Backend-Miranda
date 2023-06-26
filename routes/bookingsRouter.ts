import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Fetching');
});

router.post('/', (req, res) => {
  res.send('saving');
});
export default router;
