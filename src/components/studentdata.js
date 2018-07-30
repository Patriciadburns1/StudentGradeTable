import React, { Component, createContext } from "react";
// import axios from 'axios';


export const StudentDataContext = createContext();


class StudentData extends Component {
    constructor(props){
        super(props); 
            this.state = {
                student: ''
            }
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