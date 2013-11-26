// JavaScript Document



/***********************************************

* Cross browser Marquee II- © Dynamic Drive (www.dynamicdrive.com)

* This notice MUST stay intact for legal use

* Visit http://www.dynamicdrive.com/ for this script and 100s more.

***********************************************/

var delayb4scroll=2000 //Specify initial delay before marquee starts to scroll on page (2000=2 seconds)

var marqueespeed=1 //Specify marquee scroll speed (larger is faster 1-10)

var pauseit=1 //Pause marquee onMousever (0=no. 1=yes)?


////NO NEED TO EDIT BELOW THIS LINE////////////


var copyspeed=marqueespeed
var pausespeed=(pauseit==0)? copyspeed: 0
var actualheight=''
var marque_copy;

//x lib additions
// x* r2, Copyright 2001-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xAppendChild(oParent, oChild)
{
  if (oParent.appendChild) return oParent.appendChild(oChild);
  else return null;
}

function xParent(e, bNode)
{
  if (!(e=xGetElementById(e))) return null;
  var p=null;
  if (!bNode && xDef(e.offsetParent)) p=e.offsetParent;
  else if (xDef(e.parentNode)) p=e.parentNode;
  else if (xDef(e.parentElement)) p=e.parentElement;
  return p;
}

function xGetElementById(e)
{
  if(typeof(e)=='string') {
    if(document.getElementById) e=document.getElementById(e);
    else if(document.all) e=document.all[e];
    else e=null;
  }
  return e;
}

// xDef r1, Copyright 2001-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xDef()
{
  for(var i=0; i<arguments.length; ++i){if(typeof(arguments[i])=='undefined') return false;}
  return true;
}

function xHeight(e,h)
{
  if(!(e=xGetElementById(e))) return 0;
  if (xNum(h)) {
    if (h<0) h = 0;
    else h=Math.round(h);
  }
  else h=-1;
  var css=xDef(e.style);
  if (e == document || e.tagName.toLowerCase() == 'html' || e.tagName.toLowerCase() == 'body') {
    h = xClientHeight();
  }
  else if(css && xDef(e.offsetHeight) && xStr(e.style.height)) {
    if(h>=0) {
      var pt=0,pb=0,bt=0,bb=0;
      if (document.compatMode=='CSS1Compat') {
        var gcs = xGetComputedStyle;
        pt=gcs(e,'padding-top',1);
        if (pt !== null) {
          pb=gcs(e,'padding-bottom',1);
          bt=gcs(e,'border-top-width',1);
          bb=gcs(e,'border-bottom-width',1);
        }
        // Should we try this as a last resort?
        // At this point getComputedStyle and currentStyle do not exist.
        else if(xDef(e.offsetHeight,e.style.height)){
          e.style.height=h+'px';
          pt=e.offsetHeight-h;
        }
      }
      h-=(pt+pb+bt+bb);
      if(isNaN(h)||h<0) return;
      else e.style.height=h+'px';
    }
    h=e.offsetHeight;
  }
  else if(css && xDef(e.style.pixelHeight)) {
    if(h>=0) e.style.pixelHeight=h;
    h=e.style.pixelHeight;
  }
  return h;
}

// xNum r2, Copyright 2001-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xNum()
{
  for(var i=0; i<arguments.length; ++i){if(isNaN(arguments[i]) || typeof(arguments[i])!='number') return false;}
  return true;
}

// xStr r1, Copyright 2001-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xStr(s)
{
  for(var i=0; i<arguments.length; ++i){if(typeof(arguments[i])!='string') return false;}
  return true;
}

// xGetComputedStyle r7, Copyright 2002-2007 Michael Foster (Cross-Browser.com)
// Part of X, a Cross-Browser Javascript Library, Distributed under the terms of the GNU LGPL

function xGetComputedStyle(e, p, i)
{
  if(!(e=xGetElementById(e))) return null;
  var s, v = 'undefined', dv = document.defaultView;
  if(dv && dv.getComputedStyle){
    s = dv.getComputedStyle(e,'');
    if (s) v = s.getPropertyValue(p);
  }
  else if(e.currentStyle) {
    v = e.currentStyle[xCamelize(p)];
  }
  else return null;
  return i ? (parseInt(v) || 0) : v;
}

//******** End Xlib functions *****************//


function scrollmarquee(){

marque_copy = document.getElementById("vmarquee2");

if (parseInt(cross_marquee.style.top)>(actualheight*(-1)+8)){

	cross_marquee.style.top=parseInt(cross_marquee.style.top)-copyspeed+"px";
	copy_top = (parseInt(marque_copy.style.top)-(copyspeed));
	//if(!alert_called)alert(copy_top + " " + parseInt(marque_copy.style.top));
	//alert_called = 1;
	marque_copy.style.top=copy_top + "px";
	}
else {
cross_marquee.style.top=8;
//parseInt(marqueeheight)+8+"px";
marque_copy.style.top=parseInt(marqueeheight)+8+"px";
}

}


function initializemarquee(){

cross_marquee=document.getElementById("vmarquee");
if(!cross_marquee)return;
//copy marque so that we can make it look like it is endless
marque_copy = document.createElement("div");
marque_copy.id = "vmarquee2";
marque_copy.style.position = "absolute";

parent_el = xParent(cross_marquee);
xAppendChild(parent_el,marque_copy);
marque_copy.innerHTML = cross_marquee.innerHTML;

//alert("Marque Copy innet html = " + marque_copy.innerHTML);

if (cross_marquee == null || cross_marquee == 'undefined') { return false; }

cross_marquee.style.top=0

marqueeheight=xHeight(cross_marquee);
marque_copy.style.top = marqueeheight;

actualheight=cross_marquee.offsetHeight

setTimeout('lefttime=setInterval("scrollmarquee()",40)', delayb4scroll)

}

if (window.addEventListener)
window.addEventListener("load", initializemarquee, false)
else if (window.attachEvent)
window.attachEvent("onload", initializemarquee)
else if (document.getElementById)
window.onload=initializemarquee