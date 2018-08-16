import React, { Component, createContext } from "react";
import firebase from '../firebase';


export const StudentDataContext = createContext();


class StudentData extends Component {
    constructor() {
        super();
        this.state = {
            studentList:[],
            showModal: false,
            deleteIndex: null,
            openModal: this.openModal.bind(this),
            closeModal: this.closeModal.bind(this)
        }
        
    }

    openModal(context, id){
    
        this.setState({
            showModal:true,
            deleteIndex: id
        })
    }

    closeModal(){
        this.setState({
            showModal: false,
            deleteIndex: null
        })
    }

    // componentDidUpdate() {
    //     console.log("Our updated state with students on component did update", this.state.studentList);
    // }


    componentDidMount() {
        firebase.collection('Student Data').onSnapshot(snapshot => {
            var studentList = [];
            snapshot.forEach(((doc, key) => {
                // console.log("doc", doc.data());
                const data = doc.data();
                data.id = doc.id;
                studentList.push(data);
               
            }));
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