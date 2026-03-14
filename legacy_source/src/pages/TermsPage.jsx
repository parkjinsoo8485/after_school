import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <section>
      <h1>이용약관</h1>
      <p>서비스 이용을 위한 약관 페이지입니다.</p>
      <p>
        법무 제출용 상세본은 배포 정적 문서 또는 운영 문서 버전을 기준으로 관리해 주세요.
      </p>
      <p>
        <Link to="/login">로그인으로 돌아가기</Link>
      </p>
    </section>
  );
}
