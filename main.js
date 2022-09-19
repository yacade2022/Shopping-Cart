const bars = document.querySelector('.bars')
const navLinks = document.querySelector('.nav-links')
const btnTop = document.querySelector('.btn-top')
const navBar =document.querySelector('.nav-bar')
const links = document.querySelector('.links')
const containerProducts = document.querySelector('.container-products')
const cartContent = document.querySelector('.cart-content')
const cartShopping = document.querySelector('.fa-cart-plus')
const cartTotal = document.querySelector('.cart-total')
const closeCart = document.querySelector('.close-cart')
const carto = document.querySelector('.cart')
const clearCart = document.querySelector('.clear-cart')



let items = [
{
    id:1,
    title: "shirt summer",
    img: src="./images/shirt1.jpg",
    price: 25,

},
{
    id:2,
    title: "shirt never better",
    img: src="./images/shirt2.jpg",
    price: 35,

},
{
    id:3,
    title: "shirt scary",
    img: src="./images/shirt3.jpg",
    price: 25,

},
{
    id:4,
    title: "shirt boo",
    img: src="./images/shirt4.jpg",
    price: 45,

},
{
    id:5,
    title: "shirt hang on",
    img: src="./images/shirt5.jpg",
    price: 28,

},
{
    id:6,
    title: "shirt cd",
    img: src="./images/shirt6.jpg",
    price: 22,

},
{
    id:7,
    title: "shirt smile",
    img: src="./images/shirt7.jpg",
    price: 23,

},
{
    id:8,
    title: "shirt hamstel",
    img: src="./images/shirt8.jpg",
    price: 18,

},
{
    id:9,
    title: "shirt sq",
    img: src="./images/shirt9.jpg",
    price: 29,

},
{
    id:10,
    title: "shirt shark",
    img: src="./images/shirt10.jpg",
    price: 38,

}
]

let cart = getProductFromStore()

bars.addEventListener('click',()=>{
    navLinks.classList.toggle('show-links')
})
// show topBtn
window.addEventListener('scroll',()=>{
    const scrollHeight = window.pageYOffset
    if(scrollHeight >= 500){
        btnTop.classList.add('showBtn-Top')
    }else{
        btnTop.classList.remove('showBtn-Top')
        
    }
    
})
btnTop.addEventListener('click',()=>{
    window.scrollTo({
        
        top:0
    })
})
// fixed NavBar

const scroll = document.querySelectorAll('.scroll')
scroll.forEach(e=>{
    e.addEventListener('click',(event)=>{
        event.preventDefault()
        const heightLinks = links.getBoundingClientRect().height
        const navlinksheight = navLinks.getBoundingClientRect().height
        const navbarheight = navBar.getBoundingClientRect().height
        const id = event.currentTarget.getAttribute('href').slice(1)
        const element = document.getElementById(id)
        let position = element.offsetTop - navbarheight 
        window.scrollTo({
            left:0,
            top:position,
        })
        if(navlinksheight > 84){
            position = position + heightLinks 
            navLinks.classList.remove('show-links')
            window.scrollTo({
                left:0,
                top:position,
            })
        }
     })
})
//Display Products
function getProducts(){
    containerProducts.innerHTML = ''
    items.forEach(item=>{
        const{id,title,price,img} = item
        return containerProducts.innerHTML += `
        
        <article class="product">
            <img src="${img}" alt="">
            <h4>${title}</h4>
            <div class="poch">
                <span class="price">$${price}</span>
                <i class="fa-solid fa-cart-shopping" id=${id}></i>
            </div>
        </article>        
        `        
    })
}
getProducts()

//Check if Product is in Cart

