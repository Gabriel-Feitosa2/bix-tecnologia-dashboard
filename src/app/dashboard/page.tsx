"use client";

import { Card } from "./style";
import BarChart from "./components/barChart";
import Table from "./components/table";
import LineChart from "./components/lineChart";

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
