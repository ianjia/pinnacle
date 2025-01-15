import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { alertDialogActions, RootState, selectedProfileActions } from '../../../store';
import {
  Field,
  Input,
  Switch,
  Card,
  CardPreview,
  Button,
  Popover,
  PopoverTrigger,
  PopoverSurface
} from '@fluentui/react-components';
import { Info24Regular } from '@fluentui/react-icons';
import {
  Race,
  Gender,
  Residency_Status,
  Resident_State,
  Ranking,
  StudentProfile
} from '../../../shared';
import { studentService } from '../../component-service-proxy';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { useStyles } from './student-profile-form.styles';
import { logError } from '../../../util';
import { getCollegeNameKey } from '../../component-navigation-map';

export const StudentProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  
  const student = useSelector((state: RootState) => state.selectedProfile.studentData);
  const race = useSelector((state: RootState) => state.selectedProfile.studentData.race);
  const gender = useSelector((state: RootState) => state.selectedProfile.studentData.gender);
  const residencyStatus = useSelector((state: RootState) => state.selectedProfile.studentData.residency_status);
  const residenceState = useSelector((state: RootState) => state.selectedProfile.studentData.residenceState);
  const classRank = useSelector((state: RootState) => state.selectedProfile.studentData.classRank);
  const firstGenerationStudent = useSelector(
    (state: RootState) => state.selectedProfile.studentData.firstGenerationStudent
  );
  const needFinancialAid = useSelector(
    (state: RootState) => state.selectedProfile.studentData.needFinancialAid
  );

  // Local states
  const [name, setName] = useState<string>(student.name || '');
  const [birthDate, setBirthDate] = useState<string>(student.birthDate || '');
  const [school, setSchool] = useState<string>(student.school || '');
  const [alumniLegacy, setAlumniLegacy] = useState<string>(student.alumni_legacy || '');

  useEffect(() => {
    setName(student.name || '');
    setBirthDate(student.birthDate || '');
    setSchool(student.school || '');
    setAlumniLegacy(student.alumni_legacy || '');
  }, [student]);  

  const handleBlur = async (field: keyof StudentProfile, value: any) => {
    let finalValue = value;
  
    // 1) BirthDate validation
    if (field === 'birthDate') {
      const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
      if (!isValidDate) {
        dispatch(
          alertDialogActions.showAlert({
            title: 'Validation Error',
            message: 'Please provide a valid date.',
          })
        );
        return;
      }
      // set empty string to null
      finalValue = value === '' ? null : value;
    }
  
    // 2) Alumni legacy validation/matching
    if (field === 'alumni_legacy') {
      if (alumniLegacy.trim() !== '') {
        const matchedCollegeName = getCollegeNameKey(alumniLegacy);
        if (!matchedCollegeName) {
          dispatch(
            alertDialogActions.showAlert({
              title: 'Validation Error',
              message: 'Invalid college name, please input again.',
            })
          );
          setAlumniLegacy('');
          return; // Stop here if invalid
        } else {
          setAlumniLegacy(matchedCollegeName);
          finalValue = matchedCollegeName;
        }
      }
    }
  
    // 3) Compare finalValue with what's in Redux.
    //    If they match, do nothing.
    if (student[field] === finalValue) {
      return;
    }
  
    // 4) Otherwise, dispatch your updates
    try {
      dispatch(selectedProfileActions.updateStudentField({ field, value: finalValue }));
      await studentService.update({ ...student, [field]: finalValue });
    } catch (error: unknown) {
      logError(error);
      dispatch(
        alertDialogActions.showAlert({
          title: 'Saving Error',
          message: 'Failed to save to backend, please try again.',
        })
      );
    }
  };  

  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Basic Information
        </h2>
        <CardPreview>
          <div className={styles.grid}>
            <Field label="Preferred Name" className={styles.field}>
              <Input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={(e) => handleBlur('name', e.target.value)}
              />
            </Field>
            <Field label="Race" className={styles.field}>
              <DropdownCustom
                options={Race}
                onOptionSelect={(e, option) => handleBlur('race', option.optionValue as Race)}
                value={race}
                placeHolder="Select race"
              />
            </Field>
            <Field label="Gender" className={styles.field}>
              <DropdownCustom
                options={Gender}
                onOptionSelect={(e, option) => handleBlur('gender', option.optionValue as Gender)}
                value={gender}
                placeHolder="Select gender"
              />
            </Field>
            <Field label="Birth Date" className={styles.field}>
              <Input
                className={styles.input}
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                onBlur={(e) => handleBlur('birthDate', e.target.value)}
              />
            </Field>
            <Field label="Residency Status" className={styles.field}>
              <DropdownCustom
                options={Residency_Status}
                onOptionSelect={(e, option) =>
                  handleBlur('residency_status', option.optionValue as Residency_Status)
                }
                value={residencyStatus}
                placeHolder="Select residency status"
              />
            </Field>
            <Field label="Residence State" className={styles.field}>
              <DropdownCustom
                options={Resident_State}
                onOptionSelect={(e, option) =>
                  handleBlur('residenceState', option.optionValue as Resident_State)
                }
                value={residenceState}
                placeHolder="Select residence state"
              />
            </Field>
          </div>
        </CardPreview>
      </Card>

      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          Extended Information
        </h2>
        <CardPreview>
          <div className={styles.grid}>
            <Field label="School" className={styles.field}>
              <Input
                className={styles.input}
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                onBlur={(e) => handleBlur('school', e.target.value)}
              />
            </Field>
            <Field label="Class Rank" className={styles.field}>
              <DropdownCustom
                options={Ranking}
                onOptionSelect={(e, option) =>
                  handleBlur('classRank', option.optionValue as Ranking)
                }
                value={classRank}
                placeHolder="Select class ranking"
              />
            </Field>

            {/* Alumni Legacy WITH POPOVER */}
            <Field
              label={
                <span className={styles.labelContainer}>
                  <span>Alumni Legacy</span>
                  <Popover positioning={{ position: 'after', align: 'top' }}>
                    <PopoverTrigger>
                      <Button
                        icon={<Info24Regular />}
                        appearance="subtle"
                        size="small"
                        aria-label="Information"
                        className={styles.infoIcon}
                      />
                    </PopoverTrigger>
                    <PopoverSurface>
                      Please fill in one of your parent's graduation college
                    </PopoverSurface>
                  </Popover>
                </span>
              }
              className={styles.field}
            >
              <Input
                className={styles.input}
                value={alumniLegacy}
                onChange={(e) => setAlumniLegacy(e.target.value)}
                onBlur={(e) => handleBlur('alumni_legacy', e.target.value)}
              />
            </Field>

            <Field label="First Generation Student" className={styles.field}>
              <Switch
                checked={firstGenerationStudent || false}
                onChange={(e, data) =>
                  handleBlur('firstGenerationStudent', data.checked)
                }
              />
            </Field>
            <Field label="Need Financial Aid" className={styles.field}>
              <Switch
                checked={needFinancialAid || false}
                onChange={(e, data) => handleBlur('needFinancialAid', data.checked)}
              />
            </Field>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};
