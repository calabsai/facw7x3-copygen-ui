import React, { useState } from 'react';
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
  CircularProgress,
} from '@mui/material';

function App() {
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set loading state and clear previous error and generated text
    setLoading(true);
    setError(null);
    setGeneratedText('');

    // Collect form data
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Add the selected email template to the data
    const selectedTemplate = formData.get('typeOfCopy');
    data['selectedTemplate'] = selectedTemplate;

    // Make an AJAX request to the server
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Parse the response and update the state
      const result = await response.json();
      setGeneratedText(result.generated_copy);
    } catch (error) {
      console.error('Error generating copy:', error);
      setError('Error generating copy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Poppins, sans-serif', fontSize: '3.2rem' }}>
        Write Killer Ad Copy in 60 Seconds with AI.
      </Typography>
      <center>
        <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
        <RadioGroup row defaultValue="gpt-4" name="languageModel">
          <FormControlLabel value="gpt-4" control={<Radio />} label="GPT-4" />
          <FormControlLabel value="gpt-3.5-turbo" control={<Radio />} label="GPT-3.5 Turbo" />
          <FormControlLabel value="claude-v1.3" control={<Radio />} label="Claude v1.3" />
        </RadioGroup>
        </FormControl>
      </center>
      <FormControl variant="outlined" sx={{ marginBottom: 2, minWidth: 400, '& .MuiSelect-select': { color: '#FD7E14', backgroundColor: '#E6F9E6' } }}>
        <InputLabel>Type of Copy</InputLabel>
        <Select defaultValue="" label="Type of Copy">
          <MenuItem value="email-template-1">Email Template 1</MenuItem>
          <MenuItem value="email-template-2">Email Template 2</MenuItem>
          <MenuItem value="email-template-3">Email Template 3</MenuItem>
        </Select>
      </FormControl>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2} direction="column">
        <Grid item>
      <TextField label="What is your target market?" fullWidth placeholder="e.g., Overweight women over 45; Busy working professionals; Parents with young children" InputProps={{ style: { fontSize: 12 } }} />
    </Grid>
    <Grid item>
      <TextField label="What problem are you aiming to solve?" fullWidth placeholder="e.g., Helping women melt stubborn fat; Assisting professionals in managing stress" InputProps={{ style: { fontSize: 12 } }} />
    </Grid> {/* This closing tag was missing */}
    <Grid item>
      <TextField label="What are some common but disliked solutions?" fullWidth placeholder="e.g., Keto, cardio, restrictive dieting; Meditation apps, long vacations" InputProps={{ style: { fontSize: 12 } }} />
    </Grid>
    <Grid item>
      <TextField label="Can you describe your unique solution?" fullWidth placeholder="e.g., A Caribbean tropical cocktail that melts stubborn fat; A 10-minute stress relief program; Kid-friendly nutritious meal plans"
        multiline
        sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
    </Grid>
    <Grid item>
      <TextField label="How does your unique solution work?" fullWidth placeholder="e.g., Reactivating key fat-burning hormones; Implementing quick mindfulness techniques; Providing balanced and tasty recipes"
        multiline
        sx={{ '& textarea::placeholder': { fontSize: 12 } }} />
    </Grid>
    <Grid item>
      <TextField label="What credibility or research supports the effectiveness?" fullWidth placeholder="e.g., Ingredients backed by Harvard research; Endorsed by mental health experts; Approved by registered dietitians"
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
sx={{
fontSize: '18px',
padding: '12px',
background: 'linear-gradient(90deg, #DC3545 25%, #FABBC0 50%, #DC3545 75%)',
backgroundSize: '200% 100%',
}}
>
{loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Copy'}
</Button>
        </Grid>
        </Grid>
      </form>
      {loading && (
        <Typography variant="body1" align="center" gutterBottom>
        Generating copy, please wait...
        </Typography>
        )}
        {error && (
        <Typography variant="body1" align="center" color="error" gutterBottom>
        {error}
        </Typography>
        )}
        {generatedText && (
        <div>
        <Typography variant="h5" align="center" gutterBottom>
        Generated Text:
        </Typography>
        <Typography variant="body1" align="center">
        {generatedText}
        </Typography>
        </div>
        )}        
    </Container>
  );
}

export default App;