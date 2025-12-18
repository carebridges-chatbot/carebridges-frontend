# 🤖 돌봄다리 AI 챗봇

> 요양보호사 실무를 위한 24시간 AI 전문가 상담 서비스 프론트엔드

### 🎙️ [업그라운더 1기] 돌봄다리 AI 챗봇 프론트엔드 레포지토리입니다.

* 본 프론트엔드 레포지토리는 요양보호사들이 업무 관련 질문을 할 수 있는 인터랙티브한 채팅 인터페이스를 제공합니다.
* React 기반 SPA로 구현되었으며, 카테고리별 AI 상담, 채팅 히스토리 관리, 사용자 인증 등의 기능을 제공합니다.
* Vite 기반 빌드 시스템, Tailwind CSS를 활용한 반응형 디자인, Netlify 기반 자동 배포 환경을 구축하였습니다.

---

## 🔧 기술 스택

### 📌 Language & Framework

JavaScript React

### 📌 Build Tool & Styling

Vite Tailwind CSS

### 📌 State Management & Routing

React Hooks React Router DOM

### 📌 HTTP Client & API

Axios

### 📌 DevOps & Deployment

Netlify GitHub Actions

### 📌 Version Control

Git GitHub

### 🔎 기술 디테일

* **Language:** JavaScript (ES6+)
* **Framework:** React 19.1.0
* **Build Tool:** Vite 7.0.2
* **Styling:** Tailwind CSS 3.4.17
* **Routing:** React Router DOM 7.6.3
* **HTTP Client:** Axios 1.10.0
* **Deployment:** Netlify (자동 배포)
* **Package Manager:** npm

---

# 1. 프로젝트 구조 및 주요 Source code 설명

📁 프로젝트 구조

```
carebridges-frontend/
├── src/
│   ├── api/                    # API 통신 관련 모듈
│   │   ├── auth.js             # 인증 관련 API (로그인, 회원가입, 비밀번호 찾기)
│   │   ├── chat.js             # 채팅 관련 API (메시지 전송, 대화 조회)
│   │   ├── user.js             # 사용자 정보 관련 API
│   │   ├── faq.js              # FAQ 관련 API
│   │   ├── axios.js            # Axios 인스턴스 설정 (인터셉터 포함)
│   │   └── ...
│   ├── components/             # 재사용 가능한 컴포넌트
│   │   ├── chat/               # 채팅 관련 컴포넌트
│   │   │   ├── ChatContainer.jsx    # 채팅 컨테이너 (메시지 리스트 + 입력)
│   │   │   ├── MessageList.jsx       # 메시지 목록 표시
│   │   │   ├── MessageInput.jsx      # 메시지 입력 컴포넌트
│   │   │   ├── AIMessage.jsx          # AI 응답 메시지 컴포넌트
│   │   │   └── QuickQuestions.jsx    # 빠른 질문 버튼
│   │   ├── category/           # 카테고리 관련 컴포넌트
│   │   │   └── CategoryGrid.jsx      # 카테고리 그리드 표시
│   │   ├── Header.jsx          # 메인 헤더 (로그인 후)
│   │   ├── LoginHeader.jsx     # 로그인 페이지 헤더
│   │   ├── LeftSidebar.jsx     # 왼쪽 사이드바 (채팅 히스토리)
│   │   ├── RightSidebar.jsx    # 오른쪽 사이드바 (자료실)
│   │   ├── FaqPopup.jsx        # FAQ 팝업
│   │   └── SignupPopup.jsx     # 회원가입 팝업
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Dashboard.jsx       # 메인 대시보드
│   │   ├── chat/
│   │   │   └── ChatPage.jsx    # 채팅 페이지
│   │   ├── Login.jsx          # 로그인 페이지
│   │   ├── signup/             # 회원가입 단계별 페이지
│   │   │   ├── Step1.jsx       # 회원가입 1단계
│   │   │   ├── Step2.jsx       # 회원가입 2단계 (정보 입력)
│   │   │   └── Step3.jsx       # 회원가입 3단계 (완료)
│   │   ├── FindId.jsx         # 이메일 찾기
│   │   ├── FindPw.jsx         # 비밀번호 찾기
│   │   ├── ResetPassword.jsx  # 비밀번호 재설정
│   │   └── MyPage.jsx         # 마이페이지
│   ├── hooks/                  # Custom Hooks
│   │   ├── useChatMessages.js # 채팅 메시지 관리 훅
│   │   ├── useCategoryData.js # 카테고리 데이터 관리 훅
│   │   └── useApi.js          # API 호출 공통 훅
│   ├── App.jsx                # 메인 앱 컴포넌트 (라우팅 설정)
│   ├── main.jsx               # React 앱 진입점
│   └── index.css              # 전역 스타일
├── public/                    # 정적 파일
│   ├── logo.png               # 로고 이미지
│   ├── chatcharacter.png      # AI 캐릭터 이미지
│   └── ...
├── package.json               # 의존성 및 스크립트
├── vite.config.js             # Vite 설정
├── tailwind.config.js         # Tailwind CSS 설정
├── netlify.toml               # Netlify 배포 설정
└── README.md                  # 프로젝트 문서
```

