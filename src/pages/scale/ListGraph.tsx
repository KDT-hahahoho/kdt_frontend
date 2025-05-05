/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';
import { ScaleData } from './ScaleList';

const ListGraph = ({ data }: { data: ScaleData[] }) => {
  const dataList = data.length > 6 ? data.slice(0, 6).reverse() : data.reverse();

  const typeOption = {
    color: `${variables.colors.primary}`,
    grid: {
      left: 0,
      right: 1,
      top: 5,
      bottom: '5%',
      containLabel: true,
    },

    tooltip: {
      trigger: 'axis',
    },

    xAxis: {
      type: 'category',
      data: dataList.map((scale: ScaleData) => scale.created_at!.split('T')[0].slice(5).split('-').join('.')),
      offset: 10,
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        margin: 0,
        interval: 0,
        color: `${variables.colors.gray100}`,
        fontSize: '1.2rem',
      },
      interval: 100,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#e0e0e0',
          type: 'solid',
        },
      },
    },

    yAxis: {},

    series: [
      {
        name: '점수',
        type: 'bar',
        barWidth: 16,
        cursor: 'default',
        itemStyle: {
          borderRadius: [5, 5, 0, 0],
          shadowColor: 'rgba(197, 178, 255, 0.6)',
          shadowBlur: 8,
        },
        data: dataList.map((scale) => scale.total),
      },
    ],
  };

  return (
    <>
      <div css={TypeSection}>
        <div css={TypeGraph}>
          <EChartsReact option={typeOption} opts={{ renderer: 'svg' }} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      <span className="desc">스트레스 검사 지수</span>
    </>
  );
};

export default ListGraph;

const TypeSection = css`
  border: 1px solid ${variables.colors.primarySoft};
  box-shadow: ${variables.BoxShadow};
  border-radius: 1rem;
  padding: 2.2rem;
`;

const TypeGraph = css`
  width: 100%;
  height: 17rem;
`;
