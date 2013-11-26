// CREDITS:
// Snowmaker Copyright (c) 2003 Peter Gehrig. All rights reserved.
// Distributed by Hypergurl
// Permission given to use the script provided that this notice remains as is.
//
// DC for tidying up mess (bring into 21st century), modularising, enhancing and making it work in HTML5. Added stopSnowing and settings.

var CHRISTMAS = {};

CHRISTMAS.utilities = (function() {
    // Taken from http://www.browniesblog.com/A55CBC/blog.nsf/dx/09072011063106PMMBRBZJ.htm (for merging a user-supplied settings object with a default settings object).
    var mergeObjects = function(obj1, obj2) { 
        // Merges two objects, returning all objects in obj1 unless those same elements are also in obj2.
        // In that case the elements in obj2 will take precedence. This is the equivalent of jQuery.merge().
        obj1 = obj1 || {}; 
        obj2 = obj2 || {}; 
        returnObj = {};

        for (var index in obj1) { 
            returnObj[index] = obj2[index] || obj1[index]; 
        } 
        return returnObj; 
    }

    var randomInteger = function(range) {		
        var i = Math.floor(range * Math.random());
        return i;
    };
    
    return {
        mergeObjects: mergeObjects,
        randomInteger: randomInteger
    };
}());

// Use "object specifier" pattern to allow caller to set various arguments if they want to but fall back to default values otherwise.
CHRISTMAS.snowStorm = function(settings) {
    
    // Any properties in here can be supplied when calling this function.
    settings = CHRISTMAS.utilities.mergeObjects({ 
        // Set the number of snowflakes (more than 30 - 40 not recommended) - DC: That was 10 years ago.
        numSnowflakes: 35,

        // Set the colors for the snow. Add as many colors as you like.
        snowColour: ["#aaaacc","#ddddff","#ccccdd"],

        // Set the fonts, that create the snowflakes. Add as many fonts as you like.
        snowType: ["Arial Black", "Arial Narrow", "Times", "Comic Sans MS"],

        // Set the letter that creates your snowflake (recommended:*)
        snowflakeMarkup: ["*"],

        // Set the speed of sinking (recommended values range from 0.3 to 2).
        sinkSpeed: 0.6,

        // Set the maximal-size of your snowflaxes
        maxSnowflakeSize: 22,

        // Set the minimal-size of your snowflaxes
        minSnowflakeSize: 8,

        // Set the snowing-zone.
        //   1 for all-over-snowing,
        //   2 for left-side-snowing,
        //   3 for center-snowing,
        //   4 for right-side-snowing.
        snowingZone: 1
    }, settings);

    var snow = [];
    var marginBottom;
    var marginRight;
    var timer;
    var i_snow = 0;
    var x_mv = [];
    var crds = [];
    var lftrght = [];
    var browserInfos = navigator.userAgent;
    var ie5 = document.all && document.getElementById && !browserInfos.match(/Opera/);
    var ns6 = document.getElementById && !document.all;
    var opera = browserInfos.match(/Opera/);
    var browserOk = ie5 || ns6 || opera;
    var snowflakesAdded;
    var currentlySnowing;
    // When stop snowing allow flakes currently on the screen to continue falling.
    var stoppingSnowing;
    
    var randomInteger = CHRISTMAS.utilities.randomInteger;
    
    var startSnowing = function() {
        if (browserOk) {
            if (!snowflakesAdded) {
                for (i = 0; i <= settings.numSnowflakes-1; i++) {
                    var newDiv = document.createElement("div");
                    newDiv.id = "s" + i;
                    var markupIndex = Math.floor((Math.random() * settings.snowflakeMarkup.length));
                    newDiv.innerHTML = settings.snowflakeMarkup[markupIndex];
                    document.body.appendChild(newDiv);
                }
                snowflakesAdded = true;
            }
            if (ie5 || opera) {
                marginBottom = document.body.clientHeight;
                marginRight = document.body.clientWidth;
            }
            else if (ns6) {
                marginBottom = window.innerHeight;
                marginRight = window.innerWidth;
            }
            
            initialiseSnow();
            currentlySnowing = true;
            stoppingSnowing = false;
            moveSnow();
        }
    };

    var initialiseSnow = function() {
        var snowsizerange = settings.maxSnowflakeSize - settings.minSnowflakeSize;
        for (i = 0; i <= settings.numSnowflakes-1; i++) {
            crds[i] = 0;                      
            lftrght[i] = Math.random() * 15;         
            x_mv[i] = 0.03 + Math.random() / 10;
            snow[i] = document.getElementById("s" + i);
            snow[i].style.fontFamily = settings.snowType[randomInteger(settings.snowType.length)];
            snow[i].size = randomInteger(snowsizerange) + settings.minSnowflakeSize;
            snow[i].style.fontSize = snow[i].size + "px";
            snow[i].style.color = settings.snowColour[randomInteger(settings.snowColour.length)];
            snow[i].sink = settings.sinkSpeed * snow[i].size / 5;
            if (settings.snowingZone === 1) {
                snow[i].posx = randomInteger(marginRight - snow[i].size);
            }
            if (settings.snowingZone === 2) {
                snow[i].posx = randomInteger(marginRight / 2 - snow[i].size);
            }
            if (settings.snowingZone === 3) {
                snow[i].posx = randomInteger(marginRight / 2 - snow[i].size) + marginRight / 4;
            }
            if (settings.snowingZone === 4) {
                snow[i].posx = randomInteger(marginRight / 2 - snow[i].size) + marginRight / 2;
            }
            ////snow[i].posy = randomInteger(6 * marginBottom - marginBottom - 6 * snow[i].size);
            snow[i].posy = randomInteger(-1 * marginBottom - marginBottom - 6 * snow[i].size);
            snow[i].style.left = snow[i].posx + "px";
            // He had "absolute" in his but using "fixed" prevents scrollbars appearing, disappearing and changing all the time. Unsure if "fixed" has any undesirable side effects though.
            ////snow[i].style.position = "absolute";
            snow[i].style.position = "fixed";
        }
    };

    var stopSnowing = function() {
        stoppingSnowing = true;
    };
    
    var moveSnow = function() {
        var snowStillFalling;
        for (i = 0; i <= snow.length-1; i++) {
            crds[i] += x_mv[i];
            if (!stoppingSnowing || snow[i].posy > -snow[i].offsetHeight) {
                snow[i].posy += snow[i].sink;
            }
            snow[i].style.left = Math.floor(snow[i].posx + lftrght[i] * Math.sin(crds[i])) + "px";
            snow[i].style.top = snow[i].posy + "px";
            
            if (snow[i].posy >= marginBottom - 0 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lftrght[i])) {
                if (settings.snowingZone === 1) { snow[i].posx = randomInteger(marginRight - snow[i].size); }
                if (settings.snowingZone === 2) { snow[i].posx = randomInteger(marginRight / 2 - snow[i].size); }
                if (settings.snowingZone === 3) { snow[i].posx = randomInteger(marginRight / 2 - snow[i].size) + marginRight / 4; }
                if (settings.snowingZone === 4) { snow[i].posx = randomInteger(marginRight / 2 - snow[i].size) + marginRight / 2; }
                if (!stoppingSnowing) {
                    snow[i].posy = randomInteger(-1 * marginBottom - marginBottom - 6 * snow[i].size);
                }
            } else {
                snowStillFalling = true;
            }
        }
        if (stoppingSnowing && !snowStillFalling) {
            currentlySnowing = false;
        }
        if (currentlySnowing) {
            // http://stackoverflow.com/questions/18019680/function-is-not-defined-error
            var timer = setTimeout(function() {
                moveSnow();
            }, 50);
        }
    };
    
    return {
        startSnowing: startSnowing,
        stopSnowing: stopSnowing
    };
}

