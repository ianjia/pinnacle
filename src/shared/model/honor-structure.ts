import { SchoolYear } from "./common-types";

export enum HonorType {
    SPORTS = 'Sports',
    VOLUNTEER = 'Volunteer',
    ACADEMIC = 'Academic',
    ACTIVITY = 'Activity',
    OTHERS = 'Others',
  }

export interface Honor {
    id: number;
    user_id: number;
    name?: string;
    type?: HonorType;
    year?: SchoolYear;
    description?: string;
  }
