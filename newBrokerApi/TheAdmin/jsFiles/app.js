/* Created by Tivotal */

let primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-primary')
  .trim();

let labelColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--color-label')
  .trim();

let fontFamily = getComputedStyle(document.documentElement)
  .getPropertyValue('--font-family')
  .trim();

async function fetchDataAndParseCSV() {
  try {
    const response = await fetch('../dashboard/details.csv');
    const csvData = await response.text();

    Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      complete: function (results) {
        const data = results.data;
        function findLatestDate(data) {
          let latestDate = null;

          data.forEach((entry) => {
            let currentDate = new Date(entry.Date);
            if (!latestDate || currentDate > latestDate) {
              latestDate = currentDate;
            }
          });

          return latestDate;
        }

        // console.log(findLatestDate(data));
        // Function to filter data based on the latest date and the specified period
        function filterDataByPeriodFromLatest(data, period) {
          // Validate input

          if (
            typeof data !== 'object' ||
            Object.keys(data).length === 0 ||
            ![
              'week',
              'month',
              'threeMonths',
              'sixMonths',
              'YTD',
              'oneYear',
              'twoYears',
              'fiveYears',
              'all',
            ].includes(period)
          ) {
            return false;
          }

          // Find the latest date in the data object
          const latestDate = findLatestDate(data);
          let startDate;
          switch (period) {
            case 'week':
              startDate = new Date(latestDate);
              startDate.setDate(latestDate.getDate() - 7);
              break;
            case 'month':
              startDate = new Date(latestDate);
              startDate.setMonth(latestDate.getMonth() - 1);
              break;
            case 'threeMonths':
              startDate = new Date(latestDate);
              startDate.setMonth(latestDate.getMonth() - 3);
              break;
            case 'sixMonths':
              startDate = new Date(latestDate);
              startDate.setMonth(latestDate.getMonth() - 6);
              break;
            case 'YTD':
              startDate = new Date(latestDate.getFullYear(), 0, 1);
              break;
            case 'oneYear':
              startDate = new Date(latestDate);
              startDate.setFullYear(latestDate.getFullYear() - 1);
              break;
            case 'twoYears':
              startDate = new Date(latestDate);
              startDate.setFullYear(latestDate.getFullYear() - 2);
              break;
            case 'fiveYears':
              startDate = new Date(latestDate);
              startDate.setFullYear(latestDate.getFullYear() - 5);
              break;
            case 'all':
              return Object.values(data); // Return all data as an array of values
          }

          // Filter the data based on the start date
          return Object.values(data).filter((item) => {
            const itemDate = new Date(item.Date);
            return itemDate >= startDate && itemDate <= latestDate;
          });
        }
        function getDayOfWeek(dateString) {
          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
          let date = new Date(dateString);
          return daysOfWeek[date.getDay()];
        }
        Date.prototype.getWeek = function () {
          const onejan = new Date(this.getFullYear(), 0, 1);
          return Math.ceil(
            ((this - onejan) / 86400000 + onejan.getDay() + 1) / 7,
          );
        };

        function getWeekDays(data) {
          const weeks = {};

          data.forEach((entry) => {
            let date = new Date(entry.Date);
            let week = date.getWeek();
            let year = date.getFullYear();

            if (!weeks[year]) {
              weeks[year] = {};
            }
            if (!weeks[year][week]) {
              weeks[year][week] = [];
            }
            weeks[year][week].push(date);
          });

          let result = [];

          for (let year in weeks) {
            for (let week in weeks[year]) {
              result.push({
                week: parseInt(week),
                dates: weeks[year][week].sort((a, b) => a - b),
              });
            }
          }

          return result;
        }
        function getMonthOfYear(dateString) {
          const monthsOfYear = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ];
          let date = new Date(dateString);
          return monthsOfYear[date.getMonth()];
        }
        function getWeeksAndMonths(data) {
          const weeks = {};

          data.forEach((entry) => {
            let date = new Date(entry.Date);
            let year = date.getFullYear();
            let week = date.getWeek();
            let month = date.getMonth();

            // console.log(date, year, week, month);
            if (!weeks[year]) {
              weeks[year] = {};
            }
            if (!weeks[year][week]) {
              weeks[year][week] = {
                months: {},
                dates: [],
              };
            }
            if (!weeks[year][week].months[month]) {
              weeks[year][week].months[month] = true;
            }
            weeks[year][week].dates.push(date);
          });

          let result = [];

          for (let year in weeks) {
            for (let week in weeks[year]) {
              let sortedMonths = Object.keys(weeks[year][week].months)
                .map(Number)
                .sort((a, b) => a - b);
              result.push({
                year: parseInt(year),
                week: parseInt(week),
                months: sortedMonths,
                dates: weeks[year][week].dates.sort((a, b) => a - b),
              });
            }
          }

          return result;
        }
        // Example usage
        const week = filterDataByPeriodFromLatest(data, 'week');
        const month = filterDataByPeriodFromLatest(data, 'month');
        const threeMonths = filterDataByPeriodFromLatest(data, 'threeMonths');
        const sixMonths = filterDataByPeriodFromLatest(data, 'sixMonths');
        const YTD = filterDataByPeriodFromLatest(data, 'YTD');
        const oneYear = filterDataByPeriodFromLatest(data, 'oneYear');
        const twoYears = filterDataByPeriodFromLatest(data, 'twoYears');
        const fiveYears = filterDataByPeriodFromLatest(data, 'fiveYears');
        const all = filterDataByPeriodFromLatest(data, 'all');

        const WeekData = week.map((e) => {
          return e.AdjClose;
        });
        const WeekDateData = week.map((e) => {
          const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
          let date = new Date(e.Date);
          return daysOfWeek[date.getDay()];
        });

        console.log(WeekDateData);
        let defaultOptions = {
          chart: {
            tollbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
            width: '100%',
            height: 180,
            offsetY: 18,
          },

          dataLabels: {
            enabled: false,
          },
        };

        let barOptions = {
          ...defaultOptions,

          chart: {
            ...defaultOptions.chart,
            type: 'area',
          },

          tooltip: {
            enabled: true,
            style: {
              fontFamily: fontFamily,
            },
            y: {
              formatter: (value) => `${value}$`,
            },
          },

          series: [
            {
              name: 'NASDAQ:AXUP',
              data: WeekData,
            },
          ],

          colors: [primaryColor],

          fill: {
            type: 'gradient',
            gradient: {
              type: 'vertical',
              opacityFrom: 1,
              opacityTo: 0,
              stops: [0, 100],
              colorStops: [
                {
                  offset: 0,
                  opacity: 0.2,
                  color: '#ffffff',
                },
                {
                  offset: 100,
                  opacity: 0,
                  color: '#ffffff',
                },
              ],
            },
          },

          stroke: {
            colors: [primaryColor],
            lineCap: 'round',
          },

          grid: {
            borderColor: 'rgba(0, 0, 0, 0)',
            padding: {
              top: -30,
              right: 0,
              bottom: -8,
              left: 12,
            },
          },

          markers: {
            strokeColors: primaryColor,
          },

          yaxis: {
            show: false,
          },

          xaxis: {
            labels: {
              show: false,
              floating: false,
              style: {
                colors: labelColor,
                fontFamily: fontFamily,
              },
            },

            axisBorder: {
              show: false,
            },

            crosshairs: {
              show: false,
            },
            categories: WeekDateData,
          },
        };

        const monthData = month.map((e) => {
          return e.AdjClose;
        });
        const monthDateData = month.map((e) => {
          return getDayOfWeek(e.Date);
        });

        // Example usage
        let weekNumbers = getWeekDays(threeMonths);
        let weeksDate = [];

        weekNumbers.forEach((e) => {
          // weeksDate.push(e.week);
          e.dates.forEach((el) => {
            let date = new Date(el);
            return weeksDate.push(getDayOfWeek(el));
            //;
          });
        });
        const threeMonthsData = threeMonths.map((e) => {
          return e.AdjClose;
        });
        const monthDate = [];
        let getWeekMont = getWeeksAndMonths(threeMonths);
        getWeekMont.forEach((e) => {
          e.dates.forEach((el) => {
            monthDate.push('');
          });
          monthDate.push(e.week + 'W');

          monthDate.push(getMonthOfYear(e.year));
        });

        const alltime = all.map((e) => {
          return e.AdjClose;
        });
        const alltimee = [];
        let getWeekMjont = getWeeksAndMonths(all);
        getWeekMont.forEach((e) => {
          e.dates.forEach((el) => {
            alltimee.push('');

            alltimee.push(e.week);

            alltimee.push(getMonthOfYear(e.months));
            alltimee.push(e.year);
          });
        });

        // console.log(getWeekMont);
        const updateChart = (data, categories) => {
          chart.updateOptions({
            series: [
              {
                name: 'NASDAQ:AXUP',
                data: data,
              },
            ],
            xaxis: {
              categories: categories,
            },
          });
        };
        document.getElementById('day-btn').addEventListener('click', () => {
          updateChart(WeekData, WeekDateData);
        });

        document.getElementById('month-btn').addEventListener('click', () => {
          updateChart(monthData, monthDateData);
        });

        document
          .getElementById('three-month-btn')
          .addEventListener('click', () => {
            updateChart(threeMonthsData, monthDate);
          });

        document.getElementById('all-btn').addEventListener('click', () => {
          updateChart(alltime, []);
        });

        let chart = new ApexCharts(
          document.querySelector('.chart-area'),
          barOptions,
        );

        chart.render();
      },
      error: function (error) {
        console.error('Error parsing CSV data:', error);
      },
    });
  } catch (error) {
    console.error('Error fetching CSV file:', error);
  }
}

fetchDataAndParseCSV();
