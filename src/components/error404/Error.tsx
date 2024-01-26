import errorImg from '../../assets/images/404.png'
import { Box } from "@mui/material"
import Button from "@mui/material/Button"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom"

export const Error = () => {

  const navigate = useNavigate()

  const backHandler = () => {
    navigate('/')
  }

  return (
    <Box position='relative' width={'100%'} height='100vh' display='flex' alignItems='center' justifyContent={'space-evenly'}>
      <Button onClick={backHandler}
              color='secondary'
              variant={"contained"}
              size="medium"
              sx={{position: 'absolute', top: '150px'}}
      >
        <ArrowBackIcon sx={{ marginRight: "14px" }} />
        to main
      </Button>
      <img style={{maxWidth: '90%'}} src={errorImg} alt="error 404" />
    </Box>
  )
}