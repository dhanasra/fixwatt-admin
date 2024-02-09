// assets
import { UserOutlined, FieldTimeOutlined } from '@ant-design/icons';

// icons
const icons = {
  UserOutlined,
  FieldTimeOutlined
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
          id: 'create_order',
          title: 'Create',
          subtitle: 'Create Order',
          type: 'item',
          url: '/orders/create',
          sub: true
        }
      ]
    }
  ]
};

export default modules;