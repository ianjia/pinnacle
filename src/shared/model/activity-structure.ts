
export enum ActivityType {
    SPORTS = "Sports",
    VOLUNTEER = "Volunteer",
    INTERNSHIP = "Internship",
    RESEARCH = "Research",
    SCHOOLCLUB = "School Club",
    PROJECT =  "Project",
    SUMMERPROGRAM = "Summer Program",
    ACADEMICCOMPETITION = "Academic Competition",
    OTHERS = "Others"
  }
  
export interface Activity {
    id: number;
    user_id: number;
    name?: string;
    type?: ActivityType;
    startDate?: string; // ISO date string
    endDate?: string; 
    description?: string;
    achievement?: string;
  }
  