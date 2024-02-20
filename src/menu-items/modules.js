// assets
import { UserOutlined, FieldTimeOutlined, ToolOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  FieldTimeOutlined,
  ToolOutlined,
  TeamOutlined
};

const modules = {
  id: 'group-module',
  title: 'Build',
  type: 'group',
  children: [
    {
      id: 'customers',
      title: 'Customers',
      type: 'collapse',
      icon: icons.UserOutlined,
      children: [
        {
          id: 'list_customer',
          title: 'List',
          subtitle: 'Customers',
          type: 'item',
          url: '/customers',
          sub: true
        },
        {
          id: 'create_customer',
          title: 'Create',
          subtitle: 'Create Customer',
          type: 'item',
          url: '/customers/create',
          sub: true
        }
      ]
    },
    {
      id: 'orders',
      title: 'Orders',
      type: 'collapse',
      icon: icons.FieldTimeOutlined,
      children: [
        {
          id: 'list_orders',
          title: 'List',
          subtitle: 'Orders List',
          type: 'item',
          url: '/orders',
          sub: true
        },
        {
          id: 'list_details',
          title: 'Details',
          subtitle: 'Orders Details',
          url: '/orders/d/',
          type: 'item',
          breadcrumbs: false,
          showBack: true,
          sub: true
        },
        {
          id: 'create_order',
          title: 'Create',
          subtitle: 'Create Order',
          type: 'item',
          url: '/orders/create',
          sub: true
        }
      ]
    },
    {
      id: 'team',
      title: 'Technicians',
      type: 'item',
      url: '/team',
      subtitle: 'Technicians List',
      icon: icons.TeamOutlined
    },
    {
      id: 'services',
      title: 'Services',
      type: 'item',
      url: '/services',
      subtitle: 'Services List',
      icon: icons.ToolOutlined
    }
  ]
};

export default modules;