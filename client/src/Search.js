import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';



// SEARCH ACTORS


//   const searchInput = () => {

//     let actors = client.query('SELECT id, locations FROM media;')
//     var currentActors = actors

//     var ul = document.getElementById("actors")


//     setActors()

//     function setActors() {
//     	ul.innerHTML = '';

//     	for (var actorIndex in currentActors) {
//           var li = document.createElement("li")
//           li.textContent = currentActors[actorIndex]
//           ul.appendChild(li)
//       }
//     }

// }


const search = () => {
  var userInput = document.getElementById("SearchBox").value
  let encodeInput = encodeURI(userInput)
  window.location.pathname = "/search/" + encodeInput
}






// if searchActors doesn't return a query, then i want to searchTitles
//

// const inputQuery = () => {
// }

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        onInput: []
      }
      // this.searchAll = searchActors && searchTitles
      this.search=search

  }


  // componentDidMount () {
  //    /* event listener */
  //    document.getElementById("SearchBox").addEventListener('input', onInput);

  // }

  // onInput () {
  //   currentActors = actors.filter((actor) =>{
  //       //return actor.toLowerCase().startsWith(this.value.toLowerCase())
  //       return actor.toLowerCase().indexOf(this.value.toLowerCase()) !!= -1
  //   })
  //   setActors()
// }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <Label for="searchBox" hidden>Search</Label>
          <Input type="" name="" id="SearchBox" placeholder="" />
        </FormGroup>
        {' '}
        <Button onClick={this.search}>Search</Button>
      </Form>
    );
  }
}

export default SearchBox;