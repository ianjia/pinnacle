import React, { ReactNode } from 'react';
import { Card, CardPreview } from '@fluentui/react-components';
import { useStyles } from './preference-section-card.styles';

interface PreferenceSectionCardProps {
  title: string;
  children: ReactNode;
}

export const PreferenceSectionCard: React.FC<PreferenceSectionCardProps> = ({ title, children }) => {
  const styles = useStyles();
  
  return (
    <Card className={styles.card}>
      <h2 className={styles.header}>{title}</h2>
      <CardPreview>
        <div className={styles.grid}>{children}</div>
      </CardPreview>
    </Card>
  );
};
