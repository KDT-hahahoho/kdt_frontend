/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import EChartsReact from 'echarts-for-react';
import arrowIcon from '/img/icon-next.svg';
import closeIcon from '/img/icon-counsling-record-delete.svg';
import { ScaleData } from './ScaleList';
import { useState } from 'react';

interface scaleAnalysisDataType {
  id: number;
  type: string;
  analysis: string;
}

const scaleAnalysisData: scaleAnalysisDataType[] = [
  {
    id: 1,
    type: '사회적',
    analysis:
      '난임으로 인해 겪는 사회적 스트레스를 평가합니다. 주변 사람들로부터의 자녀에 대한 기대와 질문으로 인해 압박감을 느끼며, 이런 사회적 압력이 고립감이나 불안감으로 이어질 수 있습니다. 특히, 가족과 친구들 사이에서 난임에 대한 이해가 부족할 때, 어려움을 더 느낄 수 있습니다.',
  },
  {
    id: 2,
    type: '관계적',
    analysis:
      '난임이 부부 관계에 미치는 영향을 평가합니다. 난임으로 인해 서로의 기대와 실망이 충돌하면서 발생하는 갈등과 감정적 거리감을 느낄 수 있습니다. 또한, 난임 치료 과정에서의 스트레스와 부담감이 의사소통의 단절로 이어질 수 있습니다. 이러한 요인들은 관계의 질을 저하시킬 수 있습니다.',
  },
  {
    id: 3,
    type: '성적',
    analysis:
      '난임이 성생활에 미치는 영향을 평가합니다. 성관계가 자녀를 갖기 위한 의무로 느껴지며, 이로 인해 성적 만족도가 저하될 수 있습니다. 성관계가 즐거운 경험이 아니라 강제적으로 이루어질 때, 부부 간의 친밀감이 감소하고 스트레스가 커질 수 있습니다.',
  },
  {
    id: 4,
    type: '아이가 없는 \n일상에 대한 거부',
    analysis:
      '자녀가 없는 삶을 수용하는 데 어려움을 평가합니다. 아이가 없는 삶이 비어있고 공허하게 느껴지며, 난임으로 인해 자녀를 갖지 못하는 상황을 받아들이기 힘든 상태일 수 있습니다. 이러한 거부감은 심리적 스트레스를 증가 시킬 수 있습니다.',
  },
  {
    id: 5,
    type: '부모됨의 필요성',
    analysis:
      '부모가 되고자 하는 강한 욕구와 그에 따른 스트레스를 평가합니다. 자녀를 갖지 못하는 것이 개인의 삶의 목표를 이루지 못한 것처럼 느끼며, 이로 인해 큰 좌절감과 무력감을 경험할 수 있습니다. 이러한 욕구가 충족되지 않을 때, 삶의 의미와 정체성에 대한 불안이 커질수있습니다.',
  },
];

