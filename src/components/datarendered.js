import React,{Component} from 'react';
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';
import TableRow from './tablerow'; 

class DataRendered extends Component{

    constructor(props){
        super(props);
       
     
    }
    

    render(){

        return(
            <StudentDataContext.Consumer>{(context)=>(
            context.studentList.map((item, index)=>{
                return(    
                    // <tr key={index}> 
                    //     <td> {item.student} </td> 
                    //     <td> {item.course} </td> 
                    //     <td> {item.grade} </td>
                    //     <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.updateData.bind(this,context,index)}> UPDATE </td> 
                    //     <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.deleteData.bind(this, context, index)}> DELETE </td> 
                    // </tr> 
                    <TableRow student={item} key={index} arrayIndex={index}/> 
       
                )  
            } 
            )
            )}
            </StudentDataContext.Consumer> 
        )
    }
}

export default DataRendered; 