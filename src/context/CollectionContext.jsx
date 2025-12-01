import React, { createContext, useContext, useState, useEffect } from 'react'

// Import default images
import furnitureImage1 from '../assets/Mt8UIYp8PTe2.jpg'
import silverImage1 from '../assets/CUzmGlTD6XgC.jpg'
import silverImage2 from '../assets/nwv9j9FK4ih3.jpg'
import silverImage3 from '../assets/wMisKx9aOxtX.jpg'
import printsImage1 from '../assets/gSXtuMGRIxnv.jpg'
import printsImage2 from '../assets/Z31aNeNDuGal.jpg'
import printsImage3 from '../assets/OHNjl9MMA3zE.jpg'
import sculptureImage1 from '../assets/IC2twac2TJSu.jpg'
import sculptureImage2 from '../assets/9FMV67VjRztJ.jpg'
import sculptureImage3 from '../assets/Unr6lpdoQf9y.jpg'
import decorativeImage1 from '../assets/T1Iq0trCBhRF.jpg'
import decorativeImage2 from '../assets/CcGpx6xQiJqw.jpg'
import decorativeImage3 from '../assets/t2w5tmjgermH.jpg'

const CollectionContext = createContext(null)

export const useCollection = () => {
  const context = useContext(CollectionContext)
  if (!context) {
    throw new Error('useCollection must be used within CollectionProvider')
  }
  return context
}

const defaultCollectionItems = [
  {
    id: 1,
    title: 'Georgian Mahogany Chest of Drawers',
    category: 'furniture',
    period: 'georgian',
    price: '£2,850',
    description: 'Fine Georgian mahogany chest of drawers, circa 1780. Excellent condition with original brass handles.',
    images: [furnitureImage1, '/src/assets/tTImFRDPoRDj.jpeg', '/src/assets/sfeOCW3PpbdO.jpg', '/src/assets/tiu3erQLS4iG.jpg'],
    featured: true
  },
  {
    id: 2,
    title: 'Worcester Porcelain Tea Service',
    category: 'porcelain',
    period: 'georgian',
    price: '£1,650',
    description: 'Complete Worcester porcelain tea service with hand-painted floral decoration, circa 1770.',
    images: ['/src/assets/3Ve7fIDsNkcE.jpg', '/src/assets/p6GYsWrjGQ0e.jpg', '/src/assets/ytfV1HOvkAPe.jpg', '/src/assets/SVOvjw1Lbrk6.jpg'],
    featured: true
  },
  {
    id: 3,
    title: 'Georgian Silver Teapot',
    category: 'silver',
    period: 'georgian',
    price: '£3,200',
    description: 'Elegant Georgian silver teapot with engraved family crest, hallmarked London 1799.',
    images: [silverImage1, silverImage2, silverImage3],
    featured: false
  },
  {
    id: 4,
    title: 'Antique Map of Great Britain',
    category: 'prints',
    period: 'victorian',
    price: '£450',
    description: 'Hand-colored antique map of Great Britain, published circa 1850. Excellent condition.',
    images: [printsImage1, printsImage2, printsImage3],
    featured: false
  },
  {
    id: 5,
    title: 'Regency Bronze Sphinx',
    category: 'sculpture',
    period: 'regency',
    price: '£4,500',
    description: 'Magnificent Regency bronze sphinx on marble base, Grand Tour souvenir circa 1820.',
    images: [sculptureImage1, sculptureImage2, sculptureImage3],
    featured: true
  },
  {
    id: 6,
    title: 'Victorian Decorative Box',
    category: 'decorative',
    period: 'victorian',
    price: '£680',
    description: 'Ornate Victorian decorative box with intricate metalwork and enamel details.',
    images: [decorativeImage1, decorativeImage2, decorativeImage3],
    featured: false
  }
]

export const CollectionProvider = ({ children }) => {
  const [collectionItems, setCollectionItems] = useState([])

  useEffect(() => {
    // Load from localStorage or use defaults
    const storedItems = localStorage.getItem('collection_items')
    if (storedItems) {
      setCollectionItems(JSON.parse(storedItems))
    } else {
      setCollectionItems(defaultCollectionItems)
      localStorage.setItem('collection_items', JSON.stringify(defaultCollectionItems))
    }
  }, [])

  const saveToStorage = (items) => {
    localStorage.setItem('collection_items', JSON.stringify(items))
  }

  const addItem = (item) => {
    const newItem = {
      ...item,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now() // Use crypto.randomUUID for better uniqueness
    }
    const updatedItems = [...collectionItems, newItem]
    setCollectionItems(updatedItems)
    saveToStorage(updatedItems)
    return newItem
  }

  const updateItem = (id, updatedData) => {
    const updatedItems = collectionItems.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    )
    setCollectionItems(updatedItems)
    saveToStorage(updatedItems)
  }

  const deleteItem = (id) => {
    const updatedItems = collectionItems.filter(item => item.id !== id)
    setCollectionItems(updatedItems)
    saveToStorage(updatedItems)
  }

  const getItem = (id) => {
    return collectionItems.find(item => item.id === id)
  }

  const value = {
    collectionItems,
    addItem,
    updateItem,
    deleteItem,
    getItem
  }

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
}
