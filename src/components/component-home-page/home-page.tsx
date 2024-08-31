import { Canvas } from '../component-canvas';
import { LeftPane } from '../component-left-pane';
import './home-page.css';

export const HomePage: React.FC = () => {
    return (
        <div className='container'>
          <div className="column">
            <LeftPane/>
          </div>
          <div className="column">
            {<Canvas />}
          </div>
          <div className="column">
            <p>Content for the third column.</p>
          </div>
      </div>
      );
}

export default HomePage;