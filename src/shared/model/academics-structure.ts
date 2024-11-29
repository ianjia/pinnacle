
export interface StandardizedTest {
    user_id: number; // the user_id retrieved during log-in
    sat?: number;
    act?: number;
}

export interface GPA {
    user_id: number; // the user_id retrieved during log-in
    ninth?: number;
    tenth?: number;
    eleventh?: number;
    twelfth?: number;
    overall?: number;
  }

