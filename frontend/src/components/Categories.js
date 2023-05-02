import React from 'react'


const callouts = [
  {
    name: 'Clothing',
    description: 'Work from home accessories',
    imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_963/v1638708826/Category-Images/clothing-clothing_tmqvoe.webp',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Electronics',
    description: 'Journals and note-taking',
    imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,f_webp,w_988/v1638706566/Category-Images/category-electronics_i8nvgg.webp',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Accessories',
    description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,f_webp,w_1034/v1638706566/Category-Images/category-accessories_lkrcvg.webp',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Shoes',
    description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/xzen/image/upload/v1638707015/Category-Images/category-shoes_ce7mlt.webp',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Watches',
    description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,w_1030/v1638708056/Category-Images/category-watches_eqmgkv.webp',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Perfumes',
    description: 'Daily commute essentials',
    imageSrc: 'https://res.cloudinary.com/xzen/image/upload/c_scale,f_webp,w_1006/v1638706566/Category-Images/category-perfumes_aopzst.webp',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]
const Categories = () => {
    return (
    <div >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-5 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="Sirv w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-900 text-center">
                  <a href={`/products/category/${callout.name}`} >
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900"><br /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    )
}

export default Categories
