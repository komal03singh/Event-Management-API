import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
import * as z from "zod";

const prisma = new PrismaClient();

const validateCapacity = z.object({
  eventCapacity: z
    .number()
    .positive({ message: "Capacity should be a positive number" })
    .lte(1000, { message: "Capacity can not be greater than 1000" }),
});

const createEvent = asyncHandler(async (req, res) => {
  const { eventTitle, eventDate, eventLocation, eventCapacity } = req.body;

  const validation = validateCapacity.safeParse({ eventCapacity });
  if (!validation.success) {
    const valError = validation.error.issues.map((err) => err.message);
    throw new ApiError(400, valError);
  }

  const newEvent = await prisma.Event.create({
    data: {
      eventTitle,
      eventDate: new Date(eventDate),
      eventLocation,
      eventCapacity,
    },
  });

  if (!newEvent) {
    throw new ApiError(400, "Error in Creating Event");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, "Event Created Successfully!", { id: newEvent.id })
    );
});

const getEvent = asyncHandler(async (req, res) => {
  const allEvents = await prisma.Event.findMany({
    include: {
      eventRegistrations: true,
    },
  });

  if (!allEvents) {
    throw new ApiError(400, "Error in fecthing Events from Database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "All Events fetched successfully", allEvents));
});

const upcomingEvents = asyncHandler(async (req, res) => {
  const todayDate = new Date();

  const allUpcomingEvents = await prisma.Event.findMany({
    where: {
      eventDate: {
        gte: todayDate,
      },
    },
  });

  if (!allUpcomingEvents) {
    throw new ApiError(400, "Error in fecthing Events from Database");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Upcoming Events fetched successfully",
        allUpcomingEvents
      )
    );
});

const eventStats = asyncHandler(async (req, res) => {
  const eventId = parseInt(req.params.id);

  const event = await prisma.Event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new ApiError(400, "Event does not Exist");
  }

  const totalRegistered = await prisma.EventRegistration.count({
    where: { eventId: event.id },
  });

  if (totalRegistered === null) {
    throw new ApiError(400, "No Registration Found");
  }

  const remainingCapacity = event.eventCapacity - totalRegistered;
  const percentageCapacity = (totalRegistered / event.eventCapacity) * 100;

  return res.status(200).json(
    new ApiResponse(200, "Event Stats Fetched Successfully!", {
      totalRegistered,
      remainingCapacity,
      percentageCapacity,
    })
  );
});

export { createEvent, getEvent, upcomingEvents, eventStats };
