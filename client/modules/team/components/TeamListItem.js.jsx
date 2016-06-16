import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const TeamListItem = ({ team }) => {

  return (

    <li>

      <figure>
      <Link to={`/teams/${team._id}`}> <img className="teamlist-img" src={team.teamimage}/> </Link>
      <figcaption><center><Link to ={`/teams/${team._id}`}> {team.teamname} </Link></center></figcaption>
      </figure>

    </li>

  )

}

TeamListItem.propTypes = {
  team: PropTypes.object.isRequired
}

export default TeamListItem;
