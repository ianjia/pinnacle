import React, { useState } from 'react';
import './academic-file-form.css';  // Import external CSS file

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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [selectedApExamIndex, setSelectedApExamIndex] = useState<number | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedCourseIndex(null);
    setSelectedApExamIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const academicProfile = {
      standardTest,
      gpa,
      courses,
      apExams,
    };
    console.log(academicProfile);
    setIsEditing(false);
    setSelectedCourseIndex(null);
    setSelectedApExamIndex(null);
    // Send the data to the server here
  };

  // Handlers for adding and updating courses and AP exams
  const handleAddCourse = () => {
    if (isEditing) {
      setCourses([
        ...courses,
        {
          name: '',
          courseType: CourseType.AP,
          grade: Grade.A,
          year: Year.NINTH,
        },
      ]);
    }
  };

  const handleCourseChange = (index: number, field: string, value: any) => {
    if (isEditing) {
      const newCourses = [...courses];
      newCourses[index] = { ...newCourses[index], [field]: value };
      setCourses(newCourses);
    }
  };

  const handleRemoveCourse = (index: number) => {
    if (isEditing) {
      const newCourses = [...courses];
      newCourses.splice(index, 1);
      setCourses(newCourses);
      setSelectedCourseIndex(null);
    }
  };

  const handleAddApExam = () => {
    if (isEditing) {
      setApExams([
        ...apExams,
        {
          name: '',
          grade: 0,
          year: Year.NINTH,
        },
      ]);
    }
  };

  const handleApExamChange = (index: number, field: string, value: any) => {
    if (isEditing) {
      const newApExams = [...apExams];
      newApExams[index] = { ...newApExams[index], [field]: value };
      setApExams(newApExams);
    }
  };

  const handleRemoveApExam = (index: number) => {
    if (isEditing) {
      const newApExams = [...apExams];
      newApExams.splice(index, 1);
      setApExams(newApExams);
      setSelectedApExamIndex(null);
    }
  };

  return (
  <div >
    <h2>Academic Profile</h2>

    {!isEditing ? (
      <button className="academic-btn" onClick={handleEditClick}>
        Edit
      </button>
    ) : (
      <>
        <button className="academic-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="academic-btn" onClick={handleCancel}>
          Cancel
        </button>
      </>
    )}

    <div className="academic-profile-form">
    {/* Standard Test Scores */}
      <div className="form-row">
        <label>SAT Score:</label>
        <input
          type="number"
          value={standardTest.sat || ''}
          onChange={(e) => setStandardTest({ ...standardTest, sat: parseInt(e.target.value) })}
          readOnly={!isEditing}
        />
      </div>
      <div className="form-row">
        <label>ACT Score:</label>
        <input
          type="number"
          value={standardTest.act || ''}
          onChange={(e) => setStandardTest({ ...standardTest, act: parseInt(e.target.value) })}
          readOnly={!isEditing}
        />
      </div>

      {/* GPA */}
      <div className="form-row">
        <label>9th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.ninth}
          onChange={(e) => setGpa({ ...gpa, ninth: parseFloat(e.target.value) })}
          readOnly={!isEditing}
        />
      </div>
      <div className="form-row">
        <label>10th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.tenth}
          onChange={(e) => setGpa({ ...gpa, tenth: parseFloat(e.target.value) })}
          readOnly={!isEditing}
        />
      </div>
      <div className="form-row">
        <label>11th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.eleventh}
          onChange={(e) => setGpa({ ...gpa, eleventh: parseFloat(e.target.value) })}
          readOnly={!isEditing}
        />
      </div>
      <div className="form-row">
        <label>12th Grade GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.twelfth}
          onChange={(e) => setGpa({ ...gpa, twelfth: parseFloat(e.target.value) })}
          readOnly={!isEditing}
        />
      </div>
      <div className="form-row">
        <label>Overall GPA:</label>
        <input
          type="number"
          step="0.01"
          value={gpa.overall}
          onChange={(e) => setGpa({ ...gpa, overall: parseFloat(e.target.value) })}
          readOnly={!isEditing}
        />
    </div>
  </div>
      {/* Courses Table */}
      <h3>Courses</h3>
      <table className="academic-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Course Type</th>
            <th>Grade</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedCourseIndex(index)}
              className={selectedCourseIndex === index && isEditing ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                  readOnly={!isEditing}
                />
              </td>
              <td>
                <select
                  value={course.courseType}
                  onChange={(e) => handleCourseChange(index, 'courseType', e.target.value as CourseType)}
                  disabled={!isEditing}
                >
                  {Object.values(CourseType).map((typeOption) => (
                    <option key={typeOption} value={typeOption}>
                      {typeOption}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={course.grade}
                  onChange={(e) => handleCourseChange(index, 'grade', e.target.value as Grade)}
                  disabled={!isEditing}
                >
                  {Object.values(Grade).map((gradeOption) => (
                    <option key={gradeOption} value={gradeOption}>
                      {gradeOption}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select
                  value={course.year}
                  onChange={(e) => handleCourseChange(index, 'year', parseInt(e.target.value) as Year)}
                  disabled={!isEditing}
                >
                  <option value={Year.NINTH}>9th Grade</option>
                  <option value={Year.TENTH}>10th Grade</option>
                  <option value={Year.ELEVENTH}>11th Grade</option>
                  <option value={Year.TWELFTH}>12th Grade</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="button-container">
          <button className="academic-btn" type="button" onClick={handleAddCourse}>
            Add Course
          </button>
          <button
            className="academic-btn"
            type="button"
            onClick={() =>
              selectedCourseIndex !== null && handleRemoveCourse(selectedCourseIndex)
            }
            disabled={selectedCourseIndex === null}
          >
            Remove Course
          </button>
        </div>
      )}

      {/* AP Exams Table */}
      <h3>AP Exams</h3>
      <table className="academic-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Grade</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {apExams.map((exam, index) => (
            <tr
              key={index}
              onClick={() => isEditing && setSelectedApExamIndex(index)}
              className={selectedApExamIndex === index && isEditing ? 'selected-row' : ''}
            >
              <td>
                <input
                  type="text"
                  value={exam.name}
                  onChange={(e) => handleApExamChange(index, 'name', e.target.value)}
                  readOnly={!isEditing}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={exam.grade}
                  onChange={(e) => handleApExamChange(index, 'grade', parseInt(e.target.value))}
                  readOnly={!isEditing}
                />
              </td>
              <td>
                <select
                  value={exam.year}
                  onChange={(e) => handleApExamChange(index, 'year', parseInt(e.target.value) as Year)}
                  disabled={!isEditing}
                >
                  <option value={Year.NINTH}>9th Grade</option>
                  <option value={Year.TENTH}>10th Grade</option>
                  <option value={Year.ELEVENTH}>11th Grade</option>
                  <option value={Year.TWELFTH}>12th Grade</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div className="button-container">
          <button className="academic-btn" type="button" onClick={handleAddApExam}>
            Add ApExam
          </button>
          <button
            className="academic-btn"
            type="button"
            onClick={() =>
              selectedApExamIndex !== null && handleRemoveApExam(selectedApExamIndex)
            }
            disabled={selectedApExamIndex === null}
          >
            Remove ApExam
          </button>
        </div>
      )}
    </div>
  );
};
