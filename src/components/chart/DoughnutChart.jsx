'use client';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const data = {
  labels: ['Value', 'Remaining', 'extra'],
  datasets: [
    {
      data: [35, 40, 25], // Change these values as needed
      backgroundColor: ['#0CAF60', '#FC774A', '#424A55'], // Change colors as needed
    },
  ],
};

const options = {
  cutout: '55%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: false,
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

const DoughnutChart = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '180px',
        height: '180px',
        margin: 'auto',
      }}
    >
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
          89%
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
