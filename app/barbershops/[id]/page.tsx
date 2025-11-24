// Imports
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation"; // error 404 page
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";
import Footer from "@/app/_components/footer";

const BarbershopPage = async (props: { params: { id: string } }) => {
  const { id } = await props.params; // Obtém o ID da barbearia a partir dos parâmetros da rota
  const barbershop = await prisma.barbershop.findUnique(
    // Busca a barbearia pelo ID
    {
      where: {
        id,
      },
      include: {
        services: true,
      },
    },
  );
  if (!barbershop) {
    // Se o ID da barbearia nao for encontrado, retorna mensagem de erro 404
    return notFound();
  }
  return (
    <main>
      <div className="flex size-full flex-col items-start overflow-clip">
        <div className="relative h-[297px] w-full">
          {/* Imagem da Barbearia */}
          <div className="absolute top-0 left-0 h-full w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Botão Voltar */}
          <div className="absolute top-0 left-0 flex w-full items-baseline gap-[91px] p-3">
            <Button
              size="icon"
              variant="secondary"
              className="overflow-clip rounded-full bg-gray-300 opacity-60"
              asChild
            >
              <Link href="/">
                <ChevronLeft className="size-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Informações da Barbearia */}
        <div className="flex w-full items-center gap-1.5 px-5 pt-6 pb-0">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-start gap-1.5">
              <div className="relative size-[30px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-foreground text-2xl font-bold">
                {barbershop.name}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <p className="text-muted-foreground text-sm">
                  {barbershop.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-0 py-6">
        <Separator />
      </div>

      {/* Sobre nós */}
      <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xm font-bold uppercase">
            SOBRE NÓS
          </p>
        </div>
        <p className="text-foreground w-full text-sm">
          {barbershop.description}
        </p>
      </div>

      <div className="px-0 py-6">
        <Separator />
      </div>

      {/* Serviços */}
      <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xm font-bold uppercase">
            SERVIÇOS
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {barbershop.services.map((service) => (
            // Lista os servicos
            <ServiceItem
              key={service.id}
              service={service}
              barbershopName={barbershop.name}
            />
          ))}
        </div>
      </div>

      <div className="px-0 py-6">
        <Separator />
      </div>

      {/* Contato */}
      <div className="flex w-full flex-col items-start gap-3 px-5 py-0 pb-10">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xs font-bold uppercase">CONTATO</p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {barbershop.phones.map((phone, index) => (
            // Lista os telefones de contato
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default BarbershopPage;
