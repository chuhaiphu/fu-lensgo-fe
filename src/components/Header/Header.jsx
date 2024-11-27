import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { loginApi, sendMailOtpApi } from '../../apis/user-api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    setIsLoggedIn(!!accessToken)
  }, [])

  const LoginPanel = ({ isOpen, setIsOpen }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const response = await loginApi({ email, password })
        setIsOpen(false)
        window.location.reload()
      } catch (error) {
        if (error?.data?.error === 'Bad credentials') {
          toast.error('Invalid email or password', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

        }
        else if (error?.data?.status === 428) {
          toast.error('User is disabled', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          await sendMailOtpApi(email);
          navigate(`/verify-otp/${email}`);
        }
        else {
          toast.error('Login failed. Please try again.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    }

    return (
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-xl font-medium leading-6 text-gray-900 mb-4">Sign in to your account</Dialog.Title>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white rounded-md px-4 py-2 hover:bg-teal-700 transition duration-200"
              >
                Sign in
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    )
  }

  const LoginButton = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    return (
      <>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Log in <span aria-hidden="true">→</span>
        </button>
        <LoginPanel isOpen={isLoginOpen} setIsOpen={setIsLoginOpen} />
      </>
    )
  }

  const ProfileImage = () => (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex items-center">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="inline-block h-14 w-14 rounded-full cursor-pointer"
          />
        </MenuButton>
      </div>

      <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          <MenuItem>
            {({ active }) => (
              <a
                href="/user/profile"
                className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
              >
                Account Details
              </a>
            )}
          </MenuItem>
          <MenuItem>
            {({ active }) => (
              <button
                type="button"
                className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                onClick={() => {
                  localStorage.removeItem('access_token')
                  localStorage.removeItem('refresh_token')
                  window.location.href = '/'
                }}
              >
                Sign out
              </button>
            )}
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex items-center gap-x-12">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">LensGo</span>
            <span className="text-3xl font-island-moments text-[#D26C6C]">LensGo</span>
          </a>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex">
          {isLoggedIn ? <ProfileImage /> : <LoginButton />}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                {isLoggedIn ? <ProfileImage /> : <LoginButton />}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}