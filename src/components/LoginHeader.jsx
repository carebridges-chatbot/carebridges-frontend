// src/components/LoginHeader.jsx
import { useNavigate } from 'react-router-dom';

function LoginHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 w-full shadow-sm sticky top-0 z-50">
      {/* 로고 */}
      <div className="flex items-center">
        <button 
          onClick={() => navigate('/')}
          className="hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0"
        >
          <img src="/logo.png" alt="로고" className="w-40 h-10" />
        </button>
      </div>
      
      <nav className="flex gap-4 sm:gap-6 text-sm text-gray-700 items-center">
        <a href="https://rainy-forgery-133.notion.site/289bddcf357e807c85bee7372dd8a0b7" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">돌봄다리 소개</a>
      </nav>
    </header>
  );
}

export default LoginHeader;
