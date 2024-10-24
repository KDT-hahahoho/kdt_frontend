import useAnalysisStore from '@store/useAnalysisStore';
import variables from '@styles/Variables';
import ECharts from 'echarts-for-react';
import React, { useState } from 'react';

interface EmotionData {
  value: number;
  name: string;
  color: string;
}

const EmotionGraph: React.FC = () => {
  const analysisResult = useAnalysisStore((state) => state.analysis);

  const data: EmotionData[] = [
    { value: analysisResult.emotions.anger, name: '분노', color: `${variables.colors.primary}` },
    { value: analysisResult.emotions.disgust, name: '혐오', color: `${variables.colors.primaryLight}` },
    { value: analysisResult.emotions.fear, name: '공포', color: `${variables.colors.primarySoft}` },
    { value: analysisResult.emotions.joy, name: '기쁨', color: `${variables.colors.primaryStrong}` },
    { value: analysisResult.emotions.sadness, name: '슬픔', color: `${variables.colors.secondary}` },
    { value: analysisResult.emotions.surprise, name: '놀람', color: `${variables.colors.secondarySoft}` },
  ];
  console.log(data.map((v) => v.color));

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
        data: data.map((v) => ({
          value: v.value,
          name: v.name,
          itemStyle: {
            color: v.color,
            borderRadius: 4,
            borderColor: '#fff',
            borderWidth: 2,
          },
        })),
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
      },
    ],
  });

  return (
    <div className="BarChartDiv">
      <ECharts option={options} opts={{ width: 'auto', height: 'auto' }} />
    </div>
  );
};

export default EmotionGraph;
