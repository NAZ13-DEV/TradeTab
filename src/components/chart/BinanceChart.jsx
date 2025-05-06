'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BinanceChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // To store the chart instance

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, 'rgba(62, 191, 129, 1)');
    gradient.addColorStop(1, 'rgba(71, 77, 74, 0)');

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
          data: [0, 10, 15, 10, 15, 10, 12, 10, 16, 20, 15, 12, 17, 6],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#3EBF81',
          pointRadius: 0,
          tension: 0.4,
          borderWidth: 3,
        },
      ],
    };

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(ctx, {
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

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BinanceChart;
