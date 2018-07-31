import React, { Component, createContext } from "react";
import firebase from '../firebase';


export const StudentDataContext = createContext();


class StudentData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList:[]
         
        }
    }

    componentDidUpdate() {
        console.log("Our updated state with students", this.state.studentList);
    }


    componentDidMount() {
        firebase.collection('Student Data').onSnapshot(snapshot => {
            console.log("our snapshot", snapshot);
            var studentList = [];
            snapshot.forEach(doc => {
                console.log("doc", doc.data());
                studentList.push(doc.data());
               
            });
            console.log("access to this possible?", this);
            this.setState({
                studentList
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