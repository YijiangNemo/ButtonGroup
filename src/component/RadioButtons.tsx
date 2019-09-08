import React, {FunctionComponent} from 'react';
import Radio,{RadioProps} from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
interface RadioButtonProps extends RadioProps{
    groupData: Array<{id:string,value:string}>; //Data to render the View
    getSelected: getHandler; // Callback function to pass Selected status in current group to Controller
    invalidList: {[index:number]:Array<number>}; //List for current invalid ID
    initDisable: boolean; //Group 2 and 3 will initially disabled
}
type getHandler = (argument: any) => void;

const RadioButtons: FunctionComponent<RadioButtonProps> = (props) =>{

    const [value, setValue] = React.useState('');

    function handleChange(event: React.ChangeEvent<unknown>) {
        setValue((event.target as HTMLInputElement).value);
        props.getSelected([(event.target as HTMLInputElement).value])
      }
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
    return ( <RadioGroup

          value={value}
          onChange={handleChange} >
            {props.groupData.map(n=>{
                return <FormControlLabel key={n.id} disabled={props.initDisable?props.initDisable:!checkValid(n.id)} value={n.id} control={<Radio id={n.id} />} label={n.value} />
            })}
            </RadioGroup>
);
}

export default RadioButtons
