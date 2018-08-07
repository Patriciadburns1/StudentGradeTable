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