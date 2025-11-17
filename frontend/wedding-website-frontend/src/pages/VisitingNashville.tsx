import './VisitingNashville.css';

// Components
import NashvilleActivitiesTabs from '../components/visiting-nashville/NashvilleActivities';
import Menu from '../components/common/Menu';

const NashvilleDetailsHeader = () => {
  return <div className="nashville-details-header">Visiting Nashville</div>;
};

const NashvilleDetails = () => {
  return NashvilleActivitiesTabs();
};

const VisitingNashville = () => {
  // Sections: Places to Stay, Places to Eat, Places to Go
  // Details for each "place": Name/Label, Details, Image, Alt, Location, Cost, Neighborhood?, Website
  //    - Optionally could also include "subfilters" (for food this would be type, for activities this could be like "nature" or "history" or something)
  return (
    <div className="body">
      <NashvilleDetailsHeader />
      <NashvilleDetails />
      {Menu('Visiting Nashville')}
    </div>
  );
};

export default VisitingNashville;
