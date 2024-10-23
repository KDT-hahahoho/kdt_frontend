/** @jsxImportSource @emotion/react */
import { MouseEvent } from 'react';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import recordDelete from '/img/icon-counsling-record-delete.svg';
import { useNavigate } from 'react-router-dom';
import { CounselingListData } from './CounselingList';

const CounselingListItem = ({
  item,
  setData,
}: {
  item: CounselingListData;
  setData: React.Dispatch<React.SetStateAction<CounselingListData[]>>;
}) => {
  const navigate = useNavigate();

  const handleDelete = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    //삭제 통신으로 교체 예정
    setData((data) => data.filter((dataItem) => dataItem.counsel_id !== id));
  };

  return (
    <div css={RecordItem} onClick={() => navigate(`/counseling/${item.counsel_id}`)}>
      <div css={ItemLeft} className="left">
        <p>
          최근 상담 <span className="upDate">{item.updated_at.split(' ')[0]}</span>
        </p>

        <div className="tags">
          {item.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      </div>

      <div css={ItemRight} className="right">
        <p>{item.count}회</p>
        <button type="button" onClick={(e) => handleDelete(e, item.counsel_id)}>
          <span className="hidden">삭제</span>
        </button>
      </div>
    </div>
  );
};

export default CounselingListItem;

const RecordItem = css`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 1.8rem 2.4rem;
  border: 0.1rem solid ${variables.colors.gray10};
  box-shadow: 0 0 1rem ${variables.colors.gray10};
  border-radius: 1.2rem;
  color: ${variables.colors.gray100};
  font-size: 1.4rem;
`;

const ItemLeft = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .upDate {
    margin-left: 0.8rem;
  }

  .tags {
    display: flex;
    gap: 1rem;
    color: ${variables.colors.primaryStrong};
    & span {
      padding: 0.4rem 1.4rem;
      border-radius: 1.5rem;
      border: 0.1rem solid ${variables.colors.primarySoft};
    }
  }
`;

const ItemRight = css`
  display: flex;
  gap: 1rem;

  & button {
    display: block;
    width: 2rem;
    height: 2rem;
    background-image: url(${recordDelete});
    background-repeat: no-repeat;
    background-position: center;
  }
`;
