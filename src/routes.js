
import {lazy} from "react";

const LoginPage = lazy(() => import('./Pages/AuthView/Login'));
const SignupPage = lazy(() => import('./Pages/AuthView/Signup'))
const IndexPage = lazy(() => import('./Pages/Index'));
const ProfilePage = lazy(() => import('./Pages/AccountView'));
const CartPage = lazy(() => import('./Pages/Cart'));
const CanteensPage = lazy(() => import('./Pages/Canteens'));
const SettingsPage = lazy(() => import('./Pages/Settings'));
const LiveOrdersPage = lazy(() => import('./Pages/LiveOrders'));
const OwnerDashboardPage = lazy(() => import('./Pages/OwnerDashboard'));
const NotificationsPage = lazy(() => import('./Pages/Notifications'));
const OwnerAccounts = lazy(() => import('./Pages/OwnerAccounts'));
const FoodManage = lazy(() => import('./Pages/FoodManage'));
const FoodManageFromCanteen = lazy(() => import('./Pages/FoodFromCanteen'));


var routes = [
  {
    path: "/dashboard",
    name: "owner Dashboard",
    component: OwnerDashboardPage, 
    layout: "/owner"
  },
  {
    path: "/accounts",
    name: "Owner Acoounts",
    component: OwnerAccounts,
    layout: "/owner"
  },
  {
    path: "/live",
    name: "Live Orders",
    component: LiveOrdersPage,
    layout: "/owner"
  },
  {
    path: "/manage",
    name: "Canteen Food",
    component: FoodManage,
    layout: "/owner"
  },
  {
    path: "/profile",
    name: "Owner Profie",
    component: ProfilePage,
    layout: "/owner"
  },
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
    path: "canteens/:id",
    name: "Food From Canteens",
    component: FoodManageFromCanteen,
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
    path: "notifications",
    name: "Notifications",
    component: NotificationsPage,
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
