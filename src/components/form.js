import React, { Component } from 'react';
// import firebase from 'firebase'; 
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';
import './assets/css/form.css';


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            form: {
                course: '',
                grade: '',
                student: '',
            },
            courseCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: false,
            },
            studentCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: false,
            },
            gradeCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: false,
            },
           
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }

    handleInputChange(event) {
        // const regexCourse = /^[a-zA-Z]{1,10}$/; 
        const regexCourse=/\b(Math|Science|Art|History)\b/; 
        const regexStudent = /^[a-zA-Z]{1,10}$/; 
        const regexGrade = /^[1-9]?[0-9]{1}$|^100$/;
        const { value, name } = event.target;
        const { form } = this.state;
        form[name] = value;

        if(name === 'student'){
            if (regexStudent.test(value)) {
                this.setState({
                    form: { ...form },
                    
                    studentCheck: {
                        msg: "Valid Name",
                        msgClass: "regularMsg",
                        valid: true,
                    }
                });
            } else {
                this.setState({
                    form: { ...form },
                    
                    studentCheck: {
                        msg: "Invalid Name",
                        msgClass: "warning",
                        valid: false,
                    }
                })
            }
        } 
        else if(name === 'course'){
            if (regexCourse.test(value)) {
                this.setState({
                    form: { ...form },
                    
                    courseCheck: {
                        msg: "Math|Science|Art|History",
                        msgClass: "regularMsg",
                        valid: true,
                    }
                },);
            } else {
                this.setState({
                    form: { ...form },
                    
                    courseCheck: {
                        msg: "choose Math|Science|Art|History",
                        msgClass: "warning",
                        valid: false,
                    }
                })
            }         
        } 
        else if(name === 'grade'){
            if (regexGrade.test(value)) {
                this.setState({
                    
                    form: { ...form },
                    gradeCheck: {
                        msg: "Valid Grade",
                        msgClass: "regularMsg",
                        valid: true,
                    },
                });
            }
            else {
                this.setState({
                    form: { ...form },
                    
                    gradeCheck: {
                        msg: "Enter a # between 0-100",
                        msgClass: "warning",
                        valid: false,
                    },
                }) 
            }

        }

    

    }

    handleSubmitButton(e, context) {
        e.preventDefault();
        const { course, student, grade } = this.state.form;
        if(this.state.courseCheck.valid === false || this.state.studentCheck.valid === false || this.state.gradeCheck.valid === false){
            return; 
        }
          
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
            },
            courseCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: false,
            },
            studentCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: false,
            },
            gradeCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: false,
            },

        })
    }

    fetchData(context) {
        context.fetchStudentData();
    }



    render() {
        const { course, student, grade } = this.state.form;

        return(
            <StudentDataContext.Consumer>{(context)=>(
                <form className="form" onSubmit={(event) => {
                    this.handleSubmitButton.call(this, event);
                    this.fetchData(context);
                }}>
                    <div className="input-field">
                        <input type='text' name="student" placeholder="Student" value={student} onChange={this.handleInputChange} />
                        { this.state.studentCheck.msg ? <div className={this.state.studentCheck.msgClass}>{this.state.studentCheck.msg}</div> : null}
                    </div>
                    <div className="input-field">
                        <input type='text' name="course" placeholder="Course" value={course} onChange={this.handleInputChange} />
                        { this.state.courseCheck.msg ? <div className={this.state.courseCheck.msgClass}>{this.state.courseCheck.msg}</div> : null}   
                    </div>
                    <div className="input-field">
                        <input type='text' name="grade" placeholder="Grade" value={grade} onChange={this.handleInputChange} />
                        { this.state.gradeCheck.msg ? <div className={this.state.gradeCheck.msgClass}>{this.state.gradeCheck.msg}</div> : null}
                    </div>
                    <button className="btn cyan accent-2"> Add Student </button>
                </form>
            )}
            </StudentDataContext.Consumer> 
        )
        
    }
}

export default Form; 