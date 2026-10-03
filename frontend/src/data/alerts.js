// Alerts data - cyberbullying and safety notifications
// Ready for Supabase migration: replace with real-time subscriptions

export const ALERTS = [
  {
    id: 'alert1',
    type: 'cyberbullying',
    severity: 'high',
    childId: 'child1',
    childName: 'Ahmed',
    message: 'Potential cyberbullying detected in chat',
    messageAr: 'تم اكتشاف تنمر إلكتروني محتمل في الدردشة',
    context: 'Message contained unkind language',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  },
  {
    id: 'alert2',
    type: 'screen_time',
    severity: 'medium',
    childId: 'child2',
    childName: 'Fatima',
    message: 'Daily screen time limit reached',
    messageAr: 'تم الوصول للحد اليومي لوقت الشاشة',
    context: 'Played for 2 hours today',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    read: true
  },
  {
    id: 'alert3',
    type: 'achievement',
    severity: 'low',
    childId: 'child1',
    childName: 'Ahmed',
    message: '🏆 Ahmed unlocked "Math Master" badge!',
    messageAr: '🏆 أحمد حصل على شارة "خبير الرياضيات"!',
    context: 'Completed 10 math games',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: true
  },
  {
    id: 'alert4',
    type: 'progress',
    severity: 'low',
    childId: 'child3',
    childName: 'Omar',
    message: 'Omar completed "Pyramid Architect" for the first time!',
    messageAr: 'عمر أكمل لعبة "مهندس الأهرامات" لأول مرة!',
    context: 'Scored 85%',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    read: true
  }
];

// Get alerts for a parent/teacher
export const getAlertsForParent = (parentId, childIds) => {
  return ALERTS.filter((alert) => childIds.includes(alert.childId));
};

// Get unread alerts count
export const getUnreadAlertsCount = (childIds) => {
  return ALERTS.filter(
    (alert) => childIds.includes(alert.childId) && !alert.read
  ).length;
};

// Mark alert as read
export const markAlertAsRead = async (alertId) => {
  const alert = ALERTS.find((a) => a.id === alertId);
  if (alert) {
    alert.read = true;
  }
  return { success: true };
};

export default ALERTS;
