import React from 'react';
import './CSS/App.css';
import Header from './Header';
import StandardRow from './StandardRow';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { useStateValue } from './StateProvider';

function App() {

  //Context API is used to define Globle State, that can be used from anywhere in the webapp 
  const [{task, no}, dispatch] = useStateValue();

  //function which dispatch action to add standard into dataobject which is globally define through Context API 
  const addstandard = () => {
      const input = prompt("Enter the Standard Here.");
      if(input){
          //Dispatch method which will dispatch action to the reducer 
          dispatch({
            type: "ADD_TASK",
            values: {
              text: input,
              id: no,
              indent: 0,
            }
          })
      }else{
          alert("Empty Standard is not allowed.");
      }
  }
  
  //Function for saving content to localStorage
  const saveContent = () => {

      // to take data that user have created so far
      const data = task;
      const JSONdata = JSON.stringify(data);
      //filename in which user wants to store the data...
      const filename = prompt("Enter a filename to save the content");
      
      //To store all Filenames that has been created by the User. (Metadata type functionality)
      let allfilename = localStorage.getItem("allfilenames");
      if(allfilename !== null)
          allfilename = JSON.parse(allfilename);
      else
          allfilename = [];
      
      // Entry of filename to the MataData file
      allfilename.push(filename);
      allfilename = JSON.stringify(allfilename);
      localStorage.setItem("allfilenames",allfilename);

      // Creation of the actuall file and data 
      localStorage.setItem(filename, JSONdata);
      alert("Succesfully Saved");
  }

  // Function to Load the content using filename from localStorage
  const loadContent = () => {

      // Access Matadata file to check if there is any file saved and if saved then which file are there which is saved
      let allfiles = localStorage.getItem("allfilenames");
      if(allfiles !== null){
        allfiles = JSON.parse(allfiles);
        let set = new Set(allfiles);
        set = JSON.stringify([...set]);

        //to get the name of the file for loading the content from
        const fileload = prompt("Enter filename to Load the content. Already Stored Files are: "+ set);
        if(fileload !== null){
          const data2 = localStorage.getItem(fileload);
          if(data2 !== null){
            const newJSONdata = JSON.parse(data2);
            dispatch({
              type: "LOAD-DATA",
              value: newJSONdata,
            })
          }else{
            alert("There is no file with this name");
          }
        }
        else{
          alert("Empty file in not valid here");
        }
      }else{
         alert("No file is saved yet");
      }
  }

  //Function for Clearing the Window
  const clearContent = () => {
    dispatch({
      type: "CLEAR-DATA",
    })
  }

  return (
    <div className="app">
      <Header />
      {task.map(t => (
          <StandardRow text={t.text} id={t.id} indent={t.indent} />
      ))}
      <button className="app_addButton" onClick={addstandard} ><ControlPointIcon />Add a Standard</button>
      <div className="app_StoreLoad">
        <button className="app_saveButton" onClick={saveContent} >Save</button>
        <button className="app_loadButton" onClick={loadContent} >Load</button>
        <button className="app_clearButton" onClick={clearContent} >Clear</button>
      </div>
    </div>
  );
}

export default App;
