import Map from '../component-map/Map';
import LeftPane from '../component-left-pane/LeftPane';
import './HomePage.css';

export const HomePage: React.FC = () => {
    return (
        <div className="container">
        <LeftPane/>
        <div className="column">
          <h2>Column 2</h2>
          {<Map />}
        </div>
        <div className="column">
          <h2>Column 3</h2>
          <p>Content for the third column.</p>
        </div>
      </div>

      );
}




export default HomePage;