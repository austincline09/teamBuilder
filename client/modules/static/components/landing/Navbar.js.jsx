/**

The navbar on the landing page is styled a little differently

**/

import React from 'react';
import Base from '../../../../global/components/BaseComponent.js.jsx';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DropdownMenu from '../../../../global/components/DropdownMenu.js.jsx';



class Navbar extends Base {
  constructor(props) {
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
    let isScrolled = this.props.isScrolled;
    if(isScrolled) {
      var background = {
        color: "rgba(0,0,0,0.6)"
        , backgroundColor: "#fff"
        , borderBottom: "1px solid rgba(0,0,0,0.15) " };
      var recStyle = {
        color: "#ff4081"
      }
    } else {
      var background = {
        color: "rgba(0,0,0,0.97)"
        , backgroundColor: "transparent" };
    }

    return (
      <div style={background} className="topbar landing-nav _fixed transparent">
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
              <Link to={`teams/byCoach/${user._id}`} activeClassName="active">My Team </Link>
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

Navbar.propTypes = {
  isScrolled: React.PropTypes.bool
  , openDialog: React.PropTypes.func

}
const mapStateToProps = (state) => {
  // console.log("State");
  //console.log(state);
  return {
    user: state.user.single.user
  }
}
export default connect(mapStateToProps)(Navbar);

//export default Navbar;
