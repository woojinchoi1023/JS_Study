function test() {
    let result ='';
    if (a) {
        if (!b) {
            result = 'c';
        }
    } else {
        result ='a';

    }
    result += 'b';
    return result;
}

function answer() {
    let result = '';
    if (!a){
        result ='a';
        result += 'b';
        return result; 
    }
    if (!b) {
        result = 'c';
    }
    result += 'b';
    return result;
}