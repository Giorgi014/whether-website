const contentWrapper = document.getElementsByClassName('content_wrapper');

const crateRainDrop = () => {
    const rain_drop = document.createElement('i');
    rain_drop.classList.add('fas');
    rain_drop.classList.add('fa-droplet');
    // rain_drop.style.left = Math.random() * window.innerWidth + 'px';
    rain_drop.style.left = Math.random() * contentWrapper[0].clientWidth + 'px';
    rain_drop.style.animationDuration = Math.random() * 1 + 1 + 's';
    rain_drop.style.opacity = Math.random();
    rain_drop.style.fontSize = Math.random() * 3 + 3 +'px';
    
    
    
    contentWrapper[0].appendChild(rain_drop);
    // document.body.appendChild(rain_drop);
    
    setTimeout(() =>{
        rain_drop.remove();
    }, 5000)
}
setInterval(crateRainDrop, 10);