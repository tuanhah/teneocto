chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
    
    if (request === "getName") {
    	let fbName = document.getElementsByClassName("_1vp5")[0].innerHTML;    
    	sendResponse({name: fbName , success: true});
    }
    
});