export interface User {
    name: string;
    role: string;
  };
 
export type Reports = {
    reports: {
      id: number,
      msg: string,
      created: string,
      fixed: string,
      gps_lat: number,
      gps_lng: number
    }[]
  }