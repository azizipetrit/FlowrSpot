import useFlowers from "@/hooks/useFlowers";
import Hero from "@/components/hero/Hero";
import FlowerListItem from "./FlowerListItem";

const FlowerList = () => {
  const flowers = useFlowers();

  return (
    <div className="w-full">
      <Hero />
      <section className="mx-auto lg:max-w-[1220px] mt-[34px] flex flex-wrap justify-start p-[8px]">
        {flowers?.map((flower) => (
          <FlowerListItem key={flower.id} flower={flower} />
        ))}
      </section>
    </div>
  );
};

export default FlowerList;
