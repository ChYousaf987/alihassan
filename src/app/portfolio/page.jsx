"use client";
import Link from "next/link";
import { ReactData, VueData } from "@/data/WorkData";
import { IoOpenOutline } from "react-icons/io5";

export default function PortfolioNew() {
  const allData = [...ReactData, ...VueData]; // Combine React and Vue data

  return (
    <div className="relative bg-[#] text- py-16 px-4 md:px-8 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allData.map((work, index) => (
            <div
              key={index}
              className="relative bg-cover bg-center rounded-lg overflow-hidden"
              style={{ backgroundImage: `url(${work.backgroundIMG})` }}
            >
              <div className="absolute inset-0  p-4 text- flex flex-col justify-between">
                <div>
                  <p className="text-lg font-semibold">{work.title}</p>
                  <p className="text-sm">{work.desc}</p>
                </div>
                <div className="flex justify-end">
                  <Link href={`/portfolio/${work.id}`}>
                    <button className="text-">
                      <IoOpenOutline size={24} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
