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
        <SearchInput />
        <QuickSearchButtons />
        <Image
          src={banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />

        <PageSection>
          {/* Seção Recomendados */}
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          {/* Seção Populares */}
          <PageSectionTitle>Populares</PageSectionTitle>
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
