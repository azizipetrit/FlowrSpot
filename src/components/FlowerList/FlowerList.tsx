import { useEffect, useState } from "react";
import api from "../../utils/api";
import Hero from "../hero/Hero";
import FallbackImage from "../../assets/pl-image.svg";
import StarIcon from "../../assets/star.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Flower = {
  id: string;
  name: string;
  latinName: string;
  pictureUrl: string;
  sightingsNum: number;
};

const FlowerList = () => {
  const user = useSelector((state: RootState) => state.user);
  const [flowers, setFlowers] = useState<Flower[]>([]);

  useEffect(() => {
    api.get("/flowers").then((response) => {
      setFlowers(response.data.items);
    });
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <section className="mx-auto lg:max-w-[1220px] mt-[34px] flex flex-wrap justify-start p-[8px]">
        {flowers?.map((flower) => (
          <div
            key={flower.id}
            className="p-[8px] w-[50%] md:w-[33%] lg:max-w-[25%]"
          >
            <div
              className="h-[230px] md:h-[290px] lg:h-[350px] flex justify-center content-start flex-wrap [&>*]:w-full [&>*]:text-center text-[#FFFFFF] text-[9.6px] md:text-[12px] leading-none cursor-pointer"
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 89.5%) 50% 50% / auto 100%, url(${
                  flower.pictureUrl ?? FallbackImage
                })`,
              }}
            >
              <div className="relative">
                {user.isLoggedIn && (
                  <div className="absolute top-0 right-0 pt-[15px] pr-[15px]">
                    <div className="w-[25px] h-[25px]">
                      <img src={StarIcon} alt="Favorite" />
                    </div>
                  </div>
                )}
                <h3 className="text-[16px] mt-[106.66px] md:mt-[148.83px] lg:mt-[240px] md:text-[20px] leading-none">
                  {flower.name}
                </h3>
                <div className="min-h-[36px]">
                  <h4 className="leading-none opacity-[0.7] my-[3px] px-[15px] truncate">
                    {flower.latinName}
                  </h4>
                </div>
                <div className="flex justify-center">
                  <button
                    className="md:w-[85px] md:h-[25px] lg:w-[103px] lg:h-[30px] transition duration-500 md:bg-[#00000080] leading-none rounded-[20px] hover:bg-gradient-to-l from-[#ECBCB3] to-[#EAA79E]"
                    style={{
                      boxShadow: "rgba(234, 168, 159, 0.2) 0px 15px 20px 0px",
                    }}
                  >
                    {flower.sightingsNum} sightings
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default FlowerList;
