import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, selectedProfileActions } from '../../../../store';
import {
  Field,
  Input,
  Card,
  CardPreview,
} from '@fluentui/react-components';
import { ApExamListCardProps, CourseApExamCombinedCardProps, CourseListCardProps } from './data-list-types';
import { useCourseListCardProps } from './hooks/use-course-list-card-props';
import { useApExamListCardProps } from './hooks/use-ap-exam-list-card.props';
import { useStyles } from './data-list-styles';
import { CourseListCard } from './course-list-card';
import { ApExamListCard } from './ap-exam-list-card';

export const CouseApExamCombinedCard: React.FC<CourseApExamCombinedCardProps> = ({
    grade
  }) => {
    const couseCardProps: CourseListCardProps = useCourseListCardProps(grade);
    const apExamCardProps: ApExamListCardProps = useApExamListCardProps(grade);

    const styles = useStyles();

    return (
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          {grade}th Grade Work
        </h2>
        
        <CourseListCard
            {...couseCardProps}
        />
        <ApExamListCard
            {...apExamCardProps}
        />        
      </Card>
    );
  };
  