import React, { useContext, useEffect } from 'react';
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
import { getStudent, updateStudent } from '../../component-service-proxy';
import { DropdownCustom } from '../../component-customized-fluent-ui';
import { useStyles } from './student-profile-form.styles';
import { AuthContext } from '../../../auth';

export const StudentProfileForm: React.FC = () => {
  const dispatch = useDispatch();
  const { userId } = useContext(AuthContext);
  const student = useSelector((state: RootState) => state.selectedProfile.studentData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudent(userId as number);
        dispatch(selectedProfileActions.setStudentData(data));
      } 
      catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleBlur = async (field: keyof StudentProfile, value: any) => {
    dispatch(selectedProfileActions.updateStudentField({ field, value }));
    await updateStudent({ ...student, [field]: value });
  };

  const handleSwitchChange = async (field: keyof StudentProfile, checked: boolean) => {
    dispatch(selectedProfileActions.updateStudentField({ field, value: checked }));
    await updateStudent({ ...student, [field]: checked });
  };

  const styles = useStyles();

  return (
    <div className = {styles.container}>
      <Card className = {styles.card}>
        <h2 className = {styles.header} style={{ textAlign: 'left' }}>
            Basic Information
        </h2>
        <CardPreview>
          <div
            className = {styles.grid}
          > 
            <Field label="Prefered Name" className = {styles.field}>
              <Input
                className = {styles.input}
                value={student.name || ''}
                onBlur={(e) => handleBlur('name', e.target.value)}
              />
            </Field>
            <Field label="Race" className = {styles.field}>
              <DropdownCustom
                options={Race}
                onOptionSelect={(e, option) => handleBlur('race', option.optionValue as Race)}
                value={student.race}
                placeHolder="Select race"
              />
            </Field>
            <Field label="Gender" className = {styles.field}>
              <DropdownCustom
                options={Gender}
                onOptionSelect={(e, option) => handleBlur('gender', option.optionValue as Gender)}
                value={student.gender}
                placeHolder="Select gender"
              />
            </Field>
            <Field label="Birth Date" className = {styles.field}>
              <Input
                className = {styles.input}
                type="date"
                value={student.birthDate || ''}
                onBlur={(e) => handleBlur('birthDate', e.target.value)}
              />
            </Field>
            <Field label="Residency Status" className = {styles.field}>
              <DropdownCustom
                options={Residency_Status}
                onOptionSelect={(e, option) => handleBlur('residency_status', option.optionValue as Residency_Status)}
                value={student.residency_status}
                placeHolder="Select residency status"
              />
            </Field>
            <Field label="Residence State" className = {styles.field}>
              <DropdownCustom
                options={Resident_State}
                onOptionSelect={(e, option) => handleBlur('residenceState', option.optionValue as Resident_State)}
                value={student.residenceState}
                placeHolder="Select resident state"
              />
            </Field>
          </div>
        </CardPreview>
      </Card>
      <Card className = {styles.card}>
        <h2 className = {styles.header} style={{ textAlign: 'left' }}>
          Extended Information
        </h2>
        <CardPreview>
          <div
            className = {styles.grid}
          >
            <Field label="School" className = {styles.field}>
              <Input
                className = {styles.input}
                value={student.school || ''}
                onBlur={(e) => handleBlur('school', e.target.value)}
              />
            </Field>
            <Field label="Class Rank" className = {styles.field}>
              <DropdownCustom
                options={Ranking}
                onOptionSelect={(e, option) => handleBlur('classRank', option.optionValue as Ranking)}
                value={student.classRank}
                placeHolder="Select class ranking"
              />
            </Field>
            <Field label="Alumni Legacy" className = {styles.field}>
              <Input
                className = {styles.input}
                value={student.alumni_legacy || ''}
                onBlur={(e) => handleBlur('alumni_legacy', e.target.value)}
              />
            </Field>
            <Field
              label="First Generation Student"
              className = {styles.field}
            >
              <Switch
                checked={student.firstGenerationStudent || false}
                onChange={(e, data) => handleSwitchChange('firstGenerationStudent', data.checked)}
              />
            </Field>
            <Field label="Need Financial Aid" className = {styles.field}>
              <Switch
                checked={student.needFinancialAid || false}
                onChange={(e, data) => handleSwitchChange('needFinancialAid', data.checked)}
              />
            </Field>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};
