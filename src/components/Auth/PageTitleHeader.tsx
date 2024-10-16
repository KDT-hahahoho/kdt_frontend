interface PageTitleHeaderProps {
  currentStep: string;
}

const PageTitleHeader = ({ currentStep }: PageTitleHeaderProps) => {
  const generatedContent = (currentStep: string) => {
    if (currentStep === '이름 입력') {
      return '이름을 입력해주세요';
    }
  };

  generatedContent(currentStep);

  return (
    <div>
      <h2>{currentStep}</h2>
    </div>
  );
};

export default PageTitleHeader;
