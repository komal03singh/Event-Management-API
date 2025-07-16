-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventLocation" TEXT NOT NULL,
    "eventCapacity" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRegistration" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_email_key" ON "EventRegistration"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventRegistration_email_eventId_key" ON "EventRegistration"("email", "eventId");

-- AddForeignKey
ALTER TABLE "EventRegistration" ADD CONSTRAINT "EventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
