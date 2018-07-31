import React, { Component, createContext } from "react";
// import axios from 'axios';
import firebase from '../firebase';


export const StudentDataContext = createContext();


class StudentData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: '',
            course: '',
            grade: ''
        }
    }


    componentDidMount() {
        firebase.collection('Student Data').onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                console.log("doc", doc.data());
                this.setState({
                    student: doc.data.Student,
                    course: doc.data.Course,
                    grade: doc.data.Grade
                })   
            });
        });

    }

    render() {
    
        return (
            <StudentDataContext.Provider value={this.state}>
                {this.props.children}
            </StudentDataContext.Provider>
        )
    }
}

export default StudentData; 