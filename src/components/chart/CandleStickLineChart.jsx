'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CandleStickLineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, 'rgba(12, 175, 96, 1)');
    gradient.addColorStop(1, 'rgba(12, 175, 96, 0)');

    const chartData = {
      labels: [
        '14.00',
        '15.00',
        '16.00',
        '17.00',
        '18.00',
        '19.00',
        '20.00',
        '21.00',
        '22.00',
        '23.00',
      ],
      datasets: [
        {
          label: 'My Dataset',
          data: [38, 25, 49, 38, 40, 66, 65, 48, 85, 58],
          fill: true,
          backgroundColor: gradient,
          borderColor: '#0CAF60',
          borderWidth: 4,
          pointRadius: 2,
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
            display: false,
          },
          x: {
            ticks: {
              color: '#D2D9E4',
            },
            grid: {
              color: '#424A55',
            },
          },
        },
      },
    });
  }, []);

  return <canvas ref={chartRef} />;
};

export default CandleStickLineChart;
