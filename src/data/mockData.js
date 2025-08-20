import { faker } from '@faker-js/faker';

export const mockUsers = Array.from({ length: 8 }, (_, i) => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  role: faker.helpers.arrayElement(['Employee', 'Manager', 'Admin']),
  permissions: faker.helpers.arrayElements(['Dashboard', 'Approve', 'History'], { min: 1, max: 3 }),
  phoneNumber: faker.phone.number(),
}));

const ruralBluesOcrData = {
  vendor: 'RURAL BLUES THE RESTOBAR',
  date: '17/02/20',
  billNo: '25297',
  items: [
    { name: 'BUFFET LUNCH', quantity: 7, price: 442.08, amount: 3094.56 },
    { name: 'MAGNUM DRAUGHT 330 M', quantity: 2, price: 180.00, amount: 360.00 },
    { name: 'OLD FASHIONED', quantity: 1, price: 350.00, amount: 350.00 },
    { name: 'TWISTOF ISLAND SPICED', quantity: 2, price: 225.00, amount: 450.00 },
    { name: 'UNCLE DUNKEL 500 ML', quantity: 1, price: 375.00, amount: 375.00 },
  ],
  subtotal: 4629.56,
  cgst: { rate: 2.5, amount: 97.29 },
  sgst: { rate: 2.5, amount: 97.29 },
  serviceCharge: { rate: 7.5, amount: 347.22 },
  total: 5171.00,
};

export const mockExpenseRequests = Array.from({ length: 15 }, () => {
  return {
    id: faker.string.uuid(),
    user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
    amount: ruralBluesOcrData.total,
    date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
    category: faker.helpers.arrayElement(['Travel', 'Meals', 'Office Supplies', 'Software', 'Marketing']),
    status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
    receiptImage: `https://miro.medium.com/v2/resize:fit:600/1*HdaGXND6mwzL1I8fkNfHXQ.jpeg`,
    ocrData: ruralBluesOcrData
  };
});

export const dashboardStats = {
  totalApprovals: mockExpenseRequests.filter(req => req.status === 'approved').length,
  pendingApprovals: mockExpenseRequests.filter(req => req.status === 'pending').length,
  totalRejected: mockExpenseRequests.filter(req => req.status === 'rejected').length,
  totalRequests: mockExpenseRequests.length
};
