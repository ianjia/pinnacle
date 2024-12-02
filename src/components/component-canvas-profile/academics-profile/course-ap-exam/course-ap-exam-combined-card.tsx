import React from 'react';
import {
  Card,
} from '@fluentui/react-components';
import { ApExamListCardProps, CourseApExamCombinedCardProps, CourseListCardProps } from './data-list-types';
import { useCourseListCardProps } from './hooks/use-course-list-card-props';
import { useApExamListCardProps } from './hooks/use-ap-exam-list-card.props';
import { useStyles } from './data-list-styles';
import { CourseListCard } from './course-list-card';
import { ApExamListCard } from './ap-exam-list-card';

export const CouseApExamCombinedCard: React.FC<CourseApExamCombinedCardProps> = ({
  school_year
  }) => {
    const couseCardProps: CourseListCardProps = useCourseListCardProps(school_year);
    const apExamCardProps: ApExamListCardProps = useApExamListCardProps(school_year);

    const styles = useStyles();

    return (
      <Card className={styles.card}>
        <h2 className={styles.header} style={{ textAlign: 'left' }}>
          {school_year}th Grade Work
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
  