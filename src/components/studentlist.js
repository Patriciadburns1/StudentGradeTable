import React,{Component} from 'react';
import { Link } from 'react-router-dom'; 
import { StudentDataContext } from './studentdata';
import DataRendered from './datarendered';
// import Form from './form'; 

class StudentList extends Component{

    render(){
        
        return(
           
                <div> 
                <h2 className="center"> Student Grade Table </h2> 
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