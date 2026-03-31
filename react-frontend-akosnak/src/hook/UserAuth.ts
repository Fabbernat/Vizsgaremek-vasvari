export const useAuth = () => {
  const username = sessionStorage.getItem("username");
  const token = sessionStorage.getItem("token");

  return {
    isLoggedIn: !!token,
    username,
  };
};

export default useAuth