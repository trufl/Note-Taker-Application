const router = require('express').Router();
const apiNotes = require('./apiRoutes')
const htmlRoutes = require('./htmlRoutes');

router.use('/api', apiNotes)
router.use('/', htmlRoutes);

module.exports = router;