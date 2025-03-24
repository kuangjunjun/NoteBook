const jwt=require('jsonwebtoken')

//创建token
function sign(option){
    return jwt.sign(option,'666',{
        expiresIn:'86400'//一天后过期
    });
}
//检验token
function verify(){
    return async(ctx,next)=>{
        let jwtToken=ctx.req.headers.authorization;
        if(jwtToken){
            //判断token是否合法
            //const decoded=jwt.verify(jwtToken,'666',)
            //console.log(decoded)
            try {
                const decoded=jwt.verify(jwtToken,'666')
                if( decoded.id){//合法
                    ctx.userId=decoded.id
                   await next()//调用next 去到下一个中间件
                }
            } catch (e) {
                ctx.body={
                status:401,//权限不足
                msg:'token失效'
                }
            }
        }else{
            ctx.body={
                status:401,
                msg:'请提供token'
            }
        }
    }
}



module.exports={
    sign,
    verify
}