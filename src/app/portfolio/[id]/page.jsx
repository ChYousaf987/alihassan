// src\app\portfolio\[id}/page.jsx

import Portfolios from "@/components/Portfolios";
import { ReactData, VueData } from "@/data/WorkData";

export default function PortfolioPage({ params }) {
  const { id } = params;
  const allData = [...ReactData, ...VueData]; // Combine data sources
  const portfolio = allData.find((item) => item.id === parseInt(id, 10)); // Find the portfolio by id

  if (!portfolio) {
    return <div>Portfolio not found</div>;
  }

  return (
    <Portfolios
      w={portfolio}
      tabId={portfolio.tech.includes("React.js") ? "react" : "vue"}
    />
  );
}