import React, { PropTypes } from 'react';
import AboutTab from './AboutTab';
import HelpTab from './HelpTab';
import FAQTab from './FAQTab';
import MissionTab from './MissionTab';
import SponsorshipTab from './SponsorshipTab';
import LegalTab from './LegalTab';

const RenderTab = ({ tabs, selectedTab }) => {
  let tab;
  switch (selectedTab) {
    case tabs.help:
      tab = <HelpTab />;
      break;
    case tabs.mission:
      tab = <MissionTab />;
      break;
    case tabs.faq:
      tab = <FAQTab />;
      break;
    case tabs.about:
      tab = <AboutTab />;
      break;
    case tabs.sponsors:
      tab = <SponsorshipTab />;
      break;
    case tabs.legal:
        tab = <LegalTab />;
        break;
    default:
      tab = <AboutTab />;
      break;
  }

  return tab;
};

RenderTab.propTypes = {
  tabs: PropTypes.object.isRequired,
  selectedTab: PropTypes.string.isRequired,
};

export default RenderTab;
