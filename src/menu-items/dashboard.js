// assets
import { UserOutlined, FieldTimeOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  FieldTimeOutlined
};

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'customers',
      title: 'Customers',
      type: 'item',
      url: '/',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'item',
      url: '/orders',
      icon: icons.FieldTimeOutlined,
      breadcrumbs: false,
    }
  ]
};

export default dashboard;