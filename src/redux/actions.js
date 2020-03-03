import axios from 'axios';

const apiUrl = "https://blockchain.info/";


export function blockResults(results) {
    return {
        type: 'BLOCK_RESULTS',
        results
    }

}

export function transactionDetails(results) {
    return {
        type: 'TRANSACTION_DETAILS',
        results
    }

}

export const fetchBlockResults = (id) => {
  return (dispatch) => {
    return axios.get(apiUrl+'rawblock/'+id+'?cors=true')
      .then(response => {        
        dispatch(blockResults(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
}

export const fetchTransactionDetails = (id) => {
  return (dispatch) => {
    return axios.get(apiUrl+'rawtx/'+id+'?cors=true')
      .then(response => {        
        dispatch(transactionDetails(response.data))
      })
      .catch(error => {
        throw(error);
      });
  };
}


