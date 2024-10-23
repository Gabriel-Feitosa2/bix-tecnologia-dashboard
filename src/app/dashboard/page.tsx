"use client";

import { Card } from "./style";
import Table from "./components/table";
import dynamic from "next/dynamic";

const BarChart = dynamic(() => import("./components/barChart"), {
  ssr: false,
});

const LineChart = dynamic(() => import("./components/LineChart"), {
  ssr: false,
});

function Dashboard() {
  return (
    <>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Card>
          <BarChart />
        </Card>
        <Card>
          <LineChart />
        </Card>
      </div>
      <Table />
    </>
  );
}

export default Dashboard;
