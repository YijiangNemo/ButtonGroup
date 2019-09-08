import React, {FunctionComponent} from 'react';
import Checkbox,{CheckboxProps} from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

interface CheckboxButtonsProps extends CheckboxProps{
    groupData: Array<{id:string,value:string}>; //Data to render the View
    getSelected: getHandler; // Callback function to pass Selected status in current group to Controller
    invalidList: {[index:number]:Array<number>}; //List for current invalid ID
    initDisable: boolean; //Group 2 and 3 will initially disabled
}
type getHandler = (argument: any) => void;
type initState = {
    [propName: string]: any
}
const CheckboxButtons: FunctionComponent<CheckboxButtonsProps> = (props) =>{

     const [state, setState] = React.useState<initState>({})
    const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        let selected = []
        for(let id in state){
            if(state[id]==true && id != name){
                selected.push(id)
            }
        }
        if(event.target.checked){
            selected.push(name)
        }
        props.getSelected(selected)
        setState({ ...state, [name]: event.target.checked });
    };

    function checkValid(id:string){
        let valid = true
        for(let i in props.invalidList){
            const index = props.invalidList[i].lastIndexOf(parseInt(id))
            if(index != -1){
                valid = false
            }
        }
        return valid
    }

    return (  <FormGroup>
            {props.groupData.map(n=>{
                return <FormControlLabel key={n.id}
            control={<Checkbox id={n.id} disabled={props.initDisable?props.initDisable:!checkValid(n.id)} checked={Boolean(state[n.id])} onChange={handleChange(n.id)} value={n.id} />}
            label={n.value}
                />
            })}
            </FormGroup>
);
}

export default CheckboxButtons
