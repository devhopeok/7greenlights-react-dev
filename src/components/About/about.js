import React, { Component, PropTypes } from 'react';
import RenderTab from './RenderTab';
import * as constants from '../../constants';

class About extends Component {

  componentDidMount() {
    const { switchTab } = this.props;
    const tabs = constants.aboutTabs;
    const hashTab = window.location.hash.substring(1);
    (hashTab && hashTab !== '') && switchTab(tabs[hashTab]);
  }

  render() {
    const { selectedTab, switchTab } = this.props;
    const tabs = constants.aboutTabs;
    return (
      <div className="full-page outerspace-bg">
        <div className="about-container">
          <div className="tab-headers-container">
            {
              Object.keys(tabs).map((key) =>
              <button
                key={tabs[key]}
                type="button"
                className="tab-header"
                onClick={() => switchTab(tabs[key])}
                >
                <h1 className={(selectedTab === tabs[key]) && 'active'}>
                  {tabs[key].toUpperCase()}
                </h1>
                { (selectedTab === tabs[key]) && <hr />}
              </button>
            )
          }
        </div>
        <RenderTab
          tabs={tabs}
          selectedTab={selectedTab}
          />
      </div>
    </div>);
  }
}

About.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  switchTab: PropTypes.func.isRequired,
};

export default About;
