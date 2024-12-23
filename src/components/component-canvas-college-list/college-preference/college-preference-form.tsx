import React, { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collegePreferencesActions, RootState } from '../../../store';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { AcademicFields, AcademicFocus, Arts, Athletics, ClassSizes, ClimatePreference, 
        CollegePreferenceKeys, CollegePreferences, DistanceFromHome, Diversity, ExtracurricularScene, 
        Facilities, FinancialSupport, Housing, ImportanceLevel, LocationRegion, Major, MajorReputation, 
        Prestige, ResearchInternship, SchoolSize, SocialEnviroment, StatePreference, TuitionRange, 
        Urbanization } from '../../../shared';
import { useStyles } from './preference-section-card.styles';
import { PreferenceSectionCard } from './preference-secion-card';
import { collegePreferenceService } from '../../component-service-proxy';
import { AuthContext } from '../../../auth';

export const CollegePreferenceForm: React.FC = () => {
  const { userId } = useContext(AuthContext);

  const preferences = useSelector(
    (state: RootState) => state.collegePreferences.collegePreferences
  );
  const dispatch = useDispatch();
  const styles = useStyles();

  const handlePreferenceChange = <K extends CollegePreferenceKeys>(
    key: K,
    value: CollegePreferences[K]['value']
  ) => {
    dispatch(collegePreferencesActions.updatePreference({ key, value }));
    collegePreferenceService.updateFieldValue(userId as number, key, value);
  };
  
  const handleImportanceChange = <K extends CollegePreferenceKeys>(
    key: K,
    importance: ImportanceLevel
  ) => {
    dispatch(collegePreferencesActions.updateImportance({ key, importance }));
    collegePreferenceService.updateFieldImportance(userId as number, key, importance);
  };
  

  return (
    <div className="college-preference-form">
      <h2>College Preferences</h2>

      {/* Section 1: Prestige and Academic Focus */}
      <PreferenceSectionCard title="1. Prestige and Academic Focus">
        {/* Prestige */}
        <div className={styles.row}>
          <label className={styles.label}>Prestige:</label>
          <DropdownCustom
            options={Prestige}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('prestige', option.optionValue as Prestige)
            }
            value={preferences.prestige.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('prestige', option.optionValue as ImportanceLevel)
            }
            value={preferences.prestige.importance}
            placeHolder={undefined}
          />
        </div>

        {/* General Academic Focus */}
        <div className={styles.row}>
          <label className={styles.label}>General Academic Focus:</label>
          <DropdownCustom
            options={AcademicFocus}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('academicGeneral', option.optionValue as AcademicFocus)
            }
            value={preferences.academicGeneral.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('academicGeneral', option.optionValue as ImportanceLevel)
            }
            value={preferences.academicGeneral.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Field */}
        <div className={styles.row}>
          <label className={styles.label}>Academic Field:</label>
          <DropdownCustom
            options={AcademicFields}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('academicFields', option.optionValue as AcademicFields)
            }
            value={preferences.academicFields.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('academicFields', option.optionValue as ImportanceLevel)
            }
            value={preferences.academicFields.importance}
            placeHolder={undefined}
          />
        </div>
        {/* Major */}
        <div className={styles.row}>
          <label className={styles.label}>Specialized Program / Major:</label>
          <DropdownCustom
            options={Major}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('specializedProgram', option.optionValue as Major)
            }
            value={preferences.specializedProgram.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('specializedProgram', option.optionValue as ImportanceLevel)
            }
            value={preferences.specializedProgram.importance}
            placeHolder={undefined}
          />
        </div>
        {/* Major Reputation*/}
        <div className={styles.row}>
          <label className={styles.label}>Major Reputation:</label>
          <DropdownCustom
            options={MajorReputation}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('programReputation', option.optionValue as MajorReputation)
            }
            value={preferences.programReputation.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('programReputation', option.optionValue as ImportanceLevel)
            }
            value={preferences.programReputation.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>

      {/* Section 2: Location */}
      <PreferenceSectionCard title="2. Location">
        {/* Region */}
        <div className={styles.row}>
          <label className={styles.label}>Region:</label>
          <DropdownCustom
            options={LocationRegion}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('locationRegion', option.optionValue as LocationRegion)
            }
            value={preferences.locationRegion.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('locationRegion', option.optionValue as ImportanceLevel)
            }
            value={preferences.locationRegion.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Specific State */}
        <div className={styles.row}>
          <label className={styles.label}>Specific State:</label>
          <DropdownCustom
            options={StatePreference}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('locationState', option.optionValue as StatePreference)
            }
            value={preferences.locationState.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('locationState', option.optionValue as ImportanceLevel)
            }
            value={preferences.locationState.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Urbanization */}
        <div className={styles.row}>
          <label className={styles.label}>Urbanization:</label>
          <DropdownCustom
            options={Urbanization}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('urbanization', option.optionValue as Urbanization)
            }
            value={preferences.urbanization.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('urbanization', option.optionValue as ImportanceLevel)
            }
            value={preferences.urbanization.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>

      {/* Section 3: Campus Culture */}
      <PreferenceSectionCard title="3. Campus Culture">
        {/* Social Environment */}
        <div className={styles.row}>
          <label className={styles.label}>Social Environment:</label>
          <DropdownCustom
            options={SocialEnviroment}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('campusSocialEnvironment', option.optionValue as SocialEnviroment)
            }
            value={preferences.campusSocialEnvironment.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('campusSocialEnvironment', option.optionValue as ImportanceLevel)
            }
            value={preferences.campusSocialEnvironment.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Diversity */}
        <div className={styles.row}>
          <label className={styles.label}>Campus Diversity:</label>
          <DropdownCustom
            options={Diversity}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('campusDiversity', option.optionValue as Diversity)
            }
            value={preferences.campusDiversity.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('campusDiversity', option.optionValue as ImportanceLevel)
            }
            value={preferences.campusDiversity.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Extracurricular Scene */}
        <div className={styles.row}>
          <label className={styles.label}>Extracurricular Scene:</label>
          <DropdownCustom
            options={ExtracurricularScene}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('extracurricularScene', option.optionValue as ExtracurricularScene)
            }
            value={preferences.extracurricularScene.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('extracurricularScene', option.optionValue as ImportanceLevel)
            }
            value={preferences.extracurricularScene.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>

      {/* Section 4: Cost and Financial Aid */}
      <PreferenceSectionCard title="4. Cost and Financial Aid">
        {/* Tuition Range */}
        <div className={styles.row}>
          <label className={styles.label}>Tuition Range:</label>
          <DropdownCustom
            options={TuitionRange}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('tuitionRange', option.optionValue as TuitionRange)
            }
            value={preferences.tuitionRange.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('tuitionRange', option.optionValue as ImportanceLevel)
            }
            value={preferences.tuitionRange.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Financial Support */}
        <div className={styles.row}>
          <label className={styles.label}>Financial Support:</label>
          <DropdownCustom
            options={FinancialSupport}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('financialSupport', option.optionValue as FinancialSupport)
            }
            value={preferences.financialSupport.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('financialSupport', option.optionValue as ImportanceLevel)
            }
            value={preferences.financialSupport.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>      

      {/* Section 5: Housing and Facilities */}
      <PreferenceSectionCard title="5. Housing and Facilities">
        {/* Housing */}
        <div className={styles.row}>
          <label className={styles.label}>Housing:</label>
          <DropdownCustom
            options={Housing}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('housing', option.optionValue as Housing)
            }
            value={preferences.housing.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('housing', option.optionValue as ImportanceLevel)
            }
            value={preferences.housing.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Facilities */}
        <div className={styles.row}>
          <label className={styles.label}>Facilities:</label>
          <DropdownCustom
            options={Facilities}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('facilities', option.optionValue as Facilities)
            }
            value={preferences.facilities.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('facilities', option.optionValue as ImportanceLevel)
            }
            value={preferences.facilities.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>

      {/* Section 6: Extracurricular Opportunities */}
      <PreferenceSectionCard title="6. Extracurricular Opportunities">
        {/* Athletics */}
        <div className={styles.row}>
          <label className={styles.label}>Athletics:</label>
          <DropdownCustom
            options={Athletics}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('athletics', option.optionValue as Athletics)
            }
            value={preferences.athletics.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('athletics', option.optionValue as ImportanceLevel)
            }
            value={preferences.athletics.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Arts Programs: */}
        <div className={styles.row}>
          <label className={styles.label}>Arts Programs:</label>
          <DropdownCustom
            options={Arts}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('artsPrograms', option.optionValue as Arts)
            }
            value={preferences.artsPrograms.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('artsPrograms', option.optionValue as ImportanceLevel)
            }
            value={preferences.artsPrograms.importance}
            placeHolder={undefined}
          />
        </div>
        {/* Research and Internships: */}
        <div className={styles.row}>
          <label className={styles.label}>Research and Internships:</label>
          <DropdownCustom
            options={ResearchInternship}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('researchInternships', option.optionValue as ResearchInternship)
            }
            value={preferences.researchInternships.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('researchInternships', option.optionValue as ImportanceLevel)
            }
            value={preferences.researchInternships.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>     

     {/* Section 7: Others */}
     <PreferenceSectionCard title="7. Others">
        {/* School Size */}
        <div className={styles.row}>
          <label className={styles.label}>School Size:</label>
          <DropdownCustom
            options={SchoolSize}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('schoolSize', option.optionValue as SchoolSize)
            }
            value={preferences.schoolSize.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('schoolSize', option.optionValue as ImportanceLevel)
            }
            value={preferences.schoolSize.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Climate */}
        <div className={styles.row}>
          <label className={styles.label}>Climate:</label>
          <DropdownCustom
            options={ClimatePreference}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('climatePreference', option.optionValue as ClimatePreference)
            }
            value={preferences.climatePreference.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('climatePreference', option.optionValue as ImportanceLevel)
            }
            value={preferences.climatePreference.importance}
            placeHolder={undefined}
          />
        </div>

        {/* Distance from Home */}
        <div className={styles.row}>
          <label className={styles.label}> Distance from Home:</label>
          <DropdownCustom
            options={DistanceFromHome}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('distanceFromHome', option.optionValue as DistanceFromHome)
            }
            value={preferences.distanceFromHome.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('distanceFromHome', option.optionValue as ImportanceLevel)
            }
            value={preferences.distanceFromHome.importance}
            placeHolder={undefined}
          />
        </div>
        {/* Class Size */}
        <div className={styles.row}>
          <label className={styles.label}>Class Sizes:</label>
          <DropdownCustom
            options={ClassSizes}
            onOptionSelect={(e, option) =>
              handlePreferenceChange('averageClassSize', option.optionValue as ClassSizes)
            }
            value={preferences.averageClassSize.value}
            placeHolder={undefined}
          />
          <DropdownCustom
            options={ImportanceLevel}
            onOptionSelect={(e, option) =>
              handleImportanceChange('averageClassSize', option.optionValue as ImportanceLevel)
            }
            value={preferences.averageClassSize.importance}
            placeHolder={undefined}
          />
        </div>
      </PreferenceSectionCard>      
    </div>
  );
};
