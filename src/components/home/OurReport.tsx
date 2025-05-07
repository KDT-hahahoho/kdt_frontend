import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React, { useEffect, useState } from 'react';
import EChartsReact from 'echarts-for-react';
import notInftest from '@assets/Images/notInftest.svg';

interface InfTest {
  essential: number;
  refusing: number;
  relational: number;
  sexual: number;
  social: number;
  total: number;
}

interface CoupleData {
  result?: {
    my_inf_tests?: InfTest[];
    spouse_inf_tests?: InfTest[];
  };
}

interface ChartOptions {
  legend: {
    show: boolean; // legend 표시 여부
    top: string;
    // left: 'center',  // 좌우 위치 설정 (선택사항)
  };
  xAxis: {
    type: string;
    data: string[];
    axisLabel: {
      interval: number;
    };
    axisTick: {
      alignWithLabel: boolean;
    };
  };
  yAxis: {
    type: string;
  };
  grid: {
    top: number | string;
  };
  series: Array<{
    name: string;
    data: number[];
    type: string;
    color: string;
  }>;
}

interface OurReportProps {
  coupleData: CoupleData;
}

const OurReport = ({ coupleData }: OurReportProps) => {
  const [testdone, setTestDone] = useState<boolean>(false);

  const [options, setOptions] = useState<ChartOptions>({
    legend: {
      show: true, // legend 표시 여부
      top: 'top', // legend의 위치 (top, bottom, middle 등)
      // left: 'center',  // 좌우 위치 설정 (선택사항)
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        interval: 0,
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: { type: 'value' },
    grid: {
      top: '10%',
    },
    series: [],
  });

  useEffect(() => {
    if (coupleData?.result?.my_inf_tests?.[0] && coupleData?.result?.spouse_inf_tests?.[0]) {
      const categories = ['필요성', '거부감', '관계성', '성역할', '사회성'];
      const myData = [
        coupleData.result.my_inf_tests[0].essential,
        coupleData.result.my_inf_tests[0].refusing,
        coupleData.result.my_inf_tests[0].relational,
        coupleData.result.my_inf_tests[0].sexual,
        coupleData.result.my_inf_tests[0].social,
        // coupleData.result.my_inf_tests[0].total,
      ];
      const spouseData = [
        coupleData.result.spouse_inf_tests[0].essential,
        coupleData.result.spouse_inf_tests[0].refusing,
        coupleData.result.spouse_inf_tests[0].relational,
        coupleData.result.spouse_inf_tests[0].sexual,
        coupleData.result.spouse_inf_tests[0].social,
        // coupleData.result.spouse_inf_tests[0].total,
      ];

      setTestDone(true);
      setOptions({
        legend: {
          show: true, // legend 표시 여부
          top: 'top', // legend의 위치 (top, bottom, middle 등)
          // left: 'center',  // 좌우 위치 설정 (선택사항)
        },
        xAxis: {
          type: 'category',
          data: categories,
          axisLabel: {
            interval: 0,
          },
          axisTick: {
            alignWithLabel: true,
          },
        },
        yAxis: { type: 'value' },
        grid: {
          top: '40px',
        },
        series: [
          { name: '본인', data: myData, type: 'line', color: variables.colors.primary },
          { name: '배우자', data: spouseData, type: 'line', color: variables.colors.secondary },
        ],
      });
    }
  }, [coupleData]);

  return (
    <OurReportContainer>
      <OurReportTitle>우리의 리포트</OurReportTitle>
      <OurReportTitleDes>나의 통계와 배우자의 통계를 한눈에 확인할 수 있어요</OurReportTitleDes>
      {testdone ? (
        <OurReportLineChartContainer>
          <ChartDescription>스트레스 척도</ChartDescription>
          <EChartsReact option={options} style={{ width: '100%', height: '28rem', marginBottom: '-2rem' }} />
        </OurReportLineChartContainer>
      ) : (
        <>
          <NoResult src={notInftest} alt="No test result" />
          <Notification>난임 스트레스 척도 검사를 완료해주세요</Notification>
        </>
      )}
    </OurReportContainer>
  );
};

export default OurReport;

const NoResult = styled.img`
  width: 100%;
  margin-top: 6rem;
  height: 26rem;
  margin-bottom: 1.8rem;
`;

const Notification = styled.div`
  width: 100%;
  height: 4rem;
  border-radius: ${variables.borderRadius};
  background-color: ${variables.colors.gray10};
  display: flex;
  justify-content: center;
  color: ${variables.colors.gray100};
  font-size: ${variables.size.medium};
  align-items: center;
`;

const OurReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const OurReportTitle = styled.h1`
  font-size: ${variables.size.large};
  font-weight: 600;
`;

const OurReportTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const OurReportLineChartContainer = styled.div`
  width: 100%;
  /* height: 28rem; */
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 3rem;
  padding: 0 1.3rem;
`;

const ChartDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
