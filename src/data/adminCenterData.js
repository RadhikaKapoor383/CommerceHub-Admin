export const adminNotifications = [
  { id: 1, title: 'Low Stock Alert', desc: 'Apex Smartwatch is down to 8 units.', time: '10m ago', unread: true, type: 'Inventory' },
  { id: 2, title: 'Payout Successful', desc: 'Stripe payout of $14,250.00 completed.', time: '6h ago', unread: true, type: 'Payments' },
  { id: 3, title: 'System Updated', desc: 'Dashboard upgraded to v2.4.0.', time: '1d ago', unread: false, type: 'System' }
];

export const adminMessages = [
  {
    id: 1,
    sender: 'Eleanor Vance',
    preview: 'Can I change my shipping address for ORD-9821?',
    time: '12m ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    status: 'Open'
  },
  {
    id: 2,
    sender: 'Marcus Sterling',
    preview: 'Is there a discount code available for next month?',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80',
    status: 'Waiting'
  }
];
