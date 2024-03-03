import React from "react";
import { PageHeader } from "./_components/PageHeader";
// import { CategoryPills } from "./_components/CategoryPills";
// import { categories } from "@/data/home";
import { Category } from "./_components/Category";
import { Sidebar } from "./_components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="max-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <Sidebar />
        <div className="overflow-x-hidden px-8 pb-4">
          <Category />
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
