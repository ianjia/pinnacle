import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collegePreferencesActions, RootState } from '../../store';
import { CollegePreferences, ImportanceLevel } from '../../store';
import { SpecializedProgram } from '../component-specalized-program';
import './college-preference-form.css';

const importanceOptions: ImportanceLevel[] = [
  ImportanceLevel.VeryImportant,
  ImportanceLevel.SomewhatImportant,
  ImportanceLevel.NiceToHave,
];

export const CollegePreferenceForm: React.FC = () => {
  const preferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );
  const dispatch = useDispatch();

  const handlePreferenceChange = (
    key: keyof CollegePreferences,
    value: string
  ) => {
    dispatch(collegePreferencesActions.setPreference({ key, value }));
  };

  const handleImportanceChange = (
    key: keyof CollegePreferences,
    importance: ImportanceLevel
  ) => {
    dispatch(collegePreferencesActions.setImportance({ key, importance }));
  };

  return (
    <div className="college-preference-form">
      <h2>College Preferences</h2>

      {/* 1. School Size */}
      <div>
        <h3>1. School Size</h3>
        <select
          value={preferences.schoolSize.value}
          onChange={(e) =>
            handlePreferenceChange('schoolSize', e.target.value)
          }
        >
          <option>No Preference</option>
          <option>Small: Fewer than 5,000 students</option>
          <option>Medium: 5,000 – 15,000 students</option>
          <option>Large: More than 15,000 students</option>
        </select>
        <select
          value={preferences.schoolSize.importance}
          onChange={(e) =>
            handleImportanceChange(
              'schoolSize',
              e.target.value as ImportanceLevel
            )
          }
          disabled={preferences.schoolSize.value === 'No Preference'}
        >
          {importanceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* 2. Location */}
      <div>
        <h3>2. Location</h3>

        {/* Region */}
        <div>
          <label>Region:</label>
          <select
            value={preferences.locationRegion.value}
            onChange={(e) =>
              handlePreferenceChange('locationRegion', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Northeast</option>
            <option>Midwest</option>
            <option>South</option>
            <option>West</option>
          </select>
          <select
            value={preferences.locationRegion.importance}
            onChange={(e) =>
              handleImportanceChange('locationRegion', e.target.value as ImportanceLevel)
            }
            disabled={preferences.locationRegion.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Specific State */}
        <div>
          <label>Specific State:</label>
          <select
            value={preferences.locationState.value}
            onChange={(e) =>
              handlePreferenceChange('locationState', e.target.value)
            }
          >
            <option>No Preference</option>
            {/* Add options for all states */}
            <option>California</option>
            <option>New York</option>
            {/* ... */}
          </select>
          <select
            value={preferences.locationState.importance}
            onChange={(e) =>
              handleImportanceChange('locationState', e.target.value as ImportanceLevel)
            }
            disabled={preferences.locationState.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Urbanization */}
        <div>
          <label>Urbanization:</label>
          <select
            value={preferences.urbanization.value}
            onChange={(e) =>
              handlePreferenceChange('urbanization', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Urban</option>
            <option>Suburban</option>
            <option>Rural</option>
          </select>
          <select
            value={preferences.urbanization.importance}
            onChange={(e) =>
              handleImportanceChange('urbanization', e.target.value as ImportanceLevel)
            }
            disabled={preferences.urbanization.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Prestige */}
      <div>
        <h3>3. Prestige</h3>
        <select
            value={preferences.prestige.value}
            onChange={(e) => handlePreferenceChange('prestige', e.target.value)}
        >
            <option>No Preference</option>
            <option>Highly Prestigious: Acceptance rate &lt; 10%</option>
            <option>Very Prestigious: Acceptance rate 10–20%</option>
            <option>Prestigious: Acceptance rate 20–35%</option>
            <option>Moderately Prestigious: Acceptance rate 35–50%</option>
            <option>Less Prestigious: Acceptance rate &gt; 50%</option>
        </select>

        <select
          value={preferences.prestige.importance}
          onChange={(e) =>
            handleImportanceChange('prestige', e.target.value as ImportanceLevel)
          }
          disabled={preferences.prestige.value === 'No Preference'}
        >
          {importanceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* 4. Academic Focus */}
      <div>
        <h3>4. Academic Focus</h3>

        {/* General */}
        <div>
          <label>General:</label>
          <select
            value={preferences.academicGeneral.value}
            onChange={(e) =>
              handlePreferenceChange('academicGeneral', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Liberal Arts College</option>
            <option>Research University</option>
          </select>
          <select
            value={preferences.academicGeneral.importance}
            onChange={(e) =>
              handleImportanceChange('academicGeneral', e.target.value as ImportanceLevel)
            }
            disabled={preferences.academicGeneral.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Fields */}
        <div>
          <label>Fields:</label>
          <select
            value={preferences.academicFields.value}
            onChange={(e) =>
              handlePreferenceChange('academicFields', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>STEM</option>
            <option>Humanities</option>
            <option>Arts</option>
            <option>Business & Economics</option>
            <option>Social Sciences</option>
          </select>
          <select
            value={preferences.academicFields.importance}
            onChange={(e) =>
              handleImportanceChange('academicFields', e.target.value as ImportanceLevel)
            }
            disabled={preferences.academicFields.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Specialized Programs */}
        <div className="preference-row">
        <label>Specialized Program/Major:</label>
        <SpecializedProgram
              value={preferences.specializedProgram.value}
              onPreferenceChange={(value) =>
                handlePreferenceChange('specializedProgram', value)
              }
            />
            <select
                value={preferences.specializedProgram.importance}
                onChange={(e) =>
                handleImportanceChange('specializedProgram', e.target.value as ImportanceLevel)
                }
                disabled={preferences.specializedProgram.value === 'No Preference'}
            >
                {importanceOptions.map((option) => (
                <option key={option}>{option}</option>
                ))}
            </select>
        </div>

        {/* Program Reputation */}
        <div>
        <label>Major Reputation:</label>
        <select
            value={preferences.programReputation.value}
            onChange={(e) => handlePreferenceChange('programReputation', e.target.value)}
            disabled={preferences.specializedProgram.value === 'No Preference'} // Disable based on Specialized Program selection
        >
            <option>No Preference</option>
            <option>Top-Tier Program</option>
            <option>Highly Respected Program</option>
            <option>Well-Regarded Program</option>
            <option>Established Program</option>
        </select>
        
        <select
            value={preferences.programReputation.importance}
            onChange={(e) => handleImportanceChange('programReputation', e.target.value as ImportanceLevel)}
            disabled={
            preferences.specializedProgram.value === 'No Preference' ||
            preferences.programReputation.value === 'No Preference' // Disable if Program Reputation is "No Preference"
            }
        >
            {importanceOptions.map((option) => (
            <option key={option}>{option}</option>
            ))}
        </select>
        </div>
      </div>

      {/* 5. Campus Culture */}
      <div>
        <h3>5. Campus Culture</h3>
        <div>
            <label>Social Environment:</label>
            <select
                value={preferences.campusSocialEnvironment.value}
                onChange={(e) =>
                    handlePreferenceChange('campusSocialEnvironment', e.target.value)
                }
            >
                <option>No Preference</option>
                <option>Very social and active campus life</option>
                <option>Balanced (Moderate social opportunities)</option>
                <option>Quieter/More academic-focused</option>
            </select>
            <select
                value={preferences.campusSocialEnvironment.importance}
                onChange={(e) =>
                    handleImportanceChange(
                    'campusSocialEnvironment',
                    e.target.value as ImportanceLevel
                    )
                }
                disabled={preferences.campusSocialEnvironment.value === 'No Preference'}
            >
                {importanceOptions.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>

        <div>
            <label>Diversity:</label>
            <select
                value={preferences.campusDiversity.value}
                onChange={(e) => handlePreferenceChange('campusDiversity', e.target.value)}
            >
                <option>No Preference</option>
                <option>Highly diverse student body</option>
                <option>Moderately diverse</option>
                <option>Less diverse</option>
            </select>
            <select
                value={preferences.campusDiversity.importance}
                onChange={(e) => handleImportanceChange('campusDiversity', e.target.value as ImportanceLevel)}
                disabled={preferences.campusDiversity.value === 'No Preference'}
            >
                {importanceOptions.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
        
        <div>
            <label>Extracurricular Scene:</label>
            <select
                value={preferences.extracurricularScene.value}
                onChange={(e) => handlePreferenceChange('extracurricularScene', e.target.value)}
            >
                <option>No Preference</option>
                <option>Greek life (Fraternities/Sororities)</option>
                <option>Club sports and intramurals</option>
                <option>Community service emphasis</option>
                <option>Arts and cultural groups</option>
            </select>
            <select
                value={preferences.extracurricularScene.importance}
                onChange={(e) => handleImportanceChange('extracurricularScene', e.target.value as ImportanceLevel)}
                disabled={preferences.extracurricularScene.value === 'No Preference'}
            >
                {importanceOptions.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </div>
      </div>

      {/* 6. Cost and Financial Aid */}
      <div>
        <h3>6. Cost and Financial Aid</h3>

        {/* Tuition Range */}
        <div>
          <label>Tuition Range:</label>
          <select
            value={preferences.tuitionRange.value}
            onChange={(e) =>
              handlePreferenceChange('tuitionRange', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Low (Under $20,000/year)</option>
            <option>Medium ($20,000–$40,000/year)</option>
            <option>High ($40,000+/year)</option>
          </select>
          <select
            value={preferences.tuitionRange.importance}
            onChange={(e) =>
              handleImportanceChange('tuitionRange', e.target.value as ImportanceLevel)
            }
            disabled={preferences.tuitionRange.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Financial Support */}
        <div>
          <label>Financial Support:</label>
          <select
            value={preferences.financialSupport.value}
            onChange={(e) =>
              handlePreferenceChange('financialSupport', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Need-based financial aid available</option>
            <option>Merit scholarships available</option>
            <option>Low loan/debt options</option>
          </select>
          <select
            value={preferences.financialSupport.importance}
            onChange={(e) =>
              handleImportanceChange('financialSupport', e.target.value as ImportanceLevel)
            }
            disabled={preferences.financialSupport.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 7. Housing and Student Life */}
      <div>
        <h3>7. Housing and Student Life</h3>

        {/* Housing */}
        <div>
          <label>Housing:</label>
          <select
            value={preferences.housing.value}
            onChange={(e) => handlePreferenceChange('housing', e.target.value)}
          >
            <option>No Preference</option>
            <option>On-campus required for all years</option>
            <option>On-campus for first-year only</option>
            <option>Off-campus allowed</option>
          </select>
          <select
            value={preferences.housing.importance}
            onChange={(e) =>
              handleImportanceChange('housing', e.target.value as ImportanceLevel)
            }
            disabled={preferences.housing.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Facilities */}
        <div>
          <label>Facilities:</label>
          <select
            value={preferences.facilities.value}
            onChange={(e) => handlePreferenceChange('facilities', e.target.value)}
          >
            <option>No Preference</option>
            <option>Strong emphasis on student life facilities</option>
            <option>Moderate facilities and services</option>
            <option>Basic student services and facilities</option>
          </select>
          <select
            value={preferences.facilities.importance}
            onChange={(e) =>
              handleImportanceChange('facilities', e.target.value as ImportanceLevel)
            }
            disabled={preferences.facilities.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 8. Climate Preference */}
      <div>
        <h3>8. Climate Preference</h3>
        <select
          value={preferences.climatePreference.value}
          onChange={(e) =>
            handlePreferenceChange('climatePreference', e.target.value)
          }
        >
          <option>No Preference</option>
          <option>Warm</option>
          <option>Moderate</option>
          <option>Cold</option>
        </select>
        <select
          value={preferences.climatePreference.importance}
          onChange={(e) =>
            handleImportanceChange('climatePreference', e.target.value as ImportanceLevel)
          }
          disabled={preferences.climatePreference.value === 'No Preference'}
        >
          {importanceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* 9. Extracurricular Opportunities */}
      <div>
        <h3>9. Extracurricular Opportunities</h3>

        {/* Athletics */}
        <div>
          <label>Athletics:</label>
          <select
            value={preferences.athletics.value}
            onChange={(e) =>
              handlePreferenceChange('athletics', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Strong emphasis on varsity sports</option>
            <option>Club and intramural sports available</option>
          </select>
          <select
            value={preferences.athletics.importance}
            onChange={(e) =>
              handleImportanceChange('athletics', e.target.value as ImportanceLevel)
            }
            disabled={preferences.athletics.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Arts Programs */}
        <div>
          <label>Arts Programs:</label>
          <select
            value={preferences.artsPrograms.value}
            onChange={(e) =>
              handlePreferenceChange('artsPrograms', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Strong emphasis on performing arts</option>
            <option>Strong emphasis on visual arts</option>
            <option>Moderate arts opportunities</option>
          </select>
          <select
            value={preferences.artsPrograms.importance}
            onChange={(e) =>
              handleImportanceChange('artsPrograms', e.target.value as ImportanceLevel)
            }
            disabled={preferences.artsPrograms.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        {/* Research and Internships */}
        <div>
          <label>Research and Internships:</label>
          <select
            value={preferences.researchInternships.value}
            onChange={(e) =>
              handlePreferenceChange('researchInternships', e.target.value)
            }
          >
            <option>No Preference</option>
            <option>Emphasis on undergraduate research</option>
            <option>Internship opportunities in local area</option>
            <option>Study abroad programs</option>
          </select>
          <select
            value={preferences.researchInternships.importance}
            onChange={(e) =>
              handleImportanceChange('researchInternships', e.target.value as ImportanceLevel)
            }
            disabled={preferences.researchInternships.value === 'No Preference'}
          >
            {importanceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 10. Distance from Home */}
      <div>
        <h3>10. Distance from Home</h3>
        <select
          value={preferences.distanceFromHome.value}
          onChange={(e) =>
            handlePreferenceChange('distanceFromHome', e.target.value)
          }
        >
          <option>No Preference</option>
          <option>Within 100 miles</option>
          <option>100–500 miles</option>
          <option>Over 500 miles</option>
        </select>
        <select
          value={preferences.distanceFromHome.importance}
          onChange={(e) =>
            handleImportanceChange('distanceFromHome', e.target.value as ImportanceLevel)
          }
          disabled={preferences.distanceFromHome.value === 'No Preference'}
        >
          {importanceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* 11. Class Sizes */}
      <div>
        <h3>11. Class Sizes</h3>
        <select
          value={preferences.averageClassSize.value}
          onChange={(e) =>
            handlePreferenceChange('averageClassSize', e.target.value)
          }
        >
          <option>No Preference</option>
          <option>Small (Less than 20 students)</option>
          <option>Medium (20–50 students)</option>
          <option>Large (50+ students)</option>
        </select>
        <select
          value={preferences.averageClassSize.importance}
          onChange={(e) =>
            handleImportanceChange('averageClassSize', e.target.value as ImportanceLevel)
          }
          disabled={preferences.averageClassSize.value === 'No Preference'}
        >
          {importanceOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};


