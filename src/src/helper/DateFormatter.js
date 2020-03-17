export const dateDuration = (timestamp) => {
  const current = new Date();
  const from = new Date(timestamp);
  const durationTimestamp = current - from;
  const oneMinuteTimestamp = 60000;
  const durationMinute = durationTimestamp / oneMinuteTimestamp;

  // Within 30 second.
  if (durationMinute <= 0.5) { return 'たった今' }
  // Within 1 minitue.
  if (durationMinute <= 1) { return `${Math.floor(durationMinute * 60)}秒前`}
  // Within 1 hour.
  if (durationMinute <= 60) { return `${Math.floor(durationMinute)}分前` }
  // Within 1 day.
  if (durationMinute <= 1440) { return `${Math.floor(durationMinute / 60)}時間前` }
  // Within 1 week.
  if (durationMinute <= 10080) { return `${Math.floor(durationMinute / 1440)}日前` }
  // Within 1 month.
  if (durationMinute <= 43800) { return `${Math.floor(durationMinute / 10080)}週間前`}
  // Within 1 year.
  if (durationMinute <= 525600) { return `${Math.floor(durationMinute / 43800)}ヶ月前`}
  // Other
  return `${Math.floor(durationMinute / 525600)}年前`;
}
