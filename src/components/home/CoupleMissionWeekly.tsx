import styled from '@emotion/styled';
import variables from '@styles/Variables';
// import fetchMissionStatusWeekly from '@hooks/useCheckMissionStatus';
import { useEffect, useState } from 'react';
import { emotionMissionsRes } from '@data/emotions';

type DotStatus = 'bothCompleted' | 'oneCompleted' | 'locked';

interface MissionData {
  is_complement: boolean;
  created_at: string;
}

interface WeeklyStatusType {
  user_is_complement: {
    [key: string]: MissionData[];
  };
  spouse_is_complement: {
    [key: string]: MissionData[];
  };
}

const CoupleMissionWeekly = () => {
  const [weeklyStatus, setWeeklyStatus] = useState<WeeklyStatusType | null>(null);

  useEffect(() => {
    const MemberId = localStorage.getItem('MemberId');
    if (MemberId) {
      const fetchStatus = async () => {
        // const data = await fetchMissionStatusWeekly(MemberId);
        const data = emotionMissionsRes;
        if (data) {
          setWeeklyStatus(data);
        }
      };
      fetchStatus();
    }
  }, []);

  const getDotStatus = (day: string): DotStatus => {
    if (!weeklyStatus) return 'locked';

    const userMission = weeklyStatus.user_is_complement[day]?.[0];
    const spouseMission = weeklyStatus.spouse_is_complement[day]?.[0];

    const userCompleted = userMission?.is_complement || false;
    const spouseCompleted = spouseMission?.is_complement || false;

    if (userCompleted && spouseCompleted) {
      return 'bothCompleted';
    } else if (userCompleted || spouseCompleted) {
      return 'oneCompleted';
    }
    return 'locked';
  };

  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const today = new Date().getDay(); // 0(일요일)부터 6(토요일)
  const mondayOffset = today === 0 ? 6 : today - 1; // 월요일 기준으로 조정

  const dotStatuses: DotStatus[] = days.map((day, index) => {
    if (index > mondayOffset) {
      return 'locked';
    }
    return getDotStatus(day);
  });

  return (
    <CoupleMissionWeeklyUI>
      <Title>이번주 미션</Title>
      <MissionDots>
        {dotStatuses.map((status, index) => (
          <Dot key={index} status={status} />
        ))}
      </MissionDots>
    </CoupleMissionWeeklyUI>
  );
};

const CoupleMissionWeeklyUI = styled.div`
  width: 100%;
  height: 6rem;
  font-size: ${variables.size.medium};
  font-weight: 700;
  display: flex;
  align-items: center;
  box-shadow: inset 0 0 0.3rem rgba(0, 0, 0, 0.1);
  border-radius: calc(${variables.borderRadius} + 0.4rem);
  color: ${variables.colors.black};
  margin-bottom: 1.4rem;
  padding: 1.4rem 2.5rem;
`;

const Title = styled.p`
  margin-right: 1.5rem;
`;

const MissionDots = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const Dot = styled.div<{ status: DotStatus }>`
  width: 2.4rem;
  height: 2.4rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'bothCompleted':
        return variables.colors.primaryStrong; // 보라색 - 둘 다 완료
      case 'oneCompleted':
        return variables.colors.secondaryStrong; // 연한 보라색 - 한 명만 완료
      case 'locked':
        return variables.colors.gray50; // 회색 - 미완료 또는 잠김
      default:
        return variables.colors.gray50;
    }
  }};
  border-radius: 50%;
  transition: background-color 0.3s ease;
`;

export default CoupleMissionWeekly;
