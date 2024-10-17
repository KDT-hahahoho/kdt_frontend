/** 인풋의 ui를 상태에 따라 변경시키는 함수 */
export const handleValidation = (error: string | null, value: string) => {
  if (error) {
    return 'invalid'; // 에러가 있을 경우 'invalid'
  }
  if (value.length === 0) {
    return 'default'; // 입력값이 비어있을 경우 'default'
  }
  return 'valid'; // 그 외의 경우 'valid'
};

/** 주민등록번호를 토대로 여자남자 체크하는 함수 */
export const determineGenderFromKoreanId = (koreanId: string): string | null => {
  const secondPart = koreanId.split('-')[1]?.[0]; // 주민번호 뒷자리 첫번째 숫자 추출

  if (secondPart === '1' || secondPart === '3') {
    return 'male';
  } else if (secondPart === '2' || secondPart === '4') {
    return 'female';
  }
  return null; // 오류인 경우 null 반환
};
