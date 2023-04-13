import React from 'react';
import './Components.css';

export default function IssueCard(prop) {

  const openIssue = () => {
    console.log( "Issue : ", prop.id);
  }

  return (
    <div className='IssueCardContainer' onClick={openIssue}>
        <div style={{height : '50px', padding : '5px', textAlign : 'center'}}>
        <h4>{prop.title}</h4>
        </div>
        <hr/>
        <p style={{height : '200px', padding : '5px'}}>{prop.body}</p>
        <hr/>
        <div style={{height : '50px', paddingRight : '10px', paddingBottom : '10px', textAlign : 'end'}}>
            <p><small>
                {prop.author}
                <br/>
                {prop.date}
            </small></p>
        </div>
    </div>
  )
}