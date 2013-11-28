// Can initialise using default settings...
////var snowStorm = CHRISTMAS.snowStorm();

// ...or specify some or all settings.
/*
var snowStorm = CHRISTMAS.snowStorm({
    numSnowflakes: 100,
    snowColour: ["#cc0","#a0a","#0aa"],
    //snowType: ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"],
    snowflakeMarkup: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "<img src='http://www.w3schools.com/images/compatible_firefox.gif' />"],
    maxSnowflakeSize: 58
    //minSnowflakeSize: 8
    //snowingZone: 3
});
*/

var snowStorm = CHRISTMAS.snowStorm({
    sinkSpeed: 0.3 + (1.7 * Math.random()),         // Between Min and Max Peter Gehrig recommended.
    numSnowflakes: 100,
    snowflakeMarkup: [
        "Full Name:<input type='text' value='Fred' />",
        "<input type='checkbox' />",
        "<input type='checkbox' checked='true' />",
        "<img src='http://www.w3schools.com/images/compatible_ie.gif' />",
        "<img src='http://www.w3schools.com/images/compatible_firefox.gif' />",
        "<p style='width:250px;'>COPY THE MOTHERFUCKING CODE BELOW AND PASTE IT WHERE YOU WOULD FUCKING LIKE IT TO APPEAR.</p>",
         "<p style='width:450px;'>Now that there is the Tec-9, a crappy spray gun from South Miami. This gun is advertised as the most popular gun in American crime. Do you believe that shit? It actually says that in the little book that comes with it: the most popular gun in American crime. Like they're actually proud of that shit. </p>",
       "<p>MOTHERFUCKING PLACEHOLDER TEXT MOTHERFUCKER!</p>"
    ]
});

/*
var snowStorm = CHRISTMAS.snowStorm({
    sinkSpeed: 1.5,
    numSnowflakes: 60,
    snowflakeMarkup: [
        "<img src='http://www.w3schools.com/images/compatible_ie.gif' />",
        "<img src='http://www.w3schools.com/images/compatible_firefox.gif' />",
        "<img src='http://www.w3schools.com/images/compatible_opera.gif' />",
        "<img src='http://www.w3schools.com/images/compatible_chrome.gif' />",
        "<img src='http://www.w3schools.com/images/compatible_safari.gif' />"
    ]
});
*/

window.onload = snowStorm.startSnowing();



// TEST CODE.
// Stop snowing after a while then start snowing again.
setTimeout(function() {
    snowStorm.stopSnowing();
    setTimeout(function() {
        snowStorm.startSnowing();
    }, 20000);// 25000);
}, 5000);

/*
// Was definitely speeding up every time restarts after stopping. That was because there is no need to call moveSnow in startSnowing if there are still snowflakes falling,
// i.e. cancelAnimationFrame had not been called yet, so calling requestAnimationFrame just added an extra animation frame.
setTimeout(function() {
    snowStorm.stopSnowing();
    setTimeout(function() {
        snowStorm.startSnowing();
        setTimeout(function() {
            snowStorm.stopSnowing();
            setTimeout(function() {
                snowStorm.startSnowing();
            }, 10000);
        }, 10000);
    }, 30000);
}, 10000);
*/


// TEST CODE.

