import Button from '@components/common/Button';
import styled from '@emotion/styled';
import variables from '@styles/Variables';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Fragment } from 'react/jsx-runtime';
import { TestingFormData } from './Testing';

const Questions = ({ onSubmit, page }: { onSubmit: SubmitHandler<TestingFormData>; page: number }) => {
  const examples = [1, 2, 3, 4, 5];
  const questions = [
    [
      { num: 1, type: 'refusing', title: '아이가 없는 부부도 아이가 있는 부부처럼 행복하다.', isReversed: false },
      { num: 2, type: 'essential', title: '임신과 출산은 결혼생활에서 가장 중요한 두 가지이다.', isReversed: true },
      { num: 3, type: 'sexual', title: '난임 때문에 성생활이 즐겁지 않다.', isReversed: true },
      { num: 4, type: 'sexual', title: '배우자에게 나는 여전히 매력적인 존재이다.', isReversed: false },
      {
        num: 5,
        type: 'essential',
        title: '나에게는 부모가 되는것이 좋은 직업을 갖는 것보다 더 중요하다.',
        isReversed: true,
      },
      { num: 6, type: 'essential', title: '내 결혼생활에는 아이가 필요하다.', isReversed: true },
      { num: 7, type: 'sexual', title: '나는 다른 여성(남성)들과 다르지 않다.', isReversed: false },
      { num: 8, type: 'essential', title: '아이가 있어야 진짜 어른이 되는 것이라고 생각한다.', isReversed: true },
      { num: 9, type: 'social', title: '아이에 관한 질문을 받아도 불편하지 않다.', isReversed: false },
      { num: 10, type: 'essential', title: '아이가 없는 미래는 생각만 해도 싫다.', isReversed: true },
    ],
    [
      { num: 11, type: 'relational', title: '배우자가 불편해 할까봐 내 감정을 드러내지 못했다.', isReversed: true },
      { num: 12, type: 'social', title: '가족들은 우리를(아이가 없다고 해서)다르게 대하지 않는다.', isReversed: false },
      { num: 13, type: 'sexual', title: '나는 성생활에 실패한 것 같다.', isReversed: true },
      { num: 14, type: 'social', title: '(난임 때문에) 명절을 보내는 것이 특히 어렵다.', isReversed: true },
      { num: 15, type: 'refusing', title: '나는 아이가 없어도 많은 장점이 있다고 생각한다.', isReversed: false },
      {
        num: 16,
        type: 'relational',
        title: '배우자가 난임이 내게 어떤 영향을 미치는지 이해하지 못했다.',
        isReversed: true,
      },
      {
        num: 17,
        type: 'sexual',
        title: '성관계를 갖는 동안 머릿속에는 아이를 갖고 싶다는 생각뿐이다.',
        isReversed: true,
      },
      { num: 18, type: 'relational', title: '난임 문제를 해결하기 위해 우리 부부는 함께 노력한다.', isReversed: false },
      { num: 19, type: 'essential', title: '난임 문제로 공허함을 느낀다.', isReversed: true },
      {
        num: 20,
        type: 'refusing',
        title: '아이가 없어도 배우자와 함께 행복한 삶을 상상할 수 있다.',
        isReversed: false,
      },
    ],
    [
      { num: 21, type: 'relational', title: '배우자가 난임 문제에 나와 다르게 대처해서 괴롭다.', isReversed: true },
      { num: 22, type: 'sexual', title: '또 실망하고 싶지 않아 성관계가 힘들다.', isReversed: true },
      { num: 23, type: 'essential', title: '아이를 갖는 것이 인생의 주요 목적은 아니다.', isReversed: false },
      { num: 24, type: 'relational', title: '배우자는 불임으로 인해 나에게 몹시 실망했다.', isReversed: true },
      { num: 25, type: 'refusing', title: '가끔씩 내가 정말로 아이를 원하는지 의문이 든다.', isReversed: false },
      {
        num: 26,
        type: 'relational',
        title: '우리 부부는 난임 문제에 대해 서로 마음을 터놓고 대화 할 수 있다.',
        isReversed: true,
      },
      { num: 27, type: 'social', title: '가족과 함께하는 모임에 참석하는 것이 힘들다.', isReversed: true },
      {
        num: 28,
        type: 'refusing',
        title: '아이가 없어서 다른 하고 싶은 일을 할 수 있는 시간적 여유가 있다.',
        isReversed: false,
      },
      { num: 29, type: 'essential', title: '나는 꼭 부모가 될 것이라고 생각해왔다.', isReversed: true },
      { num: 30, type: 'social', title: '아이가 있는 친구들과 나를 비교하게 된다.', isReversed: true },
    ],
    [
      { num: 31, type: 'refusing', title: '아이가 내 행복의 필요조건은 아니다.', isReversed: false },
      { num: 32, type: 'sexual', title: '임신을 위해 성관계를 해야할 날을 놓치면 무척 화가 난다.', isReversed: true },
      {
        num: 33,
        type: 'relational',
        title: '난임 문제로 배우자와 헤어지는 것은 상상해 본 적이 없다.',
        isReversed: false,
      },
      { num: 34, type: 'essential', title: '나는 평생 부모가 되기를 원해왔다.', isReversed: true },
      { num: 35, type: 'social', title: '나는 아이가 있는 친구들과도 여전히 공통관심사가 많다.', isReversed: false },
      { num: 36, type: 'relational', title: '배우자와 난임 문제를 이야기하면 다투게 된다.', isReversed: true },
      { num: 37, type: 'sexual', title: '가끔씩 난임으로 인한 심적 부담이 심해서 성관계가 어렵다.', isReversed: true },
      {
        num: 38,
        type: 'refusing',
        title: '아이가 없어도 행복한 부부관계를 오랫동안 유지 할 수 있다.',
        isReversed: false,
      },
      { num: 39, type: 'social', title: '어린 아이가 있는 친구들과 함께 시간을 보내기가 어렵다.', isReversed: true },
      { num: 40, type: 'social', title: '아이가 있는 가족을 볼 때 소외감을 느낀다.', isReversed: true },
    ],
    [
      { num: 41, type: 'refusing', title: '아이가 없어서 자유를 누릴 수 있다는 것도 좋은 것 같다.', isReversed: false },
      { num: 42, type: 'essential', title: '아이를 갖기 위해서는 무엇이라도 할 것이다.', isReversed: true },
      { num: 43, type: 'social', title: '친구와 가족이 나와 거리를 두는 것 같다.', isReversed: true },
      { num: 44, type: 'social', title: '남들이 그들이 자식들에 대해 이야기해도 불편하지 않다.', isReversed: false },
      { num: 45, type: 'relational', title: '난임때문에 배우자와의 관계가 소원해질까 걱정이 된다.', isReversed: true },
      {
        num: 46,
        type: 'relational',
        title: '난임 문제를 이야기할 때 배우자는 나의 말에 위로를 얻는 것 같다.',
        isReversed: false,
      },
    ],
  ];

  const { handleSubmit, register } = useForm<TestingFormData>();
  const InputBox = styled.div`
    h3 {
      font-size: ${variables.size.big};
      font-weight: 500;
      display: block;
      margin-bottom: 2rem;

      span {
        display: inline-block;
        padding-right: 0.4rem;
        letter-spacing: 0.1rem;
      }
    }
    & + .input-box {
      margin-top: 5rem;
    }
    .flex-box {
      display: flex;
      gap: ${variables.size.min};

      input {
        display: none;
      }
      input:checked + label {
        background: ${variables.colors.primarySoft};
      }
      label {
        height: 3.8rem;
        width: 100%;
        background: ${variables.colors.gray10};
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.4rem;
      }
    }
  `;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questions[page - 1].map((question) => (
        <InputBox className="input-box" key={question.title}>
          <h3>
            <span>Q{question.num}.</span> {question.title}
          </h3>
          <div className="flex-box">
            {examples.map((example, idx) => (
              <Fragment key={`${question.title}-${idx}`}>
                <input
                  type="radio"
                  id={`${question.num}-${example}`}
                  value={example}
                  {...register(`${question.type}-${question.isReversed}-${question.num}`, {
                    required: '보기를 선택해주세요.',
                  })}
                />
                <label htmlFor={`${question.num}-${example}`}>{example}</label>
              </Fragment>
            ))}
          </div>
        </InputBox>
      ))}
      <Button text={page !== 5 ? '다음' : '제출'} type="submit" size="large" disabled={false} fixed={true} />
    </form>
  );
};

export default Questions;
