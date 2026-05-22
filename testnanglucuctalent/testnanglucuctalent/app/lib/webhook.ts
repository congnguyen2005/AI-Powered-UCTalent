export async function sendWebhook(url: string, event: string, data: any) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        timestamp: new Date().toISOString(),
        data,
      }),
    })
    return response.ok
  } catch (error) {
    console.error('Webhook error:', error)
    return false
  }
}