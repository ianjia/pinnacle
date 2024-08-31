
import './committe-canvas.css';
import backgroundImage from '../../assets/images/committe_background.jpg';


export const CommitteCanvas: React.FC = () => {
    return (
       <div
          className="committe-background"
          style={{
             backgroundImage: `url(${backgroundImage})`, 
          }}
       />
    );
 }