const ScaleTypeGraph = ({
  currentTest,
  beforeTest,
}: {
  currentTest: ScaleData | undefined;
  beforeTest: ScaleData | undefined;
}) => {
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState<scaleAnalysisDataType>();

  const typeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      show: false,
    },

    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      max: 36,
      axisLabel: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      interval: 6,
    },
    yAxis: {
      show: false,
      type: 'category',
      data: ['사회적', '관계적', '성적', '아이가 없는\n일상에 대한 거부', '부모됨의 필요성'],
      inverse: true,
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        name: 'last',
        type: 'bar',
        barWidth: '30%',
        barCategoryGap: '50%',
        cursor: 'default',
        itemStyle: {
          color: `${variables.colors.gray50}`,
          borderRadius: [0, 5, 5, 0],
        },
        labelLine: {
          show: true,
        },
        data: [
          `${beforeTest?.social}`,
          `${beforeTest?.relational}`,
          `${beforeTest?.sexual}`,
          `${beforeTest?.refusing}`,
          `${beforeTest?.essential}`,
        ],
      },
      {
        name: 'today',
        type: 'bar',
        barWidth: '30%',
        barCategoryGap: '50%',
        cursor: 'default',
        itemStyle: {
          color: `${variables.colors.primary}`,
          borderRadius: [0, 5, 5, 0],
        },
        data: [
          `${currentTest?.social}`,
          `${currentTest?.relational}`,
          `${currentTest?.sexual}`,
          `${currentTest?.refusing}`,
          `${currentTest?.essential}`,
        ],
      },
    ],
  };

  const onAnalysisModal = (analysis: scaleAnalysisDataType) => {
    setIsModal(true);
    setModalData(analysis);
  };

  return (
    <div css={TypeSection}>
      <div css={TypeGraph}>
        <div className="graphTit">
          {scaleAnalysisData.map((item, i) => (
            <button key={i} type="button" onClick={() => onAnalysisModal(item)}>
              {item.type}
              <span>
                <img src={arrowIcon} alt="상세 설명 아이콘" />
              </span>
            </button>
          ))}
        </div>
        <div className="graph">
          <EChartsReact option={typeOption} opts={{ renderer: 'svg' }} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      <div css={TypeText}>
        <p className="lastDay">최근 검사 결과</p>
        <p className="toDay">오늘의 결과</p>
      </div>

      {isModal && (
        <div css={Modal}>
          <div className="modalContent">
            <div className="modalHeader">
              <h3>{modalData?.type}</h3>
              <button className="close" type="button" onClick={() => setIsModal(false)}>
                <span className="hidden">창 닫기</span>
              </button>
            </div>
            <p>{modalData?.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleTypeGraph;

const TypeSection = css`
  background-color: ${variables.colors.white};
  width: 100%;
  border: 0.1rem solid ${variables.colors.gray5};
  box-shadow: ${variables.BoxShadow};
  border-radius: 1rem;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TypeGraph = css`
  display: flex;
  border: 0.1rem solid ${variables.colors.gray50};
  border-left: none;
  .graphTit {
    display: flex;
    flex-direction: column;

    & button {
      padding: 0 1rem;
      border-bottom: 0.1rem solid ${variables.colors.gray50};
      display: flex;
      gap: 1rem;
      align-items: center;
      width: 13rem;
      height: 20%;

      & span {
        flex-shrink: 0;
      }
    }

    & button:last-child {
      border-bottom: none;
    }
  }
  .graph {
    width: 100%;
    height: 30rem;
  }
`;

const TypeText = css`
  display: flex;
  justify-content: flex-end;
  gap: 2.4rem;

  & p {
    color: #878787;
    font-size: ${variables.size.medium};

    &::before {
      content: '';
      display: inline-block;
      margin-right: 1.2rem;
      width: 0.6rem;
      height: 1.4rem;
      border-radius: 1rem;
      background-color: ${variables.colors.primaryStrong};
    }
  }

  .lastDay {
    &::before {
      background-color: ${variables.colors.gray50};
    }
  }
`;

const Modal = css`
  position: fixed;
  inset: 0;
  background: rgba(115, 121, 128, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .modalContent {
    background: #fff;
    border-radius: 1.6rem;
    padding: 3rem;
    text-align: center;
    width: calc(100% - calc(${variables.layoutPadding} * 2));
    max-width: calc(${variables.maxLayout} - calc(${variables.layoutPadding} * 2));

    .modalHeader {
      display: flex;
      & h3 {
        font-size: ${variables.size.large};
        font-weight: 600;
        margin-bottom: 1.6rem;
        flex-grow: 1;
        margin-left: 5rem;
        text-align: center;
      }

      .close {
        display: block;
        background-image: url(${closeIcon});
        background-repeat: no-repeat;
        background-position: center;
        background-size: cotain;
        width: 5rem;
        height: 2rem;
        margin-top: -1rem;
      }
    }

    & p {
      font-size: ${variables.size.medium};
      color: ${variables.colors.gray100};
    }
  }
`;
