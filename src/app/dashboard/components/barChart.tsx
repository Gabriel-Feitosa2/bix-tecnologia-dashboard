"use client";

import { trasactions } from "@/data/transactions";
import { formatAmount, formatMoney } from "@/util/formats";

import Chart from "react-apexcharts";

export default function BarChart() {
  // Agrupando por estado e somando os primeiros dois dígitos
  const result = trasactions.reduce((acc, { state, amount }) => {
    const firstTwoDigits = formatAmount(amount);

    if (!acc[state]) {
      acc[state] = { state, amount: 0 };
    }

    // Somando os primeiros dois dígitos do amount para cada estado
    acc[state].amount += firstTwoDigits;

    return acc;
  }, {});

  // Convertendo o objeto de volta para um array
  const finalResult: { state: string; amount: number }[] =
    Object.values(result);

  const options = {
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return formatMoney(value);
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value: number) {
          return formatMoney(value);
        },
      },
      categories: [
        "Texas",
        "Minnesota",
        "Nevada",
        "Illinois",
        "New Jersey",
        "Pennsylvania",
        "New York",
        "Florida",
        "Maryland",
        "California",
        "Oklahoma",
        "North Carolina",
        "Oregon",
        "Washington",
        "Michigan",
        "Tennessee",
        "Georgia",
        "Nebraska",
        "Ohio",
        "Virginia",
        "Utah",
        "Hawaii",
        "Arizona",
        "Connecticut",
        "Missouri",
        "Colorado",
      ],
    },
  };

  const series = [
    {
      name: "Amount",
      data: finalResult.map((value) => value.amount),
    },
  ];

  return (
    <div style={{ height: "40vh", width: "45vw" }}>
      <Chart
        options={options}
        series={series}
        type="bar"
        // width={750}
        height={400}
      />
    </div>
  );
}
