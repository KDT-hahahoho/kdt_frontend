import variables from '@styles/Variables';
import React, { useState } from 'react';
import ECharts from 'echarts-for-react';
import useAnalysisStore from '@store/useAnalysisStore';
import styled from '@emotion/styled';

const EmotionStressBefore = ({
  total,
  color = `${variables.colors.secondaryStrong}`,
  text = '기존 점수',
}: {
  total: number;
  color?: string;
  text?: string;
}) => {
  const analysisResult = useAnalysisStore((state) => state.analysis);
  const value = total * 0.5;

  // console.log(analysisResult);
  // console.log(total);

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
        color: color,

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
            borderColor: color,
          },
        },
        axisLine: {
          lineStyle: {
            width: 12,
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
        data: [
          {
            value: value,
          },
        ],
        detail: {
          fontSize: 22,
          color: color,
          formatter: '{value}',
          offsetCenter: ['0', '0%'],
        },
        radius: '60%',
        clockwise: false,
      },
    ],
  });

  return (
    <StressText className="xxx">
      <div className="stress-box">
        <ECharts option={options} opts={{ width: 170, height: 170 }} />
      </div>
      <p className="stress-sub-text">{text}</p>
    </StressText>
  );
};

export const StressText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .stress-box {
    width: 100%;
    height: 18rem;
  }

  .stress-sub-text {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${variables.colors.gray100};
    margin: -2rem 0 3rem;
  }
`;

export default EmotionStressBefore;
