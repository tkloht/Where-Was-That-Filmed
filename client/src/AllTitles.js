import React from 'react';

const API = 'wwmu-gmzc.json'

class AllTitles extends React.Component {
    loadAll() {
        fetch(API, {
            headers: {
              "content-type": "application/json"
            }
          })
          .then(resp => {
            if (!resp.ok) {
              if (resp.status >= 400 && resp.status < 500) {
                return resp.json().then(data => {
                  let err = {
                    errorMessage: data.message
                  };
                  throw err;
                });
              } else {
                let err = {
                  errorrMessage: "Error FETCHING and parsing data from your film API"
                };
                throw err;
              }
            }
          return resp.json();
          })

          .then(allInfo => {
            this.setState({
              allInfo: allInfo
            })
          });
      }
	render(){
		return (
			<div className="header">
				<h3>All Titles</h3>
			</div>
		)
	}
}

export default AllTitles;