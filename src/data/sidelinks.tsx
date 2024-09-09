import { IconHome } from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Home',
    label: '',
    href: '',
    icon: <IconHome size={18} color='#2A8F9B' />,
    sub: [
      {
        title: 'Get started',
        label: '',
        href: '/app/get-started',
        icon: <></>,
      },
    ],
  },
]
