import { Alert } from '../types';

export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'recruit',
    title: 'New 5-Star Decommit!',
    message: 'Jaylen "JSON" Carter has reopened his recruitment. Quick — get him on the board before Alabama does!',
    timestamp: '2 hours ago',
  },
  {
    id: 'alert-002',
    type: 'drill',
    title: 'New Drill Available',
    message: 'A new SQL drill has been added to the Daily Combine. Test your WHERE clause skills!',
    timestamp: '5 hours ago',
  },
  {
    id: 'alert-003',
    type: 'streak',
    title: 'Streak Alert!',
    message: "Don't break your streak! Complete today's Daily Combine to keep your consecutive days going.",
    timestamp: '12 hours ago',
  },
];
