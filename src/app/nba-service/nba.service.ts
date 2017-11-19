import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient,HttpHeaders} from '@angular/common/http';

const credentials = 'bW9oYW1lZHIyMDpoZXloZXkxMkA=';
var headers = new Headers()

@Injectable()
export class NbaService {

  constructor(private http:HttpClient) { }
  
  getPlayerStats(){
    this.http.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/cumulative_player_stats.json?playerstats=2PA,2PM,3PA,3PM,FTA,FTM',{
      headers:new HttpHeaders().set('Authorization','Basic '+credentials)})
        .subscribe(data=>{
          console.log(data)
        })
  }

  getFullGameSchedule(){
    this.http.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/full_game_schedule.json',
    {headers:new HttpHeaders().set('Authorization','Basic '+credentials)})
    .subscribe(data=>{
      console.log(data)
    }) 
  }

  getConferenceTeamStandings(){
    this.http.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/conference_team_standings.json?teamstats=W,L,PTS,PTSA',
    {headers:new HttpHeaders().set('Authorization','Basic '+credentials)})
    .subscribe(data=>{
      console.log(data)
    }) 
  }

  getOverallTeamStandings(){
    this.http.get('https://api.mysportsfeeds.com/v1.1/pull/nba/2017-2018-regular/overall_team_standings.json?teamstats=W,L,PTS,PTSA',
    {headers:new HttpHeaders().set('Authorization','Basic '+credentials)})
    .subscribe(data=>{
      console.log(data)
    }) 
  }
  
}
