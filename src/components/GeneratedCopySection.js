// This component is responsible for rendering the generated copy, social sharing buttons, and the "Go back to top" button. The generatedText and outputContainerRef props are passed into this component and are used to display the generated text and handle scrolling, respectively. The social sharing buttons use the react-share library, and the FontAwesome icons are used for the button icons. The "Go back to top" button includes an onClick event handler that scrolls the page to the top when clicked.
import React from 'react';
import { Typography, Button } from '@mui/material';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Lottie from 'lottie-react';

const GeneratedCopySection = ({ generatedText, outputContainerRef, animationData }) => {
  return (
    <div ref={outputContainerRef}>
      {/* Render Lottie animation */}
      {animationData && (
        <Lottie animationData={animationData} style={{ width: 200, height: 200 }} />
      )}
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '30px' }}>
        Your Generated Copy:
      </Typography>
      {/* Social sharing buttons */}
      <div>
        <FacebookShareButton url="https://frontend-app-acn7yotvaa-uc.a.run.app/" quote={generatedText}>
          <FontAwesomeIcon icon={faFacebookF} />
        </FacebookShareButton>

        <TwitterShareButton url="https://frontend-app-acn7yotvaa-uc.a.run.app/" title={generatedText}>
          <FontAwesomeIcon icon={faTwitter} />
        </TwitterShareButton>

        <LinkedinShareButton url="https://frontend-app-acn7yotvaa-uc.a.run.app/" summary={generatedText}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </LinkedinShareButton>
      </div>
      <div
        style={{
          fontFamily: '"Roboto Mono", monospace',
          fontSize: '18px',
          padding: '16px',
          backgroundColor: '#f8f8f8',
          border: '2px solid #ddd',
          borderRadius: '16px',
          whiteSpace: 'pre-wrap',
          textAlign: 'left',
        }}
      >
        {generatedText}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Scroll to the top of the page
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        sx={{
          fontSize: '24px',
          padding: '16px',
          height: '60px',
          background: 'linear-gradient(90deg, #6C3483 25%, #D7BDE2 50%, #6C3483 75%)',
          backgroundSize: '200% 100%',
          marginLeft: '16px', // Add margin to place the button to the side of the generated copy
          marginTop: '16px', // Add margin to position the button a little lower
        }}
      >
        Go back to top
      </Button>
    </div>
  );
};

export default GeneratedCopySection;