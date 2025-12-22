"use client";

import { getAllSections } from "@/lib/networks/section";
import { useQuery } from "@tanstack/react-query";
import { SectionCard } from "./SectionCard";
import { ArrowRight } from "lucide-react";
// import CreateSectionDialog from "../section/CreateSectionDialog";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

export default function LatestSection() {
  const { data: sections } = useQuery({
    queryFn: getAllSections,
    queryKey: ["sections"],
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Latest Section</p>

        <div className="flex items-center gap-6">
          {/* <CreateSectionDialog /> */}
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
        {sections?.map((st) => (
          <SwiperSlide className="max-w-fit me-6" key={st.id}>
            <SectionCard section={st} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
