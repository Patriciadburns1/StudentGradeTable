import React,{Component} from 'react';
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';


class DataRendered extends Component{

    constructor(props){
        super(props);
       
    }
    
    deleteData(context, index){
        const { studentList } = context;
        console.log("This is the  id", studentList[index].id); 
        var id = studentList[index].id; 
      
        firebase.collection('Student Data').doc(id).delete().then(function (id) {
            console.log("this was deleted ", id);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
        });

    }

    updateData(context, index){
        const{studentList}= context; 
        var id =studentList[index].id; 

        firebase.collection('Student Data').doc(id).update().then(function (id) {
            console.log("this was updated", id);
        })
            .catch(function (error) {
                console.error("this was not updated ", error);
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
                        <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.updateData.bind(this,context,index)}> UPDATE </td> 
                        <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.deleteData.bind(this, context, index)}> DELETE </td> 
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