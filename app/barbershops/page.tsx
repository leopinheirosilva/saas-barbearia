import Header from "../_components/header";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "../_components/barbershop-item";
import { PageContainer } from "../_components/ui/page";
import SearchInput from "../_components/search-input";
import QuickSearchButtons from "../_components/quick-search-buttons";
import Footer from "../_components/footer";

const SearchPage = async ({ searchParams }: PageProps<"/barbershops">) => {
  const { search } = await searchParams;

  const barbershops = search
    ? // Busca barbearias que possuem serviços com nome contendo o valor buscado
      await prisma.barbershop.findMany({
        where: {
          services: {
            some: {
              name: {
                contains: search as string,
                mode: "insensitive",
              },
            },
          },
        },
        orderBy: {
          name: "desc",
        },
      })
    : [];

  return (
    <main>
      <Header />
      <PageContainer>
        <SearchInput />
        <QuickSearchButtons />

        {search && (
          <div className="mt-6">
            <h1 className=" text-muted-foreground text-xl font-normal">Resultados para &quot;{search}&quot;</h1>

            {barbershops.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {barbershops.map((barbershop) => (
                  <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
              </div>
            ) : (
              <div className="h-screen">
                  <div className="mt-6 flex h-64 items-center justify-center rounded-lg bg-gray-100">
                    <p className="text-center text-gray-600 p-2">
                      Nenhuma barbearia encontrada com o serviço &quot;{search}&quot;.
                      <br />
                      Tente buscar por outro serviço.
                    </p>
                  </div>
              </div>
            )}
          </div>
        )}

        {!search && (
          <div className="mt-6 flex h-64 items-center justify-center rounded-lg bg-gray-100">
            <p className="text-center text-gray-600">
              Utilize o campo de busca acima para procurar por serviços.
            </p>
          </div>
        )}
      </PageContainer>
      <Footer />
    </main>
  );
};

export default SearchPage;
