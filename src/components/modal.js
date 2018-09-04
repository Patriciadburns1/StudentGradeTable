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
    var id = studentList[deleteIndex].id; 

    firebase.collection('Student Data').doc(id).delete().then(function (id) {
        console.log("this was deleted ", id);
    })
        .catch(function (error) {
            console.error("Error adding document: ", error);
    });
    context.closeModal(); 
    }

  render(){
      return(
        <StudentDataContext.Consumer >{(context)=>(
            <div className="modalShadow">
                <div className="modalBody"> 
                    <h3 className="center modalText"> Are you sure you want to delete this ? </h3> 
                <div className="center buttonsForModal">
                    <div> 
                        <button className="center btn cyan darken-4" onClick={this.deleteData.bind(this,context,context.deleteIndex)}> 
                        Confirm </button>
                    </div> 
                    <div> 
                        <button className="cancel center btn cyan accent-2" onClick={ ()=> {context.closeModal(context)}} > Cancel </button>
                    </div> 
                </div>
                </div> 
            </div> 
          )
        }
     </StudentDataContext.Consumer> 
      )
  }
}


export default Modal; 
