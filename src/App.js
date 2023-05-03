import React, { useState, useEffect, useCallback, useMemo, useRef, useLayoutEffect } from 'react';
import ReactLoading from 'react-loading';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter';
import { CSSTransition } from 'react-transition-group';
import './App.css';
import { lottieAnimations } from './animations.js';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

// Define an array of social media post templates
const socialMediaPostTemplates = [
  "🚀 Supercharge your marketing with AI-generated ad copy! Here's what I created: [Generated Copy] #AdCopyGenius",
  "✨ Unlock your marketing potential with AI! Check out the ad copy I crafted with this AI tool: [Generated Copy] #MarketingMagic",
  // ... (add the remaining templates here)
];

// Function to generate social media post text based on the selected template and generated copy
const generateSocialMediaPost = (templateIndex, generatedCopy) => {
  const template = socialMediaPostTemplates[templateIndex];
  return template.replace('[Generated Copy]', generatedCopy);
};

function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState(null);
  const [showForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(null); // New state variable for selected animation
  const [animationData, setAnimationData] = useState(null); // Define state variable for animation data
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [showHeadline, setShowHeadline] = useState(true);

  // Define a state variable to store the selected social media post template index
  const [selectedTemplateIndex] = useState(0);
  
  // Use the generateSocialMediaPost function to set the text for the social sharing buttons
  const socialMediaPostText = generateSocialMediaPost(selectedTemplateIndex, generatedText);
    
  // Define the ref at the top of the component
  const outputContainerRef = useRef(null);

  // Use the useLayoutEffect hook to detect changes to the generatedText state
  useLayoutEffect(() => {
    if (generatedText && outputContainerRef.current) {
      outputContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedText]);

const messages = useMemo(() => [
    "🎩🎶🔮 Sit tight, ad aficionados! Our AI is busy channeling the spirit of Stefan Georgi, concocting copy that's catchier than a jingle, punchier than a prizefighter, and more persuasive than a hypnotist with a megaphone. It's loading, it's loading, it's... almost a marketing masterpiece!",
    "☕🎨🐆 Keep calm, commerce connoisseurs! Our AI is brewing a blend of Mario Casteli's wit, Luke Iha's flair, and a dash of absurdity that would make Salvador Dalí do a double-take. Your ad copy delight is loading faster than a cheetah on roller skates, and it's... voilà!",
    "⏳🎣🎬 Patience, marketing maestros! Our AI is invoking the goldfingers of Stefan Georgi, crafting hooks that'll reel in leads like a fisherman on a caffeine binge, and landing a whopper of an offer. It's an advertising adventure that's loading faster than you can say 'But wait, there's more!' And... action!",
    "🐎🎪💰 Hold your horses, sales savants! Our AI is becoming the Mario Casteli of persuasion, spinning tales taller than the Empire State, dazzling with desire, and unveiling a spectacle that's part circus, part sales pitch, and all profit. It's showtime, folks—your captivating copy is loading, and... ta-da!",
    "📺❄️💎 Stay tuned, ad enthusiasts! Our AI is channeling Luke Iha, devising propositions as unique as a snowflake in the Sahara, amplifying allure to absurd levels, and unveiling an ad copy gem that's more polished than a diamond in a tuxedo. Your marketing marvel is loading, and... drumroll, please!",
    "🎩🍽️🥧 Brace yourselves, ad virtuosos! Our AI is donning the hat of Stefan Georgi, concocting headlines catchier than a pop song chorus, sprinkling wordplay wittier than a pun-filled pie, and delivering a direct-response delicacy that's tastier than a five-star feast. It's cookin', it's sizzlin', it's... bon appétit!",
    "🧙‍♂️🔮✨ Stay put, marketing magicians! Our AI is summoning the sorcery of Mario Casteli, weaving a spell of salesmanship, conjuring up copy that's as compelling as a hypnotic hex, and unveiling an ad that's more enchanting than a wizard's wand. It's brewing, it's bubbling, it's... presto!",
    "🎡🥧🚀 Keep your cool, copywriting connoisseurs! Our AI is channeling the charm of Luke Iha, crafting triggers that'll trip your curiosity, tickle your fancy, and tantalize your taste for tantalizing text. It's a copywriting carnival that's loading faster than a Ferris wheel on rocket fuel, and... whee!",
    "🕺🕶️🎉 Sit back, advertising aficionados! Our AI is invoking the ingenuity of Stefan Georgi, penning prose punchier than a kangaroo with a keyboard, and delivering a direct-response dynamo that's as dazzling as a disco ball in a dance-off. It's spinning, it's shining, it's... boogie time!",
  // You can access individual messages using the array index, e.g., loadingMessages[0] for the first message.
  
], []);
  
const [showLogo, setShowLogo] = useState(true);

  // Wrap the definition of selectRandomMessage in useCallback
    const selectRandomMessage = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setAnimatedMessage(messages[randomIndex]);
  }, [messages]);

useEffect(() => {
  const logoContainer = document.getElementById('logo-container');
  if (logoContainer) {
    logoContainer.style.display = showLogo ? 'block' : 'none';
  }
}, [showLogo]);

