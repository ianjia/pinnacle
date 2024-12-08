export enum ImportanceLevel {
    VeryImportant = "Very important",
    SomewhatImportant = "Somewhat important",
    NiceToHave = "Nice to have",
  }

export enum SchoolSize {
    NO_PREFERENCE = "No Preference",
    SMALL = "Small: Fewer than 5,000 students",
    MEDIUM = "Medium: 5,000 to 15,000 students",
    LARGE = "Large: More than 15,000 students",
  }
  
  export enum LocationRegion {
    NO_PREFERENCE = "No Preference",
    NORTHEAST = "Northeast",
    NORTHWEST = "Pacific Northwest",
    MIDWEST = "Midwest",
    SOUTH = "South",
    WEST = "West",
    SOUTHWEST = "Southwest",
    SOUTHEAST = "Southeast",
  }
  
  export enum Urbanization {
    NO_PREFERENCE = "No Preference",
    URBAN = "Urban",
    SUBURBAN = "Suburban",
    RURAL = "Rural",
  }
  
  export enum Prestige {
    NO_PREFERENCE = "No Preference",
    HIGHLY_PRESTIGIOUS = "Highly Prestigious: Acceptance rate less than 10%",
    VERY_PRESTIGIOUS = "Very Prestigious: Acceptance rate 10 to 20%",
    PRESTIGIOUS = "Prestigious: Acceptance rate 20 to 35%",
    MODERATELY_PRESTIGIOUS = "Moderately Prestigious: Acceptance rate 35 to 50%",
    LESS_PRESTIGIOUS = "Less Prestigious: Acceptance rate greater than 50%",
  }
  
  export enum AcademicFocus {
    NO_PREFERENCE = "No Preference",
    LIBERAL_ARTS = "Liberal Arts College",
    RESEARCH_UNIVERSITY = "Research University",
  }
  
  export enum AcademicFields {
    NO_PREFERENCE = "No Preference",
    STEM = "STEM",
    HUMANITIES = "Humanities",
    ARTS = "Arts",
    BUSINESS_ECONOMICS = "Business & Economics",
    SOCIAL_SCIENCES = "Social Sciences",
  }
  
  export enum Major {
    NO_PREFERENCE = "No Preference",
    COMPUTER_SCIENCE = "Computer Science",
    BIOLOGY = "Biology",
    PSYCHOLOGY = "Psychology",
    BUSINESS_ADMINISTRATION = "Business Administration",
    ECONOMICS = "Economics",
    MECHANICAL_ENGINEERING = "Mechanical Engineering",
    ELECTRICAL_ENGINEERING = "Electrical Engineering",
    CHEMISTRY = "Chemistry",
    POLITICAL_SCIENCE = "Political Science",
    MATHEMATICS = "Mathematics",
    PHYSICS = "Physics",
    SOCIOLOGY = "Sociology",
    ENVIRONMENTAL_SCIENCE = "Environmental Science",
    NURSING = "Nursing",
    HISTORY = "History",
    ART_DESIGN = "Art & Design",
    PHILOSOPHY = "Philosophy",
    EDUCATION = "Education",
    COMMUNICATIONS = "Communications",
    PUBLIC_HEALTH = "Public Health",
    AEROSPACE_ENGINEERING = "Aerospace Engineering",
    ANTHROPOLOGY = "Anthropology",
    MUSIC = "Music",
    JOURNALISM = "Journalism",
    MARKETING = "Marketing",
    FINANCE = "Finance",
    FOREIGN_LANGUAGES = "Foreign Languages & Linguistics",
    ARCHITECTURE = "Architecture",
  }
  
  export enum MajorReputation {
    NO_PREFERENCE = "No Preference",
    TOPTIER = "Top Tier Program",
    HIGHLYRESPECTED = "Highly Respected Program",
    WELLREGARDED = "Well-regarded Program",
    ESTABLISHED =  "Established Program",
  }

  export enum SocialEnviroment {
    NO_PREFERENCE = "No Preference",
    SOCIAL = "Very social and active campus life",
    BALANCED = "Moderate social opportunities",
    QUIET = "Quieter and More academic-focuse",
  }

  export enum Diversity {
    NO_PREFERENCE = "No Preference",
    DIVERSE = "Highly diverse student body",
    MODERATE = "Moderately diverse",
    LESS  = "Less diverse",   
  }

  export enum ExtracurricularScene {
    NO_PREFERENCE = "No Preference",
    GREEK = "Greek life (Fraternities/Sororities)",
    CLUB = "Club sports and intramurals",
    COMMUNITY = "Community service emphasis",
    ARTS = "Arts and cultural groups",
  }

  export enum TuitionRange {
    NO_PREFERENCE = "No Preference",
    LOW = "Low (Under $20,000/year)",
    MEDIUM = "Medium ($20,000 TO $40,000/year)",
    HIGH = "High ($40,000+/year)",
  }

  export enum FinancialSupport {
    NO_PREFERENCE = "No Preference",
    NEED = "Need-based financial aid available",
    MERIT = "Merit scholarships available",
    LOW = "Low loan/debt options",
  }

  export enum Housing {
    NO_PREFERENCE = "No Preference",
    FULLONCAMPUS = "On-campus required for all years",
    FIRTYEAR = "On-campus for first-year only",
    OFF = "Off-campus allowed",    
  }
  
  export enum Facilities {
    NO_PREFERENCE = "No Preference",
   STRONG = "Strong emphasis on student life facilities",
    MODERATE = "Moderate facilities and services",
    BASIC = "Basic student services and facilities",
  }

  export enum ClimatePreference {
    NO_PREFERENCE = "No Preference",
    WARM = "Warm",
    MODERATE = "Moderate",
    COLD = "Cold",
  }

  export enum Athletics {
    NO_PREFERENCE = "No Preference",
    STRONG = "Strong emphasis on varsity sports",
    CLUB = "Club and intramural sports available",
  }
  
  export enum Arts {
    NO_PREFERENCE = "No Preference",
    PERFORMING = "Strong emphasis on performing arts",
    VISUAL = "Strong emphasis on visual arts",
    MODERATE = "Moderate arts opportunities",
  }

  export enum ResearchInternship {
    NO_PREFERENCE = "No Preference",
    UNDERGRADUATE = "Emphasis on undergraduate research",
    INTERNSHIP = "Internship opportunities in local area",
    ABROAD = "Study abroad programs",
  }

  export enum DistanceFromHome {
    NO_PREFERENCE = "No Preference",
    WITHIN_100_MILES = "Within 100 miles",
    FROM_100_TO_500_MILES = "100 TO 500 miles",
    OVER_500_MILES = "Over 500 miles",
  }
  
  export enum ClassSizes {
    NO_PREFERENCE = "No Preference",
    SMALL = "Small (Less than 20 students)",
    MEDIUM = "Medium (20 to 50 students)",
    LARGE = "Large (50+ students)",
  }
  

  export enum StatePreference {
    NO_PREFERENCE = "No Preference",
    Alabama = "Alabama",
    Alaska = "Alaska",
    Arizona = "Arizona",
    Arkansas = "Arkansas",
    California = "California",
    Colorado = "Colorado",
    Connecticut = "Connecticut",
    Delaware = "Delaware",
    Florida = "Florida",
    Georgia = "Georgia",
    Hawaii = "Hawaii",
    Idaho = "Idaho",
    Illinois = "Illinois",
    Indiana = "Indiana",
    Iowa = "Iowa",
    Kansas = "Kansas",
    Kentucky = "Kentucky",
    Louisiana = "Louisiana",
    Maine = "Maine",
    Maryland = "Maryland",
    Massachusetts = "Massachusetts",
    Michigan = "Michigan",
    Minnesota = "Minnesota",
    Mississippi = "Mississippi",
    Missouri = "Missouri",
    Montana = "Montana",
    Nebraska = "Nebraska",
    Nevada = "Nevada",
    New_Hampshire = "New Hampshire",
    New_Jersey = "New Jersey",
    New_Mexico = "New Mexico",
    New_York = "New York",
    North_Carolina = "North Carolina",
    North_Dakota = "North Dakota",
    Ohio = "Ohio",
    Oklahoma = "Oklahoma",
    Oregon = "Oregon",
    Oversea = "Oversea",
    Pennsylvania = "Pennsylvania",
    Rhode_Island = "Rhode Island",
    South_Carolina = "South Carolina",
    South_Dakota = "South Dakota",
    Tennessee = "Tennessee",
    Texas = "Texas",
    Utah = "Utah",
    Vermont = "Vermont",
    Virginia = "Virginia",
    Washington = "Washington",
    West_Virginia = "West Virginia",
    Wisconsin = "Wisconsin",
    Wyoming = "Wyoming",
  }
  