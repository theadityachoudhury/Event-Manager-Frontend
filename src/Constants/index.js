export const headerLinks = [
  {
    label: 'Home',
    route: '/',
    public: true
  },
  {
    label: 'Dashboard',
    route: '/dashboard',
  },
  {
    label: 'Create Event',
    route: '/events/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
  {
    label: 'About',
    route: '/about',
    public: true
  },
  {
    label: 'Contact',
    route: '/contact',
    public: true
  },
  {
    label: 'Manage Users',
    route:"/admin/manage/users"
  },
  {
    label: 'Email Logs',
    route:"/emailLogs"
  }
]

export const eventDefaultValues = {
  title: '',
  description: '',
  location: '',
  imageUrl: '',
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: '',
  price: '',
  isFree: false,
  url: '',
}
