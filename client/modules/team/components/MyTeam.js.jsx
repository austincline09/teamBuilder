import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';
import { Link } from 'react-router';

import PlayerListItem from '../../player/components/PlayerListItem.js.jsx';

// import actions
import { singleActions } from '../actions';
import { listActions as playerListActions } from '../../player/actions';
import { singleActions as userSingleActions } from '../../user/actions';


class MyTeam extends Base {
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
    dispatch(singleActions.fetchSingleTeamByCoach(params.userid))
    dispatch(playerListActions.fetchList())

  }

  render() {
    const { item, players, user } = this.props;
    const isEmpty = !item._id;
    //console.log(item.headcoach);
    return  (
      <div className="yt-container">
        <h3> My Team </h3>
        {isEmpty
          ? (item.isFetching ? <h2>Loading...</h2> : <h2>Empty.<Link className="yt-btn small u-pullRight" to="/user/login"> LOG IN </Link></h2>)
          : <div style={{ opacity: item.isFetching ? 0.5 : 1 }}>

              <h1> { item.teamname }
                <Link className="yt-btn small u-pullRight" to={`/teams/${item._id}/update`}> UPDATE TEAM </Link>
              </h1>
              <h2>
                <img className="team-img" src={item.teamimage} />

              </h2>
              <hr/>
              <p>
                Head Coach: You
                <Link className="yt-btn small u-pullRight" to={'/players/new'}> ADD PLAYER </Link>
                <br/>
                <br/>
                Team Roster:
                <br/>
              </p>
                <ul className="builder-list">
                  {players.map((player, i) => {
                    {player ? player.team : "0"}
                    if(item._id == players[i].team) {
                    return(
                      <PlayerListItem key={i} player={player}/>
                      )
                    }
                  }
                  )}
                </ul>

            </div>
          }
      </div>
    )
  }
}


MyTeam.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.team.single.item
  , players: state.player.list.items
  , users: state.user.list.items
  , user: state.user.single.user
  }
}

export default connect(
  mapStateToProps
)(MyTeam);
