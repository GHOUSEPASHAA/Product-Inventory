// Goal.js
import React from 'react';
import MadeGoel from './MadeGoel';
import MissedGoal from './MissedGoel';

function Goal(props) {
  const isGoal = props.isGoal;
   return (
    <div>
      {isGoal ? <h1>Success</h1> : <h1>Failure</h1>}
    </div>
  );
}

export default Goal;
