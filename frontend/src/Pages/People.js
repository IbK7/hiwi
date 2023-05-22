import React, { useEffect, useState } from 'react';
import PersonCard from '../Components/PersonCard';
import { LinearProgress, Box, Grid } from '@mui/material';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { API_SERVER } from '../constants';

const People = () => {

    const [people, setPeople] = useState(null)
    // const current_user = "6464bd9113ad291662bb8976"

    useEffect(() => {
        const fetch_people = async () => {
            const res = await(await fetch(`${API_SERVER}/users/get-all`)).json()
            
            // Remove first user (assuming current user is the first user)
            var arr = res.docs;
            arr.splice(0, 1);

            setPeople(arr)
        }

        fetch_people()
    }, [])

    return (
        <div>
            <Header />
            {
                people ? (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                    >
                        {
                            people.map((person) => 
                                <Grid item key={person._id} lg = {3}>
                                    <PersonCard person={person} page='add'/>
                                </Grid>
                            )
                        }
                    </Grid>
                ):(
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )
            }
            <Footer />
        </div>
    )
}

export default People;
