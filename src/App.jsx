// src/App.js
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

// Pages
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/contact";
import TodoDetail from "./pages/TodoDetail";
import SelectedTodos from "./pages/SelectedTodos"; // Import the new page

// Layout
import MainLayout from "./layout/MainLayout";

// Loaders
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";

// Components
import ProtectedRoutes from "./components/ProtectedRoutes";

// Redux actions
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
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "todo-detail",
          element: <TodoDetail />,
        },
        {
          path: "selected-todos", // Add the new route
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