useEffect(() => {
  if (selectedAnimation) {
    fetch(selectedAnimation)
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error('Error fetching Lottie animation:', error));
  }
}, [selectedAnimation]);

  // Define an array of animation types
const animationTypes = ['spin', 'bubbles', 'cylon', 'bars'];

// Function to randomly select an animation type
const getRandomAnimationType = () => {
  const randomIndex = Math.floor(Math.random() * animationTypes.length);
  return animationTypes[randomIndex];
};

// const getRandomMessage = () => {
//  const randomIndex = Math.floor(Math.random() * messages.length);
//  return messages[randomIndex];
// };

// const [animatedMessage, setAnimatedMessage] = useState(getRandomMessage());

const [animatedMessage, setAnimatedMessage] = useState('');

const handleSubmit = async (event) => {
  event.preventDefault();
  setError(null);
  setGeneratedText('');
  setIsFormLoading(true); // Set isFormLoading to true when loading starts
  setShowHeadline(false); // Hide the headline when the "Generate Copy" button is clicked
  setLoading(true);
  setShowLogo(false); // Hide the logo when the "Generate Copy" button is clicked
  selectRandomMessage(); // Call the function to select a random message
  setLoading(true);

  // Randomly select a Lottie animation from the array
  const randomIndex = Math.floor(Math.random() * lottieAnimations.length);
  const selectedAnimation = lottieAnimations[randomIndex];

  // Set the selected animation URL to the state variable
  setSelectedAnimation(selectedAnimation);

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  console.log('Collected form data:', data);
  const selectedTemplate = formData.get('selectedTemplate');
  const selectedLanguageModel = formData.get('languageModel');
  data['selectedTemplate'] = selectedTemplate;
  data['languageModel'] = selectedLanguageModel;
  try {
    // Get the port number from the environment variable or use a default value
     const port = process.env.PORT || 8080;

    // Use the port number in the API URL
     const apiUrl = port === 8080 ? 'http://127.0.0.1:8080/generate' : `https://api.freeadcopy.xyz/generate`;
    // const apiUrl = 'https://backend-api-acn7yotvaa-uc.a.run.app/generate';

     const response = await fetch(apiUrl, {
    // const response = await fetch('https://backend-api-acn7yotvaa-uc.a.run.app/generate', { // Production
    // const response = await fetch('http://127.0.0.1:8080/generate', { // Local testing

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let errorMessage = await response.text();
      errorMessage = errorMessage || `Server responded with status ${response.status}`;
      throw new Error(errorMessage);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Server response is not JSON. Content-Type:', contentType, 'Response body:', await response.text());
      throw new Error('Server response is not JSON');
    }
    const result = await response.json();
    setGeneratedText(result.generated_copy);

    // Scroll to the output container using its id
    const outputContainer = document.getElementById('outputContainer');
    if (outputContainer) {
      window.scrollTo({
        top: outputContainer.offsetTop,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error('Error generating copy:', error);
    setError(`Error generating copy: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Update the animatedMessage based on the current message index
useEffect(() => {
  setAnimatedMessage(messages[currentMessageIndex]);
}, [currentMessageIndex, messages]);

const handleDone = useCallback(() => {
    const nextIndex = (currentMessageIndex + 1) % messages.length;
    setCurrentMessageIndex(nextIndex);
    setAnimatedMessage(messages[nextIndex]);
  }, [currentMessageIndex, messages]);
  
  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div>
{showForm && (
  <>
   <Typography
  variant="h3"
  align="center"
  gutterBottom
  sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '2.3rem' }}
  className={!showHeadline ? 'headline-fade-out' : ''}
>
Meet the Free Ad Copy Generator: an AI that will write better ads than your entire marketing team
</Typography>
<Typography
  variant="body1" // Use a different variant for the paragraph text
  align="center"
  gutterBottom
  sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '1.1rem' }} // Adjust the font size and other styles as needed
  className={!showHeadline ? 'headline-fade-out' : ''}
>
  Artificial intelligence fine-tuned with over $1BN in copywriting experience built by some of the world's highest paid direct-response copywriters in the game.
</Typography>
<form
  noValidate
  autoComplete="off"
  onSubmit={handleSubmit}
  style={{
    opacity: loading ? 0.1 : 0.9, // Set opacity based on loading state
    transition: 'opacity 10s ease-in-out', // Optional: Add transition for smooth fading effect
  }}
  className={isFormLoading ? 'form-loading' : ''}
>
<center>
<FormControl component="fieldset" sx={{ marginBottom: 2 }}>
<RadioGroup row defaultValue="gpt-4" name="languageModel">
<FormControlLabel value="gpt-4" control={<Radio />} label="GPT-4" />
<FormControlLabel value="gpt-3.5-turbo" control={<Radio />} label="GPT-3.5 Turbo" />
<FormControlLabel value="claude-v1.3" control={<Radio />} label="Claude v1.3" />
</RadioGroup>
</FormControl>
</center>
<FormControl variant="outlined" sx={{ marginBottom: 2, width: '100%', '& .MuiSelect-select': { color: '#FD7E14', backgroundColor: '#E6F9E6' } }}>
<InputLabel>Type of Copy</InputLabel>
<Select defaultValue="" label="Type of Copy" name="selectedTemplate">
<MenuItem value="email-template-1">Outcome-Focused Unique Solution Email Template 1</MenuItem>
<MenuItem value="email-template-2">Emotional Impact Solution Email Template 2</MenuItem>
<MenuItem value="email-template-3">Niche Expertise Myth-Busting Email Template 3</MenuItem>
</Select>
</FormControl>
<Grid container spacing={2} direction="column">
<Grid item>
<TextField label="What is your target market?" name="targetMarket" fullWidth placeholder="e.g., Overweight women over 45; Busy working professionals; Parents with young children" multiline

sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
</Grid>
<Grid item>
<TextField label="What problem are you aiming to solve?" name="problemToSolve" fullWidth placeholder="e.g., Helping women melt stubborn fat; Assisting professionals in managing stress" multiline

sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
</Grid>
<Grid item>
<TextField label="What are some common but disliked solutions?" name="dislikedSolutions" fullWidth placeholder="e.g., Keto, cardio, restrictive dieting; Meditation apps, long vacations" multiline

sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
</Grid>
<Grid item>
<TextField label="Can you describe your unique solution?" name="uniqueSolution" fullWidth placeholder="e.g., A Caribbean tropical cocktail that melts stubborn fat; A 10-minute stress relief program; Kid-friendly nutritious meal plans"
multiline
sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
</Grid>
<Grid item>
<TextField label="How does your unique solution work?" name="solutionMechanism" fullWidth placeholder="e.g., Reactivating key fat-burning hormones; Implementing quick mindfulness techniques; Providing balanced and tasty recipes"
multiline
sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
</Grid>
<Grid item>
<TextField label="What credibility or research supports the effectiveness?" name="credibility" fullWidth placeholder="e.g., Ingredients backed by Harvard research; Endorsed by mental health experts; Approved by registered dietitians"
multiline
sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
</Grid>
<Grid item>
<TextField
label="Have you gathered any testimonials? (copy and paste here)"
placeholder="e.g., Stories of significant weight loss; Testimonials of reduced stress levels; Parents sharing their children's improved eating habits"
fullWidth
multiline
sx={{ '& textarea::placeholder': { fontSize: 12 } }}
/>
</Grid>
<Grid item>

<Button
  variant="contained"
  color="primary"
  type="submit"
  fullWidth
  disabled={loading}
  onClick={() => {
    setShowLogo(false);
    // Additional code for onClick event handler (if any)
  }}
  sx={{
    fontSize: '24px', // Increase the font size
    padding: '16px', // Increase the padding
    height: '60px', // Set a specific height for the button
    background: 'linear-gradient(90deg, #DC3545 25%, #FABBC0 50%, #DC3545 75%)',
    backgroundSize: '200% 100%',
  }}
  className={loading ? 'button-fade-out' : ''}
>
  {loading ? (
    // Wrap the loading animation with CSSTransition for the zoom effect
    <CSSTransition
      in={loading}
      timeout={300}
      classNames="zoom"
      unmountOnExit
    >
      <div>
        {/* Display the loading animation with a randomly selected type */}
        <ReactLoading type={getRandomAnimationType()} color="#FFF9D6" height={50} width={50} />
      </div>
    </CSSTransition>
  ) : (
    'Generate Copy'
  )}
</Button>
</Grid>
</Grid>
</form>
</>

)}
{loading && selectedAnimation && (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Modify this line
      marginTop: '0px', // Add marginTop to push the typing message lower on the screen
    }}
  >
    <Lottie
      animationData={animationData}
      loop={true}
      autoPlay={true}
      style={{ width: '40%', height: '40%' }}
    />
     <Typography
      variant="h6"
      align="center"
      gutterBottom
      sx={{        
          fontFamily: 'Raleway, sans-serif',
          fontSize: '22px',
          color: '#8B4513',
      }}
    >
    <Typewriter
        words={[animatedMessage]}
        loop={false}
        cursor
        cursorStyle="_"
        typeSpeed={50}
        deleteSpeed={0}
        delaySpeed={6000}
        onDone={handleDone}
      />
    </Typography>
  </div>
)}

{error && (
<Typography variant="body1" align="center" color="error" gutterBottom>
{error}
</Typography>
)}
{generatedText && (
  <div ref={outputContainerRef}>
    <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '30px' }}>
    Your Generated Copy:
    </Typography>
    <div className="social-sharing-container">
          {/* Social sharing buttons go here */}
          <FacebookShareButton url="https://frontend-app-acn7yotvaa-uc.a.run.app/" quote={socialMediaPostText}>
            <FontAwesomeIcon icon={faFacebookF} />
          </FacebookShareButton>
          <TwitterShareButton url="https://frontend-app-acn7yotvaa-uc.a.run.app/" title={socialMediaPostText}>
            <FontAwesomeIcon icon={faTwitter} />
          </TwitterShareButton>
          <LinkedinShareButton url="https://frontend-app-acn7yotvaa-uc.a.run.app/" summary={socialMediaPostText}>
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
)}
</div>
</Container>
);
}

export default App;