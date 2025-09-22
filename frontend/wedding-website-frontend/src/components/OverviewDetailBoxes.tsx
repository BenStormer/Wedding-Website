import './OverviewDetailBoxes.css';

type OverviewDetailBoxType = {
  label: string;
  details: string;
};

const OverviewDetailBoxContainer = (
  detailBoxes: Array<OverviewDetailBoxType>
) => {
  return (
    <div className="overview-detail-box-container">
      {detailBoxes.map((box) => {
        return OverviewDetailBox(box);
      })}
    </div>
  );
};

const OverviewDetailBox = (box: OverviewDetailBoxType) => {
  return (
    <div className="overview-detail-box">
      <h1>{box.label}</h1>
      <p>{box.details}</p>
    </div>
  );
};

export default OverviewDetailBoxContainer;
