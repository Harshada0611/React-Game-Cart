import React, { useState } from 'react'
import '../assets/home.css'
import '../assets/productcard.css'

function Home() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'd09cfc8f05msh707dc42b00e1450p12b003jsn300b5fb674f0',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  fetch('https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=3d.mmorpg.fantasy.pvp&platform=pc', options)
    .then(resp => resp.json())
    .then(result => setData(result))
    .catch(err => console.log(err))
  console.log(data)



  //add to cart function
  const add_to_cart = (item) => {
    setCart([...cart, item])
  }

  const clearCart=()=>{
    setCart([])
  }


  return (
    <div>
      <div className='container-fluid' id='header'>
        <h1>FUN GAME</h1>
        <div className='cartWrapper' >
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {cart.length}
            </button>
            <button className="btn btn-secondary " type="button" id="clearBtn" onClick={clearCart}> Clear Cart</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {cart.length > 0 ? (
                <>
                  {cart.map((cartItem, index) => {
                    return (
                      <li className="dropdown-item" key={index + 1}>
                        <p>{cartItem.title}</p>
                      </li>
                    )
                  })}
                </>
              ) : (
                <li className="dropdown-item" >
                  <p>Cart is Empty!</p>
                </li>
              )
              }
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid bodyWrapper'>
        <div className='container productCardWrapper'>
          {data.map((product, index) => {
            return (
              <div className='card' key={index + 1}>
                <div id='imageWrapper'><img src={product.thumbnail} alt='imageFile' /></div>
                <h6 className='heading'>  {product.title}</h6>
                <div className='btnWrapper'>
                  <button className='btn btn-success ' id='addButton'
                    onClick={() => add_to_cart(product)}>Add To Cart</button>
                </div>
                <div>
                  <a href={product.game_url} ><button className='btn btn-success ' id='playFreeBtn'>PLAY FREE</button></a>
                </div>
              </div>)
          })}
        </div>
      </div>
    </div>
  )
}
export default Home
