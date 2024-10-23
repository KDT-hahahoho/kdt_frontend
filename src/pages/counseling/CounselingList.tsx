/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import noRecord from '/img/no-counseling-record.svg';
import CounselingListItem from './CounselingListItem';

export interface CounselingListData {
  counsel_id: number;
  member_id: number;
  count: number;
  summary: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

const CounselingData = [
  {
    counsel_id: 1,
    member_id: 1,
    count: 3,
    summary: '1번 상담 요약내용',
    tags: ['남편', '병원', '리시안셔스'],
    created_at: '2024.04.09 08:13:00',
    updated_at: '2024.04.09 08:13:00',
  },
  {
    counsel_id: 2,
    member_id: 1,
    count: 4,
    summary: '2번 상담 요약내용',
    tags: ['부모님', '병원', '아이'],
    created_at: '2024.04.09 08:13:00',
    updated_at: '2024.04.09 08:13:00',
  },
  {
    counsel_id: 3,
    member_id: 1,
    count: 3,
    summary: '3번 상담 요약내용',
    tags: ['회사', '상사', '일'],
    created_at: '2024.04.09 08:13:00',
    updated_at: '2024.04.09 08:13:00',
  },
  {
    counsel_id: 4,
    member_id: 1,
    count: 3,
    summary: '3번 상담 요약내용',
    tags: ['친구', '지인', '부부'],
    created_at: '2024.04.09 08:13:00',
    updated_at: '2024.04.09 08:13:00',
  },
];

const CounselingList = () => {
  const [record, setRecord] = useState(true);
  const [data, setData] = useState<CounselingListData[]>(CounselingData);
  const navigate = useNavigate();

  const counselingRecordItem = data?.map((item) => (
    <CounselingListItem key={item.counsel_id} item={item} setData={setData} />
  ));

  return (
    <div css={background}>
      <div css={Header} className="header">
        <h2>위시 상담 목록</h2>
      </div>
      {record ? (
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

const background = css`
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NoRecordCover = css`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    object-fit: cover;
  }
`;

const Header = css`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  max-width: 50rem;
  width: 100%;
  min-height: ${variables.headerHeight};
  padding: 1.8rem;
  box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);
  text-align: center;

  h2 {
    font-size: ${variables.size.large};
    font-weight: 700;
  }
`;

const RecordList = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 7rem;
`;
