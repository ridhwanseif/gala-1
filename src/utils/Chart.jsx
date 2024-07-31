import React, { useEffect, useState } from "react";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import './chart.css'
import { useQuery } from "react-query";
import { fetchMath, fetchRanking, fetchRankingWriting, fetchRegionSubAverage } from "../api/chartAPI";
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
import { fetchUfauluWaKusoma, fetchUmahiriWaKuandika, fetchUmahiriWaKuhesabu, fetchWastaniWaUfaulu } from "../api/takwimuAPI";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

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
          text: 'Asilimia ya kusoma',
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
    = useQuery(['ranking', month, year], () => fetchRankingWriting(month, year));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const labels = ranking?.map(item => item.wilaya);
  const dataValues = ranking?.map(item => item.wastani);

  const data2 = {
    labels,
    datasets: [
      {
        label: 'wilaya',
        backgroundColor: 'rgba(75,92,192,0.4)', // You can customize the color
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
          text: 'Asilimia ya Kuandika',
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

export function ChartBar3({ month, year }) {
  const { data: ranking, isLoading, isError }
    = useQuery(['ranking', month, year], () => fetchMath(month, year));

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  const labels = ranking?.map(item => item.wilaya);
  const dataValues = ranking?.map(item => item.wastani);

  const data2 = {
    labels,
    datasets: [
      {
        label: 'wilaya',
        backgroundColor: 'rgba(75,192,102,0.4)', // You can customize the color
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
          text: 'Asilimia ya Kuhesabu',
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

export function WastaniWaUfaulu({ year, month, council }) {
  const [chartData, setChartData] = useState(null);

  const { data: wastaniWaUfaulu, isLoading: isLoadingWastani, isError: isErrorWastani } =
    useQuery(['wastaniWaUfaulu', year, month, council], fetchWastaniWaUfaulu, { enabled: !!council });

  useEffect(() => {
    if (wastaniWaUfaulu) {
      const labels = wastaniWaUfaulu?.map(item => item.shule);
      const kusoma = wastaniWaUfaulu?.map(item => item.kusoma);
      const kuandika = wastaniWaUfaulu?.map(item => item.kuandika);
      const kuhesabu = wastaniWaUfaulu?.map(item => item.kuhesabu);

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
  }, [wastaniWaUfaulu]);

  const options = {
    responsive: true,
    indexAxis: 'y', // This option changes the chart to horizontal
    scales: {
      x: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Shule',
        },
      },
    },
  };

  return (
    <div className="dataScroll">
      {chartData ? (
        <Bar className="barChart dataScroll"
          data={chartData}
          options={options}
          height={1200}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export function UfauluWaKusoma({ year, month, council }) {
  const [chartData, setChartData] = useState(null);

  const { data: ufauluWaKusoma, isLoading: isLoadingKuhesabu, isError: isErrorKuhesabu } =
    useQuery(['ufauluWaKusoma', year, month, council], fetchUfauluWaKusoma, { enabled: !!council });

  useEffect(() => {
    if (ufauluWaKusoma) {
      const labels = ufauluWaKusoma?.map(item => item.shule);
      const wastani = ufauluWaKusoma?.map(item => item?.wastani);

      setChartData({
        labels,
        datasets: [
          {
            label: 'wastani',
            data: wastani,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          }
        ],
      });
    }
  }, [ufauluWaKusoma]);

  const options = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Shule',
        },
      },
    },
  };

  return (
    <div className="dataScroll">
      {chartData ? (
        <Bar className="barChart dataScroll"
          data={chartData}
          options={options}
          height={2800}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export function UfauluWaKuandika({ year, month, council }) {
  const [chartData, setChartData] = useState(null);

  const { data: ufauluWaKuandika, isLoading: isLoadingKuandika, isError: isErrorKuandika } =
    useQuery(['ufauluWaKuandika', year, month, council], fetchUmahiriWaKuandika, { enabled: !!council });

  useEffect(() => {
    if (ufauluWaKuandika) {
      const labels = ufauluWaKuandika?.map(item => item.shule);
      const wastani = ufauluWaKuandika?.map(item => item?.wastani);

      setChartData({
        labels,
        datasets: [
          {
            label: 'wastani',
            data: wastani,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          }
        ],
      });
    }
  }, [ufauluWaKuandika]);

  const options = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Shule',
        },
      },
    },
  };

  return (
    <div className="dataScroll">
      {chartData ? (
        <Bar className="barChart dataScroll"
          data={chartData}
          options={options}
          height={2800}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export function UfauluWaKuhesabu({ year, month, council }) {
  const [chartData, setChartData] = useState(null);

  const { data: ufauluWaKuhesabu, isLoading: isLoadingKuhesabu, isError: isErrorKuhesabu } =
    useQuery(['ufauluWaKuhesabu', year, month, council], fetchUmahiriWaKuhesabu, { enabled: !!council });

  useEffect(() => {
    if (ufauluWaKuhesabu) {
      const labels = ufauluWaKuhesabu?.map(item => item.shule);
      const wastani = ufauluWaKuhesabu?.map(item => item?.wastani);

      setChartData({
        labels,
        datasets: [
          {
            label: 'wastani',
            data: wastani,
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
          }
        ],
      });
    }
  }, [ufauluWaKuhesabu]);

  const options = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Asilimia',
        },
        beginAtZero: true,
      },
      y: {
        title: {
          display: true,
          text: 'Shule',
        },
      },
    },
  };

  return (
    <div className="dataScroll">
      {chartData ? (
        <Bar className="barChart dataScroll"
          data={chartData}
          options={options}
          height={2800}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
// end of takuimu chart
