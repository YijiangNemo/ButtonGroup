import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import RadioButtons from './component/RadioButtons'
import CheckboxButtons from './component/Checkbox'
const update = require('immutability-helper'); //A useful library to Mutate a copy of data without changing the original source
type ValidationState = {
  currentInvalid: {[index:number]:Array<number>};
  currentSelected: {[index:number]:Array<string>};
  viewStatus:'radio'|'checkbox'|'mixed';  //control render different view
}

interface ValidList {
    [id: string] : Array<number>
}
interface ValidationProps {
    data: Array<Array<{id:string,value:string}>>;
  invalidRule: ValidList;
}


export default class Controller extends Component<ValidationProps, ValidationState>{
    constructor(props: ValidationProps) {
        super(props);
        this.state = {
            viewStatus:'radio',
            currentInvalid:{1:[],2:[],3:[]},
            currentSelected:{1:[],2:[],3:[]},
        };
    }

  renderButtonGroups(status:string){
        switch(status){
            case 'radio':
                return(this.props.data.map((n,i)=>{

                    return(<div  key={`radio${i}`} style={{marginLeft:i*24,textAlign:'left'}}>

                          <h4>{`Group ${i+1}`}</h4>
                          <RadioButtons  initDisable={i>0?this.state.currentSelected[i].length>0?false:true:false}  getSelected={selected=>{this.updateSelected(i+1,selected)}} invalidList={this.state.currentInvalid}  groupData={n}/>
                         </div>)
                    })
                )
            case 'checkbox':
                return(this.props.data.map((n,i)=>{

                    return(<div key={`checkbox${i}`}  style={{marginLeft:i*24,textAlign:'left'}}>

                          <h4>{`Group ${i+1}`}</h4>
                          <CheckboxButtons initDisable={i>0?this.state.currentSelected[i].length>0?false:true:false}  getSelected={selected=>{this.updateSelected(i+1,selected)}} invalidList={this.state.currentInvalid}  groupData={n}/>
                         </div>)
                    })
                )
            case 'mixed':
                return(this.props.data.map((n,i)=>{
                    if(i==0){
                        return(<div key={`mixed${i}`}  style={{marginLeft:i*24,textAlign:'left'}}>

                          <h4>{`Group ${i+1}`}</h4>
                          <RadioButtons  initDisable={i>0?this.state.currentSelected[i].length>0?false:true:false}  getSelected={selected=>{this.updateSelected(i+1,selected)}} invalidList={this.state.currentInvalid}  groupData={n}/>
                         </div>)
                    }
                    else {
                        return(<div key={`mixed${i}`} style={{marginLeft:i*24,textAlign:'left'}}>

                          <h4>{`Group ${i+1}`}</h4>
                          <CheckboxButtons  initDisable={i>0?this.state.currentSelected[i].length>0?false:true:false} key={i} getSelected={selected=>{this.updateSelected(i+1,selected)}} invalidList={this.state.currentInvalid}  groupData={n}/>
                         </div>)
                    }

                    }
                    )
                )

            default:
                return <p>Unknown</p>

        }
}
  componentDidUpdate(prevProps: Readonly<ValidationProps>, prevState: Readonly<ValidationState>, snapshot?: any): void {
        if(prevState.viewStatus!=this.state.viewStatus){
            this.setState({currentInvalid:{1:[],2:[],3:[]},
            currentSelected:{1:[],2:[],3:[]}})
        }
  }
    updateSelected(index:number,selected:Array<string>){
        // console.log(index,selected)

        this.setState(state=>{
            state.currentSelected[index] = selected
            const curr_inValid = this.getinValid(index)
            state.currentInvalid[index] = curr_inValid
            const result = update(state, {
                   currentInvalid: {[index]:{$set:curr_inValid}},
                   currentSelected:{[index]:{$set:selected}}
              })
            // console.log(result)
            return result
        })
    }
    getinValid(index:number){
        const currentSelected = this.state.currentSelected[index]
        if(currentSelected.length==0){return []}
        let curr_inValid:Array<number> = []
        for (let i in currentSelected) {
            if(this.props.invalidRule[parseInt( currentSelected[i])]) {
                curr_inValid =curr_inValid.concat(this.props.invalidRule[parseInt( currentSelected[i])])}
        }
        // console.log(curr_inValid)
        return curr_inValid
    }
    checkAllcomplete(){
        let complete = true
        for(let i in this.state.currentSelected){
            if(this.state.currentSelected[i].length<=0){
                complete = false
            }
        }
        return complete
    }
  render() {

      return (<div>
           <Button variant="contained" color="primary" onClick={()=>{this.setState({viewStatus:'radio'})}}>Radio Groups</Button>
                  <Button variant="contained" color="primary" onClick={()=>{this.setState({viewStatus:'checkbox'})}}>Checkbox Groups</Button>
                  <Button variant="contained" color="primary" onClick={()=>{this.setState({viewStatus:'mixed'})}}>Mixed</Button>
          {this.renderButtonGroups(this.state.viewStatus)}
        <Button variant="contained" color="primary" disabled={!this.checkAllcomplete()}>Submit</Button>
      </div>)
  }
}