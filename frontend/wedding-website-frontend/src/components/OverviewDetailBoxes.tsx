import './OverviewDetailBoxes.css';

type OverviewDetailBoxType = {
  label: string;
  details: string;
};

const OverviewDetailBox = ({ box }: { box: OverviewDetailBoxType }) => {
  return (
    <div className="overview-detail-box">
      <h1>{box.label}</h1>
      <p>{box.details}</p>
    </div>
  );
};

const OverviewDetailBoxContainer = (
  detailBoxes: Array<OverviewDetailBoxType>
) => {
  return (
    <div className="overview-detail-box-container">
      {detailBoxes.map((box) => {
        return <OverviewDetailBox key={box.label} box={box} />;
      })}
    </div>
  );
};

export default OverviewDetailBoxContainer;
