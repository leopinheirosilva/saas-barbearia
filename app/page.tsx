import Image from "next/image"; // Next.js Image component
import Header from "./_components/header"; // Header component import
import SearchInput from "./_components/search-input"; // SearchInput component import
import banner from "../public/banner.png"; // Import banner image
import { prisma } from "@/lib/prisma"; // Import prisma client data
import BarbershopItem from "./_components/barbershop-item"; // BarbershopItem component import
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSection,
  PageSectionScroller,
  PageSectionTitle,
} from "./_components/ui/page";

const Home = async () => {
  // Home page component
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <main>
      <Header />
      <PageContainer>
        {/* Main content area with padding and spacing */}
        <SearchInput />
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
            {recommendedBarbershops.map(
              (
                barbershop, // Map over barbershops and display their names
              ) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ),
            )}
          </PageSectionScroller>
        </PageSection>
        <PageSection>
          {/* Seção Populares */}
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map(
              (
                barbershop, // Map over barbershops and display their names
              ) => (
                <BarbershopItem key={barbershop.id} barbershop={barbershop} />
              ),
            )}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};
export default Home;
