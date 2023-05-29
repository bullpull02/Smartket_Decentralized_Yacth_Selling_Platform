import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import LinkedinIcon from '@mui/icons-material/LinkedIn'
import EmailIcon from '@mui/icons-material/Email'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk'

import MainLayout from 'layouts/MainLayout'
import Loading from 'components/Loading'

import { useAppDispatch, useAppSelector } from 'app/hooks'
import type { RootState } from 'app/store'
import { setLoadingModalOpen } from 'slices/modal'
import { cx, getStatusCode } from 'utils'
import {
  apiGetShop,
  apiListShop,
  apiBuyShop,
  apiOfferShop,
  apiSellShop,
  apiDeclineShop,
  // apiRemoveShop,
} from 'utils/shop'
import { apiGetUser } from 'utils/user'
import { StatusColor } from 'config'
import { ShopStatus } from 'constants/shop'
import Slider from 'components/Slider'

const ShopDetail = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [shop, setShop] = useState<any>({})
  const [offerer, setOfferer] = useState<any>({})
  const [offererLoading, setOffererLoading] = useState<boolean>(true)
  const [tabValue, setTabValue] = useState<number>(0)
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user.user)
  const isLoggedIn = useAppSelector((state: RootState) => state.user.isLoggedIn)

  useEffect(() => {
    if (!id) return
    ;(async () => {
      setLoading(true)

      try {
        const data = await apiGetShop(+id)

        if (data.success) {
          setShop(data.data.shop)
        } else {
          toast.error(data.message)
        }
      } catch (_) {
        toast.error('Network Error')
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  useEffect(() => {
    if (!shop.offeredBy || !id) return
    ;(async () => {
      try {
        const data = await apiGetUser(+id)

        if (data.success) {
          setOfferer(data.data.user)
        } else {
          toast.error(data.message)
        }
      } catch (_) {
        toast.error('Network Error: Unable to load ')
      } finally {
        setOffererLoading(false)
      }
    })()
  }, [shop.offeredBy, id])

  const handleListShop = async (id: number): Promise<void> => {
    try {
      const price = window.prompt('Please enter the price of this shop') || ''

      if (!(+price > 0 && +price < 1000000000)) {
        toast.error('Invalid price')
        return
      }

      if (!window.confirm('Are you sure you really want to list this shop?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiListShop({ id, price: +price })

      if (data.success) {
        setShop(data.data.shop)
        toast.success('Successfully listed this shop')
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  const handleOfferShop = async (id: number): Promise<void> => {
    try {
      const price = window.prompt('Please enter the price of this shop') || ''

      if (!(+price > 0 && +price < 1000000000)) {
        toast.error('Invalid price')
        return
      }

      if (!window.confirm('Are you sure you really want to offer this shop?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiOfferShop({ id, price: +price })

      if (data.success) {
        setShop(data.data.shop)
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  const handleBuyShop = async (id: number, seller: number): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you really want to buy this shop?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiBuyShop({ id, seller })

      if (data.success) {
        setShop(data.data.shop)
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  const handleSellShop = async (id: number, buyer: number): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you really want to sell this yacht?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiSellShop({ id, buyer })

      if (data.success) {
        setShop(data.data.shop)
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  const handleDeclineShop = async (id: number): Promise<void> => {
    try {
      if (!window.confirm('Are you sure you really want to decline this yacht?')) return

      dispatch(setLoadingModalOpen(true))

      const data = await apiDeclineShop(id)

      if (data.success) {
        setShop(data.data.shop)
      } else {
        toast.error(data.message)
      }
    } catch (_) {
      toast.error('Network error')
    } finally {
      dispatch(setLoadingModalOpen(false))
    }
  }

  // const handleRemoveYacht = async (id: number): Promise<void> => {
  //   try {
  //     if (!window.confirm('Are you sure you really want to remove this yacht?')) return

  //     dispatch(setLoadingModalOpen(true))

  //     const data = await apiRemoveYacht(id)

  //     if (data.success) {
  //       navigate('/my-nfts')
  //     } else {
  //       toast.error(data.message)
  //     }
  //   } catch (_) {
  //     toast.error('Network error')
  //   } finally {
  //     dispatch(setLoadingModalOpen(false))
  //   }
  // }

  return (
    <MainLayout title='SMARTKET - SHOP DETAIL'>
      <div className='container py-8'>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <div className='relative grid grid-cols-3 gap-8'>
              <div className='relative col-span-2'>
                <Slider
                  photos={JSON.parse(shop.photos).map(
                    (photo: string) => `https://ipfs.io/ipfs/${photo}`,
                  )}
                />
                <div
                  className={cx(
                    'absolute left-0 top-0 z-10 px-2 py-1 font-semibold uppercase',
                    StatusColor[shop.status],
                  )}
                >
                  {shop.status}
                </div>
                <div className='absolute right-0 top-0 z-10 bg-green-800 px-2 py-1 text-sm font-semibold uppercase'>
                  {shop.price > 0 ? `$ ${shop.price.toLocaleString()}` : 'Call for pricing'}
                </div>
              </div>
              <Paper>
                <Tabs
                  className='bg-stone-950'
                  value={tabValue}
                  onChange={(_, newValue) => setTabValue(newValue)}
                >
                  <Tab label='Presented by' />
                  {shop.status === ShopStatus.OFFERED && <Tab label='Offered by' />}
                </Tabs>
                <div className='p-4'>
                  {tabValue === 0 && (
                    <div>
                      <LazyLoadImage
                        src={`https://ipfs.io/ipfs/${shop.user.avatar}`}
                        effect='blur'
                        delayMethod='debounce'
                        className='aspect-square rounded object-cover'
                      />
                      <h4 className='mt-2 text-2xl'>
                        {shop.user.firstName} {shop.user.lastName}
                      </h4>
                      <p className='text-sm'>
                        {shop.user.city}, {getStatusCode(shop.user.state)} {shop.user.zipCode}
                      </p>
                      <div className='ml-auto mt-4 flex w-fit gap-2'>
                        {shop.user.twitter && (
                          <Link to={shop.user.twitter} target='_blank'>
                            <TwitterIcon />
                          </Link>
                        )}
                        {shop.user.facebook && (
                          <Link to={shop.user.facebook} target='_blank'>
                            <FacebookIcon />
                          </Link>
                        )}
                        {shop.user.linkedin && (
                          <Link to={shop.user.linkedin} target='_blank'>
                            <LinkedinIcon />
                          </Link>
                        )}
                        <Link to={`mailto:${shop.user.twitter}`}>
                          <EmailIcon />
                        </Link>
                        <Link to={`tel:${shop.user.phone}`}>
                          <PhoneInTalkIcon />
                        </Link>
                      </div>
                    </div>
                  )}
                  {tabValue === 1 ? (
                    offererLoading ? (
                      <Loading />
                    ) : (
                      <div>
                        <LazyLoadImage
                          src={`https://ipfs.io/ipfs/${offerer.avatar}`}
                          effect='blur'
                          delayMethod='debounce'
                          className='aspect-square rounded object-cover'
                        />
                        <h4 className='mt-2 text-2xl'>
                          {offerer.firstName} {offerer.lastName}
                        </h4>
                        <p className='text-sm'>
                          {offerer.city}, {getStatusCode(offerer.state)} {offerer.zipCode}
                        </p>
                        <div className='ml-auto mt-4 flex w-fit gap-2'>
                          {offerer.twitter && (
                            <Link to={offerer.twitter} target='_blank'>
                              <TwitterIcon />
                            </Link>
                          )}
                          {offerer.facebook && (
                            <Link to={offerer.facebook} target='_blank'>
                              <FacebookIcon />
                            </Link>
                          )}
                          {offerer.linkedin && (
                            <Link to={offerer.linkedin} target='_blank'>
                              <LinkedinIcon />
                            </Link>
                          )}
                          <Link to={`mailto:${offerer.twitter}`}>
                            <EmailIcon />
                          </Link>
                          <Link to={`tel:${offerer.phone}`}>
                            <PhoneInTalkIcon />
                          </Link>
                        </div>
                      </div>
                    )
                  ) : (
                    <></>
                  )}
                </div>
              </Paper>
            </div>
            <Paper className='mt-4 flex flex-row-reverse justify-between gap-8 p-4'>
              <div>
                {isLoggedIn && (
                  <div className='flex flex-col gap-2'>
                    {shop.status === ShopStatus.PENDING && (
                      <p className='text-xl italic text-gray-500'>Waiting to be approved...</p>
                    )}
                    {shop.status === ShopStatus.ACCEPTED ? (
                      shop.owner === user.id ? (
                        <Button variant='contained' onClick={() => handleListShop(shop.id)}>
                          LIST MY SHOP
                        </Button>
                      ) : (
                        <Button variant='contained' onClick={() => handleOfferShop(shop.id)}>
                          SEND OFFER
                        </Button>
                      )
                    ) : (
                      <></>
                    )}
                    {shop.status === ShopStatus.LISTED && shop.owner !== user.id && (
                      <Button
                        variant='contained'
                        onClick={() => handleBuyShop(shop.id, shop.owner)}
                      >
                        BUY THIS SHOP
                      </Button>
                    )}
                    {shop.status === ShopStatus.OFFERED && shop.owner === user.id && (
                      <>
                        <Button
                          variant='contained'
                          onClick={() => handleSellShop(shop.id, shop.offeredBy)}
                        >
                          SELL THIS SHOP
                        </Button>
                        <Button variant='contained' onClick={() => handleDeclineShop(shop.id)}>
                          DECLINE OFFER
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h4 className='text-xl font-semibold'>Shop Information</h4>
                <div className='mt-4 grid max-w-xl gap-1 text-sm'>
                  <div className='flex'>
                    <p className='w-32'>Location:</p>
                    <p>
                      {shop.street}, {shop.city}, {getStatusCode(shop.state)} {shop.zipCode}
                    </p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Phone:</p>
                    <p>{shop.phone}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Sale Type:</p>
                    <p>{shop.saleType}</p>
                  </div>
                  {shop.grm && (
                    <div className='flex'>
                      <p className='w-32'>GRM:</p>
                      <p>{shop.grm}</p>
                    </div>
                  )}
                  {shop.capRate && (
                    <div className='flex'>
                      <p className='w-32'>Cap Rate:</p>
                      {shop.capRate && <p>{shop.capRate}%</p>}
                    </div>
                  )}
                  {shop.noi && (
                    <div className='flex'>
                      <p className='w-32'>NOI:</p>
                      <p>$ {shop.noi?.toLocaleString()}</p>
                    </div>
                  )}
                  {JSON.parse(shop.saleConditions).length > 0 && (
                    <div className='flex'>
                      <p className='w-32'>Sale Conditions:</p>
                      <p>
                        {JSON.parse(shop.saleConditions).map((condition: string, ind: number) => (
                          <span key={condition}>
                            {ind === 0 ? '' : ', '}
                            {condition}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}
                  {shop.saleNotes && (
                    <div className='flex'>
                      <p className='w-32'>Sale Notes:</p>
                      <p>{shop.saleNotes}</p>
                    </div>
                  )}
                  <div className='flex'>
                    <p className='w-32'>Building Status:</p>
                    <p>{shop.buildingStatus}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>RBA:</p>
                    <p>{shop.rba}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Floors:</p>
                    <p>{shop.floors}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Typical Floor:</p>
                    <p>{shop.typicalFloor}</p>
                  </div>
                  <div className='flex'>
                    <p className='w-32'>Year Built:</p>
                    <p>{shop.yearBuilt}</p>
                  </div>
                  {shop.constructionType && (
                    <div className='flex'>
                      <p className='w-32'>Construction Type:</p>
                      <p>{shop.constructionType}</p>
                    </div>
                  )}
                  {shop.tenancy && (
                    <div className='flex'>
                      <p className='w-32'>Tenancy:</p>
                      <p>{shop.tenancy}</p>
                    </div>
                  )}
                  {shop.class && (
                    <div className='flex'>
                      <p className='w-32'>Class:</p>
                      <p>{shop.class}</p>
                    </div>
                  )}
                  {shop.sprinklers && (
                    <div className='flex'>
                      <p className='w-32'>Sprinklers:</p>
                      <p>{shop.sprinklers}</p>
                    </div>
                  )}
                  {shop.landArea && (
                    <div className='flex'>
                      <p className='w-32'>Land Area:</p>
                      <p>
                        {shop.landArea} {shop.landAreaUnit}
                      </p>
                    </div>
                  )}
                  {shop.zoning && (
                    <div className='flex'>
                      <p className='w-32'>Zoning:</p>
                      <p>{shop.zoning}</p>
                    </div>
                  )}
                  {shop.zoningDescription && (
                    <div className='flex'>
                      <p className='w-32'>Zoning Description:</p>
                      <p>{shop.zoningDescription}</p>
                    </div>
                  )}
                  {shop.secureInformation && (
                    <div className='flex'>
                      <p className='w-32'>Secure:</p>
                      <p>{shop.secureInformation}</p>
                    </div>
                  )}
                  {JSON.parse(shop.highlights).length > 0 && (
                    <div className='flex'>
                      <p className='w-32'>Highlights:</p>
                      <p>
                        {JSON.parse(shop.highlights).map((highlight: string) => (
                          <span key={highlight}>{highlight} </span>
                        ))}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
            {/* <div className='space-y-4'>
              <div className='space-y-2'>
                <h3 className='text-3xl font-bold'>{yacht.name}</h3>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Manufacturer</h5>
                  <span className={classNames.propertyInfo}>{yacht.manufacturer}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Engine Type</h5>
                  <span className={classNames.propertyInfo}>{yacht.engineType}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Year</h5>
                  <span className={classNames.propertyInfo}>{yacht.year}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Length(inch)</h5>
                  <span className={classNames.propertyInfo}>{yacht.length_inch}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Condition</h5>
                  <span className={classNames.propertyInfo}>{yacht.condition}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Location</h5>
                  <span className={classNames.propertyInfo}>{yacht.location}</span>
                </div>
              </div>
              <hr className='border-t border-gray-700' />
              <div className='space-y-2'>
                <h3 className='text-2xl font-bold'>Owner Information</h3>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Name</h5>
                  <span className={classNames.propertyInfo}>
                    {yacht.user.firstName} {yacht.user.lastName}
                  </span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Email</h5>
                  <span className={classNames.propertyInfo}>{yacht.user.email}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Phone</h5>
                  <span className={classNames.propertyInfo}>{yacht.user.phone}</span>
                </div>
                <div className={classNames.propertyDiv}>
                  <h5 className={classNames.propertyTitle}>Country</h5>
                  <span className={classNames.propertyInfo}>{yacht.user.country}</span>
                </div>
              </div>
              <hr className='border-t border-gray-700' />
              
            </div> */}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default ShopDetail
