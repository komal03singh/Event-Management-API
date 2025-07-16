import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { PrismaClient } from "../../generated/prisma/index.js";
import e from "express";

const prisma = new PrismaClient();

const registerForEvent = asyncHandler(async (req, res) => {
  const EId = parseInt(req.params.eventId);
  const { name, email } = req.body;

  const event = await prisma.Event.findUnique({
    where: { id: EId },
  });

  if (!event) {
    throw new ApiError(400, "Event does not Exist");
  }

  const isCapacityFull = await prisma.EventRegistration.count({
    where: { EId: Event.id },
  });

  if (isCapacityFull >= event.eventCapacity) {
    throw new ApiError(400, "Event Capacity Full");
  }

  const TodayDate = new Date();
  const EventDate = new Date(event.eventDate);

  if (TodayDate >= EventDate) {
    throw new ApiError(400, "Event has been expired");
  }

  const isRegistered = await prisma.EventRegistration.findFirst({
    where: {
      email,
      eventId: EId,
    },
  });

  if (isRegistered) {
    throw new ApiError(400, "User alerady Registerd");
  }

  const newRegistration = await prisma.EventRegistration.create({
    data: {
      name,
      email,
      eventId: EId,
    },
  });

  if (!newRegistration) {
    throw new ApiError(400, "Error in Registering User");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "User Registered Sucessfully!"));
});

const cancelRegistration = asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id);

  const deleteRegistration = await prisma.EventRegistration.delete({
    where: { id: userId },
  });

  if (!deleteRegistration) {
    throw new ApiError(400, "Error in Deleting Registerd User");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User Registration Deleted Successfully!"));
});

export { registerForEvent, cancelRegistration };
