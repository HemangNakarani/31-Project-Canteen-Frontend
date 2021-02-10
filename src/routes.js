import LoginPage from './Pages/Login';
import IndexPage from './Pages/Index';
import ProfilePage from './Pages/Profile';
import CartPage from './Pages/Cart';

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
    path: "/login",
    name: "Login",
    component: LoginPage,
    layout: "/auth"
  }

];
export default routes;
