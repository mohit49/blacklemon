import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Container } from '@mui/material';
import Button from "../uielement/Button";
import { setCookie } from "../util/cookieUtils";

function Tnc({ onAccept, isLandingPage = false }) {
  const [check, SetChecked] = useState(false);
  const navigate = useNavigate();

  function changeCheck() {
    SetChecked(!check);
  }

  const handleAccept = () => {
    if (check) {
      // Store TNC acceptance in cookie (expires in 1 year)
      setCookie('tncAccepted', 'true', 365);
      
      // If on landing page, call the callback to stay on landing page
      if (isLandingPage && onAccept) {
        onAccept();
      } else {
        // Otherwise, redirect to login
        navigate('/login');
      }
    }
  };

 

  return (
    <div className="login-singup-page">
      <Container className='login-singup-page-container' maxWidth="lg">
      <Box sx={{ mt: 8}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms And Conditions
        </Typography>
        <div className='flex flex-col gap-3 text-[#ffffff] leading-8'> 
        <p className='text-[#ffffff]'>
        1. Trial Project: The Darkpulse project is a trial initiative that utilizes the Darkpulse Token as a means to access the platform and its features. By participating, you acknowledge that this is an experimental project.
</p>
<p>
2. Access and Use Only: The Darkpulse Token should not be construed as an investment. It serves solely as a token for accessing the Darkpulse platform and its associated functionalities.
</p>
<p>
3. Team Rights: The Darkpulse AI team reserves the right to exit the project at any time without any liability to holders of the Darkpulse AI Token. Participants acknowledge this condition by engaging with the token.
</p>
<p>
4. No Solicitation to Purchase: The Darkpulse AI team has never solicited or encouraged any individuals to purchase the Darkpulse AI Token. Participation is voluntary and at the individual’s discretion.
</p>
<p>
5. No Tokens Held by Team: The Darkpulse AI team does not hold any tokens in their possession, ensuring that all transactions and holdings are managed independently by token holders.
</p>
<p>
  
6. Accredited Investors: By purchasing the Darkpulse AI Token, you confirm that you are an accredited investor and fully understand the risks outlined in these terms.
</p>
<p>
By engaging with the Darkpulse AI Token, you agree to these terms and acknowledge your understanding of the inherent risks. Always conduct your own research before participating in any project.
        </p>
        <p className='flex flex-row gap-2 items-center'>
          <input type='checkbox' onChange={changeCheck} className='w-[20px] h-[20px]'/> <p>Accept Terms And Conditions</p>
        </p>
        {check && <div style={{ marginTop: '20px' }}>
          <Button 
            buttonType="button"
            handler={handleAccept}
            className="default-btn login-btn"
          >
            {isLandingPage ? 'Continue To Website' : 'Continue To Login'}
          </Button>
        </div>}
        </div>
      </Box>
    </Container>
    </div>
  );
}

export default Tnc;