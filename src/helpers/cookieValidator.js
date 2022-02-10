import md5 from 'md5'

export const cookieValidator = async () => {
    var existingCookie = localStorage.getItem('cookie')
    if (!existingCookie) {
        var random= Math.floor((Math.random()*1000000000000000000000000));
        var encryptedCookie = (md5(random));
        localStorage.setItem('cookie', encryptedCookie);
    }
}