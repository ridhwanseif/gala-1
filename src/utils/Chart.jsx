import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import './chart.css'
import { useQuery } from "react-query";
import { fetchRanking, fetchRankings, fetchRegionSubAverage } from "../api/chartAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchWastaniWaUfaulu } from "../api/takwimuAPI";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// dashbosrd chart
export function ChartBar({ month, year }) {
  const [chartData, setChartData] = useState(null);

  const { data: regionSubAverage, isLoading, isError } = useQuery(['regionSubAverage', month, year], () => fetchRegionSubAverage(month, year));

  useEffect(() => {
    if (regionSubAverage) {
      const labels = regionSubAverage?.map(item => item.wilaya);
      const kusoma = regionSubAverage?.map(item => item.kusoma);
      const kuandika = regionSubAverage?.map(item => item.kuandika);
      const kuhesabu = regionSubAverage?.map(item => item.kuhesabu);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Kusoma',
            data: kusoma,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
          {
            label: 'Kuandika',
            data: kuandika,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Kuhesabu',
            data: kuhesabu,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  }, [regionSubAverage]);

  const options = {
    responsive: true,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Wilaya',
    //   },
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Wilaya',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <Bar className="barChart"
          data={chartData}
          options={options}

        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export function ChartBar1({ month, year }) {
  const { data: ranking, isLoading, isError } = useQuery(['ranking', month, year], () => fetchRanking(month, year));
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (ranking) {
      const labels = ranking?.map(item => item.wilaya);
      const dataValues = ranking?.map(item => item.wastani);

      const data = {
        labels: labels,
        datasets: [
          {
            label: "wilaya",
            backgroundColor: "rgba(75, 192, 192, 0.6)", // Custom color
            data: dataValues,
          },
        ],
      };

      setChartData(data);
    }
  }, [ranking]);

  const options = {
    responsive: true,
    //  indexAxis: 'y',
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Wilaya',
    //   },
    // },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Wilaya',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Asilimia',
        },
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      {chartData ?
        <Bar
          data={chartData}
          options={options}
        /> : null}
    </div>
  );
}


export function ChartBar2({ month, year }) {
  const { data: ranking, isLoading, isError }
    = useQuery(['ranking', month, year], () => fetchRankings(month, year));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const labels = ranking?.map(item => item.wilaya);
  const dataValues = ranking?.map(item => item.wastani);

  const data2 = {
    labels,
    datasets: [
      {
        label: 'Average Ranking',
        backgroundColor: 'rgba(75,192,192,0.4)', // You can customize the color
        data: dataValues,
      },
    ],
  };

  const options2 = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Wilaya',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Ranking',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data2} options={options2} />
    </div>
  );
}

export function ChartPie() {
  const data = {
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="card-chart">
      <Pie className="chart" data={data} options={options} />
    </div>
  );
}

export function ChartPie1() {
  const data = {
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)',
        ],

        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  return (
    <div className="card-chart">
      <Doughnut className="chart" data={data} options={options} />
    </div>
  );
}
// end of dashbosrd chart

// report chart
export function RipotiYaShuleChart({ month, year }) {
  const [chartData, setChartData] = useState(null);

  const { data: regionSubAverage, isLoading, isError } = useQuery(['regionSubAverage', month, year], () => fetchRegionSubAverage(month, year));

  useEffect(() => {
    if (regionSubAverage) {
      const labels = regionSubAverage?.map(item => item.wilaya);
      const kusoma = regionSubAverage?.map(item => item.kusoma);
      const kuandika = regionSubAverage?.map(item => item.kuandika);
      const kuhesabu = regionSubAverage?.map(item => item.kuhesabu);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Kusoma',
            data: kusoma,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
          {
            label: 'Kuandika',
            data: kuandika,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Kuhesabu',
            data: kuhesabu,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  }, [regionSubAverage]);

  const options = {
    responsive: true,
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Wilaya',
    //   },
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Wilaya',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <Bar className="barChart"
          data={chartData}
          options={options}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
// end of report chart

// takuimu chart
export function WastaniWaUfaulu({ council, month, year }) {
  const [chartData, setChartData] = useState(null);

  // const { data: WastaniWaUfaulu, isLoading, isError } = useQuery(['WastaniWaUfaulu', month, year, councils], () => fetchWastaniWaUfaulu(month, year, councils));

  const { data: WastaniWaUfaulu, isLoading: isLoadingWastani, isError: isErrorWasitani } =
    useQuery(['WastaniWaUfaulu', council, month, year], fetchWastaniWaUfaulu, { enabled: !!council });

  useEffect(() => {
    if (WastaniWaUfaulu) {
      const labels = WastaniWaUfaulu?.map(item => item.wilaya);
      const kusoma = WastaniWaUfaulu?.map(item => item.kusoma);
      const kuandika = WastaniWaUfaulu?.map(item => item.kuandika);
      const kuhesabu = WastaniWaUfaulu?.map(item => item.kuhesabu);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Kusoma',
            data: kusoma,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          },
          {
            label: 'Kuandika',
            data: kuandika,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
          {
            label: 'Kuhesabu',
            data: kuhesabu,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      });
    }
  }, [WastaniWaUfaulu]);

  const options = {
    responsive: true,
    indexAxis: 'y',
    // plugins: {
    //   title: {
    //     display: true,
    //     text: 'Wilaya',
    //   },
    // },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Wilaya',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {chartData ? (
        <Bar className="barChart"
          data={chartData}
          options={options}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
// end of takuimu chart
