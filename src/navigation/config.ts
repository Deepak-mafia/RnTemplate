import { Home, Profile, Notifications, Search } from '../modules';

export const TAB_ROUTES = [
  {
    name: 'Home',
    component: Home,
    icon: 'Home',
    label: 'Home',
  },
  {
    name: 'Search',
    component: Search,
    icon: 'Search',
    label: 'Search',
  },
  {
    name: 'Notifications',
    component: Notifications,
    icon: 'Bell',
    label: 'Notifications',
  },
  {
    name: 'Profile',
    component: Profile,
    icon: 'User',
    label: 'Profile',
  },
];

export const MODULE_ROUTES = [
  // Each module can push its own navigator or screens here
  // Example: { name: 'Home', component: HomeNavigator }
];
