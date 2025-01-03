import { CollegeCategory } from "../../shared";

export type Location = {
    latitude: number;
    longitude: number;
};

export type CollegeMarkerOnlineResource = {
    admission?: URL;
    niche?: URL;
    appily?: URL;
    unigo?: URL;
};

export type BasicCollegeDataMapping = {
    loc: Location;
    url: URL;
    resource?: CollegeMarkerOnlineResource;
}

export type CollegeMarkerAdmissionData = {
    admitRate?: number;
    nationalRanking?: number;
    majorRanking?: number;
    myChance?: number;
    category?: CollegeCategory
};

export type CollegeNameData = {
    collegeName: string;
}

export type CollegeNameAndBasicData = BasicCollegeDataMapping & CollegeNameData;

export type CollegeMapData = CollegeNameAndBasicData & CollegeMarkerAdmissionData;





