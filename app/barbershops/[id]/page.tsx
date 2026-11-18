import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation"; // error 404 page
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { ChevronLeft, MapPinIcon } from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";
import { ServiceItem } from "@/app/_components/service-item";
import { PhoneItem } from "@/app/_components/phone-item";
import Footer from "@/app/_components/footer";

const BarbershopPage = async (props: { params: { id: string } }) => {
  const { id } = await props.params; // Obtém o ID da barbearia a partir dos parâmetros da rota
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });
  if (!barbershop) {
    return notFound();
  }
  return (
    <main>
      <div className="flex size-full flex-col items-start overflow-clip">
        <div className="relative h-74.25 w-full lg:hidden">
          <div className="absolute top-0 left-0 h-full w-full">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute top-0 left-0 flex w-full items-baseline gap-22.75 p-3">
            <Button
              size="icon"
              variant="secondary"
              className="overflow-clip rounded-full bg-gray-300/30"
              asChild
            >
              <Link href="/">
                <ChevronLeft className="size-6 text-black" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex w-full items-center gap-1.5 px-5 pt-6 pb-0">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-start gap-1.5 lg:gap-5">
              <div className="relative size-7.5 shrink-0 overflow-hidden rounded-full lg:size-20">
                <Image
                  src={barbershop.imageUrl}
                  alt={barbershop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:pt-3">
                <div className="flex gap-6">
                  <p className="text-foreground text-2xl font-bold">
                    {barbershop.name}
                  </p>
                  <div className="hidden lg:block size-0">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="overflow-clip rounded-full bg-gray-300/30"
                      asChild
                    >
                      <Link href="/">
                        <ChevronLeft className="size-6 text-black" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <p className="lg:text-muted-foreground hidden lg:flex lg:gap-1 lg:text-sm">
                  <MapPinIcon className="size-4" />
                  {barbershop.address}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 lg:hidden">
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

      <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xm font-bold uppercase lg:text-lg">
            SOBRE NÓS
          </p>
        </div>
        <p className="text-foreground w-full text-sm lg:w-250 lg:text-base">
          {barbershop.description}
        </p>
      </div>

      <div className="px-0 py-6">
        <Separator />
      </div>

      <div className="flex w-full flex-col items-start gap-3 px-5 py-0">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xm font-bold uppercase lg:text-lg">
            SERVIÇOS
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {barbershop.services.map((service) => (
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

      <div className="flex w-full flex-col items-start gap-3 px-5 py-0 pb-10">
        <div className="flex items-center justify-center gap-2.5">
          <p className="text-foreground text-xs font-bold uppercase lg:text-lg">
            CONTATO
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default BarbershopPage;
