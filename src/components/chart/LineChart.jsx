'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const chartRef = useRef(null);
  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(12, 175, 96, 1)');
    gradient.addColorStop(1, 'rgba(12, 175, 96, 0)');

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
      ],
      datasets: [
        {
          label: 'My Dataset',
          data: [3, 22, 10, 38, 40, 66, 65, 48, 85, 58, 37, 43],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#0CAF60',
          borderWidth: 4,
          pointRadius: 2,
          tension: 0.4,
          pointBackgroundColor: 'white',
        },
        {
          label: 'My Dataset',
          data: [38, 18, 20, 30, 78, 55, 75, 55, 12, 18, 20, 13],
          fill: true,
          borderColor: '#0CAF60',
          borderWidth: 4,
          pointRadius: 2,
          tension: 0.4,
          pointBackgroundColor: 'white',
        },
      ],
    };

    new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#212B39',
            titleColor: '#3EBF81',
            padding: 10,
            bodyColor: '#FFF',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#D2D9E4',
              callback: function (value, index, values) {
                return value + 'k';
              },
            },
          },
          x: {
            ticks: {
              color: '#D2D9E4',
            },
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default LineChart;
