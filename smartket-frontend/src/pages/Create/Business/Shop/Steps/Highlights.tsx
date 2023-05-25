import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import type { StepComponentProps } from '../types'

const Highlights: React.FC<StepComponentProps> = ({ shopInfo, setShopInfo }) => {
  const handleAddHighlight = (): void => {
    setShopInfo((prev: any) => ({ ...prev, highlights: [...prev.highlights, ''] }))
  }

  const handleHighlightChange = (newValue: string, ind: number): void => {
    setShopInfo((prev: any) => {
      const newHighlights = [...prev.highlights]
      newHighlights[ind] = newValue
      return { ...prev, highlights: newHighlights }
    })
  }

  const handleRemoveHighlight = (ind: number): void => {
    setShopInfo((prev: any) => {
      const newHighlights = [...prev.highlights]
      newHighlights.splice(ind, 1)
      return { ...prev, highlights: newHighlights }
    })
  }

  return (
    <div className='space-y-4'>
      <h4 className='text-gray-300'>Describe the most appealing features of the property</h4>
      <div className='space-y-2'>
        {shopInfo.highlights.map((highlight: string, ind: number) => (
          <div className='flex items-center space-x-2'>
            <TextField
              size='small'
              fullWidth
              defaultValue={highlight}
              onChange={(e) => handleHighlightChange(e.target.value, ind)}
              key={ind}
            />
            <IconButton onClick={() => handleRemoveHighlight(ind)}>
              <RemoveIcon />
            </IconButton>
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <Button onClick={handleAddHighlight}>
          <AddIcon />
          Add Highlight
        </Button>
      </div>
    </div>
  )
}

export default Highlights
