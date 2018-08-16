import React, {Component} from 'react'; 
import './assets/css/form.css';
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';


class Modal extends Component {
  constructor(props){
      super(props);

  }


  deleteData(context, index){
    
    const { studentList } = context;
    const {deleteIndex} = context; 
    console.log("this is student student list", studentList); 
    console.log("this is delete index", deleteIndex); 
    // var id = studentList[index].id;
    var id = studentList[deleteIndex].id; 

    firebase.collection('Student Data').doc(id).delete().then(function (id) {
        console.log("this was deleted ", id);
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
    });
    }

  render(){
      return(
        <StudentDataContext.Consumer >{(context)=>(
            <div className="modalShadow">
                <div className="modalBody"> 
                {/* <button className="btn cyan accent-2" onClick={this.deleteData.bind(this,context,index)}> Confirm Delete</button> */}
                <button className="btn cyan accent-2" onClick={this.deleteData.bind(this,context,context.deleteIndex)}> Confirm Delete</button>
                <button className="btn cyan accent-2" onClick={ ()=> {context.closeModal(context)}} > Cancel Delete </button>
                </div>   
            </div> 
          )
        }
     </StudentDataContext.Consumer> 
      )
  }
}


export default Modal; 
