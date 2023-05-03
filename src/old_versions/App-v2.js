import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ReactLoading from 'react-loading';
import Lottie from 'lottie-react';
import { Typewriter } from 'react-simple-typewriter';
import { CSSTransition } from 'react-transition-group';
import './App.css';

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

function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState(null); // New state variable for selected animation
  const [animationData, setAnimationData] = useState(null); // Define state variable for animation data
  
  // Define an array of externally hosted Lottie animations
  const lottieAnimations = [
  'https://assets8.lottiefiles.com/packages/lf20_6e0qqtpa.json',
  'https://assets9.lottiefiles.com/packages/lf20_eblvmw2t.json',
  'https://assets6.lottiefiles.com/temp/lf20_CP7ooz.json',
  'https://assets9.lottiefiles.com/packages/lf20_tukmjwi7.json',
  'https://assets5.lottiefiles.com/packages/lf20_ZHSCPS.json',
  'https://assets8.lottiefiles.com/packages/lf20_xh83pj1c.json',
  'https://assets1.lottiefiles.com/private_files/lf30_rg5wrsf4.json',
  'https://assets6.lottiefiles.com/packages/lf20_DVSwGQ.json',
  'https://assets5.lottiefiles.com/packages/lf20_uwR49r.json',
  'https://lottie.host/241ba9a1-bb9d-49a3-92db-43a422936e25/olp98lVcPc.json',
  'https://assets5.lottiefiles.com/datafiles/nT4vnUFY9yay7QI/data.json',
  'https://assets3.lottiefiles.com/packages/lf20_x62chJ.json',
  'https://assets1.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json',
  'https://assets2.lottiefiles.com/packages/lf20_0pivjQFVZl.json',
  'https://assets2.lottiefiles.com/packages/lf20_C67qsN3hAk.json',
  'https://assets2.lottiefiles.com/packages/lf20_AC7l57omdL.json',
  'https://assets5.lottiefiles.com/packages/lf20_LkDPTg5jar.json',
  'https://assets2.lottiefiles.com/packages/lf20_5lTxAupekw.json',
  'https://assets10.lottiefiles.com/datafiles/qm9uaAEoe13l3eQ/data.json',
  'https://assets2.lottiefiles.com/datafiles/bNwYPnjv3OdFA5w/data.json',
  'https://assets6.lottiefiles.com/packages/lf20_p8bfn5to.json',
  'https://assets1.lottiefiles.com/packages/lf20_usmfx6bp.json',
  'https://assets4.lottiefiles.com/datafiles/67bae0ddb57b26679d10e9ce7c1d445f/data.json',
  'https://assets2.lottiefiles.com/datafiles/wOw9bxX1twk6Q1a/data.json',
  'https://assets10.lottiefiles.com/packages/lf20_a2chheio.json',
  'https://assets6.lottiefiles.com/datafiles/cb81834f3b75c3d2aba9d8a58ad1f408/AE_JSON/loader1.json',
  'https://assets4.lottiefiles.com/datafiles/WKqC5QWz9GiZnlm/data.json',
  'https://assets2.lottiefiles.com/datafiles/OisWNdtMtC7TR1b/data.json',
  'https://assets10.lottiefiles.com/datafiles/kRbrlEbvgAezJ8q/data.json',
  'https://assets6.lottiefiles.com/packages/lf20_b88nh30c.json',
  'https://assets10.lottiefiles.com/datafiles/lMHl0obBNN9kCUE/data.json',
  'https://assets7.lottiefiles.com/datafiles/40aX5db74VvGPWw/data.json',
  'https://assets10.lottiefiles.com/datafiles/Qmze6foNYQLQGCK/data.json',
  'https://assets1.lottiefiles.com/datafiles/rFr1le9E8lhiQjf/data.json',
  'https://assets4.lottiefiles.com/datafiles/aba45c7b75d547282b2dbdc97969412b/progress_bar.json',
  'https://assets9.lottiefiles.com/datafiles/ogIQ10UnwnKiBZS/data.json',
  'https://assets5.lottiefiles.com/packages/lf20_tr1pjkop.json',
  'https://assets7.lottiefiles.com/packages/lf20_IJpMIV0zMj.json',
  'https://assets3.lottiefiles.com/packages/lf20_mv7XEWVcaw.json',
  'https://assets1.lottiefiles.com/packages/lf20_nPrVk1FN5v.json',
  'https://assets2.lottiefiles.com/packages/lf20_SUCORZjSjz.json',
  'https://assets5.lottiefiles.com/packages/lf20_64mLhNnlBg.json',
  'https://assets6.lottiefiles.com/packages/lf20_h6sknf55.json',
];

