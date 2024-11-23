import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <div className='footer'>
      <p>Check out my other work or connect with me.</p>
      <div className="socials">
      <GitHubIcon onClick = {() =>window.open("https://github.com/Pratik-Dash", "_blank", "noopener,noreferrer")}/>
      <XIcon onClick = {() =>window.open("https://x.com/Prateek24675372", "_blank", "noopener,noreferrer")}/>
      <LinkedInIcon onClick = {() =>window.open("https://www.linkedin.com/in/iampratikd", "_blank", "noopener,noreferrer")}/>
      </div>
    </div>
  )
}

export default Footer
