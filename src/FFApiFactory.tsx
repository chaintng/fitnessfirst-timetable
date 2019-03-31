import axios from 'axios';
import { FFDataModel } from "./FFDataModel";

async function requestTimetable(club: string): Promise<any> {
  return axios.get(`/proxy/www.fitnessfirst.co.th:443/fitness-first/web-services/v2/timetable/%7B03D82E6E-083F-4F37-B877-9CAFC75D919C%7D/${club}`)
    .then((output) => {
      return mapToFfDataModel(output.data);
    })
}

function mapToFfDataModel(output: any): FFDataModel {
  const currentDate = ("0" + new Date().getDate()).slice(-2);
  const currentMonth = ("0" + (new Date().getMonth() +1)).slice(-2);
  const ffDateFormat = `${currentDate}/${currentMonth}`;

  const allClasses = output.Timetable.Morning.concat(output.Timetable.Afternoon).concat(output.Timetable.Evening);

  return {
    classes: allClasses
      .filter((item: any) => item.Formatteddate === ffDateFormat)
      .reduce((prev: Array<any>, cur: any) => {
        return prev.concat(cur.Classes);
      }, [])
      .map((item: any) => {
        item.EndTime = new Date(parseInt(item.EndTime.match(/\d+/)[0], 10));
        return item;
      })
  };
}

export {
  requestTimetable,
}