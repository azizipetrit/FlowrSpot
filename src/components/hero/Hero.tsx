import HeroImage from "@/assets/pl-hero.svg";
import SearchIcon from "@/assets/search.svg";

const Hero = () => {
  return (
    <section>
      <div
        className="min-h-[500px] text-[#FFFFFF] bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${HeroImage})`,
        }}
      >
        <div className="w-full flex justify-center">
          <h2 className="mt-[104px] lg:mt-[154px] text-[40px] text-center w-[385px] md:w-auto leading-none h-[80px] md:h-auto block">
            Discover flowers around you
          </h2>
        </div>
        <p className="text-[#FFFFFF] opacity-70 mt-[25px] md:mt-[15px] text-center text-[17px] leading-none h-[17px]">
          Explore between more than 8.427 sightings
        </p>
        <div className="mx-auto mt-[58px] [&_input]:w-[307px] md:[&_input]:w-[458px] lg:[&_input]:w-[600px] h-[56px] md:h-[70px] md:w-[600px] flex justify-center">
          {" "}
          <div className="flex shadow-[0_15px_30px_rgba(0,0,0,0.05)]">
            <input
              className="p-[19px] md:p-[25px] h-full text-[#949EA0] bg-[#FFFFFF] text-[14px] md:text-[18px]"
              placeholder="Looking for something specific?"
            />
            <div className="w-[62.36px] ml-[-62.36px] flex items-center justify-center">
              <img src={SearchIcon} alt="Search" width="20" height="20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
