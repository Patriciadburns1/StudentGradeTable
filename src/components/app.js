import React, {Component} from 'react';
// import '../assets/css/app.css';
import StudentData, {StudentDataContext} from './studentdata'; 
import HomePage from './homepage'; 
import { Route } from 'react-router-dom';
import StudentList from './studentlist'; 

class App extends Component{
    constructor(props){
        super(props); 
    }
    render(){
    return(
        <div> 
        <StudentData> 
            <StudentDataContext.Consumer> 
                {(context) => (
                <div>
                     <Route exact path='/' component={HomePage}/> 
                    <Route path='/student-list' component={StudentList}/>
                </div> 
                )}
            </StudentDataContext.Consumer> 
        </StudentData> 
        </div> 
    )     
    }
}

export default App; 

