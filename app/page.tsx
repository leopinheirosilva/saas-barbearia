// Imports
import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import QuickSearchButtons from "./_components/quick-search-buttons";
import banner from "../public/banner.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    // Lista as barbearias por ordem ascendente
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    // Lista as barbearias por ordem descendente
    orderBy: {
      name: "desc",
    },
  });

  return (
    <main>
      <Header />
      <PageContainer>
        {/* Homepage */}
        <div className="p-5">
          <SearchInput />
        </div>
        <QuickSearchButtons />
        <div className="p-5">
          <Image
            src={banner}
            alt="Agende agora!"
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <PageSection>
          {/* Seção Recomendados */}
          <div className="px-5">
            <PageSectionTitle>Recomendados</PageSectionTitle>
          </div>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          {/* Seção Populares */}
          <div className="px-5">
            <PageSectionTitle>Populares</PageSectionTitle>
          </div>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};
export default Home;
