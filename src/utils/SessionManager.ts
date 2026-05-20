interface UserSession {
  _id: string;
  username: string;
  email: string;
  profile: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const setUserSession = (user: UserSession): void => {
  if (user && typeof user === 'object') {
    sessionStorage.setItem('userSession', JSON.stringify(user));
  } else {
    console.error('Invalid user data provided to setUserSession');
  }
};

export const getUserSession = (): UserSession | null => {
  const user = sessionStorage.getItem('userSession');
  return user ? (JSON.parse(user) as UserSession) : null;
};

export const verifyUserSession = (): boolean => {
  return sessionStorage.getItem('userSession') !== null;
};

export const clearUserSession = (): void => {
  sessionStorage.removeItem('userSession');
};
