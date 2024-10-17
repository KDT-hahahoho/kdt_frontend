/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from './Variables';

const GlobalStyles = css`
  :root {
    font-size: 10px; /* 1rem = 10px */
    width: 100vw;
    min-width: 320px;
    overflow: hidden;
    background: ${variables.colors.gray50};
  }

  body {
    margin: unset;
    color: ${variables.colors.black};
    font-family: var(--font-roboto), var(--font-noto), sans-serif;
    font-size: ${variables.size.medium};
  }

  html,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: unset;
    padding: unset;
    border: 0;
    font-family: sans-serif;
    font-size: inherit;
    font-weight: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    letter-spacing: -0.02em;
    line-height: 1.4;
    word-break: keep-all;
  }
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
  }

  strong {
    font-weight: bold;
  }

  button {
    all: unset;
    cursor: pointer;
  }

  label {
    cursor: pointer;
  }

  /* input, select style */
  select {
    color: inherit;
    appearance: none;
    background: url(/img/icon-accordion-blue.svg) no-repeat center right var(--title-medium) / 1rem;
  }

  select,
  input {
    font-family: var(--font-roboto), var(--font-noto), 'sans-serif';
    letter-spacing: -0.02em;
    box-sizing: border-box;
    padding: 0;
  }

  select,
  input[type='text'],
  input[type='email'],
  input[type='password'],
  input[type='search'],
  input[type='tel'] {
    height: 4.4rem;
    width: 100%;
    font-size: ${variables.size.medium};
    text-indent: ${variables.size.medium};
    border-radius: ${variables.borderRadius};
    border: 1px solid ${variables.colors.gray50};
  }

  input[type='text']::placeholder,
  input[type='email']::placeholder,
  input[type='password']::placeholder,
  input[type='tel']::placeholder {
    color: ${variables.colors.gray50};
    font-family: unset;
  }

  input[type='text']:focus,
  input[type='email']:focus,
  input[type='password']:focus,
  input[type='tel']:focus {
    border-color: ${variables.colors.primary};
    outline: 1px solid ${variables.colors.primary};
  }

  select:focus-visible {
    border-color: ${variables.colors.primary};
    outline: 1px solid ${variables.colors.primary};
  }

  /* checkbox style */
  input[type='checkbox'],
  input[type='radio'] {
    all: unset;
    display: inline-block;
    cursor: pointer;
    position: relative;
    vertical-align: text-top;
    border-radius: 0.2em;
    width: 1em;
    aspect-ratio: 1 / 1;
    background: ${variables.colors.primarySoft};
    margin-right: 0.5em;
    box-sizing: border-box;
  }

  input[type='checkbox']:checked {
    background: ${variables.colors.primary} url(/img/icon-check.svg) no-repeat center / 70%;
  }

  /* radio style */
  input[type='radio']:checked {
    border: 0.15em solid ${variables.colors.primary};
  }

  input[type='radio']:after {
    content: '';
    display: block;
    position: absolute;
    width: calc(100% - 0.22em);
    aspect-ratio: 1/1;
    background: ${variables.colors.primary};
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  input[type='radio']:checked:after {
    opacity: 1;
  }

  @media (max-width: 350px) {
    :root {
      font-size: 9px;
    }
  }
`;

export default GlobalStyles;
