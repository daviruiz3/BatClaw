console.log("Hello World");

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log('addr: '+add);
})

/**
 * http://techoverflow.net/blog/2013/02/03/nodejs-get-ip-addresses-of-local-interfaces/
 * Collects information about the local IPv4/IPv6 addresses of
 * every network interface on the local computer.
 * Returns an object with the network interface name as the first-level key and
 * "IPv4" or "IPv6" as the second-level key.
 * For example you can use getLocalIPs().eth0.IPv6 to get the IPv6 address
 * (as string) of eth0
 */
getLocalIPs = function () {
    var addrInfo, ifaceDetails, _len;
    var localIPInfo = {};
    //Get the network interfaces
    var networkInterfaces = require('os').networkInterfaces();
    //Iterate over the network interfaces
    for (var ifaceName in networkInterfaces) {
        ifaceDetails = networkInterfaces[ifaceName];//ls
        //Iterate over all interface details
        for (var _i = 0, _len = ifaceDetails.length; _i < _len; _i++) {
            addrInfo = ifaceDetails[_i];
            if (addrInfo.family === 'IPv4') {
                //Extract the IPv4 address
                if (!localIPInfo[ifaceName]) {
                    localIPInfo[ifaceName] = {};
                }
                localIPInfo[ifaceName].IPv4 = addrInfo.address;
            } else if (addrInfo.family === 'IPv6') {
                //Extract the IPv6 address
                if (!localIPInfo[ifaceName]) {
                    localIPInfo[ifaceName] = {};
                }
                localIPInfo[ifaceName].IPv6 = addrInfo.address;
            }
        }
    }
    console.log(localIPInfo);
};

/* http://jsfiddle.net/ThinkingStiff/z8KXd/ */
function checkUploadSpeed( iterations, update ) {
    var average = 0,
        index = 0,
        timer = window.setInterval( check, 5000 ); //check every 5 seconds
    check();
    
    function check() {
        var xhr = new XMLHttpRequest(),
            url = '?cache=' + Math.floor( Math.random() * 10000 ), //prevent url cache
            data = getRandomString( 1 ), //1 meg POST size handled by all servers
            startTime,
            speed = 0;
        xhr.onreadystatechange = function ( event ) {
            if( xhr.readyState == 4 ) {
                speed = Math.round( 1024 / ( ( new Date() - startTime ) / 1000 ) );
                average == 0 
                    ? average = speed 
                    : average = Math.round( ( average + speed ) / 2 );
                update( speed, average );
                index++;
                if( index == iterations ) {
                    window.clearInterval( timer );
                };
            };
        };
        xhr.open( 'POST', url, true );
        startTime = new Date();
        xhr.send( data );
    };
    
    function getRandomString( sizeInMb ) {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+`-=[]\{}|;':,./<>?", //random data prevents gzip effect
            iterations = sizeInMb * 1024 * 1024, //get byte count
            result = '';
        for( var index = 0; index < iterations; index++ ) {
            result += chars.charAt( Math.floor( Math.random() * chars.length ) );
        };     
        return result;
    };
};

checkUploadSpeed( 30, function ( speed, average ) {
    //document.getElementById( 'speed' ).textContent = 'speed: ' + speed + 'kbs';
    //document.getElementById( 'average' ).textContent = 'average: ' + average + 'kbs';

    console.log('speed: ' + speed + 'kbs');
    console.log('average: ' + average + 'kbs');
} );

getLocalIPs();
