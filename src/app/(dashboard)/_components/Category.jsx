"use client";

import React, { useState } from "react";
import { CategoryPills } from "./CategoryPills";
import { categories } from "@/data/home";

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  //   console.log(selectedCategory)
  return (
    <div className="sticky top-0 bg-white z-10 pb-4">
      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />
    </div>
  );
};
