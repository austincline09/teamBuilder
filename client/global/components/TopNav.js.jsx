import React, { PropTypes } from 'react';
import Base from './BaseComponent.js.jsx';
import CloseWrapper from './helpers/CloseWrapper.js.jsx';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
//import MyTeam from '../../modules/team/components/MyTeam.js.jsx'
import { singleActions as userSingleActions } from '../../modules/user/actions';
import DropdownMenu from './DropdownMenu.js.jsx';


class TopNav extends Base {
  constructor(props, context) {
    super(props);

    this.state = this.getState();
    this._bind(
      '_openDropdown'
      , '_closeDropdown'
    );
  }


  getState() {
    return {
      isOpen: false
    }
  }

  _openDropdown(e) {
    e.stopPropagation();
    this.setState({
      isOpen: true
    });
  }

  _closeDropdown() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { user } = this.props;
    //console.log(this.state);
    return(
      <div className="topbar">
        <CloseWrapper
          isOpen={this.state.isOpen}
          closeAction={this._closeDropdown}
        />

        <div className="titles">
          <Link to="/">
            <div className="nav-logo"> Yote
              <span className="subtitle"> Standard Dev Kit </span>
            </div>
          </Link>
        </div>
        <div className="actions">
          <ul className="top-nav">
            <li>
              <Link to={`/teams/byCoach/${user._id}`} activeClassName="active">My Team </Link>
            </li>
            <li>
              <Link to="/teams" activeClassName="active">Teams </Link>
            </li>
            <li>
              <Link to="/players" activeClassName="active">Players </Link>
            </li>
            <li>
              <Link to="/products" activeClassName="active">Products <sup>simple</sup></Link>
            </li>
            <li>
              <Link to="/posts" activeClassName="active">Posts <sup> complex</sup></Link>
            </li>

            <li className="dropdown">
              <a onClick={this._openDropdown}> <i className="fa fa-caret-down"></i></a>
            </li>
            <DropdownMenu
              currentUser={null}
              isOpen={this.state.isOpen}
            />
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log("State");
  //console.log(state);
  return {
    user: state.user.single.user
  }
}

export default connect(mapStateToProps)(TopNav);
