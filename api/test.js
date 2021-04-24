const scraper=require("./scraper.js")


//scraper(path_for_screenshot, width, length, height, loadheight)

async function loop(){
    a=await scraper('scren.png',4,8,5,12)
    console.log(a)

}

loop()