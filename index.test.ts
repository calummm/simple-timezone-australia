/* eslint-disable @typescript-eslint/no-explicit-any */
import { afterEach, describe, expect, it } from 'vitest';
import { getAustralianTimezone, getTimezoneOffset, getUserIANA } from './index';

const sysIntOffset = new Date().getTimezoneOffset();
const systemOffsetSign = sysIntOffset < 0 ? '+' : '-';
const systemOffsetHour = String(
  Math.floor(Math.abs(sysIntOffset / 60))
).padStart(2, '0');
const systemOffsetMin = String(Math.abs(sysIntOffset % 60)).padStart(2, '0');
const systemOffset = `${systemOffsetSign}${systemOffsetHour}${systemOffsetMin}`;
const systemOffsetColon = `${systemOffsetSign}${systemOffsetHour}:${systemOffsetMin}`;
const systemIana = Intl.DateTimeFormat().resolvedOptions().timeZone;

describe('simple-timezone-australia', () => {
  const timezoneMock = function (zone: string) {
    const DateTimeFormat = Intl.DateTimeFormat;

    jest
      .spyOn(Intl, 'DateTimeFormat')
      .mockImplementation(
        (locale, options) =>
          new DateTimeFormat(locale, { ...options, timeZone: zone })
      );
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should get a users IANA', () => {
    expect(getUserIANA()).toBe(systemIana);
  });

  it('should get an offset in stard format', () => {
    expect(getTimezoneOffset()).toBe(systemOffset);
  });

  it('should get an offset with colon format', () => {
    expect(getTimezoneOffset(new Date(), true)).toBe(systemOffsetColon);
  });

  it('should get the australian timezone', () => {
    timezoneMock('Australia/Perth');
    expect(getAustralianTimezone()).toBeDefined();
  });
});
