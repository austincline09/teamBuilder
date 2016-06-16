import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
// import * as listActions from '../actions/teamListActions';
import { listActions } from '../actions';

// import components
import TeamListItem from './TeamListItem.js.jsx';

class TeamList extends Base {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    console.log("list mounting");
    this.props.dispatch(listActions.fetchList()).then(() => {
      // console.log(this.props);
    })
  }
  //
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.selectedItem !== this.props.selectedItem) {
  //     const { dispatch, selectedItem } = nextProps;
  //   }
  // }

  render() {
    const { list } = this.props;
    const isEmpty = list.items.length === 0;
    return(
      <div className="yt-container">
        <h1> Team List
          <Link className="yt-btn small u-pullRight" to={'/teams/new'}> NEW TEAM </Link>
        </h1>
        <hr/>
          {isEmpty
            ? (list.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            : <div style={{ opacity: list.isFetching ? 0.5 : 1 }}>
              <ul className="builder-list">
                {list.items.map((item, i) =>
                  <TeamListItem key={i} team={item} />
                )}
              </ul>
            </div>
          }
      </div>
    )
  }
}


TeamList.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log("list state");
  console.log(state);
  const { team } = state;
  const list = team.list;
  return {
    list: list
  }
}

export default connect(
  mapStateToProps
)(TeamList);
