const setTokenAndRedirect = (token: string) => {
  setTimeout(() => {
    localStorage.setItem('token', token);
    window.location.href = '/';
  }, 1000);
};

export default setTokenAndRedirect;
