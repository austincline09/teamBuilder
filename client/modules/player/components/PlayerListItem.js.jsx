import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const PlayerListItem = ({ player }) => {

  return (
    <li>
      <figure>
        <Link to={`/players/${player._id}`}> <img className="playerlist-img" src={player.playerimage}/> </Link>
        <figcaption><center><Link to ={`/players/${player._id}`}> {player.firstname} {player.lastname} </Link></center></figcaption>
      </figure>
    </li>
  )
}

PlayerListItem.propTypes = {
  player: PropTypes.object.isRequired
}

export default PlayerListItem;
