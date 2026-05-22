// app/lib/utils/string.ts
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.slice(0, length).trim() + '...'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function getSentimentText(sentiment: string): string {
  switch (sentiment) {
    case 'positive': return 'Tích cực'
    case 'negative': return 'Tiêu cực'
    default: return 'Trung tính'
  }
}

export function getPriorityText(priority: string): string {
  switch (priority) {
    case 'critical': return 'Nguy cấp'
    case 'high': return 'Cao'
    case 'medium': return 'Trung bình'
    default: return 'Thấp'
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'critical': return 'red'
    case 'high': return 'orange'
    case 'medium': return 'yellow'
    default: return 'blue'
  }
}

export function getSentimentColor(sentiment: string): string {
  switch (sentiment) {
    case 'positive': return 'green'
    case 'negative': return 'red'
    default: return 'gray'
  }
}