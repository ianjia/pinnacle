import { Activity } from '../../../shared';

export interface ActivityProfileFormProps {
  title: string;
  activityList: Activity[];
  onAddActivity: () => void;
  onUpdateActivity: (activity: Activity) => void;
  onDeleteActivity: (id: number) => void;
}