const shop = document.querySelectorAll('.fa-cart-shopping')
        shop.forEach(e=>{
            let beta = e.id
            let incart = cart.find(item => item.id == beta)
            if(incart){
                e.classList.add('disable')               
            }
                
            e.addEventListener('click',(event)=>{
                let id = event.target.id                
                event.target.classList.add('disable')                
                let inCart = cart.find(item => item.id == id)
                let element = items.find(item => item.id == id)
                let elementDestract = {...element,amount:1}
                if(inCart === undefined){                                      
                    cart.push(elementDestract)             
                }else{
                    
                    inCart.amount += 1
                }                
                addToCart(elementDestract)
                addToStore(cart)               
                calculateTotalAndPrice(cart)              
               })                
        })

   // Calculate Total Amount And Total Price     
   function calculateTotalAndPrice(cart){
    let cartItems = cart.map(item => item.amount)
               if(cartItems === null)return
               let alpha = cartItems.reduce((a,b)=>{
                return a + b
               },0)
               let amountPrice = cart.map(item => item.amount * item.price)
               let all = amountPrice.reduce((a,b)=>{
                  return a + b
                },0)
               
               cartTotal.innerHTML = all
               cartShopping.innerText = alpha           
     }    

//Add product To Storage
function addToStore(cart){
    localStorage.setItem('cart',JSON.stringify(cart))  
}
//Get product From Storage
function getProductFromStore(){
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}

//Add product To Cart
function addToCart(product){
const div = document.createElement('div')
div.className = 'cart-item'
div.innerHTML = `

            <img src="${product.img}" alt="">
            <div>
                <h4>${product.title}</h4>
                <h5>$ ${product.price}</h5>
                <span class="remove-item" data-id ="${product.id}">remove</span>
            </div>
            <div>
                <i class="fa-solid fa-chevron-up" id="${product.id}"></i>
                <p class="item-amount" id="${product.id}">${product.amount}</p>
                <i class="fa-solid fa-chevron-down" id="${product.id}"></i>
            </div>      

`
cartContent.appendChild(div)
}

carto.addEventListener('click',(e)=>{
    
    if(e.target.classList.contains('fa-chevron-up')){
        
        let id = e.target.id
        let tempItem = cart.find(item => item.id == id)
        tempItem.amount = tempItem.amount + 1     
        addToStore(cart) 
        
        calculateTotalAndPrice(cart)       

        e.target.nextElementSibling.innerText = tempItem.amount
       
    }
    else if(e.target.classList.contains('fa-chevron-down')){
        
        let id = e.target.id
        let tempItem = cart.find(item => item.id == id)
        if(tempItem.amount === 0)return
        tempItem.amount = tempItem.amount - 1     
        addToStore(cart)         
        calculateTotalAndPrice(cart)    
        e.target.previousElementSibling.innerText = tempItem.amount
        }else if(e.target.classList.contains('remove-item')){
        let id = e.target.dataset.id     
        e.target.parentElement.parentElement.remove()
        let rey = cart.find(item => item.id == id)
        cart = cart.filter((item) => item.id !== rey.id)
        addToStore(cart)
        calculateTotalAndPrice(cart)
        shop.forEach(e=>{
            test(e)
        })         
    }
    })
//Close Cart
closeCart.addEventListener('click',()=>{
    carto.classList.remove('showCart')
})
//Show Cart
cartShopping.addEventListener('click',()=>{
    carto.classList.add('showCart')
})

function Add(cart){ 
cart.forEach(e=>{
    addToCart(e)
})
calculateTotalAndPrice(cart)
}

Add(cart)

//Remove All Items From Cart
clearCart.addEventListener('click',()=>{
    let cartItem = cart.map(item =>item.id)
    cartItem.forEach(e=>{
        cart = cart.filter((item) => item.id != e)
        addToStore(cart)
        calculateTotalAndPrice(cart)
    })
    cartContent.innerHTML=''
    shop.forEach(e=>{
        test(e)
    })    
    
})
//Remove Disable From Shopping Cart
function test(e){
    let id = e.id
    let ifInCart = cart.find(item => item.id == id)
    if(!ifInCart){
        e.classList.remove('disable')
    }
}