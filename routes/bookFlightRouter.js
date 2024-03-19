import express from 'express';
import bookFlightController from '../controller/bookFlightController.js';
const router = express.Router();
router.post(`/add`, bookFlightController.add);
router.get(`/:id`, bookFlightController.single);
router.get(`/`, bookFlightController.list);
router.put(`/:id`, bookFlightController.update);
router.post(`/dummy/import-record`, bookFlightController.importData);
router.delete(`/dummy/clear-record`, bookFlightController.clearData);
router.get(`/tag/:id`, bookFlightController.findTag);

export default router;
