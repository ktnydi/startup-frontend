import { dateDuration } from './DateFormatter';

test('display date duration', () => {
  let date = new Date();
  const latest = date.getTime();
  expect(dateDuration(latest)).toBe('たった今');

  date = new Date();
  const withinOneMinute = date.setSeconds(date.getSeconds() - 50);
  expect(dateDuration(withinOneMinute)).toMatch(/秒前/);

  date = new Date();
  const withinOneHour = date.setMinutes(date.getMinutes() - 60);
  expect(dateDuration(withinOneHour)).toMatch(/分前/);

  date = new Date();
  const withinOneDay = date.setHours(date.getHours() - 10);
  expect(dateDuration(withinOneDay)).toMatch(/時間前/);

  date = new Date();
  const withinOneWeek = date.setDate(date.getDate() - 5);
  expect(dateDuration(withinOneWeek)).toMatch(/日前/);

  date = new Date();
  const withinOneMonth = date.setDate(date.getDate() - 20);
  expect(dateDuration(withinOneMonth)).toMatch(/週間前/);

  date = new Date();
  const withinOneYear = date.setMonth(date.getMonth() - 8);
  expect(dateDuration(withinOneYear)).toMatch(/ヶ月前/);

  date = new Date();
  const OverOneYear = date.setMonth(date.getMonth() - 20);
  expect(dateDuration(OverOneYear)).toMatch(/年前/);
});
