import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { GiPaperTray } from 'react-icons/Gi'

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%'
}))
const customNoRowsOverlay = () => {
  return (
    <StyledGridOverlay>
      <GiPaperTray size={30} color='#595959' />
      <Box sx={{ mt: 1 }}>Không có dữ liệu</Box>
    </StyledGridOverlay>
  )
}
export default customNoRowsOverlay
