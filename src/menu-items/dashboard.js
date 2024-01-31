// assets
import { UserOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined
  
};

const dashboard = {
  id: 'group-dashboard',
  title: 'Dashboard',
  type: 'group',
  children: [
    {
      id: 'customers',
      title: 'My Customers',
      type: 'item',
      url: '/',
      icon: icons.UserOutlined,
      breadcrumbs: false,
    }
  ]
};

export default dashboard;