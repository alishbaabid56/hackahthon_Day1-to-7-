import PickDropSection from "@/components/PickDropSection";
import HeroSection from "@/components/Hero";
import FetchCarsPage from "./fetchcars/page";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <PickDropSection/>
      <FetchCarsPage/>
      
    </div>
  );
}
