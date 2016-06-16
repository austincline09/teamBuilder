import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { singleActions } from '../actions';
import { listActions  as userListActions } from '../../user/actions';


// import components
import TeamForm from './TeamForm.js.jsx';

class CreateTeam extends Base {
  constructor(props) {
    super(props);
    this.state = this.props;
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(singleActions.setupNewTeam())
    dispatch(userListActions.fetchList())
    // this.props.dispatch(singleActions.setupNewTeam()).then(() =>{
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
    var newTeamState = this.state.item;
    newTeamState[e.target.name] = e.target.value;
    this.setState(newTeamState);
    // console.log("_handleFormChange");
    // console.log(e);
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendCreateTeam(this.state.item));
  }

  render() {
    const { item, users } = this.state;
    const isEmpty = !item;
    return  (
      <div>

        {isEmpty
          ? <h2> Loading...</h2>
        : <TeamForm
            team={item}
            formType="create"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink="/teams"
            formTitle="Create Team"
            users={users}
            />
        }
      </div>
    )
  }
}

CreateTeam.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.team.single.item
    , status: state.team.single.status
    , users: state.user.list.items
  }
}

export default connect(
  mapStateToProps
)(CreateTeam);
