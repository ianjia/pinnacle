import type { NavigationTabProps } from "./navigation-tab.types";
import './navigation.css'

export const NavigationTab: React.FC<NavigationTabProps> = ({title, isActive, onClick}) => {

    return (
        <div
          className={`tab ${isActive ? 'active' : ''}`}
          onClick={onClick}
        >
          {title}
        </div>
      );

};

