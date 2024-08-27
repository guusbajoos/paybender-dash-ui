import PaybenderLogo from '@/assets/images/paybender-logo.png'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import React from 'react'

interface IAuthCardProps {
  title: string
  children: React.ReactNode
  description?: string
  hasSeparator?: boolean
}

const AuthCard = ({
  title,
  children,
  description,
  hasSeparator,
}: IAuthCardProps) => {
  return (
    <Card className='w-full max-w-lg'>
      <CardHeader className='pb-0'>
        <img
          src={PaybenderLogo}
          alt='Paybender Logo'
          className='mb-6 w-[150px] object-cover'
        />
        <CardTitle className='text-3xl font-bold text-[#010205]'>
          {title}
        </CardTitle>
        {description && (
          <CardDescription className='text-base text-[#777677]'>
            {description}
          </CardDescription>
        )}
      </CardHeader>
      {hasSeparator && (
        <Separator className='mx-6 my-7 h-1 w-auto rounded-lg bg-[#3CC1D1]' />
      )}
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default AuthCard
