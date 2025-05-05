/** @jsxImportSource @emotion/react */
import HomePageTitle from '@components/home/HomePageTitle';
import Footer from '@components/common/Footer';
import styled from '@emotion/styled';
import CoupleInformation from '@components/home/CoupleInformation';
import OurKeyword from '@components/home/OurKeyword';
import CoupleReport from '@components/home/CoupleReport';
import OurReport from '@components/home/OurReport';
import useAuthRedirect from '@hooks/useAuthRedirect';
import { coupleDataRes } from '@data/couple';
// import { useGetCoupleData } from '@hooks/useGetCoupleData';

const Home = () => {
  // const token = localStorage.getItem('authToken') || '';
  const redirect = useAuthRedirect(); // 인가 확인 훅
  // const { data: coupleData } = useGetCoupleData(token);
  const coupleData = coupleDataRes;

  if (redirect) return redirect; // 인증되지 않으면 리디렉션을 반환

  return (
    <HomepageContainer>
      <ContentWrapper>
        <HomePageTitle />
        <CoupleInformation coupleData={coupleData} />
        <OurReport coupleData={coupleData} />
        <OurKeyword coupleData={coupleData} />
        <CoupleReport coupleData={coupleData} />
      </ContentWrapper>
      <Footer coupleData={coupleData} />
    </HomepageContainer>
  );
};

const HomepageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  /* overflow-y: auto; */
  padding-bottom: 1rem;
  -ms-overflow-style: none;
  /* scrollbar-width: none; */
`;

export default Home;
