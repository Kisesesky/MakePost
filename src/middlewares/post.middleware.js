const test = (input) => {
    return (a, b, c) =>{
        if(input === 'TypeA')
            console.log(a+b+c)
        else if(input === 'TypeB')
            console.log(a*b*c)
    }   
}

test('typeA')(2, 4, 4)