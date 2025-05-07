/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
// import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CounselingListItem from './CounselingListItem';
import noRecord from '/img/no-counseling-record.svg';
import PageTitle from '@components/common/PageTitle';
import { counselsRecordsRes } from '@data/counsels';

export interface CounselingListData {
  id: number;
  summary: string;
  tags: string;
  count: number;
  created_at: string;
  updated_at: string;
  member_id: number;
}

// const COUNSELINGLIST_URL = 'https://www.wishkr.site/counsels/records/';

const CounselingList = () => {
  const [counselingRecord, setCounselingRecord] = useState<CounselingListData[]>([]);
  // const id = localStorage.getItem('MemberId');
  const navigate = useNavigate();

  // const fetchCounselingData = async (): Promise<CounselingListData | undefined> => {
  //   try {
  //     const res = await axios.get(`${COUNSELINGLIST_URL}?member_id=${id}`, {
  //       headers: {
  //         'content-type': 'application/json',
  //         accept: 'application/json',
  //       },
  //     });

  //     console.log(res.data.result.totalRecords);
  //     if (res.status === 200) setCounselingRecord(res.data.result.totalRecords);
  //   } catch (err) {
  //     console.error(err);
  //     return undefined;
  //   }
  // };

  useEffect(() => {
    // fetchCounselingData();
    setCounselingRecord(counselsRecordsRes.result.totalRecords);
  }, []);

  const counselingRecordItem = counselingRecord?.map((item) => (
    <CounselingListItem key={item.id} item={item} setCounselingRecord={setCounselingRecord} />
  ));

  return (
    <div css={CounselingListWrapper}>
      <PageTitle titleText="위시 상담 목록" textAlign="center" pageBack={false} isFixed={false} backcolor="#fff" />
      {counselingRecord && counselingRecord.length > 0 ? (
        <div css={RecordList}>{counselingRecordItem}</div>
      ) : (
        <div css={NoRecordCover}>
          <img src={noRecord} alt="상담 기록이 없습니다." />
        </div>
      )}

      <Button
        text="새로운 상담 시작하기"
        onClick={() => navigate('/counseling')}
        disabled={false}
        type="button"
        size="large"
        fixed={true}
      />
    </div>
  );
};

export default CounselingList;

const CounselingListWrapper = css`
  min-height: calc(100vh - 4rem);
  display: flex;
  flex-direction: column;
`;

const NoRecordCover = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  & img {
    object-fit: cover;
  }
`;

const RecordList = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 6rem;
`;
