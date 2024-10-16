// AcademicProfileForm.tsx
import React, { useState } from 'react';

enum CourseType {
  AP = 'AP',
  HONOR = 'Honor',
  REGULAR = 'Regular',
}

enum Grade {
  A_PLUS = 'A+',
  A = 'A',
  A_MINUS = 'A-',
  B_PLUS = 'B+',
  B = 'B',
  B_MINUS = 'B-',
  C_PLUS = 'C+',
  C = 'C',
  C_MINUS = 'C-',
  D_PLUS = 'D+',
  D = 'D',
  D_MINUS = 'D-',
  F = 'F',
  N = 'Not Available Yet',
}

enum Year {
  NINTH = 9,
  TENTH = 10,
  ELEVENTH = 11,
  TWELFTH = 12,
}

interface StandardTest {
  sat?: number;
  act?: number;
}

interface GPA {
  ninth: number;
  tenth: number;
  eleventh: number;
  twelfth: number;
  overall: number;
}

interface SchoolCourse {
  name: string;
  courseType: CourseType;
  grade: Grade;
  year: Year;
}

interface ApExam {
  name: string;
  grade: number;
  year: Year;
}

export const AcademicProfileForm: React.FC = () => {
  const [standardTest, setStandardTest] = useState<StandardTest>({});
  const [gpa, setGpa] = useState<GPA>({
    ninth: 0,
    tenth: 0,
    eleventh: 0,
    twelfth: 0,
    overall: 0,
  });
  const [courses, setCourses] = useState<SchoolCourse[]>([]);
  const [apExams, setApExams] = useState<ApExam[]>([]);

  // Handlers for adding and updating courses and AP exams
  // Similar to the ActivityFileForm

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const academicProfile = {
      standardTest,
      gpa,
      courses,
      apExams,
    };
    console.log(academicProfile);
    // Send the data to the server here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Academic Profile</h2>

      {/* Standard Test Scores */}
      <div>
        <label>SAT Score:</label>
        <input
          type="number"
          value={standardTest.sat || ''}
          onChange={e => setStandardTest({ ...standardTest, sat: parseInt(e.target.value) })}
        />
      </div>
      <div>
        <label>ACT Score:</label>
        <input
          type="number"
          value={standardTest.act || ''}
          onChange={e => setStandardTest({ ...standardTest, act: parseInt(e.target.value) })}
        />
      </div>

      {/* GPA */}
      <div>
        <label>9th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.ninth}
          onChange={e => setGpa({ ...gpa, ninth: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>10th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.tenth}
          onChange={e => setGpa({ ...gpa, tenth: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>11th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.eleventh}
          onChange={e => setGpa({ ...gpa, eleventh: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>12th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.twelfth}
          onChange={e => setGpa({ ...gpa, twelfth: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <label>Overall GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.overall}
          onChange={e => setGpa({ ...gpa, overall: parseFloat(e.target.value) })}
        />
      </div>

      {/* Courses */}
      <h3>Courses</h3>
      {/* Implement adding and listing courses similar to activities */}

      {/* AP Exams */}
      <h3>AP Exams</h3>
      {/* Implement adding and listing AP exams similar to activities */}

      <button type="submit">Submit</button>
    </form>
  );
};

