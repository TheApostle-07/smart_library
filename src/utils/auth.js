export const setUserData = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getUserData = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  export const clearUserData = () => {
    localStorage.removeItem('user');
  };
