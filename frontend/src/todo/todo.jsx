import React,{Component} from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const url='http://localhost:3000/api/todos'

export default class Todo extends Component{
    constructor(props){
        super(props)
        this.state={
            description:'',
            list:[]
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleAdd=this.handleAdd.bind(this)
        this.handleRemove=this.handleRemove.bind(this)
        this.handleMarkAsDone=this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending=this.handleMarkAsPending.bind(this)
        this.handleSearch=this.handleSearch.bind(this)

        this.refresh()
    }

    refresh(description=''){
        const search=description ?`&description__regex=/${description}`:''
        axios.get(`${url}?sort=-createdAt${search}`)
            .then(resp=>{
                this.setState({...this.state, description:'', list:resp.data})
                console.log(resp.data)
            })
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleAdd(){    
        const description=this.state.description
        axios.post(url,{description})
            .then(resp=>{
                this.refresh()
            })
    }

   handleRemove(todo){
       axios.delete(`${url}/${todo._id}`)
        .then((resp)=>{
            this.refresh()
        })
   }

   handleMarkAsDone(todo){
       axios.put(`${url}/${todo._id}`,{...todo, done:true})
        .then((resp)=>{
            this.refresh()
        })
   }

   handleMarkAsPending(todo){
       axios.put(`${url}/${todo._id}`,{...todo,done:false})
        .then((resp)=>{
            this.refresh()
        })
   }


    handleChange(e){
        this.setState({...this.state, description:e.target.value})
    }

    render(){
        return(
            <div>
                <PageHeader name="Tarefas" small="Cadastro"/>
                <TodoForm  
                    handleAdd={this.handleAdd} 
                    description={this.state.description} 
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                />
                <TodoList 
                    list={this.state.list} 
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                />
            </div>
        )
    }
}