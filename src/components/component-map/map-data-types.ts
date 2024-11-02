export type Location = {
    latitude: number;
    longitude: number;
};
  
export type LocationURLCombined = {
    loc: Location;
    url: URL;
};

export type CollegeNamePair = {
    collegeName: string;
    category: 1 | 2 | 3 | undefined; // 1 means reach, 2 is target, 3 means safety
}

export type MapDataType = {
    collegeName: string;
    category: 1 | 2 | 3 | undefined; // 1 means reach, 2 is target, 3 means safety
    location: LocationURLCombined | undefined;
}

