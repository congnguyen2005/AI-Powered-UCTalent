interface Notification {
  userId: string
  type: string
  title: string
  body: string
  data?: any
}

export async function sendNotification(notification: Notification) {
  // Store in database for polling
  const { supabaseAdmin } = await import('./supabase/server')
  
  await supabaseAdmin
    .from('notifications')
    .insert({
      user_id: notification.userId,
      type: notification.type,
      title: notification.title,
      body: notification.body,
      data: notification.data,
      read: false,
    })
  
  // Here you would also send real-time via WebSocket or push notification
}