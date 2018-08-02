import React, { Component, Fragment } from "react";
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';
import Form from './form';



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updating: false,
            oldForm: {
                oldStudent: this.props.student.student,
                oldCourse: this.props.student.course,
                oldGrade: this.props.student.grade
            },
            newForm: {
                course: '',
                grade: '',
                student: '',
            }

        }
        this.handleInputChange=this.handleInputChange.bind(this); 
        this.handleSubmitButton=this.handleSubmitButton.bind(this); 

    }

    deleteData(context, index) {
        const { studentList } = context;
        console.log("this is context", context);
        // console.log("This is the  id", studentList[index].id); 
        var id = studentList[index].id;

        firebase.collection('Student Data').doc(id).delete().then(function (id) {
            console.log("this was deleted ", id);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }



    updateData(context, index) {

        this.setState({
            updating: true
        });

        console.log("updating");

        // const{studentList}= context; 

        // var id =studentList[index].id; 

        // firebase.collection('Student Data').doc(id).update().then(function (id) {
        //     console.log("this was updated", id);
        // })
        //     .catch(function (error) {
        //         console.error("this was not updated ", error);
        // });
    }


    handleInputChange(event) {
        const { value, name } = event.target;
        const { newForm } = this.state;

        newForm[name] = value;

        this.setState({
            newForm: { ...newForm },

        })
    }

    handleSubmitButton(e) {
        e.preventDefault();

        const { course, student, grade } = this.state.newForm;
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
        const { updating } = this.state;
        const { course, student, grade } = this.state.newForm;
        const { oldCourse, oldStudent, oldGrade } = this.state.oldForm;

        if (updating) {
            return (
                <tr>
                    <td> <input type='text' name="student" value={student} onChange={this.handleInputChange} /> </td>
                    <td> <input type='text' name="course" value={course} onChange={this.handleInputChange} /> </td>
                    <td>  <input type='text' name="grade" value={grade} onChange={this.handleInputChange} /> </td>
                    <td type="button" className="btn cyan accent-2"> Submit  </td>
                    <td type="button" className="btn cyan accent-2"> Cancel  </td>
                </tr>
            )
        }

        return (
            <StudentDataContext.Consumer>{(context) => (
                <tr>
                    <td> {this.props.student.student} </td>
                    <td> {this.props.student.course} </td>
                    <td> {this.props.student.grade} </td>
                    <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.updateData.bind(this, context, this.props.arrayIndex)}> UPDATE </td>
                    <td type="button" className="waves-effect waves-light btn cyan accent-3" onClick={this.deleteData.bind(this, context, this.props.arrayIndex)}> DELETE </td>
                </tr>
            )
            }
            </StudentDataContext.Consumer>
        )



    }

}

export default TableRow; 