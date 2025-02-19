import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Search, ChevronDownIcon } from 'lucide-react'

import { Token } from '../types/token'

export default function ({
  selectedToken,
  tokenList,
  onTokenSelect
}: {
  selectedToken: any
  tokenList: Token[]
  onTokenSelect: (token: Token) => void
}) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {selectedToken ? (
          <Button variant='secondary' className='gap-2 bg-background rounded-8'>
            <div className='flex items-center gap-2'>
              <Avatar className='w-6 h-6'>
                <AvatarImage src={selectedToken?.image} />
                <AvatarFallback>
                  {selectedToken?.label.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <Label>{selectedToken?.label}</Label>
            </div>
            <ChevronDownIcon className='h-4 w-4' />
          </Button>
        ) : (
          <Button variant='outline'>Select Token</Button>
        )}
      </DialogTrigger>
      <DialogContent className='max-w-md p-4 gap-0'>
        <DialogHeader>
          <DialogTitle>Select a token</DialogTitle>
        </DialogHeader>
        <div className='pt-4 pb-4'>
          <div className='flex items-center gap-2 px-3 py-2 bg-muted rounded-md'>
            <Search className='w-4 h-4 text-muted-foreground' />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type='text'
              placeholder='Search tokens'
              className='border-0 bg-transparent border-transparent focus:border-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-0'
            />
          </div>
        </div>

        <div className='px-2 py-3'>
          <div className='px-2 mb-2'>
            <span className='text-sm font-medium flex items-center gap-2'>
              <Star className='w-4 h-4' /> Tokens
            </span>
          </div>
          <ScrollArea className='h-[400px]'>
            <div className='space-y-1'>
              {tokenList
                .filter((token) =>
                  token.label.toLowerCase().includes(search.toLowerCase())
                )
                .map((token) => (
                  <button
                    key={token.label}
                    onClick={() => {
                      onTokenSelect(token)
                      setSearch('')

                      // Close the modal
                      setIsOpen(false)
                    }}
                    className='flex items-center gap-3 w-full p-2 rounded-lg hover:bg-muted transition-colors text-left'
                  >
                    <Avatar className='w-10 h-10'>
                      <AvatarImage src={token.image} />
                      <AvatarFallback>{token.label.charAt(0)}</AvatarFallback>
                    </Avatar>

                    <div className='flex-1'>
                      <div className='font-medium'>{token.label}</div>
                      <div className='text-sm text-muted-foreground flex items-center gap-1'>
                        {token.price && (
                          <span className='opacity-50 text-xs'>
                            {token.price}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Star(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M7.5 0L9.75 4.5L14.25 5.25L10.875 8.625L11.625 13.125L7.5 11L3.375 13.125L4.125 8.625L0.75 5.25L5.25 4.5L7.5 0Z'
        fill='currentColor'
      />
    </svg>
  )
}
