"use client"
import React,{Component} from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

class ConvertkitEmailForm  extends Component {
  state={
    email:"",
    message:""
  };

  emailHandler=(e:any)=>{
    let updatedMail= e.target.value;
    this.setState({email:updatedMail})
  }

  subUser=async(e:any)=>{
    e.preventDefault();
    console.log(this.state.email+"has subscribed now!")
    const res=await fetch("/api/email"

    )
  }
  render(){
  return (
    <form className="flex space-x-2" onSubmit={this.subUser}>
        <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" onChange={this.emailHandler}value={this.state.email}/>
        <Button type="submit">Subscribe</Button>
   </form>
  )
}}


export default ConvertkitEmailForm