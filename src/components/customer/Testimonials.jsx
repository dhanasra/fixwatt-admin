import { Avatar, Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import MainCard from '../../components/MainCard';
import { StarFilled } from '@ant-design/icons';

function Testimonials() {

  const reviews = [
    {
      review: "Love Buizcard. Makes life meeting people a lot easier. It is a magical experience every time I use it.",
      stars: 5,
      by: {
        name: "Justin Khan",
        designation: "Founder of Dwitch",
        picture: "https://firebasestorage.googleapis.com/v0/b/buizcard-spiderlingz.appspot.com/o/avatars%2Favatar1.png?alt=media&token=c642d414-b05c-4882-a3c7-81eba7b62e5d"
      }
    },
    {
      review: "Using Mylingz, helped us generate 35% more revenue from our business relationships and tables last month",
      stars: 5,
      by: {
        name: "Mitch Johnson",
        designation: "CEO of Machoo",
        picture: "https://firebasestorage.googleapis.com/v0/b/buizcard-spiderlingz.appspot.com/o/avatars%2Favatar2.png?alt=media&token=c642d414-b05c-4882-a3c7-81eba7b62e5d"
      }
    },
    {
      review: "As a President, this is a great way to get the word out when someone asks vs having to carry a stack of business links!",
      stars: 5,
      by: {
        name: "Saran Otto",
        designation: "Orhana Foundation",
        picture: "https://firebasestorage.googleapis.com/v0/b/buizcard-spiderlingz.appspot.com/o/avatars%2Favatar3.png?alt=media&token=c642d414-b05c-4882-a3c7-81eba7b62e5d"
      }
    }
  ];

  return (
    <Grid container spacing={2} justifyContent={"center"} sx={{my: 6}} px={"16px"}>
      <Grid item xs={12} sx={{mb: 3}}>
        <Typography variant="h2" sx={{fontWeight: 500, textAlign: "center"}}>Customer Reviews</Typography>
      </Grid>
      {
        reviews.map((i, idx)=>{
          return (
            <Grid key={idx} item xs={12} md={3}>
              <MainCard>
                <Stack>
                  <Stack spacing={2} direction={"row"} justifyContent={"center"}>
                    {
                      [1,2,3,4,5].map((e)=>{
                        return <StarFilled style={{color: "orange"}}/>
                      })
                    }
                  </Stack>
                  <Box sx={{height: "140px", padding: "16px"}}>
                    <Typography variant='h5' fontWeight={500} textAlign={"center"}>{`"${i.review}"`}</Typography>
                  </Box>
                  <Stack
                    alignItems={"center"}
                  >
                    <Avatar src={i.by.picture}/>
                    <Typography sx={{mt: 2}}>{i.by.name}</Typography>
                    <Typography variant="body2">{i.by.designation}</Typography>
                  </Stack>
                </Stack>
              </MainCard>
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default Testimonials