const messages = useMemo(() => [
  "📚 Copywriting 101: Always keep 'em guessing. Just like this loading screen—what's it gonna do next?!",
  "🎩 Doffing my hat to the greats—Ogilvy, Halbert, and Schwartz. They taught me everything I know, except how to load faster.",
  "🎯 Aiming for a bullseye in copywriting. If I miss, we'll just call it 'strategic testing.'",
  "🎲 Rolling the dice on creativity. Hoping for a natural 20, but I'll settle for not crashing the software.",
  "🛸 Abducting ideas from the creative cosmos. They're out of this world, and they promise not to probe.",
  "🤔 Writer's block? Never fear! I've got a secret weapon: caffeine and a looming deadline.",
  "🦉 Channeling the wisdom of ancient copywriters. They wrote on stone tablets, but their CTAs still rock!",
  "🥊 In the red corner, it's the dreaded blank page. In the blue corner, it's me, the heavyweight champion of words!",
  "🔮 Gazing into the crystal ball of marketing trends. It says the future is bright—and full of upsells.",
  "📚 Studying the copywriting greats. They say imitation is the sincerest form of flattery, so, uh, thanks for the swipe file!",
  "🧪 Mixing up a marketing elixir that'll cure your conversion woes. Side effects may include wild success and a sudden urge to high-five.",
  "🕵️‍♂️ On a covert mission to swipe the best headlines. Don't worry, we'll leave no trace—just a trail of jaw-dropping copy.",
  "🎤 Dropping punchlines like a stand-up comic, but for copywriting. Get ready to laugh all the way to the bank!",
  "🦹‍♂️ Unleashing my copywriting superpowers. With great persuasion comes great responsibility—and killer results.",
  "🎉 Throwing a copywriting fiesta, and you're invited! Grab your maracas, and let's dance to the rhythm of rising revenue.",
  "🧞‍♂️ Your wish is my command, oh marketing master. Three wishes? Nah, just one—to craft copy that converts like magic!",
  "🤖 Activating copywriting robot mode. Beep boop, converting humans to customers. Don't worry, I come in peace... and profits!",
  "🕶️ Channeling my inner Hemingway, sans the beard and the booze. Don't worry, I'll leave out the existential angst. But if this copy doesn't convert, I'm moving to Key West and opening a daiquiri bar. Hemingway style, baby! Minus the cats. Maybe.",
  "🦉 Summoning the wise old wordsmiths. They're old-school, but they've got game. We're talking Claude Hopkins, John Caples, and the whole Mad Men crew. Who needs digital marketing when you've got these legends on speed dial? Dial-up, that is.",
  "🥊 Going toe-to-toe with the muse. It's a creative showdown for the ages. In this corner, we have the reigning champ, the wordsmith wonder, the sultan of syntax! And in the other corner, the muse--wait, where'd she go? Muses, am I right? So fickle!", 
  "🧙‍♂️ Channeling the spirit of Robert Collier. He's telling me the letter is still going strong. Who am I to argue with a legend? Let's pen a sales letter for the ages, one that'll make even the greats tip their hats. Abracadabra, let's write!",
  
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
    // setShowForm(false); // Hide the form and headline
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
        // const response = await fetch('https://backend-api-acn7yotvaa-uc.a.run.app/generate', { // Production
        const response = await fetch('http://127.0.0.1:8080/generate', { // Local testing
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
{showForm && (
  <>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '2.6rem' }}>

Write Killer Ad Copy<br></br> in 60 Seconds with AI.
</Typography>
<form noValidate autoComplete="off" onSubmit={handleSubmit}>
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
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }}
  >
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
        typeSpeed={100}
        deleteSpeed={0}
        delaySpeed={6000}
        onDone={handleDone}
      />
    </Typography>
    <Lottie
      animationData={animationData}
      loop={true}
      autoPlay={true}
      style={{ width: '40%', height: '40%' }}
    />
   
  </div>
)}

{error && (
<Typography variant="body1" align="center" color="error" gutterBottom>
{error}
</Typography>
)}
 {generatedText && (
      <div>
        <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '30px' }}>
          Generated Text:
        </Typography>
        <div
          style={{
            // Styles for the generated text container
          }}
        >
          {generatedText}
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
          sx={{
            // Styles for the "Back" button
          }}
        >
      Back
    </Button>
  </div>
)}

</Container>
);
}

export default App;