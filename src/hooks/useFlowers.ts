import { useState, useEffect } from "react";
import api from "@/utils/api";

export type Flower = {
  id: string;
  name: string;
  latinName: string;
  pictureUrl: string;
  sightingsNum: number;
};

const useFlowers = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  useEffect(() => {
    api.get("/flowers").then((response) => {
      setFlowers(response.data.items);
    });
  }, []);
  return flowers;
};

export default useFlowers;
