import styled from '@emotion/styled';
import variables from '@styles/Variables';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterNav>
        <FooterItem>
          <StyledLink to="/users/login">로그인</StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/users/signup">회원가입</StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/counseling">심리 상담</StyledLink>
        </FooterItem>
        <FooterItem>
          <StyledLink to="/emotion/record">감정 기록</StyledLink>
        </FooterItem>
      </FooterNav>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  left: ${variables.layoutPadding}; /* 좌측 패딩 적용 */
  right: ${variables.layoutPadding}; /* 우측 패딩 적용 */
  width: auto; /* 고정된 버튼이 전체 화면을 벗어나지 않도록 너비 자동 조정 */
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
`;

const FooterNav = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  padding: 0;
  margin: 0;
`;

const FooterItem = styled.li`
  display: inline;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #007bff;
  font-size: 2rem;
  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;

export default Footer;
