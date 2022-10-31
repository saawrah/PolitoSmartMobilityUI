import React, { Component } from 'react';
import q1 from '../img/01.jpg'
import q2 from '../img/02.jpg'
import q3 from '../img/03.jpg'
export class Home extends Component {
  static displayName = Home.name;


  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <p>You can find all the source codes here:</p>
        <ul>
          <li><strong>UI Git Address:  </strong><a href='https://github.com/saawrah/PolitoSmartMobilityUI'>Open</a></li>
          <li><strong>Backend Git Address:  </strong><a href='https://github.com/saawrah/PolitoSmartMobilityBackEnd'>Open</a></li>
        </ul>


        <p>Here you can find all the MongoDB queries that were used for the reports:</p>
        <ul>
          <li>db.PermanentParkings.count()</li>
          <li>db.PermanentBookings.count()</li>
          <li>db.ActiveBookings.count()</li>
          <li>db.ActiveParkings.count()</li>
          <li>db.PermanentParkings.distinct('city')</li>
          <li style={{marginTop:10,marginBottom:10}}><img src={q1} />;</li>
          <li style={{marginTop:10,marginBottom:10}} ><img src={q2} />;</li>
          <li style={{marginTop:10,marginBottom:10}}><img src={q3} />;</li>
        </ul>
    
      </div>
    );
  }
}
