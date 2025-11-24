"use server";

// Imports
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const getUserBookings = async () => {
  // Lógica da ação
  const session = await auth.api.getSession({
    // Obtém a sessão do usuário
    headers: await headers(),
  });

  if (!session?.user) {
    // Verifica se o usuário está autenticado
    return {
      confirmedBookings: [],
      finalizedBookings: [],
    };
  }

  const bookings = await prisma.booking.findMany({
    // Busca os agendamentos do usuário no banco de dados
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

  const now = new Date(); // Data atual para comparação

  const confirmedBookings = bookings.filter(
    // Filtra os agendamentos confirmados
    (booking) => booking.date > now && !booking.cancelled,
  );

  const finalizedBookings = bookings.filter(
    // Filtra os agendamentos finalizados
    (booking) => booking.date <= now || booking.cancelled,
  );

  return {
    confirmedBookings,
    finalizedBookings,
  };
};
