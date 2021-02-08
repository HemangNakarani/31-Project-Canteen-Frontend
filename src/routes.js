import LoginPage from './Pages/Login';
import IndexPage from './Pages/Index';
import ProfilePage from './Pages/Profile';

var routes = [
  {
    path: "index",
    name: "Dashboard",
    component: IndexPage,
    layout: "/"
  },
  {
    path: "profile",
    name: "Profie",
    component: ProfilePage,
    layout: "/"
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    layout: "/auth"
  }
];
export default routes;
