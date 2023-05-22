import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import '../styles/card.css'
import { deepOrange } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { API_SERVER } from '../constants';

const PersonCard = ({person, page}) => {
    const [initials, setInitials] = useState("");
    
    useEffect(() => {
        let first_initial = person.firstName.charAt(0);
        let last_initial = person.lastName.charAt(0);

        setInitials(first_initial.concat('', last_initial))
    }, [person.firstName, person.lastName])
    
    const add_to_community = async () => {
        const current_user = "6464bd9113ad291662bb8976"
        const body = {
            current_user: current_user,
            new_user: person,
        }
        const res = await (await fetch(`${API_SERVER}/users/add-to-community`, {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(body), 
          })).json()

          if (res.status === 201) {
            alert('User added')
          }
          if(res.status === 403) {
            alert(res.message)
          } 
    }

    const remove_from_community  = async (id_to_remove) => {
        const current_user = "6464bd9113ad291662bb8976"

        const body = {
            current_user: current_user,
            remove_user: id_to_remove
        }
        const res = await (await fetch(`${API_SERVER}/users/remove-from-community`, {
            method: "POST",
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(body), 
          })).json()

          if (res.success) {
            alert('User removed from Community')
          }
    }

    return (
        <div className='card-wrapper'>
            <div className='dp-and-details'>
                <div className='dp'>
                    {
                        person.profile_pic ? (
                            <Avatar 
                            sx ={{width: 70, height: 70}}
                            src={person.profile_pic} />
                        ) : (
                            <Avatar sx = {{bgcolor: deepOrange[300]}}>
                                {initials}
                            </Avatar>
                        )
                    }   
                </div>
                <div className='details'>
                    <div><p><b>{person.firstName} {person.lastName}</b></p></div>
                    <div><p>{person.age} years old</p></div>
                </div>
            </div>
            <div className='skills-interests'>
                <div className='interests'>
                    <p><b>Interests:</b></p>
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    className='row '
                    >
                        {
                            person.interests.map((interest) => 
                                // <div className='row-item'>
                                //     <li><span>{interest}</span></li>
                                // </div>
                                <Grid item className='row-item' key={interest}>
                                    <li><span>{interest}</span></li>
                                </Grid>
                            )
                        }
                    </Grid>
                </div>
                <div className='skills'>
                    <p><b>Skills:</b></p>
                    <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    // className='row'
                    >
                        {
                            person.skills.map((skill) => 
                                <Grid item className='row-item' key = {skill}>
                                    <li><span>{skill}</span></li>
                                </Grid>
                            )
                        }
                    </Grid>
                </div>
            </div>
            <div className={page === 'add' ? 'button-wrapper add-color' : 'button-wrapper remove-color'}>
                {
                    page === "add" ? (
                        <div className='button'
                            onClick={add_to_community}>
                                Add to Community
                        </div>
                    ) : (
                        <div className='button'
                        onClick={() => {remove_from_community(person._id)}}
                        >
                            Remove from Community
                    </div>
                    )
                }
            </div>
        </div>
    )
}

export default PersonCard;