📁 주요 Source code 설명

| 경로                       | 설명                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| **App.jsx**               | React Router를 사용한 라우팅 설정 및 페이지 컴포넌트 연결                                                          |
| **pages/Dashboard.jsx**  | 메인 대시보드 페이지 - 카테고리 선택, AI 캐릭터 표시, 채팅 입력 영역 제공                                                |
| **pages/chat/ChatPage.jsx** | 카테고리별 채팅 페이지 - 실시간 AI 상담 인터페이스, 메시지 히스토리 관리                                              |
| **components/chat/ChatContainer.jsx** | 채팅 컨테이너 - 메시지 리스트와 입력 영역을 통합 관리                                                          |
| **components/LeftSidebar.jsx** | 왼쪽 사이드바 - 채팅 히스토리 목록, 새 대화 시작 기능                                                          |
| **components/RightSidebar.jsx** | 오른쪽 사이드바 - 자료실 (최신 고시 업데이트, 사용법 안내, FAQ 등)                                                  |
| **api/chat.js**          | 채팅 관련 API 함수 - 메시지 전송, 대화 조회, 대화 생성 등                                                          |
| **api/auth.js**          | 인증 관련 API 함수 - 로그인, 회원가입, 비밀번호 찾기, 사용자 정보 조회 등                                             |
| **api/axios.js**         | Axios 인스턴스 설정 - 요청/응답 인터셉터, 토큰 관리, 에러 처리                                                      |
| **hooks/useChatMessages.js** | 채팅 메시지 상태 관리 커스텀 훅 - 메시지 전송, 수신, 히스토리 로드 등                                                |
| **hooks/useCategoryData.js** | 카테고리 데이터 관리 커스텀 훅 - 카테고리 목록 조회 및 관리                                                        |

---

# 2. How to build and install

### 1. 레포지토리 Clone

