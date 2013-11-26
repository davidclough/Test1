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

/*
var snowStorm = CHRISTMAS.snowStorm({
    sinkSpeed: 1.0,
    numSnowflakes: 120,
    snowflakeMarkup: [
        "<input type='checkbox' />",
        "<input type='checkbox' checked='true' />",
    ]
});
*/

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

window.onload = snowStorm.startSnowing();



// TEST CODE.
// Stop snowing after a while then start snowing again.
setTimeout(function() {
    snowStorm.stopSnowing();
    setTimeout(function() {
        snowStorm.startSnowing();
    }, 15000);
}, 20000);
// TEST CODE.

