import instance from './axios';

// 로그인 API
export const loginUser = async (email, password) => {
  try {
    console.log('로그인 API 호출 시작:', { email });
    
    // JSON 형식으로 전송 (백엔드가 JSON을 기대하는 경우)
    const loginData = {
      email: email,
      password: password
    };
    
    // form-urlencoded 형식도 시도 (OAuth2 스타일)
    const formData = new URLSearchParams();
    formData.append('username', email);
    formData.append('password', password);
    
    let response;
    try {
      // 먼저 JSON 형식으로 시도
      response = await instance.post('/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      console.log('JSON 형식 로그인 성공:', response.data);
    } catch (jsonError) {
      console.log('JSON 형식 실패, form-urlencoded 시도:', jsonError.response?.data);
      // JSON 실패 시 form-urlencoded 시도
      response = await instance.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: false
      });
      console.log('form-urlencoded 형식 로그인 성공:', response.data);
    }
    
    console.log('로그인 응답 전체:', response);
    console.log('응답 데이터:', response.data);
    
    // 토큰 저장 (다양한 형식 지원)
    const token = response.data.access_token || response.data.token || response.data.accessToken;
    const refreshToken = response.data.refresh_token || response.data.refreshToken;
    
    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('token', token);
      console.log('토큰 저장 완료');
    } else {
      console.warn('토큰이 응답에 없습니다:', response.data);
    }
    
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    
    // 사용자 정보 저장 (응답에 사용자 정보가 포함된 경우)
    if (response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    console.error('로그인 API 에러 상세:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText
    });
    throw error;
  }
};

// 회원가입 API
export const registerUser = async (userData) => {
  try {
    // 백엔드 API 형식에 맞게 데이터 변환
    const apiData = {
      email: userData.email,
      name: userData.name,
      password1: userData.password, // password1으로 변경
      password2: userData.password, // password2로 변경 (확인용)
      phone: userData.phone
    };
    
    // institution_name을 organization으로 매핑 (백엔드 필드명에 맞춤)
    if (userData.institution_name) {
      apiData.organization = userData.institution_name;
    }
    
    console.log('회원가입 API 호출:', apiData);
    const response = await instance.post('/auth/register', apiData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false // CORS 오류 해결
    });
    console.log('회원가입 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('회원가입 API 에러:', error.response?.data || error.message);
    throw error;
  }
};

// 로그인 사용자 정보 조회 API
export const getUserInfo = async () => {
  try {
    const response = await instance.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 로그아웃 API
export const logoutUser = async () => {
  try {
    await instance.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // 로컬 스토리지에서 모든 토큰과 사용자 정보 제거
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('current_conversation_id');
    
    // 로그인 상태 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('loginStatusChanged'));
  }
};

// 이메일 찾기 API
export const findEmail = async (name, phone) => {
  try {
    const response = await instance.post('/auth/find-email', { name, phone });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 비밀번호 찾기 API (이메일로 재설정 링크 전송)
export const findPassword = async (email) => {
  try {
    console.log('비밀번호 찾기 API 호출:', { email });
    
    // 백엔드가 기대하는 형식으로 요청 (reset_url은 백엔드에서 처리하도록)
    const response = await instance.post('/auth/forgot-password', { 
      email: email
    });
    console.log('비밀번호 찾기 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('비밀번호 찾기 API 에러:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// 비밀번호 재설정 API
export const resetPassword = async (token, newPassword) => {
  try {
    console.log('비밀번호 재설정 API 호출:', { token: token.substring(0, 20) + '...', hasPassword: !!newPassword });
    const response = await instance.post('/auth/reset-password', {
      token: token,
      newPassword: newPassword,
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: false
    });
    console.log('비밀번호 재설정 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('비밀번호 재설정 API 에러:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// 이메일 인증 API
export const verifyEmail = async (token) => {
  try {
    const response = await instance.post('/auth/verify-email', { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 토큰 갱신 API
export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await instance.post('/auth/refresh', {
      refresh_token: refreshToken,
    });
    
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};
