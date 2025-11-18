import './Home.css';

// Components
import Menu from '../components/common/Menu';
import RegistryItems from '../components/registry/RegistryItems';

const RegistryBoxesContainer = async () => {
  return (
    <div className="registry-boxes-container">{await RegistryItems()}</div>
  );
};

const Registry = async () => {
  return (
    <div className="body">
      {await RegistryBoxesContainer()}
      {Menu('Registry')}
    </div>
  );
};

export default Registry;
