import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

// import actions
import { singleActions } from '../actions';
// import team list actions
import { listActions as teamListActions } from '../../team/actions';
import { singleActions as teamSingleActions } from '../../team/actions';

class SinglePlayer extends Base {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = true;
    // const populate = false;
    const { dispatch, params } = this.props;
    dispatch(singleActions.fetchSinglePlayerById(params.playerId, populate ))
    dispatch(teamListActions.fetchList())
    //dispatch(teamSingleActions.fetchSingleTeamById(params.teamId, populate))
  }

  render() {
    const { item } = this.props;
    //const { teamList } = this.props;
    const isEmpty = !item._id;
    console.log("isEmpty", isEmpty);
    console.log(item.team);
    //console.log(teamList);
    return  (
      <div className="yt-container">
        <h3> Single Player Item </h3>
        {isEmpty
          ? (item.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: item.isFetching ? 0.5 : 1 }}>

              <h1> { item.firstname } { item.lastname }
                <Link className="yt-btn small u-pullRight" to={`/players/${item._id}/update`}> UPDATE PLAYER </Link>
              </h1>
              <h2>
                <img className="player-img" src={item.playerimage} />
              </h2>
              <hr/>
              <p> Number: { item.playernumber } </p>
              <p>
                Team: <Link to={`/teams/${item.team._id}`}> {item.team.teamname}</Link>
              </p>

            </div>
          }
      </div>
    )
  }
}

SinglePlayer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  //console.log(state);
  return {
    item: state.player.single.item
    , teams: state.team.list.items
  }
}

export default connect(
  mapStateToProps
)(SinglePlayer);
