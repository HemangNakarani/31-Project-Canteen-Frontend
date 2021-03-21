import LoginPage from './Pages/Login';
import IndexPage from './Pages/Index';
import SignupPage from "./Pages/SignupPage";
import ProfilePage from './Pages/Profile';
import CartPage from './Pages/Cart';
import CanteensPage from './Pages/Canteens';
import SettingsPage from './Pages/Settings';

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
    path: "cart",
    name: "Cart",
    component: CartPage,
    layout: "/"
  },
  {
    path: "canteens",
    name: "Canteens",
    component: CanteensPage,
    layout: "/"
  },
  {
    path: "settings",
    name: "Settings",
    component: SettingsPage,
    layout: "/"
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    layout: "/auth"
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
    layout: "/auth"
  }

];
export default routes;
