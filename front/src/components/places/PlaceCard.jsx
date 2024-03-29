import React, { useContext, useEffect, useState } from 'react'
import { Star, HeartOutline } from "heroicons-react";
import Router from 'next/router';
import GlobalContext from '../../context/GlobalContext';


export default function PlaceCard({ place }) {
  const { wishlist, setWishlist } = useContext(GlobalContext)
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(wishlist)
    localStorage.setItem('favorites', JSON.stringify(wishlist));
  }, [wishlist]);

  const isInWishlist = (place) => {
    return favorites?.some((item) => item._id == place._id)
  };

  const addToFavorites = (event, place) => {
    event.stopPropagation();
    const newFavorites = [...wishlist, place];
    setWishlist(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(wishlist));
  }

  const removeFromFavorites = (event, place) => {
    event.stopPropagation();
    const updatedFavorites = wishlist.filter((favoriteItem) => favoriteItem._id !== place._id);
    setWishlist(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(wishlist));
  }

  return (
    <div className='p-3' onClick={() => Router.push(`/places/${place._id}`)}>
      <div className='rounded-xl' style={{ height: '400px' }}>
        <div>
          <div className='relative'>
            <img className='object-cover h-72 block w-full border rounded-xl' src={place.image} alt={place.title} />
            <div className=' absolute top-4 right-4'><HeartOutline fill={`${isInWishlist(place) ? 'red' : 'transparent'}`} className='cursor-pointer  text-white' onClick={(event) => { isInWishlist(place) ? removeFromFavorites(event, place) : addToFavorites(event, place) }} /></div>
          </div>
          <div className='flex justify-between mt-2 ml-2'>
            <span className='font-semibold capitalize'>{place.title}, {place.Addresse && place.Addresse.city} </span>
            <span className='flex'> <Star className='h-4 w-4 mt-1' /> 4.6</span>
          </div>
          <div className='ml-2 overflow-clip text-ellipsis capitalize-first' style={{ color: '#717171' }}>{place.description} </div>
          <div className='ml-2 overflow-clip text-ellipsis' style={{ color: '#717171' }}> 11 -17 aout </div>
          <div className='mt-2 ml-2'> <span className='font-bold'>{place.pricePerDay} €</span>  /nuit </div>
        </div>
      </div>
    </div>
  )
}
