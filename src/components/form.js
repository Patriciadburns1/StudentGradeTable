import React, { Component } from 'react';
// import firebase from 'firebase'; 
import firebase from '../firebase';
import './assets/css/form.css'


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

        this.setState({
                form: {
                    course: '',
                    grade: '',
                    student: '',
                }
            
        })
    }




    render() {
        const { course, student, grade } = this.state.form;
        
        return (

            <form className="form" onSubmit={this.handleSubmitButton.bind(this)}>
                <div className="input-field"> 
                    {/* <label> Student</label> */}
                    <input type='text' name="student" placeholder="Student" value={student} onChange={this.handleInputChange} />
                </div>
                <div className="input-field">
                    {/* <label> Course </label> */}
                    <input type='text' name="course" placeholder="Course" value={course} onChange={this.handleInputChange} />
                </div>
                <div className="input-field">
                    {/* <label> Grade </label> */}
                    <input type='text' name="grade" placeholder="Grade" value={grade} onChange={this.handleInputChange} />
                </div>
                <button className="btn cyan accent-2"> Add Student </button>
            </form>
        )
    }
}

export default Form; 