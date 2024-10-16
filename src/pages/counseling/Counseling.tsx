import { FormEvent, useState } from 'react';
import fetchGPT from '../../hooks/useGPT';

interface Message {
  sender?: string;
  message?: string;
}

const Counseling = () => {
  const name = '위시';
  const initMessage = {
    sender: 'gpt',
    message: `안녕하세요 ${name}님😊 사회적 관계에서 느끼는 부담이나 배우자의 소통문제, 그리고 부부관계에 대한 고민까지, 난임으로 인해 힘드신 모든 마음을 편하게 나눠주세요. 어려움을 해결할 수 있도록 도와드릴게요☺️`,
  };
  const [messages, setMessages] = useState<Message[]>([initMessage]);
  const [dataForPrompt, setDataForPrompt] = useState({ summary: '', count: 1 });
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const prompt = `
  - 답변 형식: {"answer": "내용", "summary": "내용", "tag": "태그"}. 
  - 이전 대화: ${dataForPrompt.summary}
  - 대화 횟수: ${dataForPrompt.count}
  - 사용자 특성: 난임 부부, 난임 스트레스 척도 140점/240점
  - answer: 전문 상담사로서 따듯하고 공감하는 어조로 '사용자의 특성'을 반영하여 난임 관련 스트레스를 낮출 수 있는 전문 상담을 해줘. 기계가 아닌 사람과 대화하는 느낌이 나도록 말 줄임표 등을 사용해줘. 대화 횟수가 3의 배수라면 구체적인 행동을 제안하고 아니라면 사용자의 감정을 분석해서 감정을 인식할 수 있는 질문 형태로 해줘. 한글로 쉬운 용어를 사용하고 존댓말로 150자 이내로. 
  - summary: 질문과 답변을 요약하고, 만약 이전 요약본이 있다면 반영해서 summary만으로도 전체 대화 내용을 파악할 수 있게 해줘. 
  - tag: 전체 대화의 핵심 주제가 되는 대상, 장소, 감정 등의 단어를 3개 뽑아서 나열해줘. 이때 '난임'은 제외하고 구체적인 대상을 꼭 포함시켜줘`;
  const addMessage = (sender: string, message: string) => {
    setMessages((prev) => [...prev, { sender, message }]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // 사용자 입력란이 공백일 경우 함수 실행 X
    if (!userInput.trim()) {
      setUserInput('');
      return null;
    }

    addMessage('user', userInput);
    setUserInput('');
    setIsLoading(true);

    const data = await fetchGPT(prompt, userInput);
    const dataToObj = JSON.parse(data.choices[0].message.content);
    addMessage('gpt', dataToObj.answer);
    setDataForPrompt({ summary: dataToObj.summary, count: dataForPrompt.count + 1 });
    setIsLoading(false);
    console.log(dataToObj, dataForPrompt);
  };

  return (
    <>
      <ul>
        {messages.map(({ sender, message }, idx) => (
          <li key={`${sender}-${message!.slice(0, 10)}-${idx}`} className={sender}>
            {message}
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name=""
          id=""
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button>전송</button>
        {isLoading && '로딩중'}
      </form>
    </>
  );
};

export default Counseling;
