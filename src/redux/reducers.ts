import { combineReducers } from "redux";
import TeamReducer from './team/team.reducer'
import { TeamState } from './team/team.reduxType'

declare module "react-redux" {
  interface DefaultRootState {
    teamState: TeamState;
  }
}

export default combineReducers({
  teamState: TeamReducer
});
