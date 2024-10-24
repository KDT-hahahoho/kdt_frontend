import variables from '@styles/Variables';
import React, { useState } from 'react';
import ECharts from 'echarts-for-react';

interface StressData {
  value: number;
  name: string;
  color: string;
}

const EmotionStress = () => {
  // const analysisResult = useAnalysisStore((state) => state.analysis);

  const data: StressData[] = [
    {
      value: 55,
      name: '기존 점수',
      color: `${variables.colors.primary}`,
    },
  ];

  const [options] = useState({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        color: `${variables.colors.primaryStrong}`,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: `${variables.colors.primaryStrong}`,
          },
        },
        axisLine: {
          lineStyle: {
            width: 40,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: data,
        title: {
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: `${variables.colors.primary}`,
          borderColor: `${variables.colors.primary}`,
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%',
        },
      },
    ],
  });

  return (
    <div>
      <ECharts option={options} opts={{ width: 'auto', height: 'auto' }} />
      <ECharts option={options} opts={{ width: 'auto', height: 'auto' }} />
    </div>
  );
};

export default EmotionStress;
