import React, { Component, PropTypes } from 'react';
import MediaList from '../Media/MediaList';
import { mediaListIds } from '../../constants';
import Tooltip from 'components/Tooltip/Tooltip';
import { tooltipIds } from 'constants';

class MyStream extends Component {
  componentWillMount() {
    const { fetchStream, filters, sortType, sortOrder,
      currentPage } = this.props;
    fetchStream(currentPage, filters, sortType, sortOrder);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchNextPage);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchStream, filters, sortType, sortOrder, currentPage,
      filterArenaIds, typeIds } = this.props;

    if (filters !== nextProps.filters ||
        sortType !== nextProps.sortType ||
        sortOrder !== nextProps.sortOrder ||
        filterArenaIds !== nextProps.filterArenaIds ||
        typeIds !== nextProps.typeIds) {

      let filtered = true;
      fetchStream(currentPage, nextProps.filters, nextProps.sortType,
        nextProps.sortOrder, nextProps.filterArenaIds, nextProps.typeIds,
        filtered);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fetchNextPage);
  }

  fetchNextPage = () => {
    const { fetchStream, filters, sortType, sortOrder,
      currentPage } = this.props;

    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      fetchStream(currentPage, filters, sortType, sortOrder);
    }
  }

  render() {
   const { myStream, greenlightMedia, arenasList } = this.props;
    return (
      <div className="full-page outerspace-bg">
        <div className="mystream-container">
          <div className="title-container has-tooltip">
            <h1>My Stream</h1>
            <Tooltip tooltipId={tooltipIds.myStream} />
          </div>
          <MediaList
            greenlightMedia={(id) => {
              const answer = confirm('Are you sure you want to remove this media content from your Stream?');
              answer && greenlightMedia(id);
            }}
            media={myStream}
            hasArenaFilter
            arenasList={arenasList}
            type={mediaListIds.myStream}
          />
        </div>
      </div>
    );
  }
}

MyStream.propTypes = {
  myStream: PropTypes.array.isRequired,
  fetchStream: PropTypes.func.isRequired,
  greenlightMedia: PropTypes.func.isRequired,
  filters: PropTypes.array,
  sortType: PropTypes.number,
  sortOrder: PropTypes.number,
  filterArenaIds: PropTypes.array,
  typeIds: PropTypes.array,
  arenasList: PropTypes.array,
  currentPage: PropTypes.number.isRequired,
};

export default MyStream;
