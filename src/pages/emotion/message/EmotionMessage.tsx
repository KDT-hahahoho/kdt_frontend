// 진욱

import Button from '@components/common/Button';
import useEmotionStore from '@store/useEmotionStore';
import { useEffect, useState } from 'react';
import {
  DashedLine,
  MessageArea,
  MessageContainer,
  MessageItem,
  MessageSection,
  MessageTitle,
  ProfileImage,
  ProgressBar,
  TitleText,
} from './EmotionMessage.style';
import fetchGPT from '@hooks/useGPT';
import useAnalysisStore from '@store/useAnalysisStore';
// import { useNavigate } from 'react-router-dom';

const EmotionMessage = () => {
  const emotionRecord = useEmotionStore((state) => state.record);
  const updateMessage = useEmotionStore((state) => state.updateMessage);
  const currentStep = useAnalysisStore((state) => state.step);
  const updateStep = useAnalysisStore((state) => state.updateStep);
  const updateAnalysis = useAnalysisStore((state) => state.updateAnalysis);
  const [messageToMe, setMessageToMe] = useState<string>('');
  const [messageToSpouse, setMessageToSpouse] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  // const navigate = useNavigate();

  // 임시 데이터
  const isInfertility = true;
  const keywords = ['운동', '영화', '휴식'].join(',');
  const [currentTotalScore, currentSocial, currentSexual, currentRelational, currentRefusing, currentEssential] = [
    120, 23, 21, 25, 18, 33,
  ];
  // 프롬프트 작성
  const prompt = `
  - 답변 형식: {"prediction": {"totalScore": "숫자", "social": "숫자", "sexual": "숫자", "relational": "숫자", "refusing": "숫자", "essential": "숫자"}, "emotions": {"joy": "숫자", "sadness": "숫자", "anger": "숫자", "fear": "숫자", "surprise": "숫자", "disgust": "숫자"}, "missions": ["내용", "내용"], "keywords": ["내용", "내용", "내용"]}

  - 사용자의 특성: ${isInfertility ? '난임 부부' : ''} 난임스트레스 척도 ${currentTotalScore}/230점
  - 사용자의 관심사: ${keywords}

  - prediction: 
  
  우리가 시행하는 난임스트레스 척도 검사는 난임 요인 목록(Fertility Problem Inventory)을 변형하여 사회적 영역(10문제), 관계적 영역(10문제), 성적 영역(8문제), 아이 없는 일상에 대한 거부 영역(8문제), 부모됨의 필요성 영역(10문제) - 5가지 영역 총 46개 문항으로 이루어진 검사야.

  사회적 영역의 대표적인 질문으로는 "아이에 관한 질문을 받아도 불편하지 않다.", "가족들은 아이가 없다고 해서 우리를 다르게 대하지 않는다.", "나는 아이가 있는 친구들과도 여전히 공통관심사가 많다." 등이 있어.
  관계적 영역의 대표적인 질문으로는 "난임 문제를 이야기할 때 배우자는 나의 말에 위로를 얻는 것 같다.", "난임 문제를 해결하기 위해 우리 부부는 함께 노력한다.", "난임 문제로 배우자와 헤어지는 것은 상상해 본 적이 없다." 등이 있어.
  성적 영역의 대표적인 질문으로는 "나는 다른 여성(남성)들과 다르지 않다.", "배우자에게 나는 여전히 매력적인 존재이다.", "내 성생활은 성공적이다" 등이 있어.
  아이 없는 일상에 대한 거부 영역의 대표적인 질문으로는 "아이가 없는 부부도 아이가 있는 부부처럼 행복하다.", "아이가 없어도 배우자와 함께 행복한 삶을 상상할 수 있다.", "아이가 내 행복의 필요조건은 아니다." 등이 있어.
  부모됨의 필요성 영역의 대표적인 질문으로는 "아이를 갖는 것이 인생의 주요 목적은 아니다.", "내 결혼생활에는 아이는 필수가 아니다.", "나는 지금까지 부모가 되지 않아도 괜찮다고 생각해왔다." 등이 있어.

  각 문항 별 점수는 매우 그렇다 1점 ~ 전혀 그렇지 않다 5점으로, 총 46점 ~ 230점의 결과가 나오는데 점수는 낮을수록 좋은거야.
  
  가장 최근 검사 결과는 총점 ${currentTotalScore}점, 사회적 영역 ${currentSocial}점, 관계적 영역 ${currentRelational}점, 성적 영역 ${currentSexual}점, 아이 없는 일상에 대한 거부 영역 ${currentRefusing}점, 부모됨의 필요성 영역 ${currentEssential}점이야.

  사용자의 특성을 고려하여 오늘 사용자의 기분 좋았던 일, 안 좋았던 일, 임신을 위해 한 노력, 본인과 배우자에게 해 주고 싶은 말을 토대로 척도 총점수를 예상해서 "totalScore"에 숫자 형태로 저장해줘.
  사회적 영역(10문제)은 몇 점일지 예상해서 "social"에 숫자 형태로 저장해주고, 성적 영역(8문제)은 몇 점일지 예상해서 "sexual"에 숫자 형태로 저장해줘.
  관계적 영역(10문제)은 몇 점일지 예상해서 "relational"에 숫자 형태로 저장해주고, 아이 없는 일상에 대한 거부 영역(8문제)은 몇 점일지 예상해서 "refusing"에 숫자 형태로 저장해줘.
  마지막으로 부모됨의 필요성 영역(10문제)은 몇 점일지 예상해서 "essential"에 숫자 형태로 저장해줘.

  - emotions: 사용자의 특성을 고려하여 오늘 사용자가 기분 좋았던 일, 안 좋았던 일, 임신을 위해 한 노력, 본인과 배우자에게 해 주고 싶은 말을 토대로 사용자의 감정을 Plutchik의 감정 휠 6가지 범주, "joy", "sadness", "anger", "fear", "surprise", "disgust"로 나누어 각각 비율이 몇 퍼센트인지 숫자 형태로 객체 담아서 저장해줘.

  - missions: 사용자는 ${keywords}에 관심이 있는데, 이 관심사를 바탕으로 난임스트레스 해소를 위해 하루 동안 할 수 있는 간단하고 현실적인 미션 2가지를 "내일 하루는 어디에서 어떤 것을 해보세요" 형태로 배열에 저장해줘. 배우자와 함께 할 수 있는 미션이 하나 정도 있으면 좋을 것 같아. 내향적인 성향과 외향적인 성향이 50:50인 사람 기준으로 추천해줘. 장소가 없어도 되고, 장소가 있다면 장소와 행동이 조화로워야 해.

  - keywords : 사용자의 오늘 하루 기분 좋았던 일과 사용자의 관심사 ${keywords}를 토대로 사용자가 요즘 어떤 것에 관심이 있는지 명사형, "~하기", 또는 "~하는 것"의 형태로 3가지 뽑아서 배열에 저장해줘. 장소는 어떤 공간인지가 중요하고 지역은 별로 중요하지 않아. 세 가지 키워드가 서로 겹치지 않는 범주였으면 좋겠어.
  `;

  // 보내기 버튼 비활성화
  useEffect(() => {
    if (messageToMe.trim() && messageToSpouse.trim()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [messageToMe, messageToSpouse]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, to: string) => {
    const value = e.target.value;
    const lines = value.split('\n');

    // 2줄 이상 입력 방지
    if (lines.length > 2) {
      return;
    }

    // 50자 이상 입력 방지
    if (value.length > 50) return;

    if (to === 'me') {
      setMessageToMe(value);
    } else {
      setMessageToSpouse(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateMessage(messageToMe, messageToSpouse);
    const userInput = `
    - 오늘 하루 기분 좋았던 일은 다음과 같다 : ${emotionRecord.good.map((item) => item.replace(/\n+/g, ',')).join(',')}
    - 오늘 하루 기분이 좋지 않았던 일은 다음과 같다 : ${emotionRecord.bad.map((item) => item.replace(/\n+/g, ',')).join(',')}
    - 오늘은 임신을 위해 다음과 같은 노력을 했다 : ${emotionRecord.effort.map((item) => item.replace(/\n+/g, ',')).join(',')}
    - 오늘 나 자신에게 해 주고 싶은 말은 다음과 같다. ${messageToMe.replace(/\n+/g, ',')}
    - 오늘 배우자에게 해 주고 싶은 말은 다음과 같다 : ${messageToSpouse.replace(/\n+/g, ',')}
    `;

    // GPT 호출
    const data = await fetchGPT(prompt, userInput, 'record');
    const dataToObj = JSON.parse(data.choices[0].message.content);

    updateAnalysis(dataToObj);
    updateStep(currentStep + 1);
    // navigate()
  };

  return (
    <MessageSection>
      <ProgressBar>
        <DashedLine />
      </ProgressBar>
      <MessageContainer onSubmit={handleSubmit}>
        <MessageItem>
          <MessageTitle>
            <ProfileImage gender="female" />
            <TitleText>
              <p>오늘의 나에게 한마디</p>
              <p>사용자님에게 하루동안 보여지는 메시지예요</p>
            </TitleText>
          </MessageTitle>
          <MessageArea>
            <textarea
              rows={2}
              maxLength={50}
              placeholder="50자 이내로 입력해주세요."
              value={messageToMe}
              onChange={(e) => handleInputChange(e, 'me')}
            />
          </MessageArea>
        </MessageItem>
        <MessageItem>
          <MessageTitle second>
            <ProfileImage gender="male" />
            <TitleText>
              <p>오늘의 남편에게 한마디</p>
              <p>남편이 미션을 완료하면 볼 수 있는 메시지예요</p>
            </TitleText>
          </MessageTitle>
          <MessageArea second>
            <textarea
              rows={2}
              placeholder="50자 이내로 입력해주세요."
              maxLength={50}
              value={messageToSpouse}
              onChange={(e) => handleInputChange(e, 'spouse')}
            />
          </MessageArea>
        </MessageItem>
        <pre>{`응원이 될 수 있는 한마디가 중요해요!\n가끔은 위시 한마디를 통해 농담을 보내봐도 좋아요`}</pre>
        <Button text="보내기" disabled={isDisabled} type="submit" size="medium" />
      </MessageContainer>
    </MessageSection>
  );
};

export default EmotionMessage;
