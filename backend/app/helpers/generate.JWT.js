import jwt from "jsonwebtoken";
const generateJWT = (uid='')=>{
    return new Promise((resolve,reject)=>{
        const payload = {uid};
        jwt.sign(payload,process.env.SECRET_OR_PRIVATE_KEY,
        {expiresIn: '1h'},
        (err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el JSON WEb TOKEN :(...')
            } else {
                resolve(token)
            }
        })
    })
}
export default generateJWT