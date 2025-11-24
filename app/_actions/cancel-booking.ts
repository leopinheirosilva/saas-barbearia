"use server";

// Imports
import { actionClient } from "@/lib/action-client";
import { returnValidationErrors } from "next-safe-action";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

const inputSchema = z.object({
  // Define o esquema de entrada
  bookingId: z.string().uuid(),
});

export const cancelBooking = actionClient // Define a ação do lado do servidor
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { bookingId } }) => {
    // Lógica da ação
    const session = await auth.api.getSession({
      // Obtém a sessão do usuário
      headers: await headers(),
    });
    if (!session?.user) {
      // Verifica se o usuário está autenticado
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }

    const booking = await prisma.booking.findUnique({
      // Busca o agendamento no banco de dados
      where: {
        id: bookingId,
      },
    });
    if (!booking) {
      // Verifica se o agendamento existe ou nao
      returnValidationErrors(inputSchema, {
        _errors: ["Booking not found"],
      });
    }
    if (booking.userId !== session.user.id) {
      // Verifica se o agendamento pertence ao usuário autenticado
      returnValidationErrors(inputSchema, {
        _errors: ["Unauthorized"],
      });
    }

    const now = new Date(); // Obtém a data atual
    if (booking.date < now) {
      // Verifica se o agendamento é passado
      returnValidationErrors(inputSchema, {
        _errors: ["Cannot cancel past bookings"],
      });
    }

    await prisma.booking.delete({
      // Deleta o agendamento do banco de dados
      where: {
        id: bookingId,
      },
    });

    return { id: bookingId };
  });
