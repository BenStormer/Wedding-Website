import './OverviewDetailBoxes.css';
import { Text, Box } from '@mantine/core';
import {
  IconCalendar,
  IconMapPin,
  IconShirt,
} from '@tabler/icons-react';

interface OverviewDetailBoxType {
  label: string;
  details: string;
  subDetails?: string;
}

const getIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'when':
      return <IconCalendar size={40} stroke={1.5} />;
    case 'where':
      return <IconMapPin size={40} stroke={1.5} />;
    case 'attire':
      return <IconShirt size={40} stroke={1.5} />;
    default:
      return null;
  }
};

const OverviewDetailBox = ({ box }: { box: OverviewDetailBoxType }) => {
  return (
    <Box className="overview-detail-box">
      <Box className="overview-detail-icon" c="var(--secondary-brown)">
        {getIcon(box.label)}
      </Box>
      <Text className="overview-detail-label">
        {box.label.toUpperCase()}
      </Text>
      <Text className="overview-detail-text">
        {box.details}
      </Text>
      {box.subDetails && (
        <Text className="overview-detail-subtext">
          {box.subDetails}
        </Text>
      )}
    </Box>
  );
};

const OverviewDetailBoxContainer = ({
  detailBoxes,
}: {
  detailBoxes: OverviewDetailBoxType[];
}) => {
  return (
    <div className="overview-detail-box-container">
      {detailBoxes.map((box) => {
        return <OverviewDetailBox key={box.label} box={box} />;
      })}
    </div>
  );
};

export default OverviewDetailBoxContainer;
