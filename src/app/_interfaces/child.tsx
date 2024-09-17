import { Name } from "./name";

export interface Child {
  childId: string;
  institutionId: string;
  groupId: string;
  createdTime: string;
  name: Name;
  birthday: string;
  homeAddress?: string;
  extraInfo?: string;
  language?: string;
  nationality?: string;
  birthplace?: string;
  gender: number;
  startDate: string;
  endDate?: string;
  leavingReason?: string;
  isTestChild: boolean;
  relations?: any;
  image: {
    small: string;
    large: string;
    empty: boolean;
    colorCode: number;
  };
  isSleeping: boolean;
  naps: any[];
  hasVacation: boolean;
  isSick: boolean;
  isAbsent: boolean;
  leaves: any[];
  onTrip: boolean;
  statuses: any[];
  statusRegistrations: any[];
  guardians: any[];
  checkIns: any[];
  checkedIn: boolean;
  checkInTime?: string;
  colorCode: number;
}
