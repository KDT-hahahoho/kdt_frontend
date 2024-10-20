/** 인풋의 ui를 상태에 따라 변경시키는 함수 */
export const handleValidation = (
  type: 'name' | 'email' | 'password' | 'subfertility', // 새로운 타입 추가
  value: string | null // value의 타입을 string | null로 수정
): 'invalid' | 'valid' | 'default' => {
  if (value === null || value.length === 0) {
    return 'default'; // 입력값이 비어있거나 null일 경우 'default'
  }

  switch (type) {
    case 'name': {
      const nameRegex = /^[가-힣]{2,}$/; // 한글만 허용하고 2글자 이상
      return nameRegex.test(value) ? 'valid' : 'invalid';
    }
    case 'email': {
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      return isEmailValid ? 'valid' : 'invalid';
    }
    case 'password': {
      // 패스워드 유효성 검사 (예시: 6자리 이상)
      const isPasswordValid = value.length >= 6;
      return isPasswordValid ? 'valid' : 'invalid';
    }
    case 'subfertility':
      return value === 'true' || value === 'false' ? 'valid' : 'invalid'; // 문자열 비교
    default:
      return 'valid'; // 기본적으로 valid로 처리
  }
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
