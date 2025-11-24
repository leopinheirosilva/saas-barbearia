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
  serviceId: z.string().uuid(),
  date: z.date(),
});

export const createBooking = actionClient // Define a ação do lado do servidor
  .inputSchema(inputSchema)
  .action(async ({ parsedInput: { serviceId, date } }) => {
    // Lógica da ação
    const session = await auth.api.getSession({
      // Obtém a sessão do usuário
      headers: await headers(),
    });
    if (!session?.user) {
      returnValidationErrors(inputSchema, {
        // Verifica se o usuário está autenticado
        _errors: ["Unauthorized"],
      });
    }
    
    const service = await prisma.barbershopService.findUnique({
      // Busca o serviço no banco de dados
      where: {
        id: serviceId,
      },
    });
    if (!service) {
      // Verifica se o serviço existe ou não
      returnValidationErrors(inputSchema, {
        _errors: ["Service not found"],
      });
    }

    const existingBooking = await prisma.booking.findFirst({
      where: {
        barbershopId: service.barbeshopId,
        date,
      },
    });
    if (existingBooking) {
      // Verifica se já existe agendamento para essa data
      console.error("Já existe um agendamento para essa data.");
      returnValidationErrors(inputSchema, {
        _errors: ["Já existe um agendamento para essa data"],
      });
    }

    const booking = await prisma.booking.create({
      // Cria o agendamento
      data: {
        serviceId,
        date,
        userId: session.user.id,
        barbershopId: service.barbeshopId,
      },
    });

    return booking;
  });
