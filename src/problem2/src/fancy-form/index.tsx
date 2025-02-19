import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ArrowDown } from 'lucide-react'
import { Token } from '../types/token'
import TokenSelector from './token-modal'

const API_URL = 'https://interview.switcheo.com/prices.json'
const TOKEN_IMAGE_URL =
  'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/'

export default function SwapForm() {
  const [tokens, setTokens] = useState<Token[]>([])

  const [amount, setAmount] = useState(0)
  const [fromToken, setFromToken] = useState<Token | null>(null)
  const [toToken, setToToken] = useState<Token | null>(null)

  const onSubmit = () => {
    toast({
      title: 'Swap successful!',
      description: 'Your swap transaction has been successfully processed.'
    })
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(API_URL)
        const uniqueCurrencies = [
          ...new Set(data.map((symbol: any) => symbol.currency))
        ]
        const tokenList = uniqueCurrencies
          .map((currency) => {
            const symbol = data.find(
              (symbol: any) => symbol.currency === currency
            )
            if (!symbol) return null
            return {
              value: currency,
              label: currency,
              image: `${TOKEN_IMAGE_URL}${currency}.svg`,
              price: symbol.price
            }
          })
          .filter(Boolean)
        setTokens(tokenList as Token[])
      } catch (error) {
        console.error('Error fetching prices:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className='max-w-lg mx-auto mt-10'>
      <Card>
        <CardHeader>
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent className='p-4'>
          <div className='relative space-y-4'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 mt-[-20px]'>
              <Button
                size={'icon'}
                variant={'ghost'}
                className='rounded-8 border-4 border-white bg-background shadow-none bg-muted'
                onClick={() => {
                  setFromToken(toToken)
                  setToToken(fromToken)
                  // setAmount(toAmount)
                }}
              >
                <ArrowDown />
              </Button>
            </div>
            <div className='rounded-2xl bg-muted p-4'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm text-muted-foreground'>
                  Amount to send
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Input
                  type='number'
                  step='any'
                  placeholder='0'
                  className='border-0 bg-transparent text-2xl md:text-3xl p-0 border-0 bg-transparent border-transparent focus:border-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                />

                <TokenSelector
                  selectedToken={fromToken}
                  tokenList={tokens}
                  onTokenSelect={(token) => {
                    if (toToken?.value === token.value) {
                      setToToken(null)
                    }

                    setFromToken(token)
                  }}
                />
              </div>

              <div className='mt-2'>
                <span className='text-sm text-muted-foreground'>
                  ${(fromToken?.price || 0).toFixed(2)}
                </span>
              </div>
            </div>
            <div className='rounded-2xl bg-muted p-4'>
              <div className='flex justify-between mb-2'>
                <span className='text-sm text-muted-foreground'>
                  Amount to receive
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <Input
                  type='number'
                  placeholder='0'
                  className='border-0 bg-transparent text-2xl md:text-3xl p-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                  value={(
                    (amount * (fromToken?.price || 0)) /
                    (toToken?.price || 0)
                  ).toFixed(2)}
                />
                <TokenSelector
                  selectedToken={toToken}
                  tokenList={tokens}
                  onTokenSelect={(token) => {
                    if (fromToken?.value === token.value) {
                      setFromToken(null)

                      setToToken(token)
                    } else {
                      setToToken(token)
                      // setToAmount(amount * (1 / (fromToken?.price || 1)))
                    }
                  }}
                />
              </div>

              <div className='mt-2'>
                <span className='text-sm text-muted-foreground'>
                  ${(toToken?.price || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <Button
            className='w-full bg-pink-500 hover:bg-pink-600 text-white mt-4'
            size='lg'
            type='submit'
            onClick={() => {
              onSubmit()
            }}
            disabled={!fromToken || !toToken || amount <= 0}
          >
            {!fromToken || !toToken
              ? 'Select token'
              : amount <= 0
              ? 'Enter amount'
              : 'Confirm Swap'}
          </Button>
          {fromToken && toToken && amount > 0 && (
            <div className='mt-4 p-4 bg-gray-100 rounded-lg'>
              <p className='text-sm text-gray-600'>
                1 {fromToken?.label} ≈ {toToken?.price?.toFixed(4)}{' '}
                {toToken?.label}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className='flex flex-col gap-4'>
          <div className='flex justify-center'>
            <p className='text-gray-500 text-sm'>
              Powered by{' '}
              <a href='https://switcheo.com' className='text-blue-500'>
                Switcheo
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
