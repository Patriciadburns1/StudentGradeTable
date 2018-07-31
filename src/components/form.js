import React, {Component} from 'react'; 

class Form extends Component {

    render(){
        return(
            <form> 
                <div>
                    <label> Name </label> 
                <input type='text' placeholder="name" /> 
                </div> 
                <div>
                    <label> Student Course </label> 
                <input type='text' placeholder="course" /> 
                </div> 
                <div>
                    <label> Grade </label> 
                <input type='text' placeholder="grade" /> 
                </div> 
                <button className="btn"> Add Student </button> 
            </form> 
        )
    }
}

export default Form; 