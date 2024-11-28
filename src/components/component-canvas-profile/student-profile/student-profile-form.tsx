import React, { useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../store';
import {
  Field,
  Input,
  Switch,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { Race, Gender, Residency_Status, Resident_State, Ranking, StudentProfile } from '../../../shared';
import { createStudent, getStudent, updateStudent } from '../../component-service-proxy';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { useStyles } from './student-profile-form.styles';
import { AuthContext } from '../../../auth';
import { logError } from '../../../util';
import axios from 'axios';

export const StudentProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const student = useSelector((state: RootState) => state.selectedProfile.studentData);

  // Initialize states with empty strings to avoid controlled/uncontrolled warnings
  const [name, setName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [school, setSchool] = useState<string>('');
  const [alumniLegacy, setAlumniLegacy] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudent(userId as number);
        dispatch(selectedProfileActions.setStudentData(data));

        // Update states with fetched data
        setName(data.name || '');
        setBirthDate(data.birthDate || '');
        setSchool(data.school || '');
        setAlumniLegacy(data.alumni_legacy || '');
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404 && error.response.data.detail === "Student not found") {
            dispatch(selectedProfileActions.updateStudentField({ field: 'id', value: userId as number }));
            try {
              await createStudent(student);
            } catch (e: unknown) {
              logError(e);
            }
          }
        }
        logError(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleBlur = async (field: keyof StudentProfile, value: any) => {
    // Validation logic
    if (field === 'birthDate') {
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(value) && !isNaN(new Date(value).getTime());
        if (!isValidDate) {
            alert('Birth Date must be in the format YYYY-MM-DD. Please provide a valid date.');
            return;
        }

        // Convert empty string to null
        value = value === '' ? null : value;
    }

    try {
        dispatch(selectedProfileActions.updateStudentField({ field, value }));
        await updateStudent({ ...student, [field]: value });
    } catch (error: unknown) {
        logError(error);
        alert('Retry'); // replace with Dialog
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
                value={student.race}
                placeHolder="Select race"
              />
            </Field>
            <Field label="Gender" className={styles.field}>
              <DropdownCustom
                options={Gender}
                onOptionSelect={(e, option) => handleBlur('gender', option.optionValue as Gender)}
                value={student.gender}
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
                onOptionSelect={(e, option) => handleBlur('residency_status', option.optionValue as Residency_Status)}
                value={student.residency_status}
                placeHolder="Select residency status"
              />
            </Field>
            <Field label="Residence State" className={styles.field}>
              <DropdownCustom
                options={Resident_State}
                onOptionSelect={(e, option) => handleBlur('residenceState', option.optionValue as Resident_State)}
                value={student.residenceState}
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
                onOptionSelect={(e, option) => handleBlur('classRank', option.optionValue as Ranking)}
                value={student.classRank}
                placeHolder="Select class ranking"
              />
            </Field>
            <Field label="Alumni Legacy" className={styles.field}>
              <Input
                className={styles.input}
                value={alumniLegacy}
                onChange={(e) => setAlumniLegacy(e.target.value)}
                onBlur={(e) => handleBlur('alumni_legacy', e.target.value)}
              />
            </Field>
            <Field label="First Generation Student" className={styles.field}>
              <Switch
                checked={student.firstGenerationStudent || false}
                onChange={(e, data) => handleBlur('firstGenerationStudent', data.checked)}
              />
            </Field>
            <Field label="Need Financial Aid" className={styles.field}>
              <Switch
                checked={student.needFinancialAid || false}
                onChange={(e, data) => handleBlur('needFinancialAid', data.checked)}
              />
            </Field>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};
