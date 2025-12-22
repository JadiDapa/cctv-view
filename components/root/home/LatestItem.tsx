"use client";

import { getAllItems } from "@/lib/networks/item";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "./ItemCard";
import { ArrowRight } from "lucide-react";
// import CreateItemDialog from "../item/CreateItemDialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

export default function LatestItem() {
  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Latest Item</p>

        <div className="flex items-center gap-6">
          {/* <CreateItemDialog /> */}
          <div className="flex items-center gap-3 cursor-pointer text-muted-foreground hover:text-foreground transition">
            <p>See More</p>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        className="overflow-visible "
      >
        {items?.map((st) => (
          <SwiperSlide className="max-w-fit me-6" key={st.id}>
            <ItemCard item={st} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
