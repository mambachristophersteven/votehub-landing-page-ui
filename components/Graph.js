import ReactApexChart from "react-apexcharts";

export default function Graph({ data = [], categories = [] }) {
  const series = [
    {
      name: "Votes",
      data: data,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: "#555",
      clipMarkers: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "category",
      categories: categories,
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: "#9b9b9b",
          fontSize: "9px",
          fontFamily: "Rubik",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: "#9b9b9b",
          fontSize: "9px",
          fontFamily: "Rubik",
          fontWeight: 500,
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    enabledOnSeries: false,
    followCursor: false,
    //     tooltip: {
    //       custom: function ({ series, seriesIndex, dataPointIndex, w }) {
    //         return `<div class="tool">
    //     <text class="thead">${series[seriesIndex][dataPointIndex]}</text>
    //       <text class="ttext space">Total User in B.Social </text>

    //       <text style="color: #27d86b" class="thead">${series[1][dataPointIndex]}</text>
    //       <text class="ttext space">Total Active User in B.Social </text>

    //       <text style="color: orange" class="thead">${series[2][dataPointIndex]}</text>
    //       <text class="ttext">Total Contents created in B.Social </text>
    //   </div>`;
    //       },
    //     },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={"85%"}
    />
  );
}
