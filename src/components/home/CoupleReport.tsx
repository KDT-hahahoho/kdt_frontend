import React, { useState } from 'react';

import styled from '@emotion/styled';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';
import EmotionStressBefore from '@pages/emotion/result/EmotionStressBefore';

type EmotionData = {
  essential?: number;
  refusing?: number;
  relational?: number;
  sexual?: number;
  social?: number;
  total?: number;
} | null;
interface CoupleResult {
  my_emotion: EmotionData;
  spouse_emotion: EmotionData;
  my_inf_tests: EmotionData[];
  spouse_inf_tests: EmotionData[];
}

interface CoupleData {
  result?: CoupleResult;
}

interface CoupleReportProps {
  coupleData?: CoupleData;
}

interface ToggleOptionProps {
  isSelected: boolean;
}

const CoupleReport = ({ coupleData }: CoupleReportProps) => {
  const [selected, setSelected] = useState<'self' | 'partner'>('self');

  const {
    essential: myEssential = 0,
    refusing: myRefusing = 0,
    relational: myRelational = 0,
    sexual: mySexual = 0,
    social: mySocial = 0,
  } = coupleData?.result?.my_emotion || {};
  const {
    essential: myInfEssential = 0,
    refusing: myInfRefusing = 0,
    relational: myInfRelational = 0,
    sexual: myInfSexual = 0,
    social: myInfSocial = 0,
  } = coupleData?.result?.my_inf_tests[0] || {};

  const {
    essential: spouseEssential = 0,
    refusing: spouseRefusing = 0,
    relational: spouseRelational = 0,
    sexual: spouseSexual = 0,
    social: spouseSocial = 0,
  } = coupleData?.result?.spouse_emotion || {};
  const {
    essential: spouseInfEssential = 0,
    refusing: spouseInfRefusing = 0,
    relational: spouseInfRelational = 0,
    sexual: spouseInfSexual = 0,
    social: spouseInfSocial = 0,
  } = coupleData?.result?.spouse_inf_tests[0] || {};
  const option = {
    legend: {
      show: true,
      bottom: '0',
    },
    radar: {
      indicator: [
        { name: '사회적' },
        { name: '성적' },
        { name: '필요성' },
        { name: '아이가 없는 일상' },
        { name: '관계적' },
      ],
      splitNumber: 10,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value:
              selected === 'self'
                ? [mySocial, mySexual, myEssential, myRefusing, myRelational]
                : [spouseSocial, spouseSexual, spouseEssential, spouseRefusing, spouseRelational],
            itemStyle: {
              color: variables.colors.primary,
            },
            name: selected === 'self' ? '검사 점수' : '배우자',
          },
          {
            value:
              selected === 'self'
                ? [myInfSocial, myInfSexual, myInfEssential, myInfRefusing, myInfRelational]
                : [spouseInfSocial, spouseInfSexual, spouseInfEssential, spouseInfRefusing, spouseInfRelational],
            itemStyle: {
              color: variables.colors.secondaryStrong,
            },
            name: '예상 점수',
          },
        ],
      },
    ],
  };

  // console.log(coupleData?.result);

  return (
    <CoupleReportContainer>
      <CoupleReportTitle>
        배우자와 나의 리포트
        <ToggleContainer>
          <ToggleOption isSelected={selected === 'self'} onClick={() => setSelected('self')}>
            본인
          </ToggleOption>
          <ToggleOption isSelected={selected === 'partner'} onClick={() => setSelected('partner')}>
            배우자
          </ToggleOption>
        </ToggleContainer>
      </CoupleReportTitle>
      <CoupleReportTitleDes>나의 통계와 배우자의 통계를 한눈에 확인해요</CoupleReportTitleDes>
      <CoupleReportLineChartContainer>
        <CoupleReportDescription>난임 스트레스 예상 점수</CoupleReportDescription>
        <ChartCover>
          <EChartsReact option={option} />
          {coupleData?.result && (
            <div className="flex-box">
              <EmotionGraphContainer>
                {selected === 'self' && (
                  <>
                    {coupleData?.result?.my_inf_tests[0]?.total && (
                      <EmotionStressBefore
                        total={coupleData?.result?.my_inf_tests[0]?.total}
                        color={variables.colors.primary}
                      />
                    )}
                    {coupleData?.result?.my_emotion?.total && (
                      <EmotionStressBefore total={coupleData?.result?.my_emotion?.total} text="예상 점수" />
                    )}
                  </>
                )}
                {selected === 'partner' && (
                  <>
                    {coupleData?.result?.spouse_inf_tests[0]?.total && (
                      <EmotionStressBefore
                        total={coupleData?.result?.spouse_inf_tests[0]?.total}
                        color={variables.colors.primary}
                      />
                    )}
                    {coupleData?.result?.spouse_emotion?.total && (
                      <EmotionStressBefore total={coupleData?.result?.spouse_emotion?.total} text="예상 점수" />
                    )}
                  </>
                )}
              </EmotionGraphContainer>
            </div>
          )}
        </ChartCover>
      </CoupleReportLineChartContainer>
    </CoupleReportContainer>
  );
};

export default CoupleReport;

const EmotionGraphContainer = styled.div`
  width: 100%;
  display: flex;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d3d3d3;
  width: 10rem;
  height: 3rem;
  border-radius: 2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-size: 1.4rem;
`;

const ToggleOption = styled.div<ToggleOptionProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 1.2rem;
  color: ${({ isSelected }) => (isSelected ? '#B691FF' : '#6e6e6e')};
  background-color: ${({ isSelected }) => (isSelected ? '#efe6fa' : 'transparent')};
  transition:
    background-color 0.3s,
    color 0.3s;
  cursor: pointer;
`;

const CoupleReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 7.6rem;
`;

const ChartCover = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5rem;
`;

const CoupleReportTitle = styled.div`
  font-size: ${variables.size.large};
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const CoupleReportTitleDes = styled.p`
  margin-top: 1rem;
  color: ${variables.colors.gray70};
  font-size: ${variables.size.medium};
`;

const CoupleReportLineChartContainer = styled.div`
  width: 100%;
  margin-bottom: 11rem;
  border: 1px solid ${variables.colors.gray50};
  border-radius: ${variables.borderRadius};
  margin-top: 3rem;
  padding: 0 1.3rem;
`;

const CoupleReportDescription = styled.p`
  margin-top: 1.8rem;
  font-weight: 600;
  font-size: ${variables.size.medium};
  color: ${variables.colors.gray70};
`;
