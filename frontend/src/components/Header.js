import React from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { Nav, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition, Menu } from '@headlessui/react'
import { MenuIcon, ShoppingBagIcon, XIcon } from '@heroicons/react/outline'



const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state=> state.userLogin)
  const {userInfo} = userLogin
  const cart = useSelector(state=> state.cart)
  const {cartItems} = cart
  const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/products/header/Women-New Arrivals',
          imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_500/v1642854727/Header%20/new-arrivals-Women_yatkjn.webp',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/products/header/Women-Basic Tees',
          imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_500/v1642854769/Header%20/basic-tees-Women_gbv8nl.webp',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/products/header/Women-Clothing-Top' },
            { name: 'Blazers', href: '/products/header/Women-Clothing-Blazer' },
            { name: 'Pants', href: '/products/header/Women-Clothing-Pant' },
            { name: 'Denim', href: '/products/header/Women-Clothing-Denim' },
            { name: 'Shoes', href: '/products/header/Women-Clothing-Shoe' },
            { name: 'T-Shirts', href: '/products/header/Women-Clothing-TShirt' },
            { name: 'Jackets', href: '/products/header/Women-Clothing-Jacket' },
            { name: 'Browse All', href: '/products/header/Women' },
          ],
        },
        
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/products/header/Women-Accessories-Watch' },
            { name: 'Bags', href: '/products/header/Women-Accessories-Bag' },
            { name: 'Perfumes', href: '/products/header/Women-Accessories-Perfume' },
            { name: 'Sunglasses', href: '/products/header/Women-Accessories-Sunglass' },
            { name: 'Hats', href: '/products/header/Women-Accessories-Hat' },
            { name: 'Belts', href: '/products/header/Women-Accessories-Belt' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Prada', href: '/products/header/Women-Prada' },
            { name: 'Versace', href: '/products/header/Women-Versace' },
            { name: 'Chanel', href: '/products/header/Women-Chanel' },
            { name: 'Louis Vuitton', href: '/products/header/Women-Louis Vuitton' },
            { name: 'Christian Louboutin', href: '/products/header/Women-Christian Louboutin' },
          ],
        },
      ],
    },
    
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/products/header/Men-New Arrivals',
          imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_500/v1642854856/Header%20/new-arrivals-Men_xprqak.webp',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Designer Tees',
          href: '/products/header/Men-Designer Tees',
          imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_500/v1642854855/Header%20/designer-tees-Men_fjajvl.webp',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Shirts', href: '/products/header/Men-Clothing-Shirt' },
            { name: 'Pants', href: '/products/header/Men-Clothing-Pant' },
            { name: 'Shoes', href: '/products/header/Men-Clothing-Shoe' },
            { name: 'T-Shirts', href: '/products/header/Men-Clothing-TShirt' },
            { name: 'Jackets', href: '/products/header/Men-Clothnig-Jacket' },
            { name: 'Browse All', href: '/products/header/Men' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/products/header/Men-Accessories-Watch' },
            { name: 'Wallets', href: '/products/header/Men-Accessories-Wallet' },
            { name: 'Fragrances', href: '/products/header/Men-Accessories-Fragrance' },
            { name: 'Sunglasses', href: '/products/header/Men-Accessories-Sunglass' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Georgio Armani', href: '/products/header/Men-Georgio Armani' },
            { name: 'Versace', href: '/products/header/Men-Versace' },
            { name: 'Tom Ford', href: '/products/header/Men-TomFord' },
            { name: 'Christian Dior', href: '/products/header/Men-Christian Dior' },
            { name: 'Balanciaga', href: '/products/header/Men-Balanciaga' },
          ],
        },
      ],
    },
    {
      id: 'technology',
      name: 'Technology',
      featured: [
        {
          name: 'New Arrivals',
          href: '/products/header/Technology-New Arrivals',
          imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_500/v1642854937/Header%20/new-arrivals-Technology_l8jrjh.webp',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Top Rated',
          href: '/products/header/Technology-Top Rated',
          imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_500/v1642854937/Header%20/top-rated-Technology_jlywau.webp',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'technology',
          name: 'Electronics',
          items: [
            { name: 'Phones', href: '/products/header/Technology-Electronics-Phone' },
            { name: 'Laptops', href: '/products/header/Technology-Electronics-Laptop' },
            { name: 'Networking', href: '/products/header/Technology-Electronics-Networking' },
            { name: 'Headphones', href: '/products/header/Technology-Electronics-Headphone' },
            { name: 'Cameras', href: '/products/header/Technology-Electronics-Camera' },
            { name: 'Browse All', href: '/products/header/Technology-Electronics' },
          ],
        },
        
        {
          id: 'computeraccessories',
          name: 'Computer Accessories',
          items: [
            { name: 'Mouse', href: '/products/header/Technology-Accessories-Mouse' },
            { name: 'Keyboard', href: '/products/header/Technology-Accessories-Keyboard' },
            { name: 'Speaker', href: '/products/header/Technology-Accessories-Speaker' },
            // { name: '-', href: '#' },
            // { name: '-', href: '#' },
            // { name: 'Bowse All', href: '/products/header/Technology-Accessories' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Apple', href: '/products/header/Apple' },
            // { name: 'Samsung', href: '/products/header/Samsung' },
            // { name: 'Asus', href: '/products/header/Asus' },
            // { name: 'Canon', href: '/products/header/Canon' },
            { name: 'HP', href: '/products/header/HP' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'About Us', href: '/about' },
    // { name: 'Stores', href: '#' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
  const logoutHandler = ()=>{
        dispatch(logout())
    }

  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation.categories.map((category) => (
                    <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                            </div>
                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                              {item.name}
                            </a>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>
              
              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {navigation.pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <a href={page.href} className="-m-2 p-2 block font-medium text-gray-900">
                      {page.name}
                    </a>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <a href="/login" className="-m-2 p-2 block font-medium text-gray-900">
                    {userInfo ? userInfo.name : 'Sign in'}
                  </a>
                </div>
                <div className="flow-root">
                  <a href="/register" className="-m-2 p-2 block font-medium text-gray-900">
                    {userInfo ? userInfo.email : 'Create account'}
                  </a>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4">
                <a href=" " className="-m-2 p-2 flex items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/88/United-states_flag_icon_round.svg"
                    alt=""
                    className="w-5 h-auto block flex-shrink-0"
                  />
                  <span className="ml-3 block text-base font-medium text-gray-900">USD</span>
                  <span className="sr-only">, change currency</span>
                </a>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        

        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <span className="sr-only">Workflow</span>
                <LinkContainer to="/">
                  <Nav.Link>
                    
                    <img
                      className="h-8 w-auto"
                      src="https://res.cloudinary.com/xzen/image/upload/f_webp/v1638709367/XZEN_m3ylq4.webp"
                      alt=""
                    />
                  </Nav.Link>
                </LinkContainer>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="h-full flex space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500 z-10">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="max-w-7xl mx-auto px-8">
                                  <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-center object-cover"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute z-10 inset-0" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-gray-800">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>
              {/* <Route render={({history})=> <SearchBox history={history} />} /> */}
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href={userInfo ? '#' : '/login'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    {userInfo ? userInfo.name : 'Sign in'}
                  </a>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href={userInfo ? '#' :'/register'} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    {userInfo ? userInfo.email : 'Create account'}
                  </a>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href=" " className="text-gray-700 hover:text-gray-800 flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/8/88/United-states_flag_icon_round.svg"
                      alt=""
                      className="w-5 h-auto block flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">USD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Profile */}
                <div className="flex lg:ml-6">
                  <Menu as="div" className="ml-3 z-10 relative">
                  <div>
                    <Menu.Button className="bg-white-800 flex text-sm rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <svg style={{color:"grey"}}xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userInfo ?
                            <><LinkContainer to="/profile">
                                <Menu.Item>
                                    {({ active }) => (
                                        <Nav.Link
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                                        >
                                            Your Profile
                                        </Nav.Link>
                                    )}
                                </Menu.Item>
                            </LinkContainer>
                            <LinkContainer to="/logout">
                                    <Menu.Item onClick={logoutHandler}>
                                        {({ active }) => (
                                            <Nav.Link
                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                                            >
                                                Sign out
                                            </Nav.Link>
                                        )}
                                    </Menu.Item>
                                </LinkContainer></>

                         : 
                             <><LinkContainer to="/login">
                            <Menu.Item>
                              {({ active }) => (
                                <Nav.Link
                                  className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                                >
                                  Login
                                </Nav.Link>
                              )}
                            </Menu.Item>
                          </LinkContainer><LinkContainer to="/register">
                              <Menu.Item>
                                {({ active }) => (
                                  <Nav.Link
                                    className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 no-underline')}
                                  >
                                    Register
                                  </Nav.Link>
                                )}
                              </Menu.Item>
                            </LinkContainer></>
                            }
                          
                    {userInfo  && userInfo.isAdmin && (
                        <NavDropdown title='Admin' id='adminmenu'>
                        <LinkContainer to='/admin/userlist'>
                            <NavDropdown.Item>Users</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/productlist'>
                            <NavDropdown.Item>Products</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to='/admin/orderlist'>
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>

                          )}
                    </Menu.Items>
                  </Transition>
                </Menu>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="/cart" className="group -m-2 p-2 flex items-center">
                    <ShoppingBagIcon
                      className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartItems.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
 

export default Header