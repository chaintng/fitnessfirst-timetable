export interface FFDataModel {
  classes: {
    today: Class[],
    tomorrow: Class[],
  }
}

export interface Class {
  TimeText: string;
  StartTime: Date;
  EndTime: Date;
  Title: string;
  Studio: string;
  Instructor: string;
  Image: string;
}