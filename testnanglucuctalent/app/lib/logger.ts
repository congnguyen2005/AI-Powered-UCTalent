export enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

export async function logEvent(
  userId: string,
  action: string,
  entityType: string,
  entityId: string,
  details: any,
  ipAddress?: string
) {
  const { supabaseAdmin } = await import('./supabase/server')
  
  await supabaseAdmin
    .from('audit_logs')
    .insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      details,
      ip_address: ipAddress,
    })
}
