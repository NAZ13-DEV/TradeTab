'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EthereumChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart if it exists
    if (ctx.chart) {
      ctx.chart.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, 'rgba(252, 119, 74, 1)');
    gradient.addColorStop(1, 'rgba(39, 39, 39, 0.1)');

    const chartData = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
        'rob',
        'eia',
      ],
      datasets: [
        {
          label: 'My Dataset',
          data: [0, 10, 13, 20, 10, 12, 10, 20, 10, 20, 12, 17, 19, 6],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#FC774A',
          pointRadius: 0,
          tension: 0.4,
          borderWidth: 3,
        },
      ],
    };

    const chart = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: -8,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            display: false,
          },
          x: {
            ticks: {
              display: false,
            },
          },
        },
      },
    });

    // Clean up chart on component unmount
    return () => {
      chart.destroy();
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default EthereumChart;
