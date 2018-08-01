import React, { Component } from 'react';
// import firebase from 'firebase'; 
import firebase from '../firebase';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                course: '',
                grade: '',
                student: '',
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        const { form } = this.state;

        form[name] = value;

        this.setState({
            form: { ...form },

        })
    }

    handleSubmitButton(e) {
        e.preventDefault();

        const { course, student, grade } = this.state.form;
        const individualRecord = {
            course: course,
            grade: grade,
            student: student
        }
       
        firebase.collection('Student Data').add(individualRecord).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
        });


    }




    render() {
        const { course, student, grade } = this.state.form;
        
        return (

            <form onSubmit={this.handleSubmitButton.bind(this)}>
                <div>
                    <label> Name </label>
                    <input type='text' name="student" value={student} onChange={this.handleInputChange} />
                </div>
                <div>
                    <label> Student Course </label>
                    <input type='text' name="course" value={course} onChange={this.handleInputChange} />
                </div>
                <div>
                    <label> Grade </label>
                    <input type='text' name="grade" value={grade} onChange={this.handleInputChange} />
                </div>
                <button className="btn cyan accent-2"> Add Student </button>
            </form>
        )
    }
}

export default Form; 