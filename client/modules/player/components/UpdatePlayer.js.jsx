import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { singleActions } from '../actions';

import { listActions as teamListActions } from '../../team/actions';

// import components
import PlayerForm from './PlayerForm.js.jsx';

class UpdatePlayer extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    console.log("Single item mounting");
    // console.log(this.context);

    // action.fetchItem();
    const populate = false;
    // const populate = false;
    const { dispatch, params } = this.props;
    //dispatch(teamListActions.fetchList())
    dispatch(teamListActions.fetchList())
    if(params.playerId) {
      dispatch(singleActions.fetchSinglePlayerById(params.playerId, populate ))
    } else {
      dispatch(singleActions.fetchSinglePlayerBySlug(params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _handleFormChange(e) {
    //this works WAY better than having a separate onChange for every input box
    // just make sure input name attr == state name
    var newPlayerState = this.state.item;
    newPlayerState[e.target.name] = e.target.value;
    //newPlayerState.status = newPlayerState.isPublished ? "published" : "draft";
    this.setState(newPlayerState);

  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendUpdatePlayer(this.state.item));
  }

  render() {
    const { item, teams } = this.state;
    const isEmpty = !item;
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
        : <PlayerForm
            player={item}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/players/${item._id}`}
            formTitle="Update Player"
            teams={teams}
            />
        }
      </div>
    )
  }
}

UpdatePlayer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.player.single.item
  , teams: state.team.list.items
  }
}

export default connect(
  mapStateToProps
)(UpdatePlayer);
