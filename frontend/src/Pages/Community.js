import React, {useState, useEffect} from 'react';
import Header from '../Components/Header';
import { LinearProgress, Box, Grid } from '@mui/material';
import PersonCard from '../Components/PersonCard';
import { API_SERVER } from '../constants';

const Community = () => {
    const current_user = "6464bd9113ad291662bb8976"
    const [loading, setLoading] = useState(false)
    const [community, setCommunity] = useState([])
    useEffect(() => {
        const get_user_community = async () => {
            setLoading(true)


            const user_community = await (await fetch(`${API_SERVER}/users/get-community/${current_user}`)).json()
            
            setCommunity(user_community)
            setLoading(false)
        }
        get_user_community()
    }, [community])

    

    return (
        <div>
            <Header />
            {
                community || loading? (
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={4}
                    >
                        {
                            community.map((person) => 
                                <Grid item key={person._id}>
                                    <PersonCard person={person} page="community"/>
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
        </div>
    )
}

export default Community;
