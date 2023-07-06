// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/layout/BlankLayout'

// ** Demo Imports
/* import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations' */

// ** Styled Components
const BoxWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Img = styled('img')(({ theme }) => ({
  marginBottom: theme.spacing(10),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(13)
  }
}))


const Error404 = () => {
  return (
    <div>
      <h1 className='text-center p-6 '>Error 404</h1>
    </div>
  )
}
Error404.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error404
