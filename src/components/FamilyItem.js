import React from 'react'
import {db} from '../firebase'
import { Button } from '@material-ui/core/Button'
import { makeStyles, createStyles } from '@material-ui/core/styles'
// import { Button, ButtonGroup } from "@chakra-ui/react"

const useStyles = makeStyles(() => (
    createStyles ( {
        "button": {
            borderColor: "#FFB549",
            color: "#FFB549",
            fontWeight: 600,
            "&:hover":{
                backgroundColor: "#FFB549",
                color: "#FFF"
            }
        }
    })
))

const FamilyItem = ({id, name, birthday, relation, image}) => {
    const classes = useStyles();

    const deleteInputData = () => {
        db.collection("group").doc(id).delete();
    }

    return (
        <ul>
            <div className="list-row">
                <li className="li-title02">
                    <span className="span-head01">{name}</span>
                    <span className="span-head04">{relation}</span>
                    <span className="span-head02">{birthday}</span>
                    <span><img className="photo" src={image} alt="" /></span>
                    <span className="span-head03"><button onClick={deleteInputData}>削除</button></span>
                    {/* <Button className={classes.button} >あああ</Button> */}
                    {/* <Button colorScheme="blue">Button</Button> */}
                </li>
            </div>        
        </ul>
    )
}

export default FamilyItem
