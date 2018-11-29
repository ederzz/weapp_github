export const baseUrl = 'https://api.github.com'


export const monthMap = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

/**
 * github feed event type
 */
export const githubEventMap = {
  WatchEvent: 'starred',
  ForkEvent: 'forked',
  CreateEvent: 'created a repository'
}