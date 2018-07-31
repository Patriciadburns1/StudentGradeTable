import React,{Component} from 'react';
import { Link } from 'react-router-dom'; 
import { StudentDataContext } from './studentdata';
import DataRendered from './datarendered';
// import Form from './form'; 

class StudentList extends Component{

    render(){

        // need to map through array student list and at each key create a new table td 
        
        return(
           
                <div> 
                <h1 className="center"> Student Grade Table </h1> 
                <div>
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Student Course</th>
                    <th>Student Grade</th>
                    <th>Operations</th>
                </tr>
            </thead>
            <tbody> 
               <DataRendered/> 
            </tbody> 
        </table>
    </div>
            </div> 
     
        )
    }
}

export default StudentList; 