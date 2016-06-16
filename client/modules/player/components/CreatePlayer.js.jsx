import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { singleActions } from '../actions';

import { listActions as teamListActions } from '../../team/actions';

// import components
import PlayerForm from './PlayerForm.js.jsx';

class CreatePlayer extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    const populate = true;
    const { dispatch, params } = this.props;
    dispatch(singleActions.setupNewPlayer())
    dispatch(teamListActions.fetchList())
    // dispatch(teamSingleActions.fetchSingleTeamById(params.teamId, populate))
    // this.props.dispatch(singleActions.setupNewPlayer()).then(() =>{
    //     console.log(this.props);
    //   });
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
    // console.log("NExt PROPs");
    // console.log(nextProps);
    if(nextProps.status === "error") {
      alert(nextProps.error.message);
    }
  }


  _handleFormChange(e) {
    //this works WAY better than having a separate onChange for every input box
    // just make sure input name attr == state name

    // this.props.dispatch(teamSingleActions.fetchSingleTeamById(this.state.item))
    //console.log(teamSingleActions.fetchSingleTeamById(this.state.item));
    var newPlayerState = this.state.item;
    newPlayerState[e.target.name] = e.target.value;
    this.setState(newPlayerState);
    // console.log("_handleFormChange");
    // console.log(e);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendCreatePlayer(this.state.item));
  }

  render() {
    const { item, teams } = this.state;
    // const { teams } = this.state;
    const isEmpty = !item;
    return  (
      <div>

        {isEmpty
          ? <h2> Loading...</h2>
        : <PlayerForm
            player={item}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink="/players"
            formTitle="Create Player"
            teams={teams}
            />
        }
      </div>
    )
  }
}

CreatePlayer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.player.single.item
    , status: state.player.single.status
    , teams: state.team.list.items
  }
}

export default connect(
  mapStateToProps
)(CreatePlayer);
