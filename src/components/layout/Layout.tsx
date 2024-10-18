/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div css={style}>
      <Outlet />
    </div>
  );
};

export default Layout;

const style = css`
  padding: ${variables.layoutPadding};
  max-width: ${variables.maxLayout};
  min-height: 100vh;
  margin: 0 auto;
  background: ${variables.colors.white};
`;
