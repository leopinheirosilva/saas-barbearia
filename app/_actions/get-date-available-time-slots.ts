"use server";

import { actionClient } from "@/lib/action-client";
import { prisma } from "@/lib/prisma";
import z from "zod";
import { endOfDay, format, startOfDay } from "date-fns"; // Biblioteca do shadcn presente no componente Calendar
import { headers } from "next/headers";
import { returnValidationErrors } from "next-safe-action";
import { auth } from "@/lib/auth";

const inputSchema = z.object({
  barbershopId: z.string(),
  date: z.coerce.date(),
});

const TIME_SLOTS = Array.from({ length: 19 }, (_, i) => {
  const hours = Math.floor(i / 2) + 9;
  const minutes = (i % 2) * 30;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

export const getDateAvailableTimeSlots = actionClient
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { barbershopId, date } }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }
    const bookings = await prisma.booking.findMany({
      where: {
        barbershopId,
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
      },
    });
    const occupiedSlots = bookings.map((booking) =>
      format(booking.date, "HH:mm"),
    );
    const availableTimeSlots = TIME_SLOTS.filter(
      (slot) => !occupiedSlots.includes(slot),
    );
    return availableTimeSlots;
  });
