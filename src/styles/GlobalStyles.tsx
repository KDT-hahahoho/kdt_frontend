

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const GlobalStyles = css`
  /* 기본 스타일 */
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #f0f0f0; /* 배경색 */
    color: #333; /* 글자색 */
    overflow-x: hidden; /* 수평 스크롤 방지 */
  }

  a {
    text-decoration: none;
    color: inherit; /* 링크 색상 상속 */
  }

  /* 모바일 환경 스타일 */
  @media (max-width: 768px) {
    body {
      font-size: 14px; /* 모바일 기본 폰트 크기 */
    }

    h1 {
      font-size: 24px; /* 모바일 H1 크기 */
    }

    h2 {
      font-size: 20px; /* 모바일 H2 크기 */
    }

    /* 추가 모바일 스타일 */
    .container {
      padding: 16px; /* 모바일 패딩 */
    }
  }

  /* 추가 스타일을 여기에 작성 */
`;

export default GlobalStyles;
