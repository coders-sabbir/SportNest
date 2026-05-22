import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import Categories from "@/components/Categories";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Featured />
      <Categories />
      <WhyChooseUs />
    </div>
  );
}