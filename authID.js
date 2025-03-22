function generateAuthID(studentcode,email){

    const [username, domain] = email.split('@');

    if(!username || !domain){
        throw new Error('Invalid email');
    }

    const combined = username + studentcode + domain;

    let converted = "";

    for(const char of combined)
    {
        if(/[a-zA-Z]/.test(char)){
            const position = char.toLowerCase().charCodeAt(0) - "a".charCodeAt(0)+1;
            converted += position.toString();

        }
        else if(/[0-9]/.test(char))
        {
            converted += char;
        }
        else
        {
            converted += "1";
        }
    }


    let authID = "";

    for(const digit of converted)
    {
       if(digit === "2" || digit === "3" ||digit === "5" ||digit === "7")
       {
            continue;
       }

       authID += digit;

    }

    return authID;






}


const studentcode = "fs40_361314";
const email = "rufusbright595@gmail.com";
console.log(generateAuthID(studentcode,email)); 
