export const VEHICLE_TYPES = {
  CAR: 'car',
  BIKE: 'bike',
  TRUCK: 'truck',
  VAN: 'van'
};

export const TICKET_STATUS = {
  PENDING: 'pending',
  RESOLVED: 'resolved',
  PAID: 'paid',
  CANCELLED: 'cancelled'
};

export const VIOLATION_TYPES = {
  WRONG_SPOT: 'wrong_spot',
  EXPIRED: 'expired',
  NO_PERMIT: 'no_permit',
  BLOCKED: 'blocked'
};

export const USER_TYPES = {
  EMPLOYEE: 'employee',
  GUEST: 'guest',
  ADMIN: 'admin'
};

export const PARKING_ZONES = {
  A: 'Zone A',
  B: 'Zone B',
  C: 'Zone C',
  VIP: 'VIP Zone',
  GUEST: 'Guest Zone'
};

export const parkingSideBar = [
  {
    icon: 'DashboardIcon',
    title: 'Dashboard',
    url: '/dashboard',
    type: 'redirection'
  },
  {
    icon: 'CarIcon',
    title: 'Vehicle Monitoring',
    url: '/vehicles',
    type: 'redirection',
  },
  {
    icon: 'UserIcon',
    title: 'Driver Details',
    url: '/driver-details',
    type: 'redirection',
  },
  {
    icon: 'TicketIcon',
    title: 'Tickets',
    url: '/tickets',
    type: 'redirection',
  },
  {
    icon: 'SettingsIcon',
    title: 'Settings',
    type: "redirection",
    url: '/settings'
  },
  {
    icon: 'LogoutIcon',
    title: 'Logout',
    type: 'button',
    url: '/logout'
  }
];
