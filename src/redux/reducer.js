
import {combineReducers} from 'redux'

function blockresults(state={}, action) {
   switch(action.type){
   	case 'BLOCK_RESULTS':   			
   	   		return action.results
   	default: return state
   }
    
}
function transactiondetails(state={}, action) {
   switch(action.type){
   	case 'TRANSACTION_DETAILS':   			
   	   		return action.results
   	default: return state
   }
    
}


// function bookingdetails(state = {}, action) {
    
// 	return state
    
// }

const rootReducer = combineReducers({blockresults,transactiondetails})

export default rootReducer