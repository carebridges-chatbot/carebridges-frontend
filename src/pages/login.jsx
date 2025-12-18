// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/auth';
import SignupPopup from '../components/SignupPopup';
import LoginHeader from '../components/LoginHeader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSignupPopup, setShowSignupPopup] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser(email, password);
      console.log('로그인 성공:', response);
      console.log('응답에 사용자 정보가 있는지 확인:', response.user);
      
      // 로그인 성공 시 localStorage에 토큰과 사용자 정보 저장
      // auth.js에서 이미 토큰을 저장했지만, 여기서도 확인
      const token = response.token || response.access_token || response.accessToken;
      
      if (token) {
        // access_token과 token 모두 저장 (하위 호환성)
        localStorage.setItem('access_token', token);
        localStorage.setItem('token', token);
        console.log('토큰 저장 완료 (Login.jsx)');
      } else {
        console.warn('응답에 토큰이 없습니다:', response);
      }
      
      // 리프레시 토큰이 있다면 저장
      const refreshToken = response.refresh_token || response.refreshToken;
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
      
      // 사용자 정보 가져오기
      try {
        const { getUserInfo } = await import('../api/auth');
        const userInfo = await getUserInfo();
        console.log('API에서 가져온 사용자 정보:', userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
      } catch (userInfoError) {
        console.error('사용자 정보 가져오기 실패, 기본 정보 사용:', userInfoError);
        
        // API 실패 시 응답의 사용자 정보 또는 기본 정보 사용
        const userInfo = response.user || {
          email: email,
          name: '',
          phone: '',
          worker_id: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        console.log('기본 사용자 정보 저장:', userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo));
      }
      
      console.log('토큰 저장 완료:', {
        access_token: !!localStorage.getItem('access_token'),
        refresh_token: !!localStorage.getItem('refresh_token')
      });
      
      // 로그인 상태 변경 이벤트 발생
      window.dispatchEvent(new CustomEvent('loginStatusChanged'));
      
      navigate('/dashboard'); // 로그인 성공 후 이동할 페이지
    } catch (error) {
      console.error('로그인 실패:', error);
      console.error('에러 응답:', error.response?.data);
      console.error('에러 상태:', error.response?.status);
      
      let errorMessage = '로그인에 실패했습니다. 다시 시도해주세요.';
      
      // 네트워크 오류
      if (!error.response) {
        errorMessage = '서버에 연결할 수 없습니다. 인터넷 연결을 확인해주세요.';
      }
      // 400 에러 (잘못된 요청)
      else if (error.response?.status === 400) {
        const message = error.response?.data?.message || error.response?.data?.detail || '';
        if (message.includes('비밀번호') || message.includes('password') || 
            message.includes('이메일') || message.includes('email') ||
            message.includes('잘못') || message.includes('incorrect')) {
          errorMessage = message || '이메일 또는 비밀번호가 올바르지 않습니다.';
          setShowSignupPopup(true);
        } else {
          errorMessage = message || '입력한 정보를 확인해주세요.';
        }
      }
      // 401 에러 (인증 실패)
      else if (error.response?.status === 401) {
        errorMessage = error.response?.data?.message || error.response?.data?.detail || '이메일 또는 비밀번호가 올바르지 않습니다.';
        setShowSignupPopup(true);
      }
      // 404 에러 (엔드포인트 없음)
      else if (error.response?.status === 404) {
        errorMessage = '로그인 서비스를 찾을 수 없습니다. 관리자에게 문의해주세요.';
      }
      // 422 에러 (유효성 검사 실패)
      else if (error.response?.status === 422) {
        errorMessage = error.response?.data?.message || error.response?.data?.detail || '입력한 정보가 올바르지 않습니다.';
      }
      // 500 에러 (서버 오류)
      else if (error.response?.status >= 500) {
        errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      }
      // 기타 에러
      else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col">
      {/* 헤더 */}
      <LoginHeader />

      {/* 프로모션 배너 */}
      <section className="bg-blue-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex-1">
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1 max-w-2xl lg:max-w-3xl">
            <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">
              돌봄다리 AI 전문가의 24시간 상담 서비스
            </h2>
            <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
              어르신 상태나 요양보호사 근무를 관리하다 궁금한 점이 생기면 바로 물어보세요. AI 전문가가 공단 매뉴얼과 국가 고시 기준을 바탕으로 즉시 도와드립니다.
            </p>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <img src="/chatcharacter.png" alt="AI 캐릭터" className="w-24 sm:w-32 lg:w-40 xl:w-48 h-auto" />
          </div>
        </div>
      </section>

      {/* 로그인 섹션 */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="w-full max-w-md lg:max-w-lg text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">로그인</h1>
          <p className="text-blue-600 text-base sm:text-lg font-medium mb-2">돌봄다리에 오신 것을 환영합니다.</p>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            로그인하시면 복지 현장을 위한 맞춤형 AI 상담과 다양한 지원 기능을 이용하실 수 있습니다.
          </p>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* 입력 폼 + 로그인 버튼 */}
        <div className="flex gap-4 mb-6 justify-center items-start">
          <div className="flex flex-col gap-3 flex-1 max-w-xs">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isLoading}
            />
            <div className="flex items-center text-sm text-gray-600">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember">이메일 저장</label>
            </div>
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-base font-medium transition-colors"
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>

        {/* 하단 링크 */}
        <div className="flex justify-center text-sm text-gray-600 gap-4">
          <Link to="/find-id" className="hover:text-blue-600 hover:underline transition-colors">이메일 찾기</Link>
          <span className="text-gray-400">|</span>
          <Link to="/find-pw" className="hover:text-blue-600 hover:underline transition-colors">비밀번호 찾기</Link>
          <span className="text-gray-400">|</span>
          <Link to="/signup/step1" className="hover:text-blue-600 hover:underline transition-colors">회원가입</Link>
        </div>
        </div>
      </main>

      {/* 회원가입 팝업 */}
      <SignupPopup 
        isOpen={showSignupPopup} 
        onClose={() => setShowSignupPopup(false)} 
      />
    </div>
  );
}

export default Login;