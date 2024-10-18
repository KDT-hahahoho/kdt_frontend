/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import variables from '@styles/Variables';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const showFooter = location.pathname !== '/users/signup';

  return (
    <div css={style}>
      <Outlet />
      {showFooter && (
        <footer>
          <h1>Footer</h1>
        </footer>
      )}
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
