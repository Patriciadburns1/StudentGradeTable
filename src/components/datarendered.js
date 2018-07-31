import React,{Component} from 'react';
import { StudentDataContext } from './studentdata';

class DataRendered extends Component{

    render(){

        return(
            <StudentDataContext.Consumer>{(context)=>(
            context.studentList.map((item, index)=>{
                return(
                
                    <tr key={index}> 
                        <td> {item.Student} </td> 
                        <td> {item.Course} </td> 
                        <td> {item.Grade} </td>
                        <td type="button" className="waves-effect waves-light btn amber darken-4"> UPDATE </td> 
                        <td type="button" className="waves-effect waves-light btn"> DELETE </td> 
                    </tr> 
       
                )  
            } 
            )
            )}
            </StudentDataContext.Consumer> 
        )
    }
}

export default DataRendered; 