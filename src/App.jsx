import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";


import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoDetail from "./pages/TodoDetail";
import SelectedTodos from "./pages/SelectedTodos"; // Import the new page


import MainLayout from "./layout/MainLayout";


import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";


import ProtectedRoutes from "./components/ProtectedRoutes";


import { auth } from "./firebase/firebaseConfig";
import { login, isAuthChange } from "./app/userSlice";
import { action as HomeAction } from "./pages/home";

function App() {
  const dispatch = useDispatch();
  const { user, isAuthReady } = useSelector((state) => state.user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: HomeAction,
        },
        {
          path: "todo-detail",
          element: <TodoDetail />,
        },
        {
          path: "selected-todos", 
          element: <SelectedTodos />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login(user));
      }
      dispatch(isAuthChange());
    });
    return () => unsubscribe();
  }, [dispatch]);

  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
