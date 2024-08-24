import { Avatar, Box, Stack, Typography } from '@mui/material'
import React from 'react'
import MainCard from '../../components/MainCard';
import { StarFilled } from '@ant-design/icons';

function Testimonials({ reviews }) {

  return (
    <Box sx={{ my: 6, px: "16px", textAlign: "center" }}>
      <Typography variant="h2" sx={{ fontWeight: 500, mb: 3 }}>Customer Reviews</Typography>

      {/* Horizontal Scroller */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          '&::-webkit-scrollbar': { display: 'none' }, // hides the scrollbar
          scrollSnapType: 'x mandatory',
          gap: 2
        }}
      >
        {
          reviews.map((i, idx) => {
            return (
              <Box
                key={idx}
                sx={{
                  flex: '0 0 300px',
                  scrollSnapAlign: 'start'
                }}
              >
                <MainCard sx={{ height: '100%' }}>
                  <Stack spacing={2} sx={{ height: '100%' }}>
                    <Stack spacing={2} direction={"row"} justifyContent={"center"}>
                      {[1, 2, 3, 4, 5].map((e, starIdx) => (
                        <StarFilled key={starIdx} style={{ color: "orange" }} />
                      ))}
                    </Stack>
                    <Box sx={{ height: "140px", padding: "16px" }}>
                      <Typography variant='h5' fontWeight={500} textAlign={"center"}>
                        {`"${i.comment}"`}
                      </Typography>
                    </Box>
                    <Stack alignItems={"center"}>
                      <Avatar src={i.user.picture} />
                      <Typography sx={{ mt: 2 }}>{i.user.name}</Typography>
                      <Typography variant="body2">
                        {i.user.addresses[0].address} {i.user.addresses[0].pincode}
                      </Typography>
                    </Stack>
                  </Stack>
                </MainCard>
              </Box>
            )
          })
        }
      </Box>
    </Box>
  )
}

export default Testimonials
