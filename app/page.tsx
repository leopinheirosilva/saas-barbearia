import Image from 'next/image'; // Next.js Image component
import Header from "./_components/header"; // Header component import
import SearchInput from "./_components/search-input"; // SearchInput component import
import banner from '../public/banner.png'; // Import banner image

const Home = () => {
  // Home page component
  return (
    <div>
      <Header />
      <div className="px-5 space-y-4">
        <SearchInput /> {/* SearchInput component */}
        <Image src={banner} alt="Agende agora!" sizes='100vw' className='h-auto w-full'  />
      </div>
      </div>
  );
};
export default Home;
