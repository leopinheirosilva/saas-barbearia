import { prisma } from "@/lib/prisma";
import BarbershopItem from "../_components/barbershop-item";
import { PageContainer } from "../_components/ui/page";
import SearchInput from "../_components/search-input";
import QuickSearchButtons from "../_components/quick-search-buttons";
import Header from "../_components/header";
import Footer from "../_components/footer";

const SearchPage = async ({ searchParams }: PageProps<"/barbershops">) => {
  const { search } = await searchParams;

  const barbershops = search
    ? await prisma.barbershop.findMany({
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
        <div className="lg:px-30">
          <div className="p-5">
            <SearchInput />
          </div>
          <QuickSearchButtons />
        </div>

        <div className="lg:px-30">
          {search && (
            <div className="mt-6 p-5">
              <h1 className="text-muted-foreground text-xl font-normal">
                Resultados para &quot;{search}&quot;
              </h1>

              {barbershops.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                  {barbershops.map((barbershop) => (
                    <BarbershopItem
                      key={barbershop.id}
                      barbershop={barbershop}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-screen">
                  <div className="mt-6 flex h-64 items-center justify-center rounded-lg bg-black/5">
                    <p className="text-muted-foreground p-2 text-center">
                      Nenhuma barbearia encontrada com o serviço &quot;{search}
                      &quot;.
                      <br />
                      Tente buscar por outro serviço.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default SearchPage;
