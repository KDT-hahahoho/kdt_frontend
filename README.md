# Wish

![wish_img_01](https://github.com/user-attachments/assets/8e5fc26d-6b78-4ef1-95ba-70ec83f23a35)

> 배포 링크
> **https://wish-test.netlify.app**

<br/>

<p align=center>
  <a href="https://docs.google.com/document/d/1Ob-5dwxqgAiJ6cobF7Lkjia355zKJJXVFZfnm-JjlY4/edit?usp=sharing">개발 기획서</a>
  &nbsp; | &nbsp;
  <a href="https://docs.google.com/presentation/d/1-bXWJeaPJE2Lpr65SKw8Sy_ByLG3uXdeSGClkZIK6Ao/edit?usp=sharing">발표자료</a>
  &nbsp; | &nbsp;
  <a href="#">발표영상</a>
</p>

## 📄 목차

- [📄 목차](#-목차)
- [🏆 2024년 제6회 K-디지털 트레이닝 해커톤 장려상 수상](#🏆-2024년-제6회-K-디지털-트레이닝-해커톤-장려상-수상)
- [✍🏻 프로젝트 개요](#-프로젝트-개요)
- [🚀 핵심 기능](#-핵심-기능)
  - [부부 연동 기능을 통해 배우자와 주간 미션을 함께 진행할 수 있어요.](#부부-연동-기능을-통해-배우자와-주간-미션을-함께-진행할-수-있어요)
  - [전문 상담사 '위시'와 언제든지 고민을 나눌 수 있어요.](#전문-상담사-'위시'와-언제든지-고민을-나눌-수-있어요)
  - [난임스트레스 척도를 검사하고 결과를 확인할 수 있어요.](#난임스트레스-척도를-검사하고-결과를-확인할-수-있어요)
  - [사용자의 감정을 분석해 감정 분포와 난임스트레스 척도 점수를 예상할 수 있어요.](#사용자의-감정을-분석해-감정-분포와-난임스트레스-척도-점수를-예상할-수-있어요)
- [⚙️ 기술 스택](#️-기술-스택)
- [🏛️ 서비스 구조](#️-서비스-구조)

  - [요구사항 정의서](#요구사항-정의서)
  - [플로우 차트](#플로우-차트)

- [🧡 팀원 소개](#-팀원-소개)

<br />

## ✍🏻 프로젝트 개요

### AI 심리상담, 감정분석을 통한 난임스트레스‧우울증 완화 솔루션

난임 인구 증가와 상담 수요 폭증에 대응해, 난임·우울증 상담센터를 모바일화하는 AI 심리케어 서비스를 개발했어요. 심리학 이론 기반의 전문 AI 상담과 감정분석, 부부동반 미션 추천 기능을 제공했어요. 이를 통해 상담센터의 접근성을 높여 우울증 개선 및 출산율 증가를 기대해요.

<br />

## 🏆 2024년 제6회 K-디지털 트레이닝 해커톤 장려상 수상

![kdt_wish](https://github.com/user-attachments/assets/91fe5654-4baf-423e-b328-61126fc0ae66)

<br />

## 🚀 핵심 기능

### 부부 연동 기능을 통해 배우자와 주간 미션을 함께 진행할 수 있어요.

> 사용자의 관심사를 토대로 AI가 추천한 부부동반 미션을 완료하고 배우자의 따뜻한 메시지를 확인할 수 있어요.

![image](https://github.com/user-attachments/assets/89cb616c-7a37-487f-aba8-ee703a10db15)

<br>

### 전문 상담사 '위시'와 언제든지 고민을 나눌 수 있어요.

> 인지행동치료를 기반으로 전문 상담사 '위시'가 난임 고민을 실시간으로 답변해요.

![image](https://github.com/user-attachments/assets/844152af-e2c6-4430-b9c2-966c5302097f)

<br>

### 난임스트레스 척도를 검사하고 결과를 확인할 수 있어요.

> 난임 스트레스 척도 검사를 해석하고, 이전 검사 결과와 비교하여 현재 상태를 점검할 수 있어요.

![image](https://github.com/user-attachments/assets/25ffeba5-1930-44e3-bb4d-1c66bc2e1e77)

<br>

### 사용자의 감정을 분석해 감정 분포와 난임스트레스 척도 점수를 예상할 수 있어요.

> 난임스트레스 척도 검사 결과와 사용자의 일일 감정을 분석하여 난임스트레스 척도 점수를 예상해요.

![image](https://github.com/user-attachments/assets/9ec69c15-ab0e-412f-b5c6-2c86086b7436)

<br />

## 💻 담당 기능

### 윤우중

**[ 회원가입 / 로그인 ]**

- Funnel 구조를 적용한 회원가입 기능 구현
- 유저 정보를 인증하는 데이터 validation 함수 구현
- 주민번호를 뒷자리를 활용한 성별을 자동으로 구분하는 로직 구현

**[ 메인페이지 데이터 시각화 ]**

- React-Query 캐싱을 통한 불 필요한 서버 호출 방지
- Echart를 활용한 부부데이터 시각화 구현
- 이번주 미션 데이터 시각화 구현

**[ 공통 컴포넌트 구현 ]**

- 공통 버튼 컴포넌트 구현
- 공통 프로그레스바 컴포넌트 구현
- 공통 인풋 컴포넌트 구현

---

### 이경민

**[ AI 심리상담 가이드 ]**

- 심리 상담 효과를 높이기 위해 CSS로 직관적인 가이드 UI를 구현

**[ 난임스트레스 척도 검사 결과 시각화 ]**

- 난임 스트레스 데이터 사용자 친화적으로 시각화

**[ 공통 컴포넌트 구현 ]**

- 공통 타이틀 컴포넌트 구현

---

### 이소정

**[ AI 심리상담 ]**

- GPT-4o mini를 활용한 AI 프롬프팅을 통한 심리상담

**[ 난임스트레스 척도 목록 ]**

- 난임스트레스 목록 조회
- 난임스트레스 목록 차트 구현

**[ 난임스트레스 척도 테스트 ]**

- 4단계에 걸쳐 난임스트레스 척도 기능 구현
- GPT-4o mini를 활용한 난임스트레스 검사 기반 핵심신념 추출 <br>
  `핵심신념이란?` 인지행동치료에서 사용되는 사용자의 부정적인 사고를 유발하는 신념

---

### 전희선

**[ 디자인 총괄 ]**

- UXUI 디자인

**[ AI 프롬프팅 ]**

- GPT-o mini를 활용한 AI 프롬프팅
- 부부 관심사 기반 AI 미션 추천 기능 프롬프팅

**[ AI부부동반 미션 추천 ]**

- 부부의 AI 감정분석 및 사전 등록 관심사를 기반으로 AI 미션 추천 기능 페이지 구현

**[ AI감정분석 결과 데이터 시각화 ]**

- AI 감정분석 데이터를 통해 난임 스트레스 예상 점수와 현재 감정 분포도를 시각화

---

### 정진욱

**[ 감정분석 ]**

- GPT-o mini를 활용한 AI 프롬프팅

**[ 관심사 등록 ]**

- 회원가입 시 사용자 관심사 등록

**[ 부부 연동 ]**

- 부부 아이디 연동

<br />

## ⚙️ 기술 스택

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>
            <p>프론트엔드</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
            <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=333333">
            <img src="https://img.shields.io/badge/Reactquery-FF4154?logo=reactquery&logoColor=white">
            <img src="https://img.shields.io/badge/Emotion-d26ac2?logo=Emotion&logoColor=white">
          </td>
        </tr>
        <tr>
        <tr>
          <td>
            <p>상태관리</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/Zustand-000000?logo=Zustand&logoColor=ffffff">
          </td>
        </tr>
         <tr>
          <td>
            <p>AI 프롬프트</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/OpenAI-412991?logo=openai&logoColor=ffffff">
          </td>
        </tr>
        <tr>
            <td>
                <p>패키지 매니저</p>
            </td>
            <td>
              <img src="https://img.shields.io/badge/npm-c12127?logo=npm&logoColor=ffffff">
            </td>
        </tr>
                <tr>
            <td>
                <p>배포</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white">
            </td>
        </tr>
        <tr>
            <td>
                <p>협업</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>

<br />

## 🏛️ 서비스 구조

### 플로우 차트

![flowchart](https://github.com/user-attachments/assets/3aeb2fc0-a1a2-4bc7-8ba0-a6900f5e2bbd)

<br />

## 🧡 팀원 소개

|                                                정진욱(FE)                                                |                                               박가희(BE)                                                |                                                윤우중(FE)                                                |
| :------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/183aef5b-f8e4-4081-ada7-db4bfadeee56" width="300" > | <img src="https://github.com/user-attachments/assets/5910bc94-cd2d-404d-8a74-a524be668153" width="300"> | <img src="https://github.com/user-attachments/assets/71b7af19-6b20-471c-abd0-1241eea97f19" width="300" > |
|                                [@JWJung-99](https://github.com/JWJung-99)                                |                             [@godheezzang](https://github.com/godheezzang)                              |                             [@woojoung1217](https://github.com/woojoung1217)                             |

|                                               이경민(FE)                                                |                                               이소정(FE)                                                |                                               전희선(FE)                                                |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/73348a54-53be-4c41-ba72-bdd60d9d8077" width="300"> | <img src="https://github.com/user-attachments/assets/b18eec6c-1efd-4188-b3cc-b990357e3da0" width="300"> | <img src="https://github.com/user-attachments/assets/e674cd0c-8946-4dfd-b892-50ffb6b79637" width="300"> |
|                                [@kyungmim](https://github.com/kyungmim)                                 |                                 [@s0zzang](https://github.com/s0zzang)                                  |                              [@HuiseonDev](https://github.com/HuiseonDev)                               |
