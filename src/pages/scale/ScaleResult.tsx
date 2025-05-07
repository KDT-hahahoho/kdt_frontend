/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import axios from 'axios';
import { ScaleData } from './ScaleList';
import ScaleTotalGraph from './ScaleTotalGraph';
import ScaleTypeGraph from './ScaleTypeGraph';
import PageTitle from '@components/common/PageTitle';
import { infertilityTestsRes } from '@data/infertility';

// const SCALEDATA_URL = 'https://www.wishkr.site/infertility/tests/';

interface ScaleResponse {
  before_test: ScaleData;
  current_test: ScaleData;
}

const ScaleResult = () => {
  const [scaleData, setScaleData] = useState<ScaleResponse>();
  const userName = localStorage.getItem('userName');
  // const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const hasInURL = location.pathname.includes('list');
  // const memeberId = localStorage.getItem('MemberId');

  // const fetchScaleData = async (): Promise<ScaleData | undefined> => {
  //   try {
  //     const res = await axios.get(`${SCALEDATA_URL}${params.id}/`, {
  //       params: { member_id: memeberId },
  //       headers: {
  //         'content-type': 'application/json',
  //         accept: 'application/json',
  //       },
  //     });
  //     if (res.status === 200) setScaleData(res.data.result);
  //   } catch (err) {
  //     console.error(err);
  //     return undefined;
  //   }
  // };

  useEffect(() => {
    // fetchScaleData();
    setScaleData(infertilityTestsRes.result);
  }, []);

  const ListTitle = css`
    text-align: center;
    ${!hasInURL && `text-align: left;`}
    ${hasInURL && `margin-top:8rem;`}
    font-size: 1.6rem;
    color: ${variables.colors.gray70};
  `;

  return (
    <>
      <div css={BackGroundColor}>
        {hasInURL ? (
          <PageTitle titleText="난임 스트레스 척도 분포도" textAlign="center" pageBack={true} isFixed={true} />
        ) : (
          <PageTitle
            titleText={`${userName}님의 난임 스트레스 척도분포도`}
            textAlign="left"
            pageBack={false}
            isFixed={false}
            backcolor="none"
          />
        )}

        <div css={ContentWrapper}>
          <p css={ListTitle}>난임 스트레스 검사 기준으로 분류되었어요</p>
          <ScaleTotalGraph currentTest={scaleData?.current_test} beforeTest={scaleData?.before_test} />
          <ScaleTypeGraph currentTest={scaleData?.current_test} beforeTest={scaleData?.before_test} />

          {!hasInURL && (
            <Button
              text="스트레스 척도 리스트로 돌아가기 "
              onClick={() => navigate('/scale/list')}
              disabled={false}
              type="button"
              size="large"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ScaleResult;

const BackGroundColor = css`
  background-color: ${variables.colors.gray5};
  margin: 0 -1.8rem -5rem;
`;

const ContentWrapper = css`
  padding: 0 ${variables.layoutPadding} 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2.2rem;
  min-height: 100svh;
`;
