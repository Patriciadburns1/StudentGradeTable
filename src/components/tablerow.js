import React, { Component, Fragment } from "react";
import { StudentDataContext } from './studentdata';
import firebase from '../firebase';



class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            }

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
    }

    deleteData(context, index) {
        const { studentList } = context;
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
            updating: true,
            newForm: {
                ...this.state.oldForm
            }
        });

        console.log("updating");
    }


    handleInputChange(event) {
        const { value, name } = event.target;
        const { newForm } = this.state;

        newForm[name] = value;

        this.setState({
            newForm: { ...newForm },

        })
    }

    handleSubmitButton(context,index) {
        // event.preventDefault();

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
            },
        })
    }

    // submitInformationToDataBase(context, id) {
    //     const { studentList } = context;

    //     var id = studentList[index].id;

    //     firebase.collection('Student Data').doc(id).update().then(function (id) {
    //         console.log("this was updated", id);
    //     })
    //         .catch(function (error) {
    //             console.error("this was not updated ", error);
    //         });
    // }

    cancelChanges(){
        console.log("this is the cancel button"); 
        this.setState({
            updating:false
        })
    }


    render() {
        const { updating } = this.state;
        const { course, student, grade } = this.state.newForm;

        if (updating) {
            return (
                <StudentDataContext.Consumer>{(context) => (
                    <tr>
                        <td><input type='text' name="student" value={student} onChange={this.handleInputChange} /> </td>
                        <td><input type='text' name="course" value={course} onChange={this.handleInputChange} /></td>
                        <td><input type='text' name="grade" value={grade} onChange={this.handleInputChange} /></td>
                        <td type="button" className="btn cyan accent-2" onClick={this.handleSubmitButton.bind(this, context, this.props.arrayIndex)}> Submit </td>
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