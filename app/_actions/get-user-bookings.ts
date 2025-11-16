"use server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const getUserBookings = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      confirmedBookings: [],
      finalizedBookings: [],
    };
  }

  const bookings = await prisma.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      service: true,
      barbershop: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const now = new Date();

  const confirmedBookings = bookings.filter(
    (booking) => booking.date > now && !booking.cancelled
  );

  const finalizedBookings = bookings.filter(
    (booking) => booking.date <= now || booking.cancelled
  );

  return {
    confirmedBookings,
    finalizedBookings,
  };
};
