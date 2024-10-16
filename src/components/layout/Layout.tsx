/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { Outlet } from 'react-router-dom';

const style = css`
  padding: ${variables.layoutPadding};
  max-width: ${variables.maxLayout};
  min-height: 100vh;
  margin: 0 auto;
  background: ${variables.colors.white};
`;

const Layout = () => {
  return (
    <div css={style}>
      <header>
        <h1>Header</h1>
      </header>
      <Outlet />
      <footer>
        <h1>Footer</h1>
      </footer>
    </div>
  );
};

export default Layout;
