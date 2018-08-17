import React, { Component, Fragment } from "react";
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowCancel: true, 
            updating: false,
            oldForm: {
                student: this.props.student.student,
                course: this.props.student.course,
                grade: this.props.student.grade
            },
            newForm: {
                student: this.props.student.student,
                course: this.props.student.course,
                grade: this.props.student.grade
            },
            courseCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: true,
            },
            studentCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: true,
            },
            gradeCheck: {
                msg: "",
                msgClass: "regularMsg",
                valid: true,
            },

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
        this.handleClickforDeleteButton = this.handleClickforDeleteButton.bind(this); 
    }

    updateData(context, index) {
        this.setState({
            updating: true,
            newForm: {
                ...this.state.oldForm
            }
        });
        
    }


    handleInputChange(event) {
        const regexCourse=/\b(Math|Science|Art|History)\b/; 
        const regexStudent = /^[a-zA-Z]{1,10}$/; 
        const regexGrade = /^[1-9]?[0-9]{1}$|^100$/;
      

        const { value, name } = event.target;
        const { newForm } = this.state;

        newForm[name] = value;

        if(name === 'student'){
            if (regexStudent.test(value)) {
                this.setState({
                    newForm: { ...newForm },
                    
                    studentCheck: {
                        msg: "Valid Name",
                        msgClass: "regularMsg",
                        valid: true,
                    }
                });
            } else {
                this.setState({
                    newForm: { ...newForm },
                    
                    studentCheck: {
                        msg: "Invalid name",
                        msgClass: "warning",
                        valid: false,
                    }
                })
            }
        } 
        else if(name === 'course'){
            if (regexCourse.test(value)) {
                this.setState({
                    newForm: { ...newForm },
                    
                    courseCheck: {
                        msg: "Math | Science |Art | History",
                        msgClass: "regularMsg",
                        valid: true,
                    }
                },);
            } else {
                this.setState({
                    newForm: { ...newForm },
                    
                    courseCheck: {
                        msg: "choose Math | Science| Art| History",
                        msgClass: "warning",
                        valid: false,
                    }
                })
            }         
        } 
        else if(name === 'grade'){
            if (regexGrade.test(value)) {
                this.setState({
                    newForm: { ...newForm },
                    gradeCheck: {
                        msg: "Valid Grade",
                        msgClass: "regularMsg",
                        valid: true,
                    },
                });
            }
            else {
                this.setState({
                    newForm: { ...newForm },
                    
                    gradeCheck: {
                        msg: "Enter a # between 0-100",
                        msgClass: "warning",
                        valid: false,
                    },
                }) 
            }

        }

    }

    handleSubmitButton(context,index) {

        if(this.state.courseCheck.valid === false || this.state.studentCheck.valid === false || this.state.gradeCheck.valid === false){
            return; 
        }
        const { studentList } = context;
        var id = studentList[index].id;

        const { course, student, grade } = this.state.newForm;

        const individualRecord = {
            course: course,
            grade: grade,
            student: student
        }

        firebase.collection('Student Data').doc(id).update(individualRecord).then(function (id) {
            console.log("This was rewritten ", id);
        })
            .catch(function (error) {
                console.error("Error updating the document", error);
            });
        this.setState({
                updating:false
        })

        this.setState({
            oldForm: {
                ...this.state.newForm
            }
        //     newform:{
        //         individualRecord
        //     }
        })

    }

    handleClickforDeleteButton(){
        this.setState({
            allowCancel:false
        })
    }



    cancelChanges(){
        this.setState({
            updating: false,
            newForm: {
                ...this.state.oldForm
            }
        });
    }


    render() {
        const { updating } = this.state;
        const { course, student, grade } = this.state.newForm; 
        debugger;
        if (updating) {
            return (
                <StudentDataContext.Consumer>{(context) => (
                    <tr>
                        <td><input type='text' name="student" value={student} onChange={this.handleInputChange} /> 
                        { this.state.studentCheck.msg ? <div className={this.state.studentCheck.msgClass}>{this.state.studentCheck.msg}</div> : null} 
                        </td>
                        <td><input type='text' name="course" value={course} onChange={this.handleInputChange} />
                        { this.state.courseCheck.msg ? <div className={this.state.courseCheck.msgClass}>{this.state.courseCheck.msg}</div> : null}   
                        </td>
                        <td><input type='text' name="grade" value={grade} onChange={this.handleInputChange} />
                        { this.state.gradeCheck.msg ? <div className={this.state.gradeCheck.msgClass}>{this.state.gradeCheck.msg}</div> : null}
                        </td>
                        <td type="button" className="btn" onClick={this.handleSubmitButton.bind(this, context, this.props.arrayIndex)}> Submit </td>
                        <td type="button" className="btn cyan accent-2" onClick={this.cancelChanges.bind(this)}> Cancel </td>
                    </tr>
                )}
                </StudentDataContext.Consumer>
            )
        }


        return (
          
            <StudentDataContext.Consumer>{(context) => (
                <tr>
                    <td> {this.props.student.student} </td>
                    <td> {this.props.student.course} </td>
                    <td> {this.props.student.grade} </td>
                    <td type="button" className="waves-effect waves-light btn cyan accent-3 col s5 studentButtons" 
                    onClick={this.updateData.bind(this, context, this.props.arrayIndex)}> 
                        <i className="far fa-edit"></i> 
                    </td>
                    <td type="button" className="waves-effect waves-light btn cyan accent-3 col s5 studentButtons" 
                    onClick={()=>context.openModal( context, this.props.arrayIndex)}> 
                        <i className="far fa-trash-alt"></i> 
                    </td>
                </tr>
            )
            }
            </StudentDataContext.Consumer>
        )



    }

}

export default TableRow; 