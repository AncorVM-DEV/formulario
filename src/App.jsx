import { useState } from 'react'
import {
  Container, Paper, Box, Grid, TextField,
  FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,
  InputLabel, Select, MenuItem, FormHelperText,
  Checkbox, Rating, Button, Stack,
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material'
import GridItem from '@mui/material/Grid' // alias opcional (Grid clásico v1)

export default function App() {
  const [data, setData] = useState({
    name: '',
    surname: '',
    age: '',
    gender: '',
    language: '',
    rating: 0,
    terms: false,
  })

  const [touched, setTouched] = useState(false)
  const [open, setOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setData(s => ({ ...s, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleRating = (_e, newValue) => {
    setData(s => ({ ...s, rating: newValue ?? 0 }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    const genderInvalid = !data.gender
    const languageInvalid = !data.language

    console.log('Datos enviados:', data)
    // Si quieres impedir el diálogo cuando falte algo, descomenta:
    // if (genderInvalid || languageInvalid || !data.name || !data.surname || !data.age || !data.terms) return;

    setOpen(true) // Se abre el diálogo modal al enviar
  }

  const handleClear = () => {
    setData({ name:'', surname:'', age:'', gender:'', language:'', rating:0, terms:false })
    setTouched(false)
  }

  const genderInvalid = touched && !data.gender
  const languageInvalid = touched && !data.language

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <GridItem container spacing={2}>
            {/* Nombre y Apellidos (requeridos) */}
            <GridItem item xs={12} md={6}>
              <TextField
                fullWidth required
                label="Nombre"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
            </GridItem>
            <GridItem item xs={12} md={6}>
              <TextField
                fullWidth required
                label="Apellidos"
                name="surname"
                value={data.surname}
                onChange={handleChange}
              />
            </GridItem>

            {/* Edad (number) */}
            <GridItem item xs={12} md={6}>
              <TextField
                fullWidth required
                type="number"
                label="Edad"
                name="age"
                value={data.age}
                onChange={handleChange}
                inputProps={{ min: 0, max: 120 }}
              />
            </GridItem>

            {/* Género (RadioGroup requerido) */}
            <GridItem item xs={12} md={6}>
              <FormControl required error={genderInvalid} component="fieldset" variant="standard" fullWidth>
                <FormLabel component="legend">Género</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={data.gender}
                  onChange={handleChange}
                >
                  {/* Marcamos required en al menos un radio para activar la regla de grupo */}
                  <FormControlLabel value="h" control={<Radio inputProps={{ required: true }} />} label="Hombre" />
                  <FormControlLabel value="m" control={<Radio />} label="Mujer" />
                  <FormControlLabel value="o" control={<Radio />} label="Otro" />
                </RadioGroup>
                {genderInvalid && <FormHelperText>* Campo requerido</FormHelperText>}
              </FormControl>
            </GridItem>

            {/* Select requerido (lenguaje de programación favorito o el tema que elijas) */}
            <GridItem item xs={12} md={6}>
              <FormControl required error={languageInvalid} fullWidth>
                <InputLabel id="lang-label" required>Lenguaje favorito</InputLabel>
                <Select
                  labelId="lang-label"
                  id="language"
                  name="language"
                  value={data.language}
                  label="Lenguaje favorito *"
                  onChange={handleChange}
                  required
                >
                  <MenuItem value=""><em>—</em></MenuItem>
                  <MenuItem value="js">JavaScript</MenuItem>
                  <MenuItem value="py">Python</MenuItem>
                  <MenuItem value="java">Java</MenuItem>
                  <MenuItem value="cpp">C++</MenuItem>
                </Select>
                {languageInvalid && <FormHelperText>* Campo requerido</FormHelperText>}
              </FormControl>
            </GridItem>

            {/* Rating (controlado) */}
            <GridItem item xs={12} md={6}>
              <FormLabel component="legend">Satisfacción</FormLabel>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating
                  name="rating"
                  value={data.rating}
                  onChange={handleRating}
                />
                <span>{data.rating || 0}/5</span>
              </Stack>
            </GridItem>

            {/* Checkbox condiciones + botones */}
            <GridItem item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={data.terms}
                    onChange={handleChange}
                  />
                }
                label="Acepto las condiciones"
              />
            </GridItem>

            <GridItem item xs={12}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button type="submit" variant="contained" disabled={!data.terms}>
                  ENVIAR
                </Button>
                <Button type="button" variant="outlined" onClick={handleClear}>
                  LIMPIAR
                </Button>
              </Stack>
            </GridItem>
          </GridItem>
        </Box>
      </Paper>

      {/* Dialog modal de confirmación */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Confirmar envío</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Deseas enviar la encuesta? (Se han mostrado los datos por consola)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={() => setOpen(false)} autoFocus>Sí</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
