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
} from '@mui/material';

function FormSection({ onSubmit, isLoading }) {
  const [formValues, setFormValues] = useState({});

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Container>
      <form onSubmit={(event) => onSubmit(event, formValues)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              name="headline"
              label="Headline"
              value={formValues.headline || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              rows={6}
              name="productDescription"
              label="Product Description"
              value={formValues.productDescription || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel id="animation-select-label">Animation</InputLabel>
              <Select
                labelId="animation-select-label"
                name="animation"
                value={formValues.animation || ''}
                onChange={handleChange}
              >
                {/* ... your existing menu items */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Generate Ad Copy
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default FormSection;
```

To include `FormSection` in your `App.js` file, create a function called `handleFormSubmit` and pass it as a prop called `onSubmit`. The `isLoading` prop would be the `isFormLoading` state value from your original code.

```javascript
import FormSection from './components/FormSection';

// Inside your App component
function App() {
  // ...existing state and method definitions here

  const handleFormSubmit = (event, formValues) => {
    event.preventDefault();
    // ...your existing logic for form submission using formValues
  };

  return (
    <div>
      {/* ...other elements */}
      {showForm && <FormSection onSubmit={handleFormSubmit} isLoading={isFormLoading} />}
    </div>
  );
}