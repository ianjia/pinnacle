
import './interview-canvas.css';
import backgroundImage from '../../assets/images/interview_background.jpg';


export const InterviewCanvas: React.FC = () => {
    return (
       <div
          className="interview-background"
          style={{
             backgroundImage: `url(${backgroundImage})`, 
          }}
       />
    );
 }