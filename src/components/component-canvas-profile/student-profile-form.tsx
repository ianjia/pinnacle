import React, { useState } from 'react';
import './student-profile-form.css'; 

enum Race {
  ASIAN = 'Asian',
  BLACK = 'Black',
  NATIVEAMERICAN = 'Native American',
  PACIFICISLANDER = 'Pacific Islander',
  HISPANIC = 'Hispanic',
  WHITE = 'White',
  OTHERS = 'Others',
  NOTDISCLOSED = 'Not Disclosed',
}

enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Gender other than male or female',
  NOTDISCLOSED = 'Not Disclosed',
}

enum Ranking {
  TOP1 = 'Top 1%',
  TOP5 = 'Top 5%',
  TOP10 = 'Top 10%',
  TOP15 = 'Top 15%',
  TOP20 = 'Top 25%',
  TOP50 = 'Top 50%',
  BOTTOM50 = 'Bottom 50%',
  NOTDISCLOSED = 'Not Disclosed',
}

export const StudentProfileForm: React.FC = () => {
  const [name, setName] = useState('');
  const [race, setRace] = useState<Race>(Race.NOTDISCLOSED);
  const [school, setSchool] = useState('');
  const [classRank, setClassRank] = useState<Ranking>(Ranking.NOTDISCLOSED);
  const [gender, setGender] = useState<Gender>(Gender.NOTDISCLOSED);
  const [birthDate, setBirthDate] = useState('');
  const [legacy, setLegacy] = useState<boolean>(false);
  const [firstGenerationStudent, setFirstGenerationStudent] = useState<boolean>(false);
  const [needFinancialAid, setNeedFinancialAid] = useState<boolean>(false);
  const [residenceState, setResidenceState] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [previousProfile, setPreviousProfile] = useState({
    name: '',
    race: Race.NOTDISCLOSED,
    school: '',
    classRank: Ranking.NOTDISCLOSED,
    gender: Gender.NOTDISCLOSED,
    birthDate: '',
    legacy: false,
    firstGenerationStudent: false,
    needFinancialAid: false,
    residenceState: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const studentProfile = {
      name,
      race,
      school,
      classRank,
      gender,
      birthDate,
      legacy,
      firstGenerationStudent,
      needFinancialAid,
      residenceState,
    };

    console.log(studentProfile);

    // Send the data to the server here

    setIsEditing(false);
  };

  const handleEdit = () => {
    setPreviousProfile({
      name,
      race,
      school,
      classRank,
      gender,
      birthDate,
      legacy,
      firstGenerationStudent,
      needFinancialAid,
      residenceState,
    });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setName(previousProfile.name);
    setRace(previousProfile.race);
    setSchool(previousProfile.school);
    setClassRank(previousProfile.classRank);
    setGender(previousProfile.gender);
    setBirthDate(previousProfile.birthDate);
    setLegacy(previousProfile.legacy);
    setFirstGenerationStudent(previousProfile.firstGenerationStudent);
    setNeedFinancialAid(previousProfile.needFinancialAid);
    setResidenceState(previousProfile.residenceState);
    setIsEditing(false);
  };

  return (
    <div className="academic-profile-form">
      <form onSubmit={handleSubmit}>
        <h2>Student Profile</h2>

        <div className="buttons top-buttons">
          {!isEditing && (
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
          )}
          {isEditing && (
            <>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>

        <div className="form-row">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-row">
          <label>Race:</label>
          <select
            value={race}
            onChange={e => setRace(e.target.value as Race)}
            disabled={!isEditing}
          >
            {Object.values(Race).map(raceOption => (
              <option key={raceOption} value={raceOption}>
                {raceOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>School:</label>
          <input
            type="text"
            value={school}
            onChange={e => setSchool(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-row">
          <label>Class Rank:</label>
          <select
            value={classRank}
            onChange={e => setClassRank(e.target.value as Ranking)}
            disabled={!isEditing}
          >
            {Object.values(Ranking).map(rankOption => (
              <option key={rankOption} value={rankOption}>
                {rankOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Gender:</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value as Gender)}
            disabled={!isEditing}
          >
            {Object.values(Gender).map(genderOption => (
              <option key={genderOption} value={genderOption}>
                {genderOption}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Birth Date:</label>
          <input
            type="date"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="form-row checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={legacy}
              onChange={e => setLegacy(e.target.checked)}
              disabled={!isEditing}
            />
            Legacy
          </label>
        </div>

        <div className="form-row checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={firstGenerationStudent}
              onChange={e => setFirstGenerationStudent(e.target.checked)}
              disabled={!isEditing}
            />
            First Generation Student
          </label>
        </div>

        <div className="form-row checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={needFinancialAid}
              onChange={e => setNeedFinancialAid(e.target.checked)}
              disabled={!isEditing}
            />
            Need Financial Aid
          </label>
        </div>

        <div className="form-row">
          <label>Residence State:</label>
          <input
            type="text"
            value={residenceState}
            onChange={e => setResidenceState(e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </form>
    </div>
  );
};
