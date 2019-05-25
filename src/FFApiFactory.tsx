import axios from 'axios';
import { FFDataModel } from "./FFDataModel";

async function requestTimetable(club: string): Promise<any> {
  return axios.get(`/proxy/www.fitnessfirst.co.th:443/fitness-first/web-services/v2/timetable/%7B03D82E6E-083F-4F37-B877-9CAFC75D919C%7D/${club}`)
    .then((output) => {
      return mapToFfDataModel(output.data);
    })
}

function mapToFfDataModel(output: any): FFDataModel {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate()+1);

  const todayFFDateFormat = getFFDateFormat(now);
  const tomorrowFFDateFormat = getFFDateFormat(tomorrow);

  const allClasses = output.Timetable.Morning
    .concat(output.Timetable.Afternoon)
    .concat(output.Timetable.Evening)
    .reduce((prev: Array<any>, cur: any) => {
      return prev.concat(cur.Classes);
    }, [])
    .map((item: any) => {
      const dateRegex = item.Date.match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
      const timeRegex = item.TimeText.match(/(.+)\s-\s(.+)/);
      item.EndTime = new Date(`${dateRegex[1]}-${dateRegex[2]}-${dateRegex[3]} ${timeRegex[2]}`);
      return item;
    });

  return {
    classes: {
      today: allClasses.filter((item: any) => item.Date === todayFFDateFormat),
      tomorrow: allClasses.filter((item: any) => item.Date === tomorrowFFDateFormat),
    }
  };
}

function getFFDateFormat(date: Date): string {
  const currentDate = ("0" + date.getDate()).slice(-2);
  const currentMonth = ("0" + (date.getMonth() +1)).slice(-2);
  return `${date.getFullYear()}${currentMonth}${currentDate}`;
}

export {
  requestTimetable,
  getFFDateFormat,
}