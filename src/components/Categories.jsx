"use client";

import Link from "next/link";
import * as Icons from "lucide-react";
import { categoriesData } from "@/data/categoriesData";

export default function Categories() {
  return (
    <section className="relative w-full py-24 bg-main-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Popular Sports Categories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesData.map((category) => {
            const IconComponent = Icons[category.icon];
            return (
              <Link 
                href={`/facilities?sport=${category.name.toLowerCase()}`}
                key={category.id || category._id}
                className="group bg-card-bg/60 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/40 transition-all duration-500 outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
              >
                {/* Fixed Image using standard img tag */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-6 relative">
                  <div className="absolute -top-8 left-6 h-14 w-14 bg-main-bg border border-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-main-bg transition-all shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                    {IconComponent && <IconComponent size={24} />}
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4 group-hover:text-primary transition-colors duration-300">{category.name}</h3>
                  <p className="text-sm text-secondary-text mt-2">{category.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}