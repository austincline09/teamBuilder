import React, { PropTypes } from 'react';
import Base from './BaseComponent.js.jsx';
import CloseWrapper from './helpers/CloseWrapper.js.jsx';
import { Router, Route, Link } from 'react-router';
import { connect } from 'react-redux';
//import MyTeam from '../../modules/team/components/MyTeam.js.jsx'
import { singleActions as userSingleActions } from '../../modules/user/actions';


class DropdownMenu extends Base {
  constructor(props) {
    super(props);
    //this.state = this.props;
    ///const { distpatch } = this.props;
    this._bind(
      '_logOut'
    )
  }

  _logOut(){
    this.props.dispatch(userSingleActions.sendLogout())
  }


  render() {
    if(this.props.isOpen) {
      return(
        <ul className="dropMenu">
          <li className="dropdown-header"> Hello,  </li>
          <li><Link onClick={this.props._openDropdown} to="/posts"> Posts</Link></li>
          <li><a href="#"> Admin </a></li>
          <li role="separator" className="divider"><br/></li>
          <li><Link onClick={this._logOut} to ="/user/login">Logout</Link></li>
        </ul>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  // console.log("State");
  //console.log(state);
  return {

  }
}

export default connect(mapStateToProps)(DropdownMenu);
