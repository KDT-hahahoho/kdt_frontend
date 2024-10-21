import styled from '@emotion/styled';
import variables from '@styles/Variables';

const HomePageTitle = () => {
  return <PageTitle>희선님, 오늘하루는 어떠셨나요?</PageTitle>;
};

export default HomePageTitle;

const PageTitle = styled.h2`
  font-size: ${variables.size.max};
  margin-bottom: 3.8rem;
  font-weight: 600;
`;
