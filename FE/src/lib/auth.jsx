// export const ProtectedRoute = ( { children}) => {
//   const user = getUser();
//   const location = useLocation();

//   if (!user.data) {
//     return (
//       <Navigate
//         to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
//         replace
//       />
//     );
//   }

//   return children;
// };
