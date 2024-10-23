// import React from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../../../stores/authStore';
// import { Navigate } from 'react-router-dom';

// export const RedirectIfLoggedIn = ({ children }) => {
//   const username = useAuthStore((state) => state.username);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (username) {
//       navigate('/', {
//         replace: true,
//       });
//     }
//   }, [username, navigate]);

//   return <>{children}</>;
// };

// export default RedirectIfLoggedIn;
