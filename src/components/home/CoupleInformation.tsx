import styled from '@emotion/styled';
import variables from '@styles/Variables';
import profileImgWomen from '@assets/Images/mainFemaleProfile.svg';
import profileImgMan from '@assets/Images/mainManProfile.svg';
import mainlock from '@assets/Images/mainlock.svg';
import { useNavigate } from 'react-router-dom';
// import { useCoupleInfo } from '@hooks/useCoupleInfo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CoupleMissionWeekly from './CoupleMissionWeekly';
import { coupleRes } from '@data/couple';

// TODO : 미션 등록 이번주 미션 해야함
interface InfTest {
  essential: number;
  refusing: number;
  relational: number;
  sexual: number;
  social: number;
  total: number;
  self_message?: string;
  id: number;
  mission_content?: string;
  is_complement?: boolean;
  export_message?: string;
}

interface CoupleData {
  result?: {
    my_inf_tests?: InfTest[];
    spouse_inf_tests?: InfTest[];
    my_emotion?: InfTest;
    spouse_emotion?: InfTest;
    export_message?: string;
  };
}

interface OurReportProps {
  coupleData: CoupleData;
}

const CoupleInformation = ({ coupleData }: OurReportProps) => {
  const navigate = useNavigate();
  const [selfMessage, setSelfMessage] = useState('');
  const [mission, setMission] = useState('');
  // isMissionDone 초기값을 서버 데이터와 동기화
  const [isMissionDone, setIsMissionDone] = useState(false);
  // const { partnerName, myName, gender, isConnected } = useCoupleInfo();
  const { partnerName, myName, gender, isConnected } = coupleRes.result;
  const myMissionCompleted = coupleData?.result?.my_emotion?.is_complement || false;
  const spouseMissionCompleted = coupleData?.result?.spouse_emotion?.is_complement || false;
  const spouseExportMessage = coupleData?.result?.spouse_emotion?.export_message || '';

  const getMissionStatusMessage = () => {
    if (myMissionCompleted && spouseMissionCompleted) {
      return spouseExportMessage || '배우자의 메시지가 없습니다';
    } else if (myMissionCompleted) {
      return '배우자 미션 수행 대기중';
    } else {
      return '미션을 수행하면 배우자의 한마디를 볼 수 있어요';
    }
  };

  const [prevEmotionId, setPrevEmotionId] = useState<number | null>(null);

  useEffect(() => {
    const emotion = coupleData?.result?.my_emotion;
    const currentEmotionId = emotion?.id;

    // 이전 이모션 ID와 현재 이모션 ID가 다르면 새로운 미션으로 간주
    if (currentEmotionId && prevEmotionId !== currentEmotionId) {
      setSelfMessage(emotion?.self_message || '');
      setMission(emotion?.mission_content || '');
      setIsMissionDone(false); // 새로운 미션이므로 미션 수행 여부 초기화
      setPrevEmotionId(currentEmotionId); // 현재 이모션 ID 저장
    } else if (!currentEmotionId) {
      // 이모션이 없는 경우 초기화
      setSelfMessage('');
      setMission('');
      setIsMissionDone(false);
      setPrevEmotionId(null);
    }
  }, [coupleData?.result?.my_emotion?.id, prevEmotionId]);

  /** 미션 수행 등록 함수 {PUT} */
  const handleMissionToggle = async () => {
    try {
      if (!isMissionDone) {
        setIsMissionDone(true);
        if (coupleData?.result?.my_emotion) {
          const result_id = coupleData.result.my_emotion.id;

          const requestData = {
            is_complement: true,
          };

          const response = await axios.put(`https://www.wishkr.site/emotions/results/${result_id}/`, requestData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('요청 성공:', response.data);
        }
      }
    } catch (error) {
      console.error('에러:', error);
      setIsMissionDone(false);
    }
  };

  // 서버 데이터가 변경될 때마다 로컬 상태 업데이트
  useEffect(() => {
    const emotion = coupleData?.result?.my_emotion;
    setSelfMessage(emotion?.self_message || '');
    setMission(emotion?.mission_content || '');
    // isMissionDone 상태를 서버 데이터와 동기화
    setIsMissionDone(emotion?.is_complement || false);
  }, [coupleData]);

  return (
    <CoupleInformationContainer>
      <CoupleInfoTitle>{selfMessage ? selfMessage : '원활한 사용을 위해 부부 연동이 필요해요!'}</CoupleInfoTitle>

      <CoupleCardsWrapper>
        <PersonalCard>
          <CardImage src={gender === 'M' ? profileImgMan : profileImgWomen} alt="User Image" />
          <CardName>{myName}</CardName>
          <EmotionAnalysis>감정 분석 필요</EmotionAnalysis>
        </PersonalCard>
        <SpouseCard
          onClick={() => {
            navigate('/users/follow');
          }}
        >
          <CardImage
            src={isConnected ? (gender === 'M' ? profileImgWomen : profileImgMan) : mainlock}
            alt="Spouse Image"
          />
          <CardName>{partnerName || '배우자 이름'}</CardName>
          <EmotionAnalysis>{partnerName ? '감정분석 필요' : '연동 필수'}</EmotionAnalysis>
        </SpouseCard>
      </CoupleCardsWrapper>

      <CoupleMission>
        {partnerName ? getMissionStatusMessage() : '배우자 연동을 하면 미션 등록이 가능해요'}
      </CoupleMission>

      {mission && (
        <CoupleMissionToChoose isMissionDone={isMissionDone}>
          <MissionTitle>{mission}</MissionTitle>
          {!isMissionDone && <IsMissionDone type="checkbox" checked={isMissionDone} onChange={handleMissionToggle} />}
          {isMissionDone && <CompletedLabel>완료</CompletedLabel>}
        </CoupleMissionToChoose>
      )}

      <CoupleMissionWeekly></CoupleMissionWeekly>
    </CoupleInformationContainer>
  );
};
export default CoupleInformation;

const CompletedLabel = styled.span`
  color: ${variables.colors.primary};
  font-weight: 600;
  font-size: ${variables.size.medium};
`;

const CoupleInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CoupleInfoTitle = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${variables.colors.gray10};
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  padding: 1rem 0;
  color: ${variables.colors.gray100};
  margin-bottom: 1.4rem;
`;

const CoupleCardsWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  margin-bottom: 3.6rem;
`;

const PersonalCard = styled.div`
  border-radius: 1.6rem;
  width: 50%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
`;

const SpouseCard = styled.div`
  border-radius: 1.6rem;
  width: 50%;
  height: 21rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
`;
const CardImage = styled.img`
  width: 11rem;
  height: 10rem;
  border-radius: 50%;
  margin-bottom: 1.8rem;
  transform: scaleX(-1);
`;

const CardName = styled.div`
  font-size: ${variables.size.medium};
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const EmotionAnalysis = styled.div`
  font-size: ${variables.size.medium};
  text-align: center;
  color: ${variables.colors.primary};
`;

const CoupleMission = styled.div`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
  border: 1px solid ${variables.colors.secondaryStrong};
  position: relative;
  background: ${variables.colors.secondarySoft};

  &::before {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    right: 20%;
    transform: translateY(-56%) rotate(-45deg) skew(-17deg, -17deg);
    width: 2rem;
    aspect-ratio: 1/1;
    background: ${variables.colors.secondarySoft};
    border-top: 1px solid ${variables.colors.secondaryStrong};
    border-right: 1px solid ${variables.colors.secondaryStrong};
  }
`;

const CoupleMissionToChoose = styled.div<{ isMissionDone: boolean }>`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1); */
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
  padding: 1.4rem 2.5rem;
  border: ${({ isMissionDone }) => (isMissionDone ? `1px solid ${variables.colors.primary}` : 'transparent')};
  border-color: ${({ isMissionDone }) => (isMissionDone ? variables.colors.primary : 'transparent')};
  background: ${variables.colors.primaryLight};
`;

const MissionTitle = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
`;

const IsMissionDone = styled.input`
  margin-right: -0.5rem;
  width: 2.4rem;
  height: 2.4rem;
  flex-grow: 0;
`;
