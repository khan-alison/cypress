// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Phone from 'mdi-material-ui/Phone'
import EmailOutline from 'mdi-material-ui/EmailOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'
import MessageOutline from 'mdi-material-ui/MessageOutline'

import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { forwardRef, useState } from 'react'
import DatePickerForm from 'src/@core/components/datePicker'

const schema = yup.object({
  firstName: yup.string().required("Full Name is required"),
  email: yup.string().required("Email is required").email("This is don't email"),
  phone: yup.string().required("phone is required"),

}).required();

interface IFormInput {
  firstName: String;
  email: String;
  phone: String;
  message: string;
  birth: Date
}

const FormLayoutsIcons = () => {
  const { register, handleSubmit, setValue, formState: { errors },getValues } = useForm<IFormInput | any>({
    resolver: yupResolver(schema)
  });
  const [date, setDate] = useState<Date | null | undefined>(null)
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data)

  };

  return (
    <Card>
      <CardHeader title='Basic with Icons' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("firstName")}
                label='Full Name'
                placeholder='Leonard Carter'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountOutline />
                    </InputAdornment>
                  )
                }}
              />
              <Typography variant='caption' color='red'>{errors.firstName?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("email")}
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                helperText='You can use letters, numbers & periods'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <EmailOutline />
                    </InputAdornment>
                  )
                }}
              />
              <Typography variant='caption' color='red'>{errors.email?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("phone")}
                type='string'
                label='Phone No.'
                placeholder='+1-123-456-8790'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <Phone />
                    </InputAdornment>
                  )
                }}
              />
              <Typography variant='caption' color='red'>{errors.phone?.message}</Typography>
            </Grid>
            <Grid item xs={12}>
              <DatePickerForm
                name={register("birth").name}
                date={date} 
                setDate={setDate}
                setValue={setValue}
                label='Birth'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                {...register("message")}
                multiline
                minRows={3}
                label='Message'
                placeholder='Bio...'
                sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MessageOutline />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type='submit' variant='contained' size='large'>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsIcons
