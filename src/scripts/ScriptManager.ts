

export function loadXML(path: string) : any {
    // Create a request object. Try Mozilla / Safari method first.
    if (window.XMLHttpRequest) {
        var request = new XMLHttpRequest();

        // If we couldn't make one, abort.
        if (!request!) {
            window.alert("Ajax not supported. Try another browser.");
            return false;
        }
        
        request.open("GET", path, true);


        request.send();

        return request.responseXML;
    }

    // IE Method
/*  else if (window.ActiveXObject) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
            }
        } 
    } */
}