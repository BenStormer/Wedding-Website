import './Home.css';

// Components
import Menu from '../components/common/Menu';
import RegistryItems from '../components/registry/RegistryItems';

const RegistryBoxesContainer = () => {
  return <div className="registry-boxes-container">{RegistryItems()}</div>;
};

const Registry = () => {
  return (
    <div className="body">
      <RegistryBoxesContainer />
      {Menu('Registry')}
    </div>
  );
};

export default Registry;
