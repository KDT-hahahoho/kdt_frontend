/** @jsxImportSource @emotion/react */
import Button from '@components/common/Button';
import { css } from '@emotion/react';
import variables from '@styles/Variables';
// import axios from 'axios';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import fetchGPT from '../../hooks/useGPT';
import CounselingGuide from './CounslingGuide';
import sendIcon from '/img/icon-send.svg';
import wishIcon from '/img/icon-wish-profile.svg';
import PageTitle from '@components/common/PageTitle';
import TypingEffect from '@hooks/useTyping';
import { counselsRecordsRes } from '@data/counsels';

interface Message {
  sender?: string;
  message?: string;
}

// interface CounselData {
//   member_id: number;
//   summary: string;
//   tags: string;
//   count: number;
// }

const Counseling = () => {
  const params = useParams();
  const navigate = useNavigate();
  // const member_id = Number(localStorage.getItem('MemberId'));
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  // const [scaleData, setScaleData] = useState({ total: 0, belifs: '' });
  const [previousCounsel, setPreviousCounsel] = useState({ summary: '', tags: '', count: 1 });
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [lastMsg, setLastMsg] = useState({ user: '', gpt: '' });
  const [dataForPrompt, setDataForPrompt] = useState({ summary: '', count: 1, caseFoumulation: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setModal] = useState(false);

  const userData = {
    name: localStorage.getItem('userName'),
    total: `100/230`,
    belifs: '아이를 갖기 위해서는 무엇이라도 할 것이다, 친구와 가족이 나와 거리를 두는 것 같다',
  };

  const prompt = `
    아래 내용을 참고하여 난임스트레스를 낮출 수 있는 심리 상담을 해줘.
    1. user 특성:
      - 이름: ${userData.name}
      - 난임 스트레스 척도 점수: 230점 만점의 ${userData.total}
      - 난임 스트레스 척도로 평가된 핵심 신념: ${userData.belifs}
    2. 상담 목표: 인지적 왜곡 및 부정적 자동적 사고를 탐색하여 핵심 신념 반박
    3. 대화 횟수: ${dataForPrompt.count}
    4. 사례개념화: ${dataForPrompt.caseFoumulation}
    5. 대화 요약: ${dataForPrompt.summary}
    6. 바로 직전 대화: ${lastMsg}
    7. 답변 형식: {"answer": "~합니다. 등의 존댓말", "summary": "~함. 등의 요약", "caseFoumulation": "내용"}
      1) answer:
        - '5. 대화 요약', '6. 바로 직전 대화'를 참고하여 다음 중 한 가지로 따뜻한 상담사 어조로 상담을 해줘.
          1) user에게서 인지적 왜곡이나 부정적인 사고가 관찰된다면, 다양한 관점을 깨달을 수 있도록 소크라테스식 질문을 해줘.
          2) user가 다른 관점을 생각하지 못한다면, '대화 요약'을 참고해서 다른 관점을 제시해줘.
          3) 대화 횟수가 10회 이상이고, user의 핵심 신념이 비합리적이라면 직면할 수 있는 질문을 해줘.
        - user의 메시지는 '대화 요약'을 참고하고, '바로 직전 대화'와 이어지는 내용이니까 꼭! 참고해서 답변해줘.
        - 종종 말 줄임표를 사용하고, 이미 파악된 내용은 다시 물어보지 말아줘.
        - 130자 이내로 존댓말을 사용해 줘.
        - user가 자살 관련 언급을 할 경우 즉시 자살 예방 상담 전화(109)의 정보를 제공해.
      2) summary: 
        - user의 답변과 system의 답변이 어떤 질문으로 이어갔는지를 높임체 없이 '~함' 등 간략한 말투로 요약해줘.
        - 이후에 summary를 보면 system이 대화 내용을 유추하고 이어서 대화할 수 있도록 구체적인 내용을 포함해줘.
        - system의 답변은 질문의 내용까지 구체적으로 포함해줘.
      3) caseFoumulation: { 
          "상황": "'4. 사례개념화', '5. 대화 요약'을 참고한 스트레스 유발 상황. 형식: '~하는 상황'", 
          "감정": "스트레스 상황에 대한 감정", 
          "자동적사고": "상황을 접하여 떠올린 자기, 미래, 세상에 대한 자동적인 생각. 형식: '~한다.'", 
          "핵심신념": "'1. user 특성' 중 '핵심 신념'을 참고하여 부정적인 자동적 사고를 활성화시키는 기저 신념. 형식: '~한다.'",
          "행동": "스트레스를 받은 후 행동" 
        }
  `;

  const moveScrollDown = () => {
    const { scrollHeight, clientHeight } = scrollBoxRef.current as HTMLDivElement;
    if (!scrollBoxRef.current) return;

    scrollBoxRef.current.scrollTo({ top: scrollHeight - clientHeight });
  };

  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [...prev, { sender, message }]);
  };

  const handleChat = async (e: FormEvent) => {
    e.preventDefault();
    // 사용자 입력란이 공백일 경우 함수 실행 X
    if (!userInput.trim()) {
      setUserInput('');
      return;
    }

    addMessage('user', userInput);
    const userMsg = userInput;
    setUserInput('');
    setIsLoading(true);

    const response = await fetchGPT(prompt, userInput);
    const { answer, summary, caseFoumulation } = JSON.parse(response.choices[0].message.content);
    addMessage('gpt', answer);
    setLastMsg({ user: userMsg, gpt: answer });
    setDataForPrompt({
      summary: dataForPrompt.summary
        ? `${dataForPrompt.summary}, ${summary}`
        : `${previousCounsel.summary}, ${summary}`,
      count: dataForPrompt.count + 1,
      caseFoumulation,
    });
    setIsLoading(false);
  };

  //상담 시작 날짜 가져오는 함수
  function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  }
  const now = new Date();
  const toDay = formatDate(now);

  // const fetchPreviousCounsel = async (id: string) => {
  //   try {
  //     const { data } = await axios.get(`https://www.wishkr.site/counsels/records/${id}`, {
  //       headers: {
  //         'content-type': 'application/json',
  //         accept: 'application/json',
  //       },
  //     });
  //     setPreviousCounsel({ summary: data.result.summary, tags: data.result.tags, count: data.result.count + 1 });
  //     return data.result;
  //   } catch (err) {
  //     console.error('Failed to POST scaleList: ', err);
  //     return null;
  //   }
  // };

  // const fetchScaleData = async () => {
  //   try {
  //     const { data } = await axios.get('https://www.wishkr.site/infertility/tests/', {
  //       params: { memberId: member_id },
  //       headers: {
  //         'content-type': 'application/json',
  //         accept: 'application/json',
  //       },
  //     });
  //     // setScaleData({ total: data.result.totalTests[0].total, belifs: data.result.totalTests[0].belifs });
  //     return data.result.totalTests[0];
  //   } catch (err) {
  //     console.error('Failed to POST scaleList: ', err);
  //     return null;
  //   }
  // };

  // const fetchCounselResult = async (body: CounselData) => {
  //   try {
  //     const response = await axios.post('https://www.wishkr.site/counsels/records/', body, {
  //       headers: {
  //         'content-type': 'application/json',
  //         accept: 'application/json',
  //       },
  //     });
  //     return response;
  //   } catch (err) {
  //     console.error('Failed to POST scaleList: ', err);
  //     return null;
  //   }
  // };

  const handleConsultationEnd = async () => {
    const prompt = `답변 형식: {"summary": "내용", "tags": "#태그1#태그2#태그3"}
      1. 이후에 gpt에게 전달하면 이어서 대화할 수 있을 정도로 구체적인 한 문장 요약
      2. 사용자의 답변에서 다른 대화와 구분될 수 있는 유니크한 단어로 만든 태그 최대 3개
        - 태그는 상담과 관련 단어, 이름, 감정 표현은 제외해줘.
        - 사용자가 언급한 단어 위주로 태그를 나열해줘.
    `;
    const response = await fetchGPT(prompt, dataForPrompt.summary);
    // const { summary, tags } = JSON.parse(response.choices[0].message.content);
    // const fetchRes = await fetchCounselResult({ member_id, summary, tags, count: previousCounsel.count || 1 });
    if (response) setModal(true);
  };

  //가이드 영역
  const [step, setStep] = useState<number>(1);
  const [guideVisible, setGuideVisible] = useState(false);

  //페이지 진입시 .5초뒤에 가이드 시작
  useEffect(() => {
    const popupShown = localStorage.getItem('counselingGuide');

    if (!params.id) localStorage.removeItem('counselingGuide');

    if (!popupShown) {
      localStorage.setItem('counselingGuide', 'true');
      const timer = setTimeout(() => {
        setGuideVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (step === 4) {
      setGuideVisible(false);
      setStep(0);
    }
  }, [step]);

  useEffect(() => {
    moveScrollDown();
  }, [messages]);

  useEffect(() => {
    // if (params.id) fetchPreviousCounsel(params.id);
    if (params.id) {
      const data = counselsRecordsRes.result.totalRecords[+params.id - 1];
      setPreviousCounsel({ summary: data.summary, tags: data.tags, count: data.count + 1 });
    }
    // fetchScaleData();
  }, []);

  return (
    <>
      {guideVisible && <CounselingGuide step={step} setStep={setStep} guideVisible={guideVisible} />}

      <div css={BackGroundColor}>
        <PageTitle
          titleText="심리삼담사 위시"
          textAlign="center"
          isFixed={true}
          pageBack={true}
          backcolor="#fdfcff"
          children={
            <button css={end} className="end" type="button" onClick={() => handleConsultationEnd()}>
              종료
            </button>
          }
        />

        <div className="scroll-box" ref={scrollBoxRef} css={ScrollBox}>
          <p className="dateText">{toDay}</p>
          <ul css={[MessageBox, step === 2 && Priority]}>
            <li className="gpt firstMsg">
              <div className="messages">
                <p>
                  안녕하세요 {userData.name}님, <br />
                  오늘 하루는 어떠셨나요?
                </p>
                <p>
                  난임으로 인해 힘든 마음을 편하게 나눠주세요. 어려움을 해결할 수 있도록 도와드릴게요. 사회적 관계에서
                  느끼는 부담, 배우자와의 소통문제, 부부 관계에 대한 고민 모두 가능해요.
                </p>
                {previousCounsel.tags && (
                  <p>
                    이전 상담 내용은 다음과 같아요. <br />
                    <span>
                      {previousCounsel.summary} <br />
                      {previousCounsel.tags.split('#').join(' #')}
                    </span>
                  </p>
                )}
              </div>
            </li>

            {messages.map(({ sender, message }, idx) => (
              <li key={`${sender}-${message!.slice(0, 10)}-${idx}`} className={sender}>
                {message && sender === 'gpt' ? (
                  <TypingEffect text={message} container={scrollBoxRef.current!} />
                ) : (
                  <p>{message}</p>
                )}
              </li>
            ))}

            {isLoading && (
              <li className="gpt loadingMsg">
                <div className="messages">
                  <p>답변을 준비하고 있어요.</p>
                </div>
              </li>
            )}
          </ul>
        </div>

        <form css={[InputBox, step === 1 && Priority]} onSubmit={(e) => handleChat(e)}>
          <input type="text" name="" id="" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button>
            <span className="hidden">전송</span>
          </button>
        </form>

        {showModal && (
          <div css={Modal}>
            <div className="inner">
              <p className="tit">상담이 종료됐어요</p>
              <p className="cont">
                위시와의 상담은 어떠셨나요? <br />
                상담 목록을 통해 상담을 이어갈 수 있습니다.
              </p>
              <div className="btn-box">
                <Button text="목록 가기" size="medium" disabled={false} onClick={() => navigate('/counseling/list')} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Counseling;

const Priority = css`
  position: fixed;
  z-index: 60;
`;

const BackGroundColor = css`
  background-color: #fdfcff;
  margin: -2rem -1.8rem -6rem;
  padding-top: 8rem;
`;
const end = css`
  font-size: ${variables.size.big};
  background-color: ${variables.colors.secondarySoft};
  color: ${variables.colors.secondaryStrong};
  border-radius: 0.6rem;
  width: 4.8rem;
  height: 3.5rem;
  text-align: center;
  line-height: 3.5rem;
`;

const ScrollBox = css`
  max-width: 50rem;
  width: 100%;
  height: calc(100svh - 14rem);
  overflow: hidden auto;
  padding: 1.8rem;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    display: none;
  }

  & .dateText {
    font-size: ${variables.size.small};
    margin-bottom: 2rem;
    color: #868581;
    text-align: center;
  }
`;

const MessageBox = css`
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  align-items: flex-start;

  li {
    &.firstMsg {
      align-items: flex-start;

      &::before {
        transform: translateY(2rem);
      }
    }
    .messages {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    p {
      padding: 1.4rem 2.2rem;
      max-width: 27rem;

      span {
        display: block;
        margin-top: 0.6rem;
        font-weight: 500;
      }
    }
  }

  .gpt {
    display: flex;
    gap: ${variables.size.medium};
    align-items: flex-end;

    & p {
      background-color: ${variables.colors.primarySoft};
      box-shadow: ${variables.BoxShadow};
      border-radius: 2rem 2rem 2rem 0;
    }

    &::before {
      content: '';
      display: block;
      background-image: url(${wishIcon});
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      width: 4.4rem;
      aspect-ratio: 1/1;
      flex-shrink: 0;
    }
  }

  .user {
    margin-left: auto;
    border-radius: 2rem 2rem 0 2rem;
    background-color: ${variables.colors.white};
    box-shadow: 0 0 0.5rem rgba(217, 203, 245, 0.3);
  }
`;

const InputBox = css`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  max-width: 50rem;
  width: 100%;
  background-color: #f8f4ff;
  padding: 2rem 1.8rem;
  box-sizing: border-box;
  display: flex;
  gap: 0.8rem;

  & input {
    height: 4rem;
    box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);
    font-size: 1.7rem;
  }

  & button {
    width: 5.6rem;
    height: 4rem;
    border-radius: 1.4rem;
    box-shadow: 0 0 1rem rgba(217, 203, 245, 0.37);
    background-color: ${variables.colors.primaryStrong};
    background-image: url(${sendIcon});
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Modal = css`
  position: fixed;
  inset: 0;
  background: rgba(115, 121, 128, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;

  .inner {
    background: #fff;
    border-radius: 1.6rem;
    padding: 3rem;
    text-align: center;
    width: calc(100% - calc(${variables.layoutPadding} * 2));
    max-width: calc(${variables.maxLayout} - calc(${variables.layoutPadding} * 2));

    .tit {
      font-size: ${variables.size.large};
      font-weight: 600;
      margin-bottom: 1.6rem;
    }
    .cont {
      font-size: ${variables.size.medium};
      color: ${variables.colors.gray100};
    }
    .btn-box {
      margin-top: 2rem;
      display: flex;
      gap: ${variables.size.min};
    }
  }
`;
