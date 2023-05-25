import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InfoIcon from '@mui/icons-material/Info'

import { buildingStatus, classes, constructionType, sprinklers, tenancy } from 'constants/shop'
import { StepComponentProps } from '../types'

const Properties: React.FC<StepComponentProps> = ({ shopInfo, setShopInfo }) => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <Autocomplete
        options={buildingStatus}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Building Status'
            size='small'
            placeholder='Please select'
            required
            InputLabelProps={{ shrink: true }}
          />
        )}
        value={shopInfo.buildingStatus || ''}
        onChange={(_, newValue) =>
          setShopInfo((prev: any) => ({ ...prev, buildingStatus: newValue }))
        }
      />
      <TextField
        label='RBA'
        size='small'
        required
        defaultValue={shopInfo.rba}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Tooltip
                title='Rentable Building Area (RBA) includes the usable area and its associated share of the common areas. Typically rents are based on this area. It is the space the tenant will occupy in addition to the associated common areas of the building such as the lobby, hallways, bathrooms, equipment rooms, etc.'
                placement='top'
                arrow
              >
                <InfoIcon color='disabled' fontSize='small' className='cursor-default' />
              </Tooltip>
            </InputAdornment>
          ),
        }}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, rba: e.target.value }))}
      />
      <TextField
        type='number'
        label='Floors'
        size='small'
        defaultValue={shopInfo.floors}
        required
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, floors: +e.target.value }))}
      />
      <TextField
        type='number'
        label='Typical Floor'
        size='small'
        defaultValue={shopInfo.typicalFloor}
        required
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, typicalFloor: +e.target.value }))}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <span className='cursor-default'>SF</span>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type='number'
        label='Year Built'
        size='small'
        required
        InputLabelProps={{ shrink: true }}
        defaultValue={shopInfo.yearBuilt}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, yearBuilt: +e.target.value }))}
      />
      <Autocomplete
        options={constructionType}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Construction Type'
            size='small'
            placeholder='Please select'
            InputLabelProps={{ shrink: true }}
          />
        )}
        value={shopInfo.constructionType || ''}
        onChange={(_, newValue) =>
          setShopInfo((prev: any) => ({ ...prev, constructionType: newValue }))
        }
      />
      <div className='flex items-center space-x-2'>
        <span className='text-sm text-gray-300'>Tenancy</span>
        <ToggleButtonGroup
          id='tenancy-select'
          value={shopInfo.tenancy}
          exclusive
          onChange={(_, newValue) =>
            newValue && setShopInfo((prev: any) => ({ ...prev, tenancy: newValue }))
          }
        >
          {tenancy.map((param, ind) => (
            <ToggleButton size='small' value={param} key={ind} className='!px-4'>
              {param}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <div className='flex items-center space-x-2'>
        <span className='text-sm text-gray-300'>Class</span>
        <ToggleButtonGroup
          value={shopInfo.class}
          exclusive
          onChange={(_, newValue) =>
            newValue && setShopInfo((prev: any) => ({ ...prev, class: newValue }))
          }
        >
          {classes.map((param, ind) => (
            <ToggleButton size='small' value={param} key={ind} className='!px-4'>
              {param}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <Autocomplete
        options={sprinklers}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Sprinklers'
            size='small'
            placeholder='Please select'
            InputLabelProps={{ shrink: true }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title='Net Operating Income (NOI) is the actual or anticipated rental income remaining after all operating expenses are deducted from effective gross income, but before debt service and capital expenditures are deducted.'
                    placement='top'
                    arrow
                  >
                    <InfoIcon color='disabled' fontSize='small' className='cursor-default' />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        )}
        value={shopInfo.sprinklers || ''}
        onChange={(_, newValue) => setShopInfo((prev: any) => ({ ...prev, sprinklers: newValue }))}
      />
      <TextField
        type='number'
        label='Land Area'
        size='small'
        placeholder='0.00'
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Select
                size='small'
                sx={{
                  fieldset: {
                    borderWidth: '0px !important',
                    borderLeft: '1px solid rgb(255, 255, 255, 0.23) !important',
                    borderTopLeftRadius: '0px !important',
                    borderBottomLeftRadius: '0px !important',
                  },
                }}
                value={shopInfo.landAreaUnit}
                onChange={(e) =>
                  setShopInfo((prev: any) => ({
                    ...prev,
                    landAreaUnit: e.target.value,
                  }))
                }
              >
                <MenuItem value='AC'>AC</MenuItem>
                <MenuItem value='SF'>SF</MenuItem>
              </Select>
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiInputBase-root': { paddingRight: 0 } }}
        defaultValue={shopInfo.landArea}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, landArea: +e.target.value }))}
      />
      <TextField
        label='Zoning'
        size='small'
        InputLabelProps={{ shrink: true }}
        className='col-span-2'
        defaultValue={shopInfo.zoning}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, zoning: e.target.value }))}
      />
      <TextField
        label='Zoning Description'
        size='small'
        multiline
        rows={4}
        placeholder='Please provide a zoning description'
        InputLabelProps={{ shrink: true }}
        className='col-span-4'
        defaultValue={shopInfo.zoningDescription}
        onChange={(e) =>
          setShopInfo((prev: any) => ({ ...prev, zoningDescription: e.target.value }))
        }
      />
    </div>
  )
}

export default Properties