```bash
git clone https://github.com/carebridges-chatbot/carebridges-frontend.git
cd carebridges-frontend  # 클론 후 해당 프로젝트로 이동
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정 (.env)

프로젝트 루트 디렉토리에 `.env` 파일을 생성한 후, 아래와 같은 형식으로 환경 변수를 작성합니다:

```env
# 백엔드 API URL
VITE_API_BASE_URL=your_backend_api_url
```

> ⚠️ .env 파일은 보안상 GitHub에 포함되지 않습니다.  
> 실제 서비스 환경에서는 적절한 API URL을 설정해야 합니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

### 5. 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### 6. 빌드 미리보기

```bash
npm run preview
```

프로덕션 빌드를 로컬에서 미리 확인할 수 있습니다.

---

# 3. 주요 기능

### 🤖 AI 챗봇과의 실시간 대화

* 카테고리별 전문 상담 (입·퇴사, 급여 계산, 고시 변경 등)
* 실시간 메시지 전송 및 응답 수신
* 대화 컨텍스트 유지

### 📋 카테고리별 상담

* 요양보호사 입·퇴사
* 급여 계산
* 2025 고시 변경
* 기타 실무 질문

### 💬 채팅 히스토리 관리

* 이전 대화 목록 조회
* 대화 히스토리 복원
* 새 대화 시작

### ❓ FAQ 팝업 시스템

* 자주 묻는 질문 목록
* 카테고리별 FAQ 제공
* 빠른 답변 확인

### 📱 반응형 디자인

* 모바일, 태블릿, 데스크톱 지원
* Tailwind CSS 기반 반응형 레이아웃
* 사용자 친화적인 UI/UX

### 🔐 사용자 인증 시스템

* 이메일/비밀번호 로그인
* 회원가입 (3단계 프로세스)
* 이메일 찾기 / 비밀번호 찾기
* 비밀번호 재설정
* 마이페이지

### 📚 자료실

* 최신 고시 업데이트 (Notion 링크)
* 사용법 안내 (Notion 링크)
* FAQ 바로가기
* 돌봄다리 전용 자료 (네이버 블로그)

---

# 4. API 구조

### 📡 주요 API 엔드포인트

| API 경로 | Method | 설명 |
| ------- | ------ | --- |
| `/api/auth/login` | POST | 로그인 |
| `/api/auth/register` | POST | 회원가입 |
| `/api/auth/find-email` | POST | 이메일 찾기 |
| `/api/auth/find-password` | POST | 비밀번호 찾기 |
| `/api/auth/reset-password` | POST | 비밀번호 재설정 |
| `/api/user/info` | GET | 사용자 정보 조회 |
| `/api/chat/conversations` | GET | 대화 목록 조회 |
| `/api/chat/conversations/:id` | GET | 특정 대화 조회 |
| `/api/chat/messages` | POST | 메시지 전송 |
| `/api/faq` | GET | FAQ 목록 조회 |

### 🔐 인증 방식

* JWT 기반 토큰 인증
* `Authorization` 헤더에 `Bearer {token}` 형식으로 전송
* 토큰은 `localStorage`에 저장
* Axios 인터셉터를 통한 자동 토큰 주입

---

# 5. 배포

### 🚀 Netlify 배포

본 프로젝트는 Netlify를 통한 자동 배포가 설정되어 있습니다.

* **배포 설정:** `netlify.toml` 파일 참조
* **빌드 명령어:** `npm ci && npm run build`
* **배포 디렉토리:** `dist`
* **리다이렉트:** SPA 라우팅을 위한 모든 경로를 `index.html`로 리다이렉트

### 📝 배포 프로세스

1. GitHub에 코드 푸시
2. Netlify가 자동으로 빌드 및 배포
3. 배포 완료 후 자동으로 사이트 업데이트

---

# 6. Open Source Used

본 프로젝트는 다음 오픈소스 라이브러리를 기반으로 개발되었습니다:

* **React**  
   * 목적: 사용자 인터페이스 구축을 위한 UI 라이브러리
* **React Router DOM**  
   * 목적: 클라이언트 사이드 라우팅 및 페이지 네비게이션 관리
* **Vite**  
   * 목적: 빠른 개발 서버 및 프로덕션 빌드 도구
* **Tailwind CSS**  
   * 목적: 유틸리티 기반 CSS 프레임워크로 반응형 디자인 구현
* **Axios**  
   * 목적: HTTP 클라이언트로 백엔드 API와의 통신 처리
* **React Responsive**  
   * 목적: 반응형 디자인을 위한 미디어 쿼리 훅 제공

---

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

## 📄 License

이 프로젝트는 업그라운더 1기 프로젝트입니다.
