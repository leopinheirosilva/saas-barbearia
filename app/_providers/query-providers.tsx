"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient(); // Cria uma instância do QueryClient

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // Fornece o QueryClient para a aplicação
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
