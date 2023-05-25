import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import Autocomplete from '@mui/material/Autocomplete'

import { saleConditions } from 'constants/shop'
import states from 'constants/states'
import type { StepComponentProps } from '../types'

const Listing: React.FC<StepComponentProps> = ({ shopInfo, setShopInfo }) => {
  return (
    <div className='space-y-4'>
      <div className='grid grid-cols-4 gap-4'>
        <TextField
          label='Street'
          size='small'
          defaultValue={shopInfo.street}
          required
          InputLabelProps={{
            shrink: true,
          }}
          className='col-span-4'
          onChange={(e) => setShopInfo((prev: any) => ({ ...prev, street: e.target.value }))}
        />
        <TextField
          label='City'
          size='small'
          defaultValue={shopInfo.city}
          required
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setShopInfo((prev: any) => ({ ...prev, city: e.target.value }))}
        />
        <Autocomplete
          options={states.map((state) => state.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label='State'
              size='small'
              placeholder='Please select'
              required
              InputLabelProps={{ shrink: true }}
            />
          )}
          value={shopInfo.state || ''}
          onChange={(_, newValue) => setShopInfo((prev: any) => ({ ...prev, state: newValue }))}
        />
        <TextField
          label='Zip Code'
          size='small'
          defaultValue={shopInfo.zipCode}
          required
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setShopInfo((prev: any) => ({ ...prev, zipCode: e.target.value }))}
        />
        <TextField
          label='Phone'
          size='small'
          defaultValue={shopInfo.phone}
          required
          InputLabelProps={{ shrink: true }}
          onChange={(e) => setShopInfo((prev: any) => ({ ...prev, phone: e.target.value }))}
        />
        <TextField label='Sale Type' size='small' value='Investment' disabled />
        <TextField
          type='number'
          label='Price'
          size='small'
          defaultValue={shopInfo.price}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='text-sm'>$</span>
              </InputAdornment>
            ),
          }}
          onChange={(e) => setShopInfo((prev: any) => ({ ...prev, price: +e.target.value }))}
        />
        <div className='grid grid-cols-2 gap-4'>
          <TextField
            type='number'
            label='GRM'
            size='small'
            defaultValue={shopInfo.grm}
            placeholder='0.00'
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setShopInfo((prev: any) => ({ ...prev, grm: +e.target.value }))}
          />
          <TextField
            type='number'
            label='Cap Rate'
            size='small'
            defaultValue={shopInfo.capRate}
            InputProps={{
              startAdornment: <InputAdornment position='start'>%</InputAdornment>,
              endAdornment: (
                <InputAdornment position='end'>
                  <Tooltip
                    title="Cap Rate is the income rate of return for a total property that reflects the relationship between one year's net operating income expectancy and the total price or value. It is calculated by dividing the net operating income by the sale price or value."
                    placement='top'
                    arrow
                  >
                    <InfoIcon color='disabled' fontSize='small' className='cursor-default' />
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setShopInfo((prev: any) => ({ ...prev, capRate: +e.target.value }))}
          />
        </div>
        <TextField
          type='number'
          label='Noi'
          size='small'
          defaultValue={shopInfo.noi}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='text-sm'>$</span>
              </InputAdornment>
            ),
            endAdornment: (
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
          onChange={(e) => setShopInfo((prev: any) => ({ ...prev, noi: +e.target.value }))}
        />
      </div>
      <Autocomplete
        multiple
        options={saleConditions}
        getOptionLabel={(option) => option}
        value={shopInfo.saleConditions || []}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            size='small'
            label='Sale Conditions'
            placeholder='Please select'
            InputLabelProps={{ shrink: true }}
          />
        )}
        onChange={(_, newValue) =>
          setShopInfo((prev: any) => ({ ...prev, saleConditions: [...newValue] }))
        }
      />
      <TextField
        size='small'
        label='Sale Notes'
        multiline
        className='w-full'
        defaultValue={shopInfo.saleNotes}
        placeholder='e.g. Prime investment opportunity. This triple-net leased retail showroom...'
        rows={5}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setShopInfo((prev: any) => ({ ...prev, saleNotes: e.target.value }))}
      />
    </div>
  )
}

export default Listing
