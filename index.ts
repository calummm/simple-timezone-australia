// prettier-ignore
const timezoneLookup = [
  ['Pacific/Norfolk',       '+1100', '+11:00', 'NFT'],
  ['Pacific/Norfolk',       '+1200', '+12:00', 'NFDT'],
  ['Antarctica/Casey',      '+0800', '+08:00', undefined],
  ['Antarctica/Casey',      '+1100', '+11:00', undefined],
  ['Australia/Lord_Howe',   '+1030', '+10:30', undefined],
  ['Australia/Lord_Howe',   '+1100', '+11:00', undefined],
  ['Antarctica/Macquarie',  '+1000', '+10:00', 'AEST'],
  ['Antarctica/Macquarie',  '+1100', '+11:00', 'AEDT'],
  ['Australia/Sydney',      '+1000', '+10:00', 'AEST'],
  ['Australia/Sydney',      '+1100', '+11:00', 'AEDT'],
  ['Australia/Hobart',      '+1000', '+10:00', 'AEST'],
  ['Australia/Hobart',      '+1100', '+11:00', 'AEDT'],
  ['Australia/Melbourne',   '+1000', '+10:00', 'AEST'],
  ['Australia/Melbourne',   '+1100', '+11:00', 'AEDT'],
  ['Australia/Brisbane',    '+1000', '+10:00', 'AEST'],
  ['Australia/Lindeman',    '+1000', '+10:00', 'AEST'],
  ['Australia/Broken_Hill', '+0930', '+09:30', 'ACST'],
  ['Australia/Broken_Hill', '+1030', '+10:30', 'ACDT'],
  ['Australia/Adelaide',    '+0930', '+09:30', 'ACST'],
  ['Australia/Adelaide',    '+1030', '+10:30', 'ACDT'],
  ['Australia/Darwin',      '+0930', '+09:30', 'ACST'],
  ['Australia/Eucla',       '+0845', '+08:45', undefined],
  ['Australia/Perth',       '+0800', '+08:00', 'AWST'],
  ['Antarctica/Davis',      '+0700', '+07:00', undefined],
  ['Indian/Cocos',          '+0630', '+06:30', 'CCT'],
  ['Antarctica/',           '+0500', '+05:00', undefined],
];

const timezoneLink = [
  ['Australia/ACT', 'Australia/Sydney'],
  ['Australia/Canberra', 'Australia/Sydney'],
  ['Australia/Currie', 'Australia/Hobart'],
  ['Australia/LHI', 'Australia/Lord_Howe'],
  ['Australia/North', 'Australia/Darwin'],
  ['Australia/NSW', 'Australia/Sydney'],
  ['Australia/Queensland', 'Australia/Brisbane'],
  ['Australia/South', 'Australia/Adelaide'],
  ['Australia/Tasmania', 'Australia/Hobart'],
  ['Australia/Victoria', 'Australia/Melbourne'],
  ['Australia/West', 'Australia/Perth'],
  ['Australia/Yancowinna', 'Australia/Broken_Hill'],
];

export const getUserIANA = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getTimezoneOffset = (date = new Date(), colon = false): string => {
  const rawOffset = date.getTimezoneOffset() * -1;
  const offsetHour = Math.floor(rawOffset / 60);
  const offsetMin = rawOffset % 60;
  const offsetSign = rawOffset >= 0 ? '+' : '-';

  return offsetSign + offsetHour + colon ? ':' : '' + offsetMin;
};

export const getAustralianTimezone = (
  date = new Date(),
  colon = false
): string => {
  const userIANA = getUserIANA();

  const foundOffset = getTimezoneOffset(date, colon);
  const foundIana =
    timezoneLink.find(([iana]) => iana === userIANA)?.[colon ? 2 : 1] ??
    userIANA;
  const foundTimezone = timezoneLookup.find(
    ([iana, offset]) => iana === foundIana && offset === foundOffset
  );

  return foundTimezone?.[3] ?? foundOffset;
};
