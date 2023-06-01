import { IWebinarMonth } from 'src/common/interfaces/calendar-webinars.interface';
import { MONTHS } from '../constants/webinars.constant';

const getWebinarsByMonth = (webinarsData: any): IWebinarMonth[] => {
  const webinars = MONTHS;

  webinarsData.forEach((webinarData: any) => {
    const positionMonth = webinarData._id;

    webinars[positionMonth].days = webinarData.months[0].days;
    webinars[positionMonth].actives = [webinarData.months[0].days[0]];
    webinars[positionMonth].list = webinarData.months[0].webinars;
  });

  return webinars;
};

export { getWebinarsByMonth };
