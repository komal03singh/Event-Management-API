import { Router } from "express";
import {
  createEvent,
  getEvent,
  upcomingEvents,
  eventStats,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/createEvent", createEvent);
router.get("/getEvent", getEvent);
router.get("/upcomingEvents", upcomingEvents);
router.get("/eventStats/:id", eventStats);

export default router;
