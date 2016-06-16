import React, { PropTypes } from 'react';
import Base from "../../../global/components/BaseComponent.js.jsx";
import { connect } from 'react-redux';

// import actions
import { singleActions } from '../actions';
import { listActions as userListActions } from '../../user/actions';
// import components
import TeamForm from './TeamForm.js.jsx';

class UpdateTeam extends Base {
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

    dispatch(userListActions.fetchList())
    if(params.teamId) {
      dispatch(singleActions.fetchSingleTeamById(params.teamId, populate ))
    } else {
      dispatch(singleActions.fetchSingleTeamBySlug(params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  _handleFormChange(e) {
    //this works WAY better than having a separate onChange for every input box
    // just make sure input name attr == state name
    var newTeamState = this.state.item;
    newTeamState[e.target.name] = e.target.value;
    //newTeamState.status = newTeamState.isPublished ? "published" : "draft";
    this.setState(newTeamState);

  }

  _handleFormSubmit(e) {
    e.preventDefault();
    // console.log("_handleFormSubmit");
    // console.log(e);
    this.props.dispatch(singleActions.sendUpdateTeam(this.state.item));
  }

  render() {
    const { item, users } = this.state;
    const isEmpty = !item;
    return  (
      <div >
        {isEmpty
          ? <h2> Loading...</h2>
        : <TeamForm
            team={item}
            formType="update"
            handleFormSubmit={this._handleFormSubmit}
            handleFormChange={this._handleFormChange}
            cancelLink={`/teams/${item._id}`}
            formTitle="Update Team"
            users={users}
            />
        }
      </div>
    )
  }
}

UpdateTeam.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  // console.log("State");
  // console.log(state);
  return {
    item: state.team.single.item
  , users: state.user.list.items
  }
}

export default connect(
  mapStateToProps
)(UpdateTeam);
