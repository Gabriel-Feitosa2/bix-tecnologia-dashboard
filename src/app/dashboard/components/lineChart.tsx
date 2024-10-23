import { trasactions } from "@/data/transactions";
import { formatAmount, formatMoney } from "@/util/formats";
import Chart from "react-apexcharts";

export default function LineChart() {
  const result = trasactions.reduce((acc, { industry, amount }) => {
    const firstTwoDigits = formatAmount(amount);

    if (!acc[industry]) {
      acc[industry] = { industry, amount: 0 };
    }

    // Somando os primeiros dois dígitos do amount para cada estado
    acc[industry].amount += firstTwoDigits;

    return acc;
  }, {});

  // Convertendo o objeto de volta para um array
  const finalResult: { industry: string; amount: number }[] =
    Object.values(result);

  const options = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Amount by Industry",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return formatMoney(value);
        },
      },
    },
    xaxis: {
      categories: finalResult.map((value) => value.industry),
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return formatMoney(value);
        },
      },
    },
  };

  const series = [
    {
      name: "Amount",
      data: finalResult.map((value) => value.amount),
      labels: {
        formatter: function (value: number) {
          return formatMoney(value);
        },
      },
    },
  ];

  console.log(finalResult);

  return (
    <div style={{ height: "40vh", width: "45vw" }}>
      <Chart options={options} series={series} type="line" height={360} />
    </div>
  );
}
