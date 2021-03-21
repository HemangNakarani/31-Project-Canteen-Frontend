
import {lazy} from "react";

const LoginPage = lazy(() => import('./Pages/Login'));
const SignupPage = lazy(() => import('./Pages/SignupPage'))
const IndexPage = lazy(() => import('./Pages/Index'));
const ProfilePage = lazy(() => import('./Pages/AccountView'));
const CartPage = lazy(() => import('./Pages/Cart'));
const CanteensPage = lazy(() => import('./Pages/Canteens'));
const SettingsPage = lazy(() => import('./Pages/Settings'));


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
