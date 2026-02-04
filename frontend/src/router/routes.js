import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import CartView from "@/views/CartView.vue";
import OrdersView from "@/views/OrdersView.vue";
import ProfileView from "@/views/ProfileView.vue";

export default [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { isHeaderHidden: true },
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
  },
  {
    path: "/orders",
    name: "Orders",
    component: OrdersView,
    meta: {
      layout: "AppLayoutProfile",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,

    meta: {
      layout: "AppLayoutProfile",
    },
  },
];
