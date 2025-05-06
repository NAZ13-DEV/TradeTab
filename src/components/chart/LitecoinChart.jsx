'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LitecoinChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Cleanup function: destroy the existing chart if it exists
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, 'rgba(62, 191, 129, 1)');
    gradient.addColorStop(1, 'rgba(45, 46, 45, 0.1)');

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
          data: [0, 10, 8, 12, 8, 12, 10, 10, 17, 20, 17, 15, 13, 6],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#39B70D',
          pointRadius: 0,
          tension: 0.4,
          borderWidth: 3,
        },
      ],
    };

    new Chart(ctx, {
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
  }, []);

  return <canvas ref={chartRef} />;
};

export default LitecoinChart;
