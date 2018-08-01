import React,{Component} from 'react';
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';


class DataRendered extends Component{

    
    deleteData(){
        console.log("this is working"); 
        firebase.collection('Student Data').doc(docRef.id).delete().then(function (docRef) {
            console.log("this was deleted ", docRef.id);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
        });

    }

    render(){

        return(
            <StudentDataContext.Consumer>{(context)=>(
            context.studentList.map((item, index)=>{
                return(    
                    <tr key={index}> 
                        <td> {item.student} </td> 
                        <td> {item.course} </td> 
                        <td> {item.grade} </td>
                        <td type="button" className="waves-effect waves-light btn cyan accent-3"> UPDATE </td> 
                        <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.deleteData.bind(this)}> DELETE </td> 
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