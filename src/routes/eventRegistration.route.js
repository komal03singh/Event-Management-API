import { Router } from "express";
import {
  registerForEvent,
  cancelRegistration,
} from "../controllers/userRegistration.controller.js";

const router = Router();

router.post("/registerForEvent/:eventId", registerForEvent);
router.delete("/cancelRegistration/:id", cancelRegistration);

export default router;
