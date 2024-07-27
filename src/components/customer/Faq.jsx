import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { IoIosArrowForward } from "react-icons/io";
import { Box, Stack, useMediaQuery } from '@mui/material';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<IoIosArrowForward sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Faq() {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const isMdScreen = useMediaQuery('(min-width:960px)');
  

  const faqs = [
    {
      "q": "What is a digital business card application?",
      "a": "A digital business card application is a digital tool designed to replace traditional paper business cards by allowing users to create, store, and share their professional contact information digitally. These applications typically offer features such as customizable templates, easy-to-update contact details, support for adding logos or images, and the ability to share cards via email, text, QR codes, or social media platforms."
    },
    {
      "q": "Are digital business cards secure?",
      "a": "Digital business card applications often incorporate security measures such as encryption to protect users' contact information from unauthorized access. However, it's important for users to choose reputable applications and exercise caution when sharing sensitive information digitally."
    },
    {
      "q": "Can digital business cards be used offline?",
      "a": "While digital business cards are primarily designed for online use, some applications offer the option to download and save cards for offline viewing. Additionally, features like QR codes can be scanned offline to instantly retrieve contact information without the need for an internet connection."
    },
    {
      "q": "What are the benefits of using a digital business card application?",
      "a": "There are several benefits to using a digital business card application:\n1. Eco-friendly\n2. Convenience\n3. Enhanced Networking\n4. Analytics\n5. Professionalism"
    },
    {
      "q": "How do I share my business card?",
      "a": "There are multiple ways to share a digital business card. The quickest way to share your digital business card in person is with your QR code. With HiHello you can also send your digital business card to someone via a text message, email, social media."
    },
    {
      "q": "How do I contact customer support, If I have a question or issue?",
      "a": "You can reach our customer support team by emailing contact@buizcard.com or calling our toll-free number. We're here to assist you promptly."
    }
  ];

  return (
    <Stack alignItems={"center"} spacing={6} sx={{py: 6, background: "#fff"}}>
      <Typography variant="h2" sx={{fontWeight: 500, textAlign: "center"}}>Frequently Asked Questions</Typography>
      <Box sx={{px: isMdScreen ? 6: "16px"}}>
        {
          faqs.map((i, idx)=>{
            return (
              <Accordion key={idx} expanded={expanded === `panel${idx}`} onChange={handleChange(`panel${idx}`)} sx={{borderRadius: `${idx===0 ? "16px 16px": "0 0"} ${idx===faqs.length-1 ? "16px 16px": "0 0"}`}}>
                <AccordionSummary aria-controls={`panel${idx}d-content`} id={`panel${idx}d-header`} sx={{borderRadius: `${idx===0 ? "16px 16px": "0 0"} ${idx===faqs.length-1 ? "16px 16px": "0 0"}`, px: 3, py: 1}}>
                  <Typography variant="h5" fontWeight={"500"}>{i.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h5" fontWeight={"500"} sx={{px: 2}}>{i.a}</Typography>
                </AccordionDetails>
              </Accordion>
            )
          })
        }
      </Box>
    </Stack>
  );
}