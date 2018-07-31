import React,{Component} from 'react';
import { Link } from 'react-router-dom'; 

class StudentList extends Component{

    render(){
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
        </table>
    </div>
            </div> 
        )
    }
}

export default StudentList; 