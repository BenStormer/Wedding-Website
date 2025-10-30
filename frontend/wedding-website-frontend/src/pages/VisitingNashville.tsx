import classes from './VisitingNashville.module.css';

// Components
import Menu from '../components/common/Menu';
import { FloatingIndicator, Tabs, Center } from '@mantine/core';
import { useState } from 'react';

// Assets

const NashvilleDetailsHeader = () => {
  return <div>Visiting Nashville</div>;
};

const NashvilleDetailsTabs = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>('1');
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Center>
      <Tabs variant="none" value={value} onChange={setValue}>
        <Tabs.List ref={setRootRef} className={classes.list}>
          <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
            Places to Stay
          </Tabs.Tab>
          <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
            Places to See
          </Tabs.Tab>
          <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
            Places to Eat
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="1">Places to Stay</Tabs.Panel>
        <Tabs.Panel value="2">Places to See</Tabs.Panel>
        <Tabs.Panel value="3">Places to Eat</Tabs.Panel>
      </Tabs>
    </Center>
  );
};

const VisitingNashville = () => {
  // Sections: Places to Stay, Places to Eat, Places to Go
  // Details for each "place": Name/Label, Details, Image, Alt, Location, Cost, Neighborhood?, Website
  //    - Optionally could also include "subfilters" (for food this would be type, for activities this could be like "nature" or "history" or something)
  return (
    <div className="body">
      <NashvilleDetailsHeader />
      <NashvilleDetailsTabs />
      {Menu('Visiting Nashville')}
    </div>
  );
};

export default VisitingNashville;
