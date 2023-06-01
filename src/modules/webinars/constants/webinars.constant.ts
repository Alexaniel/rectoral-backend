import { IWebinarMonth } from 'src/common/interfaces/calendar-webinars.interface';
import { MonthsOfYear, WebinarCategory } from '../enum/webinars.enum';

export const WEBINAR_CATEGORIES = {
  LEGACY: WebinarCategory.LEGACY,
  THINK_TANK_BOARD: WebinarCategory.THINK_TANK_BOARD,
  BRANDS_RECTORAL: WebinarCategory.BRANDS_RECTORAL,
  ROAD_MAP_RECTORAL: WebinarCategory.ROAD_MAP_RECTORAL,
};

export const MONTHS: IWebinarMonth[] = [
  {
    name: '',
    month: 0,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.JANUARY,
    month: 1,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.FEBRUARY,
    month: 2,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.MARCH,
    month: 3,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.APRIL,
    month: 4,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.MAY,
    month: 5,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.JUNE,
    month: 6,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.JULY,
    month: 7,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.AUGUST,
    month: 8,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.SEPTEMBER,
    month: 9,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.OCTOBER,
    month: 10,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.NOVEMBER,
    month: 11,
    actives: [],
    days: [],
    list: [],
  },
  {
    name: MonthsOfYear.DECEMBER,
    month: 12,
    actives: [],
    days: [],
    list: [],
  },
];
