/**************LOG HISTORY ***********************
28.08.2021       Deshani Rajapaksha       Created.
28.08.2021       Deshani Rajapaksha       Added Currency Converter
29.08.2021       Ruchira Wishwajith       Code Refactoring
*/

const crypto = require('crypto')

function hash(data){
    return crypto.createHash('sha256').update(data).digest('hex')
}

exports.hash = hash